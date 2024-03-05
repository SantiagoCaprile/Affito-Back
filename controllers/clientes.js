const Cliente = require("../models/Cliente");
const ClienteAuditoriaSchema = require("../models/Cliente").ClienteAuditoria;

exports.getClientes = async (req, res, next) => {
	try {
		const clientes = await Cliente.find();

		return res.status(200).json({
			success: true,
			count: clientes.length,
			data: clientes,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: "Server Error",
		});
	}
};

exports.addCliente = async (req, res, next) => {
	try {
		const cliente = await Cliente.create(req.body);
		const auditoriaCliente = new ClienteAuditoriaSchema();
		await auditoriaCliente.createAuditoria(
			cliente._id,
			req.body.usuario,
			ClienteAuditoriaSchema.acciones.CREACION
		);
		return res.status(201).json({
			success: true,
			data: cliente,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: "Server Error",
		});
	}
};

exports.getCliente = async (req, res, next) => {
	try {
		const cliente = await Cliente.findOne({ cuit: req.params.id }).populate({
			path: "propiedades",
			populate: {
				path: "id",
				model: "Propiedad",
				select: "_id tipo domicilio estado",
			},
		});
		if (!cliente) {
			return res.status(404).json({
				success: false,
				error: "Cliente not found",
			});
		}
		return res.status(200).json({
			success: true,
			data: cliente,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: "Server Error",
		});
	}
};

exports.updateCliente = async (req, res, next) => {
	try {
		const auditoriaCliente = new ClienteAuditoriaSchema();
		const clienteId = await Cliente.findOne({ cuit: req.params.id });
		if (!clienteId) {
			return res.status(404).json({
				success: false,
				error: "Cliente not found",
			});
		}
		await auditoriaCliente.createAuditoria(
			clienteId._id,
			req.body.usuario,
			ClienteAuditoriaSchema.acciones.ACTUALIZACION
		);
		const cliente = await Cliente.findOneAndUpdate(
			{ cuit: req.params.id },
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);
		if (!cliente) {
			//delete the last created auditoria
			await ClienteAuditoriaSchema.findOneAndDelete({
				_id: auditoriaCliente._id,
			});
			return res.status(404).json({
				success: false,
				error: "Cliente not found",
			});
		}
		return res.status(200).json({
			success: true,
			data: cliente,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: "Server Error",
		});
	}
};

exports.filterClientes = async (req, res, next) => {
	try {
		const clientes = await Cliente.find({
			$and: [
				{ cuit: { $regex: req.body.cuit } },
				{ nombre_razon_social: { $regex: req.body.nombre, $options: "i" } },
			],
		});
		return res.status(200).json({
			success: true,
			count: clientes.length,
			data: clientes,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: "Server Error",
		});
	}
};
