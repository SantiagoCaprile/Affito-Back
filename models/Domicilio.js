const mongoose = require('mongoose');

const DomicilioSchema = new mongoose.Schema({
    altura: {
        type: Number,
        required: [true, 'Por favor ingrese una altura'],
        trim: true,
        maxlength: [10, 'altura no puede tener mas de 10 caracteres'],
    },
    calle: {
        type: String,
        required: [true, 'Por favor ingrese una calle'],
        trim: true,
        maxlength: [50, 'calle no puede tener mas de 50 caracteres'],
    },
    dpto: {
        type: String,
        trim: true,
        maxlength: [10, 'dpto no puede tener mas de 10 caracteres'],
    },
    piso: {
        type: String,
        trim: true,
        maxlength: [10, 'piso no puede tener mas de 10 caracteres'],
    },
    localidad: {
        type: mongoose.Types.ObjectId,
        ref: 'Localidad',
        required: [true, 'Por favor ingrese una localidad'],
    },
}
);

module.exports = mongoose.model('Domicilio', DomicilioSchema);