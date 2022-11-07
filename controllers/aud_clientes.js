const aud_Cliente = require('../models/aud_Cliente');

exports.addAudCliente = async (req, res, next) => {
    try {
        const aud_cliente = await aud_Cliente.create(req.body);
        return res.status(201).json({
            success: true,
            data: aud_cliente
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Server Error'
        });
    }
};