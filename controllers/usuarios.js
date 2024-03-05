const Usuario = require("../models/Usuario");

exports.addUsuario = async (req, res, next) => {
	try {
		if (!req.body.password) {
			req.body.password = "1234";
		}
		const usuario = await Usuario.create(req.body);
		return res.status(201).json({
			success: true,
			data: usuario,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: "Server Error",
		});
	}
};

//actualiza la password
exports.updateUsuario = async (req, res, next) => {
	try {
		if (req.body.password) {
			req.body.password = await Usuario.prototype.encryptPassword(
				req.body.password
			);
		}
		const usuario = await Usuario.findOneAndUpdate(
			{ nombre: req.params.nombre },
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);
		if (!usuario) {
			return res.status(404).json({
				success: false,
				error: "Usuario not found",
			});
		}
		return res.status(200).json({
			success: true,
			data: usuario,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: "Server Error",
		});
	}
};

exports.validateUsuario = async (req, res, next) => {
	try {
		const usuario = await Usuario.findOne({ nombre: req.body.nombre });
		if (!usuario) {
			return res.status(401).json({
				success: false,
				valid: false,
				error: "Usuario no encontrado",
			});
		}
		if (!usuario.activo) {
			return res.status(401).json({
				success: false,
				valid: false,
				error: "Usuario inactivo",
			});
		}
		const autorizado = await usuario.comparePassword(req.body.password);
		return res.status(200).json({
			success: true,
			valid: autorizado,
			user: {
				nombre: usuario.nombre,
				rol: usuario.rol,
				id: usuario._id,
			},
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: "Server Error",
		});
	}
};

exports.getUsuarios = async (req, res, next) => {
	try {
		const usuarios = await Usuario.find();
		return res.status(200).json({
			success: true,
			data: usuarios,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: "Server Error",
		});
	}
};

exports.restartPassword = async (req, res, next) => {
	try {
		const usuario = await Usuario.findById(req.body.id);
		if (!usuario) {
			return res.status(404).json({
				success: false,
				error: "Usuario not found",
			});
		}
		usuario.password = "1234";
		await usuario.save();
		return res.status(200).json({
			success: true,
			data: usuario,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			error: "Server Error",
		});
	}
};
