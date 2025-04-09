// backend/routes/mensajesRoutes.js

/**
 * @file mensajesRoutes.js
 * @description Rutas para gestión de mensajes en un chat.
 */

const express = require('express');
const router = express.Router();
const mensajesController = require('../controllers/mensajesController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @route   GET /mensajes
 * @desc    Obtener todos los mensajes (opcional: ?id_chat=)
 */
router.get('/mensajes', authMiddleware, mensajesController.getMensajes);

/**
 * @route   GET /mensajes/:id
 * @desc    Obtener un mensaje por ID
 */
router.get('/mensajes/:id', authMiddleware, mensajesController.getMensajeById);

/**
 * @route   POST /mensajes
 * @desc    Crear un nuevo mensaje
 */
router.post('/mensajes', authMiddleware, mensajesController.createMensaje);

/**
 * @route   PUT /mensajes/:id
 * @desc    Actualizar el contenido de un mensaje
 */
router.put('/mensajes/:id', authMiddleware, mensajesController.updateMensaje);

/**
 * @route   DELETE /mensajes/:id
 * @desc    Eliminar un mensaje
 */
router.delete('/mensajes/:id', authMiddleware, mensajesController.deleteMensaje);

module.exports = router;
