const express = require('express');
const { addPago,getPago } = require('../controllers/pagos');

const router = express.Router();

router.route('/').post(addPago);
router.route('/:id').get(getPago);


module.exports = router;