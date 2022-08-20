const Pago = require('../models/Pago');

exports.addPago = async (req, res, next) => {
    try {
        const pago = await Pago.create(req.body);
        return res.status(201).json({
            success: true,
            data: pago
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            error: 'Server Error'
        });
    }
};

exports.getPago = async (req, res, next) => {
    try {
        const pago = await Pago.findOne({ cod_pago: req.params.id });
        if (!pago) {
            return res.status(404).json({
                success: false,
                error: 'Pago not found'
            });
        }
        return res.status(200).json({
            success: true,
            id: pago._id,
            cod_pago: pago.cod_pago,
            fecha: pago.fecha,
            monto: pago.monto,
            moneda: pago.moneda.json().nombre,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            error: 'Server Error'
        });
    }
};