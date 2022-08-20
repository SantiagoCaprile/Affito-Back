const mongoose = require('mongoose');

const TipoPropiedadSchema = new mongoose.Schema({
    cod_tipo_prop: {
        type: String,
        required: [true, 'Por favor ingrese un código de tipo de propiedad'],
        unique: true,
        trim: true,
        maxlength: [10, 'cod_tipo_prop no puede tener mas de 10 caracteres'],
    },
    tipo: {
        type: String,
        required: [true, 'Por favor ingrese un tipo de propiedad'],
        trim: true,
        maxlength: [30, 'tipo no puede tener mas de 30 caracteres'],
    }
});

module.exports = mongoose.model('TipoPropiedad', TipoPropiedadSchema);