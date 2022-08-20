const Domicilio = require('../models/Domicilio');


// @desc Get all Domicilio/
// @route GET /api/v1/domicilios
// @access Public

exports.getDomicilios = async (req, res, next) => {
    try {
        const domicilios = await Domicilio.find();

        return res.status(200).json({
            success: true,
            count: domicilios.length,
            data: domicilios
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Server Error'
        });
    }
};

// @desc create a domicilio
// @route POST /api/v1/domicilios
// @access Public

exports.addDomicilio = async (req, res, next) => {
    try {
        const domicilio = await Domicilio.create(req.body);
        return res.status(201).json({
            success: true,
            data: domicilio
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            error: 'Server Error'
        });
    }
};