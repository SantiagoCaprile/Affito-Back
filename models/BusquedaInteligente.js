const mongoose = require("mongoose");
const Monedas = require("../enums/Monedas");
const TIPO_PROPIEDAD = require("../enums/TipoPropiedad");

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
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model(
	"BusquedaInteligente",
	BusquedaInteligenteSchema
);
