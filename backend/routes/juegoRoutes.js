/**
 * @file juegoRoutes.js
 * @description Rutas para la gestión de los juegos de autoayuda en la plataforma.
 *
 * Endpoints:
 * - GET /juegos: Obtiene la lista de juegos disponibles.
 * - GET /juegos/:id: Obtiene los detalles de un juego específico.
 * - POST /juegos: Crea un nuevo juego (solo administradores).
 * - PUT /juegos/:id: Actualiza un juego existente (solo administradores).
 * - DELETE /juegos/:id: Elimina un juego (solo administradores).
 *
 * Solo los administradores pueden crear, modificar y eliminar juegos.
 */

const express = require('express');
const router = express.Router();

// Importa el controlador de juegos
const juegoController = require('../controllers/juegoController');

/**
 * @route   GET /juegos
 * @desc    Obtiene la lista de juegos disponibles en la plataforma.
 * @access  Público
 */
router.get('/juegos', juegoController.getJuegos); // Corrección del nombre de la función

/**
 * @route   GET /juegos/:id
 * @desc    Obtiene los detalles de un juego específico.
 * @access  Público
 */
router.get('/juegos/:id', juegoController.getJuegoById); // Corrección del nombre de la función

/**
 * @route   POST /juegos
 * @desc    Crea un nuevo juego en la plataforma.
 * @access  Privado (Solo administradores)
 */
router.post('/juegos', juegoController.createJuego); // Corrección del nombre de la función

/**
 * @route   PUT /juegos/:id
 * @desc    Actualiza la información de un juego existente.
 * @access  Privado (Solo administradores)
 */
router.put('/juegos/:id', juegoController.updateJuego); // Corrección del nombre de la función

/**
 * @route   DELETE /juegos/:id
 * @desc    Elimina un juego de la plataforma.
 * @access  Privado (Solo administradores)
 */
router.delete('/juegos/:id', juegoController.deleteJuego); // Corrección del nombre de la función

module.exports = router;