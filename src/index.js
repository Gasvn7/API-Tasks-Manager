const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

//Middleware para parsear Jsons
app.use(express.json());

//Rutas
const taskRoutes = require("./routes/Tasks.routes");
app.use("/api/tasks", taskRoutes);

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


/* 

  Siguientes Pasos
  1. Autenticación de Usuarios: Implementa registro e inicio de sesión de usuarios usando JWT.
  2. Autorización: Asegura que solo los usuarios autenticados puedan crear, actualizar y eliminar tareas.
  3. Validación: Añade validación de entrada de datos para asegurar que los datos enviados a la API son correctos.
  4. Documentación: Documenta tu API usando Swagger o API Blueprint.
  5. Tests: Escribe pruebas para tu API usando herramientas como Mocha, Chai, o Jest.

  1. PARA AUTENTICAR USUARIOS: https://www.youtube.com/watch?v=JKa22Z44ap8

*/