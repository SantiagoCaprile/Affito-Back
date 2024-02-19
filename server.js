const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

//load env variables
dotenv.config({ path: "./config/config.env" });

//connect to database
connectDB();

const app = express();

//body parser
app.use(express.json());

//enable cors
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//routes
app.use("/usuarios", require("./routes/usuarios"));
app.use("/api/v1/localidades", require("./routes/localidades"));
app.use("/api/v1/domicilios", require("./routes/domicilios"));
app.use("/propiedades", require("./routes/propiedades"));
app.use("/api/v1/pagos", require("./routes/pagos"));
app.use("/api/v1/tipos", require("./routes/tiposPropiedades"));
app.use("/api/v1/monedas", require("./routes/moneda"));
app.use("/api/v1/clientes", require("./routes/clientes"));
app.use("/api/v1/aud_clientes", require("./routes/aud_clientes"));
app.use("/api/v1/contratos", require("./routes/contratos"));
app.use("/api/v1/busquedas", require("./routes/busquedasInteligentes"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
