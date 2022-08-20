const express = require('express');
const { getDomicilios,addDomicilio } = require('../controllers/domicilios');

const router = express.Router();

router.route('/').get(getDomicilios).post(addDomicilio);

module.exports = router;