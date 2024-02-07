const express = require("express");
const {
	addUsuario,
	updateUsuario,
	validateUsuario,
	getUsuarios,
	restartPassword,
} = require("../controllers/usuarios");

const router = express.Router();

router.route("/:nombre").put(updateUsuario);
router.route("/").post(validateUsuario);

//solo para admin
router.route("/nuevo").post(addUsuario);
router.route("/").get(getUsuarios);
router.route("/restart").post(restartPassword);

module.exports = router;
