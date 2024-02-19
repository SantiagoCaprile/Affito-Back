const mongoose = require("mongoose");
const EstadoPropiedad = require("../enums/EstadoPropiedad");
const Monedas = require("../enums/Monedas");

const PropiedadSchema = new mongoose.Schema({
	descripcion: {
		type: String,
		trim: true,
		maxlength: [150, "Name cannot be more than 150 characters"],
	},
	dimension: {
		type: Number,
	},
	tipo: {
		type: String,
		required: [true, "Por favor ingrese un tipo de propiedad"],
		trim: true,
		maxlength: [30, "tipo no puede tener mas de 30 caracteres"],
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
			maxlength: [50, "localidad no puede tener mas de 30 caracteres"],
		},
	},
	propietario: {
		required: [true, "Por favor ingrese un propietario"],
		type: mongoose.Types.ObjectId,
		ref: "Cliente",
	},
	contratos: [
		{
			type: mongoose.Types.ObjectId,
			ref: "Contrato",
		},
	],
	estado: {
		type: String,
		trim: true,
		maxlength: [20, "estado no puede tener mas de 20 caracteres"],
		default: EstadoPropiedad.DISPONIBLE,
		enum: [
			EstadoPropiedad.DISPONIBLE,
			EstadoPropiedad.ALQUILADA,
			EstadoPropiedad.RESERVADA,
		],
	},
	operaciones: [
		{
			moneda: {
				type: String,
				trim: true,
				maxlength: [3, "moneda no puede tener mas de 3 caracteres"],
				default: Monedas.PESOS,
				enum: [Monedas.PESOS, Monedas.DOLAR, Monedas.EURO],
			},
			monto: {
				type: Number,
			},
			tipo: {
				type: String,
				trim: true,
				maxlength: [20, "operacion no puede tener mas de 20 caracteres"],
				enum: ["Venta", "Alquiler"],
			},
			observaciones: {
				type: String,
				trim: true,
				maxlength: [150, "observacion no puede tener mas de 150 caracteres"],
			},
			fecha: {
				type: Date,
				default: Date.now(),
			},
		},
	],
	ubicacion: {
		lat: {
			type: Number,
		},
		lng: {
			type: Number,
		},
	},
});

PropiedadSchema.post("save", async function (doc, next) {
	if (doc.propietario) {
		try {
			await mongoose
				.model("Cliente")
				.findByIdAndUpdate(
					doc.propietario,
					await mongoose
						.model("Cliente")
						.findOneAndUpdate(
							{ _id: doc.propietario },
							{ $push: { propiedades: doc._id } },
							{ upsert: true, new: true, useFindAndModify: false }
						)
				);
		} catch (err) {
			next(err);
		}
	}

	next();
});

module.exports = mongoose.model("Propiedad", PropiedadSchema);
