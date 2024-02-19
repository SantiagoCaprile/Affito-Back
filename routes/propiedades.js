const express = require("express");
const {
	getPropiedades,
	addPropiedad,
	getPropiedad,
	updatePropiedad,
	addOperacion,
	editOperacion,
	deleteOperacion,
	getContratos,
} = require("../controllers/propiedades");

const router = express.Router();

router.route("/").get(getPropiedades).post(addPropiedad);
router.route("/:id").get(getPropiedad).put(updatePropiedad);
router.route("/:id/contratos").get(getContratos);

router.route("/:id/operacion").post(addOperacion);
router.route("/:id/operacion/:idOperacion").put(editOperacion);
router.route("/:id/operacion/:idOperacion").delete(deleteOperacion);

module.exports = router;
