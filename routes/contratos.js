const express = require("express");
const {
	addContrato,
	getContrato,
	editContrato,
} = require("../controllers/contratos");

const router = express.Router();

router.route("/").post(addContrato);
router.route("/:id").get(getContrato).put(editContrato);

module.exports = router;
