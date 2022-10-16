const mongoose = require('mongoose');

const ContratoSchema = new mongoose.Schema({
    destino: {
        type: String,
        required: [true, 'Por favor ingrese un destino'],
        trim: true,
        maxlength: [30, 'destino no puede tener mas de 30 caracteres'],
    },
    estado: {
        type: String,
        default: 'Activo', // Activo, Inactivo (Vigente - Extinto/Rescindido)
    },
    fecha_inicio: {
        type: Date,
        required: [true, 'Por favor ingrese una fecha de inicio'],
    },
    fecha_fin: {
        type: Date,
        required: [true, 'Por favor ingrese una fecha de fin'],
    },
    fecha_entrega_inmueble: {
        type: Date,
    },
    fecha_notificacion_fehaciente: {
        type: Date,
    },
    comision_celebracion: {
        type: Number,
    },
    comision_mensual: {
        type: Number,
    },
    intereses_mora_diaria: {
        type: Number,
        required: [true, 'Por favor ingrese el porcentaje de interes por dia de mora'],
    },
    fecha_proxima_actualizacion: {//fecha de inicio + 1 año, si ya pasó, se le suma otro año hasta que no haya pasado
        type: Date,
        required: [true, 'Por favor ingrese una fecha de proxima actualizacion'],
    },
    monto: {
        type: Number,
        required: [true, 'Por favor ingrese un monto'],
    },
    moneda: {
        type: String,
        ref: 'Moneda',
        required: [true, 'Por favor ingrese una moneda'],
    },
    pagos: [{
        type: mongoose.Types.ObjectId,
        ref: 'Pago',
    }],
    propiedad: {
        type: mongoose.Types.ObjectId,
        ref: 'Propiedad',
        required: [true, 'Por favor ingrese una propiedad'],
    },
    inquilinos: {
            type: mongoose.Types.ObjectId,
            ref: 'Cliente',
            required: [true, 'Por favor ingrese un inquilino'],
    },
    garantes: [{
        type: mongoose.Types.ObjectId,
        ref: 'Cliente',
    }]
});

module.exports = mongoose.model('Contrato', ContratoSchema);