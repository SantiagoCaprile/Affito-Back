const express = require("express");
const {
	createPagoContrato,
	createSenia,
	getPagoContrato,
	getSenia,
	arrepentirseSenia,
} = require("../controllers/pagos");

const router = express.Router();

router.route("/senias").post(createSenia);
router.route("/senias/:id").get(getSenia).put(arrepentirseSenia);
router.route("/pagoContrato").post(createPagoContrato);
router.route("/pagoContrato/:id").get(getPagoContrato);

module.exports = router;
