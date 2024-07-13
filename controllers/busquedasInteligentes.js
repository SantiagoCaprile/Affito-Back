const BusquedaInteligente = require("../models/BusquedaInteligente");

exports.addBusquedaInteligente = async (req, res) => {
	try {
		const busqueda = new BusquedaInteligente(req.body);
		await busqueda.save();
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

exports.getBusquedasInteligentesByCliente = async (req, res) => {
	try {
		const busquedas = await BusquedaInteligente.find({
			cliente: req.params.clienteId,
		});
		res.status(200).json(busquedas);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

exports.deleteBusquedaInteligente = async (req, res) => {
	try {
		await BusquedaInteligente.findByIdAndDelete(req.params.busquedaId);
		res.status(200).json({ message: "Busqueda eliminada" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

exports.getClientesQueBuscanEstaPropiedad = async (req, res) => {
	try {
		const busquedas = await BusquedaInteligente.find({
			propiedades: req.params.propiedadId,
		})
			.populate("cliente", "nombre_razon_social cuit email _id")
			.select("cliente operacion");
		res.status(200).json(busquedas);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};
