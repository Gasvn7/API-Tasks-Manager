const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

//Middleware para parsear Jsons
app.use(express.json());

//Rutas
const taskRoutes = require("./routes/Tasks.routes");
const authRoutes = require('./routes/User.routes');
app.use("/api/tasks", taskRoutes);
app.use('/api/auth', authRoutes);

//Conexion a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
    console.log("Conexión a MongoDB Verificada.");
  }).catch((error)=>{
    console.error("Error al intentar conectar con MongoDB: ", error);
  });

//Servidor corriendo en el puerto
app.listen(port, ()=>{
  console.log(`Servidor corriendo en http://localhost:${port}`);
});