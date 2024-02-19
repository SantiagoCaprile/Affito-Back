const express = require("express");
const {
	getTasacionesByPropiedad,
	addTasacion,
	editTasacion,
	deleteTasacion,
} = require("../controllers/tasaciones");

const router = express.Router();

router.route("/:propiedadId").get(getTasacionesByPropiedad).post(addTasacion);
router.route("/:tasacionId").put(editTasacion).delete(deleteTasacion);

module.exports = router;
