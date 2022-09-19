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
        const prop = await Propiedad.findOne({ _id: req.params.id });
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