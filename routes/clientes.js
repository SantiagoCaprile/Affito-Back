const express = require('express');
const { getClientes, addCliente, getCliente, updateCliente } = require('../controllers/clientes');

const router = express.Router();

router.route('/').get(getClientes).post(addCliente);
router.route('/:id').get(getCliente);
router.route('/:id').put(updateCliente);

module.exports = router;