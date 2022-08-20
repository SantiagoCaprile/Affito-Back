const mongoose = require('mongoose');

const PagoSchema = new mongoose.Schema({
    cod_pago: {
        type: String,
        required: [true, 'Por favor ingrese un código de pago'],
        unique: true,
        trim: true,
        maxlength: [10, 'cod_pago no puede tener mas de 10 caracteres'],
    },
    fecha: {
        type: Date,
        required: [true, 'Por favor ingrese una fecha'],
    },
    monto: {
        type: Number,
        required: [true, 'Por favor ingrese un monto'],
    },
    moneda: {
        type: mongoose.Types.ObjectId,
        ref: 'Moneda',
        required: [true, 'Por favor ingrese una moneda'],
    },
    //podria tener el contrato aca
});

module.exports = mongoose.model('Pago', PagoSchema);