const Propiedad = require("../models/Propiedad");
const EstadoPropiedad = require("../enums/EstadoPropiedad");
const Cliente = require("../models/Cliente");

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
		const propiedad = await Propiedad.create(req.body);
		Cliente.findById(req.body.propietario, (err, cliente) => {
			if (err) {
				console.log(err);
			} else {
				cliente.addPropiedad(propiedad._id, "Propietario", req.body.usuario);
			}
		});
		return res.status(201).json({
			success: true,
			data: propiedad,
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
		const prop = await Propiedad.findOne({ _id: req.params.id })
			.populate("senias")
			.populate({
				path: "senias",
				populate: {
					path: "cliente",
					model: "Cliente",
					select: "nombre_razon_social cuit",
				},
			});
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
		prop.chequearSiEsBuscada(); //verifica todas las busquedas para ver si la propiedad cumple con alguna
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

exports.AlquilarPropiedad = async (prop, contratoId) => {
	try {
		prop.estado = EstadoPropiedad.ALQUILADA;
		prop.contratos.push(contratoId);
		prop.senias = prop.senias.map((senia) => {
			senia.vigente = false;
			return senia;
		});
		prop.operaciones = prop.operaciones.filter(
			(operacion) => operacion.tipo !== "Alquiler"
		);
		await prop.save();
	} catch (error) {
		console.error(error);
	}
};

exports.getContratos = async (req, res, next) => {
	try {
		const prop = await Propiedad.findOne({ _id: req.params.id }).populate(
			"contratos"
		);
		if (!prop) {
			return res.status(404).json({
				success: false,
				error: "Propiedad not found",
			});
		}
		return res.status(200).json({
			success: true,
			data: prop.contratos,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: "Server Error",
		});
	}
};
