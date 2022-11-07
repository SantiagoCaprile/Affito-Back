const mongoose = require('mongoose');

const aud_ClienteSchema = new mongoose.Schema({
    cuit: {
        type: String,        
        trim: true,
        maxlength: [11, 'cuit no puede tener mas de 11 caracteres'],
    },
    nombre_razon_social: {
        type: String,
        trim: true,
        maxlength: [60, 'nombre no puede tener mas de 60 caracteres'],
    },
    celular: {
        type: Number,
        trim: true,
        maxlength: [20, 'celular no puede tener mas de 20 caracteres'],
    },
    telefono: {
        type: Number,
        trim: true,
        maxlength: [20, 'telefono no puede tener mas de 20 caracteres'],
    },
    email: {
        type: String,
        trim: true,
        maxlength: [50, 'email no puede tener mas de 50 caracteres'],
    },
    condicion_iva: {
        type: String,
        trim: true,
        maxlength: [50, 'condicion_iva no puede tener mas de 20 caracteres'],
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
            maxlength: [10, 'localidad no puede tener mas de 10 caracteres']
        }
    },
    accion: {
        type: String,
        trim: true,
        maxlength: [20, 'accion no puede tener mas de 20 caracteres'],
        required: [true, 'Por favor ingrese la accion realizada']
    },
    fecha_accion: {
        type: Date,
        trim: true,
        maxlength: [50, 'fecha_accion no puede tener mas de 50 caracteres'],
        required: [true, 'Ingrese fecha de realizada la accion']
    }
});

module.exports = mongoose.model('aud_Cliente', aud_ClienteSchema);