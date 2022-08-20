const mongoose = require('mongoose');

const MonedaSchema = new mongoose.Schema({
    cod_moneda: {
        type: String,
        required: [true, 'Por favor ingrese un código de moneda'],
        unique: true,
        trim: true,
        maxlength: [5, 'cod_moneda no puede tener mas de 5 caracteres'],
    },
    nombre: {
        type: String,
        required: [true, 'Por favor ingrese un nombre de moneda'],
        trim: true,
        maxlength: [30, 'nombre no puede tener mas de 30 caracteres'],
    },
    simbolo: {
        type: String,
        required: [true, 'Por favor ingrese un símbolo de moneda'],
        trim: true,
        maxlength: [5, 'simbolo no puede tener mas de 5 caracteres'],
    },
    cotizacionPeso: {
        type: Number,
        default: 1,
    }
});

module.exports = mongoose.model('Moneda', MonedaSchema);