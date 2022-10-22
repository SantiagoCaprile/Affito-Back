const express = require('express');
const { addUsuario, updateUsuario, validateUsuario } = require('../controllers/usuarios');

const router = express.Router();

router.route('/nuevo').post(addUsuario);
// router.route('/:').put(updateUsuario);
router.route('/').post(validateUsuario);

module.exports = router;