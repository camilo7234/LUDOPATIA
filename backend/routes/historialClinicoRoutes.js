/**
 * @file historialClinicoRoutes.js
 * @description Rutas para la gestión del historial clínico de los pacientes.
 */

const express = require('express');
const router = express.Router();

// Importar el controlador del historial clínico
const historialClinicoController = require('../controllers/historialClinicoController');

/**
 * @route   GET /:pacienteId
 * @desc    Obtiene el historial clínico de un paciente específico.
 */
router.get('/:pacienteId', historialClinicoController.getHistorialClinicoByPaciente);

/**
 * @route   POST /
 * @desc    Crea una nueva entrada en el historial clínico.
 */
router.post('/', historialClinicoController.createHistorialClinico);

/**
 * @route   PUT /:id
 * @desc    Actualiza una entrada del historial clínico por su ID.
 */
router.put('/:id', historialClinicoController.updateHistorialClinico);

/**
 * @route   DELETE /:id
 * @desc    Elimina una entrada del historial clínico por su ID.
 */
router.delete('/:id', historialClinicoController.deleteHistorialClinico);

module.exports = router;
