const Domicilio = require('../models/Domicilio');
const Propiedad = require('../models/Propiedad');

exports.getPropiedades = async (req, res, next) => {
    try {
        const propiedades = await Propiedad.find();

        return res.status(200).json({
            success: true,
            count: propiedades.length,
            data: propiedades
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Server Error'
        });
    }
};

exports.addPropiedad = async (req, res, next) => {
    try {
        const propiedades = await Propiedad.create(req.body);
        return res.status(201).json({
            success: true,
            data: propiedades 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            error: 'Server Error'
        });
    }
};

exports.getPropiedad = async (req, res, next) => {
    try {
        const prop = await Propiedad.findOne({ cod_prop: req.params.id });
        if (!prop) {
            return res.status(404).json({
                success: false,
                error: 'Propiedad not found'
            });
        }
        return res.status(200).json({
            success: true,
            data: prop
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            error: 'Server Error'
        });
    }
};

// const p = {
//     cod_prop: 2,
//     descripcion: 'Hermoso dpto en el quinto piso',
//     dimension: '64',
//     tipo: "62c0cf4f183797acd1b90e70",
    // domicilio: "62c0d10d02a16f20866065c2",
// }
// crearPropiedad = async () => {
//         await Propiedad.create(p);
// }
// crearPropiedad();