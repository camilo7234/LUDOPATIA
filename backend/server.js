/**
 * server.js
 *
 * Archivo de entrada del servidor para el backend de Ludopatía.
 * 
 * Este archivo se encarga de:
 *   - Cargar la configuración de la aplicación desde app.js.
 *   - Configurar e iniciar el servidor HTTP en el puerto especificado.
 *   - Manejar las variables de entorno a través de dotenv.
 *
 * Dependencias necesarias:
 *   npm install dotenv
 *
 * Estructura del proyecto:
 *   ├── config/
 *   │   └── db.js                   // Conexión a la base de datos PostgreSQL.
 *   ├── controllers/                // Lógica de negocio y controladores.
 *   ├── middlewares/                // Middlewares para autenticación, validación y manejo de errores.
 *   ├── models/                     // Modelos de datos (Sequelize).
 *   ├── routes/                     // Definición de endpoints de la API.
 *   ├── services/                   // Servicios externos (envío de emails, notificaciones, etc.).
 *   ├── utils/                      // Utilidades generales (logger, helpers, etc.).
 *   ├── app.js                      // Configuración principal de Express.
 *   └── server.js                   // Punto de entrada del servidor (este archivo).
 *
 * @author 
 * @version 1.0
 */

const http = require('http');
const dotenv = require('dotenv');
const app = require('./app');

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Definir el puerto del servidor: se utiliza la variable de entorno PORT o se establece 5000 por defecto.
const PORT = process.env.PORT || 5000;

// Crear el servidor HTTP utilizando la configuración de la aplicación Express.
const server = http.createServer(app);

// Iniciar el servidor y comenzar a escuchar en el puerto definido.
server.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
