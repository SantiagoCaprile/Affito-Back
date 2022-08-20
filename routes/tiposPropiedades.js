const express = require('express');
const { getTipoPropiedad, getTipoPropiedadById } = require('../controllers/tipoPropiedades');

const router = express.Router();

//solo tiene get porque van a estar cargados en la base de datos
router.route('/').get(getTipoPropiedad);
router.route('/:_id').get(getTipoPropiedadById);

module.exports = router;