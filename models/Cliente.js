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
			id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Propiedad",
			},
			rol: {
				type: String,
				enum: ["Propietario", "Locatario", "Garante"],
				default: "Propietario",
			},
		},
	],
});

ClienteSchema.statics.roles = {
	PROPIETARIO: "Propietario",
	LOCATARIO: "Locatario",
	GARANTE: "Garante",
};

//Schema para auditoria de clientes, tiene todos los campos del mismo y ademas el campo accion y el usuario que realizo la accion
const ClienteAuditoriaSchema = new mongoose.Schema({
	...Object.fromEntries(
		Object.entries(ClienteSchema.obj).filter(([key, value]) => key !== "cuit")
	),
	cuit: {
		type: String,
		unique: false,
	},
	clienteId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Cliente",
	},
	accion: {
		type: String,
		enum: ["Creación", "Actualización datos", "Propiedad agregada"],
	},
	usuario: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Usuario",
	},
	fecha: {
		type: Date,
		default: Date.now,
	},
});

ClienteAuditoriaSchema.statics.acciones = {
	CREACION: "Creación",
	ACTUALIZACION: "Actualización datos",
	PROPIEDAD_AGREGADA: "Propiedad agregada",
};

ClienteAuditoriaSchema.methods.createAuditoria = async function (
	clienteId,
	userId,
	accion
) {
	const cliente = await this.model("Cliente").findById(clienteId);
	this.clienteId = cliente._id;
	this.usuario = userId;
	this.cuit = cliente.cuit;
	this.nombre_razon_social = cliente.nombre_razon_social;
	this.celular = cliente.celular;
	this.telefono = cliente.telefono;
	this.email = cliente.email;
	this.condicion_iva = cliente.condicion_iva;
	this.domicilio = cliente.domicilio;
	this.propiedades = cliente.propiedades;
	this.accion = accion;
	await this.save();
};

ClienteSchema.methods.addPropiedad = async function (propiedadId, rol, userId) {
	if (!this.propiedades || this.propiedades === undefined) {
		this.propiedades = [];
	}
	if (this.propiedades.some((prop) => prop.id === propiedadId)) {
		return;
	}
	this.propiedades.push({ id: propiedadId, rol: rol });
	await this.save();
	if (userId) {
		const clienteId = this._id;
		const auditoriaCliente = new mongoose.model("ClienteAuditoria")();
		await auditoriaCliente.createAuditoria(
			clienteId,
			userId,
			"Propiedad agregada"
		);
	}
};

module.exports = mongoose.model("Cliente", ClienteSchema);
module.exports.ClienteAuditoria = mongoose.model(
	"ClienteAuditoria",
	ClienteAuditoriaSchema
);
