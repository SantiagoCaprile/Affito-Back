const mongoose = require('mongoose');

const PropiedadSchema = new mongoose.Schema({
    descripcion: {
        type: String,
        trim: true,
        maxlength: [150, 'Name cannot be more than 150 characters'],
    },
    dimension: {
        type: Number,
    },
    tipo: {
        type: String,
        required: [true, 'Por favor ingrese un tipo de propiedad'],
        trim: true,
        maxlength: [30, 'tipo no puede tener mas de 30 caracteres'],
    },
    domicilio: {
        calle:{
            type: String,
            trim: true,
            maxlength: [50, 'calle no puede tener mas de 50 caracteres'],
        },
        altura:{
            type: Number,
            trim: true,
            maxlength: [6, 'altura no puede tener mas de 50 caracteres']},
        piso:{
            type: Number,
            trim: true,
            maxlength: [3, 'piso no puede tener mas de 3 caracteres']
        },
        dpto:{
            type: String,
            trim: true,
            maxlength: [3, 'dpto no puede tener mas de 3 caracteres']
        },
        localidad:{
            type: String,
            trim: true,
            maxlength: [30, 'localidad no puede tener mas de 30 caracteres']
        }
    },
    propietario: {
        type: mongoose.Types.ObjectId,
        ref: 'Cliente',
    },
    contrato: [{
        type: mongoose.Types.ObjectId,
        ref: 'Contrato',
    }],
    estado: {
        type: String,
        trim: true,
        maxlength: [20, 'estado no puede tener mas de 20 caracteres'],
        default: 'Disponible',
    },
    precio: {
        type: Number,
        default: 0,
    },
    moneda: {
        type: String,
        trim: true,
        maxlength: [3, 'moneda no puede tener mas de 3 caracteres'],
        default: 'ARS',
    },
});

module.exports = mongoose.model('Propiedad', PropiedadSchema);