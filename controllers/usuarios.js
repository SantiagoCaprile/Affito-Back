const Usuario = require("../models/Usuario");

exports.addUsuario = async (req, res, next) => {
  try {
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
    req.body.password =
      req.body.password !== null
        ? await Usuario.prototype.encryptPassword(req.body.password)
        : null;
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
      });
    }
    const autorizado = await usuario.comparePassword(req.body.password);
    return res.status(200).json({
      success: true,
      valid: autorizado,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Server Error",
    });
  }
};
