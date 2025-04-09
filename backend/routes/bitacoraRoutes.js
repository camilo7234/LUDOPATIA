/**
 * @file bitacoraRoutes.js
 * @description Define las rutas para la gestión de la bitácora del sistema.
 * Permite registrar, consultar y filtrar acciones realizadas en la plataforma.
 *
 * Endpoints:
 * - GET /bitacora: Obtiene todas las entradas de la bitácora.
 * - GET /bitacora/:id: Obtiene una entrada específica de la bitácora por ID.
 * - POST /bitacora: Registra una nueva entrada en la bitácora.
 *
 * Se asume que solo administradores y usuarios con permisos pueden acceder a la bitácora.
 */

const express = require('express');
const router = express.Router();

// Importa el controlador de la bitácora
const bitacoraController = require('../controllers/bitacoraController');

/**
 * @route   GET /bitacora
 * @desc    Obtiene todas las entradas de la bitácora.
 * @access  Privado (Solo administradores o usuarios con permisos)
 */
router.get('/bitacora', bitacoraController.getBitacora); // Corrección del nombre de la función

/**
 * @route   GET /bitacora/:id
 * @desc    Obtiene una entrada específica de la bitácora por su ID.
 * @access  Privado (Solo administradores o usuarios con permisos)
 */
router.get('/bitacora/:id', bitacoraController.getBitacoraById); // Corrección del nombre de la función

/**
 * @route   POST /bitacora
 * @desc    Registra una nueva entrada en la bitácora.
 * @access  Privado (El sistema o usuarios con permisos pueden registrar eventos)
 */
router.post('/bitacora', bitacoraController.createBitacora); // Corrección del nombre de la función

module.exports = router;