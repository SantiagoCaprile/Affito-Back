const TipoPropiedad = require('../models/TipoPropiedad');

exports.getTipoPropiedad = async (req, res, next) => {
    try {
        const tipo = await TipoPropiedad.findOne({ cod_tipo_prop: req.params.id });
        if (!tipo) {
            return res.status(404).json({
                success: false,
                error: 'Tipo de propiedad not found'
            });
        }
        return res.status(200).json({
            success: true,
            data: tipo
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            error: 'Server Error'
        });
    }
};

exports.getTipoPropiedadById = async (req, res, next) => {
    try {
        const tipo = await TipoPropiedad.findById(req.params._id);
        if (!tipo) {
            return res.status(404).json({
                success: false,
                error: 'Tipo de propiedad not found'
            });
        }
        return res.status(200).json({
            success: true,
            data: tipo
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Server Error'
        });
    }
}


// creando Tipos de Propiedades a mano
// const tipo = {
//     cod_tipo_prop: 3,
//     tipo: 'Cochera',
// }
// addtipoPropiedad = async () => {
//         const tipoPropiedad = await TipoPropiedad.create(tipo);
// }
// addtipoPropiedad();