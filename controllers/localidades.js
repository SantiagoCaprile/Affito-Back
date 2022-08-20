const Localidad = require('../models/Localidad');

// @desc Get all Localidades/
// @route GET /api/v1/localidades
// @access Public

exports.getLocalidades = async (req, res, next) => {
    try {
        const localidades = await Localidad.find();

        return res.status(200).json({
            success: true,
            count: localidades.length,
            data: localidades
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Server Error'
        });
    }
};

// @desc create a localidad
// @route POST /api/v1/localidades
// @access Public

exports.addLocalidad = async (req, res, next) => {
    try {
        const localidad = await Localidad.create(req.body);
        return res.status(201).json({
            success: true,
            data: localidad 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            error: 'Server Error'
        });
    }
};

// @desc GET a localidad
// @route GET /api/v1/localidades/:id
// @access Public

exports.getLocalidad = async (req, res, next) => {
    try {
        const localidad = await Localidad.findOne({ cod_postal: req.params.id });
        if (!localidad) {
            return res.status(404).json({
                success: false,
                error: 'Localidad not found'
            });
        }
        return res.status(200).json({
            success: true,
            id: localidad._id,
            cod_postal: localidad.cod_postal,
            nombre: localidad.nombre
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            error: 'Server Error'
        });
    }
};


const crearLocalidad = (cod, nombre_loc) => {
    Localidad.create(
        {
            cod_postal: cod,
            nombre: nombre_loc
        }
    )
}
//crearLocalidad("3500", "Resistencia");

const editarLocalidad = async () => {
    try {
        const resultado = await Localidad.updateOne(
            { cod_postal: '3100' },
            { $set: { nombre: 'Paraná' } }
        )
        console.log('***** RESULTADO EDITADO *****', resultado);
    } catch (error) {
        console.error(error);
    }
   
}
//editarLocalidad();