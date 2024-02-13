const Contrato = require("../models/Contrato");
const Propiedad = require("../models/Propiedad");
const EstadoPropiedad = require("../enums/EstadoPropiedad");
const { AlquilarPropiedad } = require("./propiedades");

// crear un contrato y pushea en contratos de la propiedad correspondiente
exports.addContrato = async (req, res, next) => {
	const propiedad = await Propiedad.findById(req.body.propiedad);
	if (!propiedad || propiedad.estado !== EstadoPropiedad.DISPONIBLE) {
		return res.status(404).json({
			success: false,
			error: "Propiedad not found or not available",
		});
	}
	try {
		const contrato = await Contrato.create(req.body);
		await AlquilarPropiedad(propiedad, contrato._id);
		return res.status(201).json({
			success: true,
			data: contrato,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: "Server Error",
		});
	}
};

exports.getContrato = async (req, res, next) => {
	try {
		const contrato = await Contrato.findById(req.params.id);
		if (!contrato) {
			return res.status(404).json({
				success: false,
				error: "Contrato not found",
			});
		}
		return res.status(200).json({
			success: true,
			data: contrato,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: "Server Error",
		});
	}
};
