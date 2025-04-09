/**
 * @file juegoRealizadoRoutes.js
 * @description Rutas para la gestión de los juegos realizados por los pacientes.
 *
 * Endpoints:
 * - GET /juegos-realizados: Obtiene la lista de juegos realizados.
 * - GET /juegos-realizados/:id: Obtiene los detalles de un juego realizado específico.
 * - POST /juegos-realizados: Registra un nuevo juego realizado por un paciente.
 * - DELETE /juegos-realizados/:id: Elimina un registro de juego realizado.
 *
 * Los pacientes pueden registrar juegos realizados y consultar su historial.
 */

const express = require('express');
const router = express.Router();

// Importa el controlador de juegos realizados
const juegoRealizadoController = require('../controllers/juegoRealizadoController');

/**
 * @route   GET /juegos-realizados
 * @desc    Obtiene la lista de juegos realizados por los pacientes.
 * @access  Privado (Pacientes y Profesionales)
 */
router.get('/juegos-realizados', juegoRealizadoController.getJuegosRealizados); // Corrección del nombre de la función

/**
 * @route   GET /juegos-realizados/:id
 * @desc    Obtiene los detalles de un juego realizado específico.
 * @access  Privado (Pacientes y Profesionales)
 */
router.get('/juegos-realizados/:id', juegoRealizadoController.getJuegoRealizadoById); // Corrección del nombre de la función

/**
 * @route   POST /juegos-realizados
 * @desc    Registra un nuevo juego realizado por un paciente.
 * @access  Privado (Solo Pacientes)
 */
router.post('/juegos-realizados', juegoRealizadoController.createJuegoRealizado); // Corrección del nombre de la función

/**
 * @route   DELETE /juegos-realizados/:id
 * @desc    Elimina un registro de juego realizado.
 * @access  Privado (Solo Administradores)
 */
router.delete('/juegos-realizados/:id', juegoRealizadoController.deleteJuegoRealizado); // Corrección del nombre de la función

module.exports = router;