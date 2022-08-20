const Moneda = require('../models/Moneda');

exports.getMonedas = async (req, res, next) => {
    try {
        const monedas = await Moneda.find();
        return res.status(200).json({
            success: true,
            count: monedas.length,
            data: monedas
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Server Error'
        });
    }
};

exports.getMoneda = async (req, res, next) => {
    try {
        const moneda = await Moneda.findOne({ cod_moneda: req.params.id });
        if (!moneda) {
            return res.status(404).json({
                success: false,
                error: 'Moneda not found'
            });
        }
        return res.status(200).json({
            success: true,
            data: moneda
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            error: 'Server Error'
        });
    }
};

exports.updateCotizacionMoneda = async (req, res, next) => {
    try {
        const moneda = await Moneda.findOne({ cod_moneda: req.params.id });
        if (!moneda) {
            return res.status(404).json({
                success: false,
                error: 'Moneda not found'
            });
        }
        moneda.cotizacionPeso = req.body.cotizacionPeso;
        console.log('El nuevo valor es? ',req.body.cotizacionPeso);
        await moneda.save();
        return res.status(200).json({
            success: true,
            data: moneda
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Server Error'
        });
    }
}

exports.addMoneda = async (req, res, next) => {
    try {
        const moneda = await Moneda.create(req.body);
        return res.status(201).json({
            success: true,
            data: moneda
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            error: 'Server Error'
        });
    }
};