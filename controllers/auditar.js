const ClienteAuditoriaSchema = require("../models/Cliente").ClienteAuditoria;

exports.getLogsClientes = async (req, res, next) => {
	try {
		const logs = await ClienteAuditoriaSchema.find().populate({
			path: "usuario",
			model: "Usuario",
			select: "nombre rol",
		});
		logs.reverse();
		return res.status(200).json({
			success: true,
			count: logs.length,
			data: logs,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: "Server Error",
		});
	}
};

exports.getLogsByCliente = async (req, res, next) => {
	try {
		const logs = await ClienteAuditoriaSchema.find({
			clienteId: req.params.id,
		}).populate({
			path: "usuario",
			model: "Usuario",
			select: "nombre rol",
		});
		logs.reverse();
		return res.status(200).json({
			success: true,
			count: logs.length,
			data: logs,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: "Server Error",
		});
	}
};

exports.getLogClienteById = async (req, res, next) => {
	try {
		const log = await ClienteAuditoriaSchema.findOne({
			_id: req.params.logId,
		})
			.populate({
				path: "usuario",
				model: "Usuario",
				select: "nombre rol",
			})
			.populate({
				path: "propiedades",
				populate: {
					path: "id",
					model: "Propiedad",
					select: "_id tipo domicilio estado",
				},
			});
		if (!log) {
			return res.status(404).json({
				success: false,
				error: "Log not found",
			});
		}
		return res.status(200).json({
			success: true,
			data: log,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: "Server Error",
		});
	}
};
