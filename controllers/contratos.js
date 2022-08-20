const Contrato = require('../models/Contrato');

exports.addContrato = async (req, res, next) => {
    try {
        const contrato = await Contrato.create(req.body);
        return res.status(201).json({
            success: true,
            data: contrato
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            error: 'Server Error'
        });
    }
};

exports.getContrato = async (req, res, next) => {
    try {
        const contrato = await Contrato.findOne({ cod_contrato: req.params.id });
        if (!contrato) {
            return res.status(404).json({
                success: false,
                error: 'Contrato not found'
            });
        }
        return res.status(200).json({
            success: true,
            data: contrato
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            error: 'Server Error'
        });
    }
};