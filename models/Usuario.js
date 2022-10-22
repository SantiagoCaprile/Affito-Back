const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'Por favor ingrese un nombre de usuario'],
        unique: true,
        trim: true,
        maxlength: [50, 'Nombre no puede tener mas de 50 caracteres'],
    },
    password: {
        type: String,
        required: [true, 'Por favor ingrese una contraseña'],
        trim: true,
        maxlength: [50, 'Contraseña no puede tener mas de 50 caracteres'],
    },
});

module.exports = mongoose.model('Usuario', UsuarioSchema);