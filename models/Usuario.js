const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UsuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "Por favor ingrese un nombre de usuario"],
    unique: true,
    trim: true,
    maxlength: [50, "Nombre no puede tener mas de 50 caracteres"],
  },
  password: {
    type: String,
    required: [true, "Por favor ingrese una contraseña"],
    trim: true,
    maxlength: [150, "Contraseña no puede tener mas de 150 caracteres"],
  },
});

UsuarioSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UsuarioSchema.pre("update", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await encryptPassword(this.password);
    }
    next();
  } catch (error) {
    next(error);
  }
});

UsuarioSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await this.encryptPassword(this.password);
    }
    next();
  } catch (error) {
    next(error);
  }
});

UsuarioSchema.methods.comparePassword = async function (password) {
  try {
    if (!this.password) {
      return false;
    }
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = mongoose.model("Usuario", UsuarioSchema);
