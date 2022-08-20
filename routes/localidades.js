const express = require('express');
const { getLocalidades,addLocalidad,getLocalidad } = require('../controllers/localidades');

const router = express.Router();

router.route('/').get(getLocalidades).post(addLocalidad);
router.route('/:id').get(getLocalidad);


module.exports = router;