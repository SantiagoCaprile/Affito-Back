const mongoose = require("mongoose");

const EstadoContratos = require("../enums/EstadoContratos");
const Monedas = require("../enums/Monedas");
const PropDestinos = require("../enums/PropDestinos");

const ContratoSchema = new mongoose.Schema({
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
	comision_mensual: {
		type: Number,
	},
	intereses_mora_diaria: {
		type: Number,
		required: [
			true,
			"Por favor ingrese el porcentaje de interes por dia de mora",
		],
	},
	fecha_proxima_actualizacion: {
		//ver como implementar porque las actualizaciones variann segun el contrato
		//puede ser cada 6 meses, cada año, etc
		type: Date,
		// required: [true, 'Por favor ingrese una fecha de proxima actualizacion'],
	},
	monto: {
		type: Number,
		required: [true, "Por favor ingrese un monto"],
		min: [0, "El monto no puede ser negativo"],
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
			ref: "Pago",
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
});

module.exports = mongoose.model("Contrato", ContratoSchema);
