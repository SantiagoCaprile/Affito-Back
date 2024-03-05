const express = require("express");
const {
	getLogsClientes,
	getLogsByCliente,
	getLogClienteById,
} = require("../controllers/auditar");
const router = express.Router();

router.get("/clientes", getLogsClientes);
router.get("/clientes/:id", getLogsByCliente);
router.get("/clientes/log/:logId", getLogClienteById);

module.exports = router;
