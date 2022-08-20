const express = require('express');
const { getClientes, addCliente, getCliente } = require('../controllers/clientes');

const router = express.Router();

router.route('/').get(getClientes).post(addCliente);
router.route('/:id').get(getCliente);

module.exports = router;