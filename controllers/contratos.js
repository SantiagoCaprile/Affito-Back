const Contrato = require("../models/Contrato");
const Propiedad = require("../models/Propiedad");
const Cliente = require("../models/Cliente");
const EstadoPropiedad = require("../enums/EstadoPropiedad");
const EstadoContratos = require("../enums/EstadoContratos");
const { AlquilarPropiedad } = require("./propiedades");

// crear un contrato y pushea en contratos de la propiedad correspondiente
exports.addContrato = async (req, res, next) => {
	const propiedad = await Propiedad.findById(req.body.propiedad).populate(
		"senias"
	);
	const locatario = await Cliente.findById(req.body.locatario);
	const garantes = await Cliente.find({ _id: { $in: req.body.garantes } });
	if (!propiedad) {
		return res.status(404).json({
			success: false,
			error: "Propiedad not found or not available",
		});
	}
	if (!locatario) {
		return res.status(404).json({
			success: false,
			error: "Locatario not found",
		});
	}
	if (propiedad.estado === EstadoPropiedad.ALQUILADA) {
		return res.status(400).json({
			success: false,
			error: "Propiedad not available",
		});
	}
	if (propiedad.propietario === locatario._id) {
		return res.status(400).json({
			success: false,
			error: "El propietario no puede ser locatario",
		});
	}
	if (req.body.garantes.some((garante) => garante === propiedad.propietario)) {
		return res.status(400).json({
			success: false,
			error: "El propietario no puede ser garante",
		});
	}
	try {
		const contrato = await Contrato.create(req.body);
		await AlquilarPropiedad(propiedad, contrato._id);
		locatario.addPropiedad(propiedad._id, Cliente.roles.LOCATARIO);
		garantes.forEach((garante) => {
			garante.addPropiedad(propiedad._id, Cliente.roles.GARANTE);
		});
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
		const contrato = await Contrato.findById(req.params.id)
			.populate("propiedad")
			.populate({
				path: "propiedad",
				populate: {
					path: "propietario",
					model: "Cliente",
				},
			})
			.populate("locatario")
			.populate("garantes")
			.populate("pagos");

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

exports.editContrato = async (req, res, next) => {
	try {
		const contrato = await Contrato.findByIdAndUpdate(
			{ _id: req.params.id },
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);
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

exports.rescindirContrato = async (req, res, next) => {
	try {
		const contrato = await Contrato.findById(req.params.id);
		if (!contrato) {
			return res.status(404).json({
				success: false,
				error: "Contrato not found",
			});
		}
		if (contrato.estado === EstadoContratos.RESCINDIDO) {
			return res.status(400).json({
				success: false,
				error: "Contrato already rescinded",
			});
		}
		if (contrato.saldo < 0) {
			return res.status(400).json({
				success: false,
				error: "Contrato has pending payments",
			});
		}
		contrato.estado = EstadoContratos.RESCINDIDO;
		contrato.fecha_notificacion_fehaciente = new Date();
		await contrato.save();
		return res.status(200).json({
			success: true,
			data: "Contrato rescindido",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: "Server Error",
		});
	}
};

exports.revivirContrato = async (req, res, next) => {
	try {
		const contrato = await Contrato.findById(req.params.id);
		if (!contrato) {
			return res.status(404).json({
				success: false,
				error: "Contrato not found",
			});
		}
		if (contrato.estado !== EstadoContratos.RESCINDIDO) {
			return res.status(400).json({
				success: false,
				error: "Contrato is not rescinded",
			});
		}
		contrato.estado = EstadoContratos.VIGENTE;
		contrato.fecha_notificacion_fehaciente = null;
		contrato.fecha_fin = req.body.fecha_fin;
		await contrato.save();
		return res.status(200).json({
			success: true,
			data: "Contrato revived",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: "Server Error",
		});
	}
};
