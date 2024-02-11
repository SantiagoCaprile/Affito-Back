const Propiedad = require("../models/Propiedad");

exports.getPropiedades = async (req, res, next) => {
	try {
		const propiedades = await Propiedad.find();

		return res.status(200).json({
			success: true,
			count: propiedades.length,
			data: propiedades,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: "Server Error",
		});
	}
};

exports.addPropiedad = async (req, res, next) => {
	try {
		const propiedades = await Propiedad.create(req.body);
		return res.status(201).json({
			success: true,
			data: propiedades,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: "Server Error",
		});
	}
};

exports.getPropiedad = async (req, res, next) => {
	try {
		const prop = await Propiedad.findOne({ _id: req.params.id });
		if (!prop) {
			return res.status(404).json({
				success: false,
				error: "Propiedad not found",
			});
		}
		return res.status(200).json({
			success: true,
			data: prop,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: "Server Error",
		});
	}
};

exports.updatePropiedad = async (req, res, next) => {
	try {
		const prop = await Propiedad.findOneAndUpdate(
			{ _id: req.params.id },
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);

		if (!prop) {
			return res.status(404).json({
				success: false,
				error: "Propiedad not found",
			});
		}

		return res.status(200).json({
			success: true,
			data: prop,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: "Server Error",
		});
	}
};

exports.addOperacion = async (req, res, next) => {
	try {
		const prop = await Propiedad.findOne({ _id: req.params.id });
		if (!prop) {
			return res.status(404).json({
				success: false,
				error: "Propiedad not found",
			});
		}
		prop.operaciones.push(req.body);
		await prop.save();
		return res.status(201).json({
			success: true,
			data: prop,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: "Server Error",
		});
	}
};

exports.editOperacion = async (req, res, next) => {
	try {
		const prop = await Propiedad.findOne({ _id: req.params.id });
		if (!prop) {
			return res.status(404).json({
				success: false,
				error: "Propiedad not found",
			});
		}
		const operation = prop.operaciones.id(req.params.idOperacion);
		if (!operation) {
			return res.status(404).json({
				success: false,
				error: "Operacion not found",
			});
		}
		operation.set(req.body);
		await prop.save();
		return res.status(200).json({
			success: true,
			data: prop,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: "Server Error",
		});
	}
};

exports.deleteOperacion = async (req, res, next) => {
	try {
		const prop = await Propiedad.findOne({ _id: req.params.id });
		if (!prop) {
			return res.status(404).json({
				success: false,
				error: "Propiedad not found",
			});
		}
		const operation = prop.operaciones.id(req.params.idOperacion);
		if (!operation) {
			return res.status(404).json({
				success: false,
				error: "Operacion not found",
			});
		}
		operation.remove();
		await prop.save();
		return res.status(200).json({
			success: true,
			data: prop,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: "Server Error",
		});
	}
};
