require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const propertyRoutes = require("./routes/properties");

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API corriendo en puerto ${PORT}`));
