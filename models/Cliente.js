const mongoose = require("mongoose");

const ClienteSchema = new mongoose.Schema({
	cuit: {
		type: String,
		required: [true, "Por favor ingrese un cuit"],
		unique: true,
		trim: true,
		maxlength: [11, "cuit no puede tener mas de 11 caracteres"],
	},
	nombre_razon_social: {
		type: String,
		required: [true, "Por favor ingrese un nombre"],
		trim: true,
		maxlength: [60, "nombre no puede tener mas de 60 caracteres"],
	},
	celular: {
		type: Number,
		trim: true,
		maxlength: [20, "celular no puede tener mas de 20 caracteres"],
	},
	telefono: {
		type: Number,
		trim: true,
		maxlength: [20, "telefono no puede tener mas de 20 caracteres"],
	},
	email: {
		type: String,
		trim: true,
		maxlength: [50, "email no puede tener mas de 50 caracteres"],
	},
	condicion_iva: {
		type: String,
		trim: true,
		maxlength: [50, "condicion_iva no puede tener mas de 20 caracteres"],
	},
	domicilio: {
		calle: {
			type: String,
			trim: true,
			maxlength: [50, "calle no puede tener mas de 50 caracteres"],
		},
		altura: {
			type: Number,
			trim: true,
			maxlength: [6, "altura no puede tener mas de 50 caracteres"],
		},
		piso: {
			type: Number,
			trim: true,
			maxlength: [3, "piso no puede tener mas de 3 caracteres"],
		},
		dpto: {
			type: String,
			trim: true,
			maxlength: [3, "dpto no puede tener mas de 3 caracteres"],
		},
		localidad: {
			type: String,
			trim: true,
			maxlength: [50, "localidad no puede tener mas de 10 caracteres"],
		},
	},
	propiedades: [
		{
			type: mongoose.Schema.ObjectId,
			ref: "Propiedad",
		},
	],
});

module.exports = mongoose.model("Cliente", ClienteSchema);
