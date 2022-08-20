const Cliente = require('../models/Cliente');

exports.getClientes = async (req, res, next) => {
    try {
        const clientes = await Cliente.find();

        return res.status(200).json({
            success: true,
            count: clientes.length,
            data: clientes
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Server Error'
        });
    }
};

exports.addCliente = async (req, res, next) => {
    try {
        const cliente = await Cliente.create(req.body);
        return res.status(201).json({
            success: true,
            data: cliente 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            error: 'Server Error'
        });
    }
};

exports.getCliente = async (req, res, next) => {
    try {
        const cliente = await Cliente.findOne({ cuit: req.params.id });
        if (!cliente) {
            return res.status(404).json({
                success: false,
                error: 'Cliente not found'
            });
        }
        return res.status(200).json({
            success: true,
            data: cliente
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            error: 'Server Error'
        });
    }
};