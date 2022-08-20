const mongoose = require('mongoose');

const LocalidadSchema = new mongoose.Schema({
    cod_postal: {
        type: String,
        required: [true, 'Por favor ingrese un código postal'],
        unique: true,
        trim: true,
        maxlength: [10, 'cod_postal no puede tener mas de 10 caracteres'],
    },
    nombre: {
        type: String,
        required: [true, 'Por favor ingrese un nombre de localidad'],
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters'],
    },
});

module.exports = mongoose.model('Localidad', LocalidadSchema);