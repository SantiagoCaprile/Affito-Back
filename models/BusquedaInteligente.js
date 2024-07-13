const mongoose = require("mongoose");
const Monedas = require("../enums/Monedas");
const TIPO_PROPIEDAD = require("../enums/TipoPropiedad");
const EstadoPropiedad = require("../enums/EstadoPropiedad");

const BusquedaInteligenteSchema = new mongoose.Schema(
	{
		cliente: {
			type: mongoose.Types.ObjectId,
			ref: "Cliente",
			required: [true, "Por favor ingrese un cliente"],
		},
		operacion: {
			type: String,
			trim: true,
			maxlength: [50, "operacion no puede tener mas de 50 caracteres"],
			enum: ["Venta", "Alquiler"],
		},
		localidad: {
			type: String,
			trim: true,
			maxlength: [50, "localidad no puede tener mas de 50 caracteres"],
		},
		tipo_propiedad: {
			type: String,
			trim: true,
			enum: Object.values(TIPO_PROPIEDAD),
		},
		ambientes: {
			type: Number,
			min: [0, "El numero de ambientes no puede ser negativo"],
		},
		dimension_min: {
			type: Number,
			min: [0, "La dimensión mínima no puede ser menor a 0"],
		},
		dimension_max: {
			type: Number,
			min: [0, "La dimensión máxima no puede ser menor a 0"],
			validate: {
				validator: function (v) {
					return v >= this.dimension_min;
				},
				message: "La dimensión máxima no puede ser menor a la dimensión mínima",
			},
		},
		monto_min: {
			type: Number,
			min: [0, "El monto mínimo no puede ser menor a 0"],
		},
		monto_max: {
			type: Number,
			min: [0, "El monto máximo no puede ser menor a 0"],
			validate: {
				validator: function (v) {
					return v >= this.monto_min;
				},
				message: "El monto máximo no puede ser menor al monto mínimo",
			},
		},
		moneda: {
			type: String,
			trim: true,
			maxlength: [10, "moneda no puede tener mas de 10 caracteres"],
			enum: Object.values(Monedas),
		},
		observaciones: {
			type: String,
			trim: true,
			maxlength: [300, "observaciones no puede tener mas de 300 caracteres"],
		},
		propiedades: [
			//propiedades posibles que cumplan con la busqueda
			{
				type: mongoose.Types.ObjectId,
				ref: "Propiedad",
				default: [],
			},
		],
	},
	{ timestamps: true }
);

const esPropiedadBuscada = async (propiedad, busqueda) => {
	return (
		propiedad.dimension >= busqueda.dimension_min &&
		propiedad.dimension <= busqueda.dimension_max &&
		propiedad.operaciones.some(
			(operacion) =>
				operacion.tipo == busqueda.operacion &&
				operacion.moneda == busqueda.moneda &&
				operacion.monto >= busqueda.monto_min &&
				operacion.monto <= busqueda.monto_max
		)
	);
};

BusquedaInteligenteSchema.methods.calcularPropiedades = async function (
	busquedaId
) {
	const busqueda = await mongoose
		.model("BusquedaInteligente")
		.findById(busquedaId);
	if (!busqueda) {
		return;
	}
	console.log("llego 1");
	const propiedadesIds = await mongoose
		.model("Propiedad")
		.find({
			$and: [
				{ operaciones: { $exists: true, $not: { $size: 0 } } },
				{ localidad: busqueda.localidad },
				{ operaciones: { $elemMatch: { tipo: busqueda.operacion } } },
				{ estado: { $ne: EstadoPropiedad.ALQUILADA } },
				{ tipo: busqueda.tipo_propiedad },
			],
		})
		.select("_id operaciones estado dimension");
	if (propiedadesIds.length == 0) {
		return;
	}
	if (!busqueda.propiedades) {
		busqueda.propiedades = [];
	}
	const propiedadesCoiciden = [];
	propiedadesIds.forEach((propiedad) => {
		if (esPropiedadBuscada(propiedad, busqueda)) {
			propiedadesCoiciden.push(propiedad._id);
		}
	});
	await mongoose.model("BusquedaInteligente").findOneAndUpdate(
		{ _id: busquedaId },
		{
			$set: { propiedades: propiedadesCoiciden },
		}
	);
	console.log(propiedadesCoiciden);
};

BusquedaInteligenteSchema.methods.chequearNuevaPropiedad = async function (
	propiedad
) {
	if (this.propiedades.includes(propiedad._id)) {
		return;
	}
	if (esPropiedadBuscada(propiedad)) {
		this.findOneAndUpdate(
			{ _id: this._id },
			{ $push: { propiedades: propiedad._id } }
		);
	}
};

BusquedaInteligenteSchema.post("save", async function () {
	await this.calcularPropiedades(this._id);
});

module.exports = mongoose.model(
	"BusquedaInteligente",
	BusquedaInteligenteSchema
);
