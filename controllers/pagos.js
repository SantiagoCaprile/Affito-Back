// const Pago = require("../models/Pago");
// const Senia = require("../models/Pago");
// const PagoContrato = require("../models/Pago");

const { Senia, PagoContrato } = require("../models/Pago");

exports.createSenia = async (req, res) => {
	try {
		const senia = new Senia(req.body);
		await senia.save();
		res.status(201).json(senia);
	} catch (err) {
		res.status(err.status || 500).json(err);
	}
};

exports.getSenia = async (req, res) => {
	try {
		const senia = await Senia.findById(req.params.id);
		if (!senia) {
			return res.status(404).json({
				success: false,
				error: "Senia not found",
			});
		}
		return res.status(200).json({
			success: true,
			data: senia,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: "Server Error",
		});
	}
};

exports.arrepentirseSenia = async (req, res) => {
	try {
		const senia = await Senia.findById(req.params.id);
		senia.vigente = false;
		senia.validaHasta = new Date();
		await senia.save();
		return res.status(200).json({
			success: true,
			data: "Senia anulada",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: "Server Error",
		});
	}
};

exports.createPagoContrato = async (req, res) => {
	try {
		const pagoContrato = new PagoContrato(req.body);
		await pagoContrato.save();
		res.status(201).json(pagoContrato);
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
};

exports.getPagoContrato = async (req, res) => {
	try {
		const pagoContrato = await PagoContrato.findOne({ _id: req.params.id });
		if (!pagoContrato) {
			return res.status(404).json({
				success: false,
				error: "PagoContrato not found",
			});
		}
		return res.status(200).json({
			success: true,
			data: pagoContrato,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: "Server Error",
		});
	}
};
