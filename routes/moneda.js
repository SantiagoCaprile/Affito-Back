const express = require('express');
const { addMoneda,getMonedas,getMoneda,updateCotizacionMoneda } = require('../controllers/monedas');

const router = express.Router();

router.route('/').get(getMonedas).post(addMoneda);
// create route to update a moneda by id
router.route('/:id').put(updateCotizacionMoneda);
router.route('/:id').get(getMoneda);


module.exports = router;