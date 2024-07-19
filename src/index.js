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


/* 

  Siguientes Pasos:
  1. Autenticación de Usuarios: Implementar registro e inicio de sesión de usuarios usando JWT. **
  2. Autorización: Asegurar que solo los usuarios autenticados puedan crear, actualizar y eliminar tareas. **
  3. Validación: Añadir validación de entrada de datos para asegurar que los datos enviados a la API son correctos. 
  (Biblioteca "joi" para definir esquemas de validación  y verificar si los datos cumplen con los requisitos.)
  4. Documentación: Documentar API usando Swagger o API Blueprint.
  5. Tests: Escribir pruebas (Tests) usando herramientas como Mocha, Chai, o Jest.

*/