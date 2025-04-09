/**
 * app.js
 *
 * Archivo principal de configuración de la aplicación Express para el backend de Ludopatía.
 *
 * Este archivo realiza las siguientes tareas:
 * - Configura y aplica middlewares globales (CORS, parser de JSON, logging, etc.).
 * - Inicializa la conexión a la base de datos PostgreSQL.
 * - Monta las rutas de la API bajo el prefijo "/api".
 * - Gestiona errores y rutas no encontradas.
 *
 * Estructura del proyecto:
 * ├── config/
 * │    └── db.js                      // Configuración y conexión a PostgreSQL.
 * ├── controllers/                    // Lógica de negocio y controladores.
 * ├── middlewares/                    // Middlewares para autenticación, validación y manejo de errores.
 * ├── models/                         // Modelos de datos (Sequelize).
 * ├── routes/                         // Definición de endpoints de la API.
 * ├── services/                       // Servicios externos (envío de emails, notificaciones, etc.).
 * ├── utils/                          // Utilidades generales (logger, helpers, etc.).
 * ├── app.js                          // Configuración principal de Express (este archivo).
 * └── server.js                       // Punto de entrada del servidor.
 *
 * Dependencias necesarias (asegúrate de instalarlas):
 * npm install express morgan cors dotenv pg
 *
 * @author
 * @version 1.0
 */

const express = require('express');
const morgan = require('morgan');                       // Middleware para logging de peticiones HTTP.
const cors = require('cors');                         // Middleware para habilitar CORS.
const dotenv = require('dotenv');                       // Carga de variables de entorno.
const routes = require('./routes');                     // Importación del archivo central de rutas.
const { errorHandler } = require('./middleware/errorMiddleware'); // Middleware para manejo global de errores.
const { connectDB } = require('./config/db');         // Función para conectar a la base de datos PostgreSQL.

// Configurar variables de entorno.
dotenv.config();

// Inicializar la aplicación Express.
const app = express();

// Conectar a la base de datos.
connectDB();

// Configuración de middlewares globales.
// Permitir solicitudes desde dominios externos mediante CORS.
app.use(cors());
// Parseo de datos en formato JSON en el cuerpo de las peticiones.
app.use(express.json());
// Parseo de datos enviados mediante formularios (URL-encoded).
app.use(express.urlencoded({ extended: false }));
// Registro de las peticiones HTTP en consola (modo desarrollo).
app.use(morgan('dev'));

// Montaje de rutas bajo el prefijo "/api".
// Se asume que el archivo "./routes/index.js" agrupa y exporta todas las rutas definidas en el proyecto.
app.use('/api', routes);

// Manejo de rutas no definidas (404 Not Found).
app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint no encontrado' });
});

// Middleware global para el manejo de errores.
app.use(errorHandler);

// Exportar la aplicación para utilizarla en el servidor (server.js).
module.exports = app;