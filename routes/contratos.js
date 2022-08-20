const express = require('express');
const { addContrato, getContrato } = require('../controllers/contratos');

const router = express.Router();

router.route('/').post(addContrato);
router.route('/:id').get(getContrato);

module.exports = router;