const express = require('express');
const { getPropiedades, addPropiedad, getPropiedad, updatePropiedad } = require('../controllers/propiedades');

const router = express.Router();

router.route('/').get(getPropiedades).post(addPropiedad);
router.route('/:id').get(getPropiedad).put(updatePropiedad);

module.exports = router;