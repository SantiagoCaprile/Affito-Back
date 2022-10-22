const express = require('express');
const { getClientes, addCliente, getCliente, updateCliente, filterClientes } = require('../controllers/clientes');

const router = express.Router();

router.route('/').get(getClientes).post(addCliente);
router.route('/:id').get(getCliente);
router.route('/:id').put(updateCliente);
router.route('/filtro').post(filterClientes);

module.exports = router;