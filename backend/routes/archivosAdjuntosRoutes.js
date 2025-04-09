/**
 * @file archivosAdjuntosRoutes.js
 * @description Define las rutas para la gestión de archivos adjuntos en la plataforma.
 * Permite subir, obtener y eliminar archivos adjuntos.
 *
 * Endpoints:
 * - POST /archivos-adjuntos: Sube un nuevo archivo adjunto.
 * - GET /archivos-adjuntos/:id: Obtiene un archivo adjunto por su ID.
 * - DELETE /archivos-adjuntos/:id: Elimina un archivo adjunto por su ID.
 *
 * Se asume que solo usuarios autenticados pueden gestionar archivos adjuntos.
 */

const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware'); // Middleware para la subida de archivos

// Importa el controlador de archivos adjuntos
const archivosAdjuntosController = require('../controllers/archivosAdjuntosController');

/**
 * @route   POST /archivos-adjuntos
 * @desc    Sube un nuevo archivo adjunto.
 * @access  Privado (Solo usuarios autenticados pueden subir archivos)
 */
router.post('/archivos-adjuntos', upload.single('archivo'), archivosAdjuntosController.uploadArchivoAdjunto);

/**
 * @route   GET /archivos-adjuntos/:id
 * @desc    Obtiene un archivo adjunto por su ID.
 * @access  Privado (Solo usuarios autenticados pueden acceder a archivos)
 */
router.get('/archivos-adjuntos/:id', archivosAdjuntosController.getArchivoById); // Corrección de nombre de función

/**
 * @route   DELETE /archivos-adjuntos/:id
 * @desc    Elimina un archivo adjunto por su ID.
 * @access  Privado (Solo usuarios con permisos pueden eliminar archivos)
 */
router.delete('/archivos-adjuntos/:id', archivosAdjuntosController.deleteArchivoAdjunto); // Corrección de nombre de función

module.exports = router;