const express = require('express');
const { getPropiedades, addPropiedad, getPropiedad } = require('../controllers/propiedades');

const router = express.Router();

router.route('/').get(getPropiedades).post(addPropiedad);
router.route('/:id').get(getPropiedad);

module.exports = router;