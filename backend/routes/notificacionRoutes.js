/**
 * @file notificacionRoutes.js
 * @description Rutas para la gestión de notificaciones en la plataforma.
 *
 * Endpoints:
 * - GET /notificaciones: Obtiene todas las notificaciones de un usuario.
 * - GET /notificaciones/:id: Obtiene los detalles de una notificación específica.
 * - POST /notificaciones: Crea una nueva notificación.
 * - PUT /notificaciones/:id: Marca una notificación como leída.
 * - DELETE /notificaciones/:id: Elimina una notificación.
 *
 * Los usuarios pueden recibir, consultar y gestionar sus notificaciones.
 */

const express = require('express');
const router = express.Router();

// Importa el controlador de notificaciones
const notificacionController = require('../controllers/notificacionController');

/**
 * @route   GET /notificaciones
 * @desc    Obtiene todas las notificaciones de un usuario autenticado.
 * @access  Privado (Usuarios autenticados)
 */
router.get('/notificaciones', notificacionController.getNotificaciones);

/**
 * @route   GET /notificaciones/:id
 * @desc    Obtiene los detalles de una notificación específica.
 * @access  Privado (Usuarios autenticados)
 */
router.get('/notificaciones/:id', notificacionController.getNotificacionById);

/**
 * @route   POST /notificaciones
 * @desc    Crea una nueva notificación en el sistema.
 * @access  Privado (Administradores y sistema)
 */
router.post('/notificaciones', notificacionController.createNotificacion);

/**
 * @route   PUT /notificaciones/:id
 * @desc    Marca una notificación como leída.
 * @access  Privado (Usuarios autenticados)
 */
router.put('/notificaciones/:id', notificacionController.marcarComoLeida);

/**
 * @route   DELETE /notificaciones/:id
 * @desc    Elimina una notificación.
 * @access  Privado (Usuarios autenticados)
 */
router.delete('/notificaciones/:id', notificacionController.deleteNotificacion);

module.exports = router;