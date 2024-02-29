const mongoose = require("mongoose");

const EstadoContratos = require("../enums/EstadoContratos");
const Monedas = require("../enums/Monedas");
const PropDestinos = require("../enums/PropDestinos");
const EstadoPropiedad = require("../enums/EstadoPropiedad");

const ContratoSchema = new mongoose.Schema(
	{
		destino: {
			type: String,
			required: [true, "Por favor ingrese un destino"],
			trim: true,
			enum: [
				PropDestinos.COMERCIAL,
				PropDestinos.VIVIENDA,
				PropDestinos.INDUSTRIAL,
			],
		},
		estado: {
			type: String,
			default: EstadoContratos.VIGENTE,
			enum: [
				EstadoContratos.VIGENTE,
				EstadoContratos.EXTINTO,
				EstadoContratos.RESCINDIDO,
			],
		},
		fecha_inicio: {
			type: Date,
			required: [true, "Por favor ingrese una fecha de inicio"],
		},
		fecha_fin: {
			type: Date,
			required: [true, "Por favor ingrese una fecha de fin"],
		},
		fecha_entrega_inmueble: {
			type: Date,
		},
		fecha_notificacion_fehaciente: {
			type: Date,
		},
		comision_celebracion: {
			type: Number,
		},
		monto: {
			type: Number,
			required: [true, "Por favor ingrese un monto"],
			min: [0, "El monto no puede ser negativo"],
		},
		saldo: {
			type: Number,
			value: this.comision_celebracion * -1,
		},
		moneda: {
			type: String,
			ref: "Moneda",
			required: [true, "Por favor ingrese una moneda"],
			enum: [Monedas.PESOS, Monedas.DOLAR, Monedas.EURO],
		},
		observaciones: {
			type: String,
			trim: true,
			maxlength: [700, "Observaciones no puede tener mas de 700 caracteres"],
		},
		pagos: [
			{
				type: mongoose.Types.ObjectId,
				ref: "PagoContrato",
			},
		],
		propiedad: {
			type: mongoose.Types.ObjectId,
			ref: "Propiedad",
			required: [true, "Por favor ingrese una propiedad"],
		},
		locatario: {
			type: mongoose.Types.ObjectId,
			ref: "Cliente",
			required: [true, "Por favor ingrese un locatario"],
		},
		garantes: [
			{
				type: mongoose.Types.ObjectId,
				ref: "Cliente",
			},
		],
	},
	{
		timestamps: true,
	}
);

ContratoSchema.pre("save", async function (next) {
	const Propiedad = require("./Propiedad");
	const Cliente = require("./Cliente");
	const propiedad = await Propiedad.findById(this.propiedad);
	if (propiedad.estado === EstadoPropiedad.ALQUILADA) {
		const error = new Error("La propiedad ya está alquilada.");
		error.status = 400;
		next(error);
	}
	if (propiedad.propietario === this.locatario) {
		const error = new Error("El propietario no puede ser locatario.");
		error.status = 400;
		next(error);
	}
	if (this.garantes.some((garante) => garante === propiedad.propietario)) {
		const error = new Error("El propietario no puede ser garante.");
		error.status = 400;
		next(error);
	}
	if (this.isNew) {
		this.saldo = this.comision_celebracion * -1;
		Cliente.updateOne(
			{ _id: this.locatario },
			{
				$push: { propiedades: { propiedad: this.propiedad, rol: "Locatario" } },
			}
		);
	}
	next();
});

module.exports = mongoose.model("Contrato", ContratoSchema);
