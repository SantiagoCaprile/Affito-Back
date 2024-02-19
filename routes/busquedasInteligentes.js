const express = require("express");
const {
	getBusquedasInteligentesByCliente,
	addBusquedaInteligente,
	deleteBusquedaInteligente,
} = require("../controllers/busquedasInteligentes");

const router = express.Router();

router.get("/:clienteId", getBusquedasInteligentesByCliente);
router.post("/", addBusquedaInteligente);
router.delete("/:busquedaId", deleteBusquedaInteligente);

module.exports = router;
