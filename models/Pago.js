const mongoose = require("mongoose");
const Monedas = require("../enums/Monedas");
const EstadoPropiedad = require("../enums/EstadoPropiedad");
const EstadoContratos = require("../enums/EstadoContratos");

const PagoSchema = new mongoose.Schema(
	{
		fecha: {
			type: Date,
			required: [true, "Por favor ingrese una fecha"],
			default: Date.now,
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
			enum: Object.values(Monedas),
		},
		cliente: {
			type: mongoose.Types.ObjectId,
			ref: "Cliente",
			required: [true, "Por favor ingrese un cliente"],
		},
	},
	{
		timestamps: true,
	}
);

const SeniaSchema = new mongoose.Schema({
	...PagoSchema.obj,
	propiedad: {
		type: mongoose.Types.ObjectId,
		ref: "Propiedad",
		required: [true, "Por favor ingrese una propiedad"],
	},
	validaHasta: {
		type: Date,
		required: [true, "Por favor ingrese una fecha de vencimiento"],
	},
	vigente: {
		type: Boolean,
		default: true,
	},
});

SeniaSchema.post("updateOne", async function (next) {
	const Propiedad = require("./Propiedad");
	const propiedad = await Propiedad.findById(this.propiedad);
	if (!this.vigente && propiedad.estado === EstadoPropiedad.RESERVADA) {
		Propiedad.updateOne(
			{ _id: this.propiedad },
			{ estado: EstadoPropiedad.DISPONIBLE }
		);
	}
	next();
});

SeniaSchema.pre("save", async function (next) {
	const isCreate = this.isNew;

	this.vigente = this.validaHasta > Date.now();
	const Propiedad = require("./Propiedad");
	const propiedad = await Propiedad.findById(this.propiedad);
	if (isCreate) {
		if (propiedad.estado === EstadoPropiedad.DISPONIBLE) {
			if (!propiedad.senias) {
				propiedad.senias = [];
			}
			propiedad.senias.push(this);
			propiedad.estado = EstadoPropiedad.RESERVADA;
			await propiedad.save().catch((err) => {
				console.error(err);
			});
			next();
		} else {
			const error = new Error("La propiedad no está disponible");
			error.status = 400;
			next(error);
		}
	}
	next();
});

SeniaSchema.post("save", async function (doc, next) {
	if (!doc.vigente) {
		const Propiedad = require("./Propiedad");
		const propiedad = await Propiedad.findById(doc.propiedad);
		if (propiedad.estado === EstadoPropiedad.RESERVADA) {
			propiedad.estado = EstadoPropiedad.DISPONIBLE;
			await propiedad
				.save()
				.then(() => {
					next();
				})
				.catch((err) => {
					throw new Error("Error al guardar la propiedad", err);
					next(err);
				});
		}
	}
	next();
});

const PagoContratoSchema = new mongoose.Schema({
	...PagoSchema.obj,
	contrato: {
		type: mongoose.Types.ObjectId,
		ref: "Contrato",
		required: [true, "Por favor ingrese un contrato"],
	},
});

PagoContratoSchema.post("save", async function () {
	const Contrato = require("./Contrato");
	try {
		await Contrato.updateOne(
			{ _id: this.contrato },
			{
				$push: { pagos: this._id },
				$inc: { saldo: this.monto },
			}
		);
	} catch (err) {
		console.error(err);
	}
});

module.exports = {
	Pago: mongoose.model("Pago", PagoSchema),
	Senia: mongoose.model("Senia", SeniaSchema),
	PagoContrato: mongoose.model("PagoContrato", PagoContratoSchema),
};
