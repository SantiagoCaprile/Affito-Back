const express = require('express');
const { addAudCliente } = require('../controllers/aud_clientes');

const router = express.Router();

router.route('/').post(addAudCliente);

module.exports = router;