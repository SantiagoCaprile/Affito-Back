const mongoose = require("mongoose");
const Monedas = require("../enums/Monedas");
const MOTIVOS_TASACION = require("../enums/MotivoTasacion");
const ANTIGUEDAD = require("../enums/Antiguedad");

const TasacionSchema = new mongoose.Schema(
	{
		fecha_visita: {
			type: Date,
		},
		fecha_tasacion: {
			type: Date,
		},
		valor: {
			type: Number,
		},
		moneda: {
			type: String,
			trim: true,
			maxlength: [10, "moneda no puede tener mas de 10 caracteres"],
			enum: Object.values(Monedas),
		},
		tasador_nombre: {
			type: String,
			trim: true,
			maxlength: [50, "nombre no puede tener mas de 50 caracteres"],
		},
		tasador_matricula: {
			type: String,
			trim: true,
			maxlength: [50, "matricula no puede tener mas de 50 caracteres"],
		},
		tasador_telefono: {
			type: String,
			trim: true,
			maxlength: [50, "telefono no puede tener mas de 50 caracteres"],
			regex: [/^[0-9-]+$/, "solo debe contener numeros y guiones"],
		},
		motivo: {
			type: String,
			required: [true, "Por favor ingrese un motivo"],
			trim: true,
			maxlength: [50, "motivo no puede tener mas de 50 caracteres"],
			enum: Object.values(MOTIVOS_TASACION),
		},
		antiguedad: {
			type: String,
			trim: true,
			maxlength: [50, "antiguedad no puede tener mas de 50 caracteres"],
			enum: Object.values(ANTIGUEDAD),
			requiered: false,
		},
		observaciones: {
			type: String,
			trim: true,
			maxlength: [5000, "observaciones no puede tener mas de 5000 caracteres"],
		},
		solicitante: {
			type: mongoose.Types.ObjectId,
			ref: "Cliente",
			required: [true, "Por favor ingrese un solicitante"],
		},
		propiedad: {
			type: mongoose.Types.ObjectId,
			ref: "Propiedad",
			required: [true, "Por favor ingrese una propiedad"],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Tasacion", TasacionSchema);
