const Tasacion = require("../models/Tasacion");

exports.getTasacionesByPropiedad = async (req, res) => {
	try {
		const tasaciones = await Tasacion.find({
			propiedad: req.params.propiedadId,
		}).populate("solicitante");
		res.status(200).json(tasaciones);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

exports.addTasacion = async (req, res) => {
	try {
		const tasacion = new Tasacion(req.body);
		await tasacion.save();
		res.status(201).json(tasacion);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

exports.editTasacion = async (req, res) => {
	try {
		const tasacion = await Tasacion.findByIdAndUpdate(
			req.params.tasacionId,
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);
		res.status(200).json(tasacion);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

exports.deleteTasacion = async (req, res) => {
	try {
		await Tasacion.findByIdAndDelete(req.params.tasacionId);
		res.status(200).json({ message: "Tasacion eliminada" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};
