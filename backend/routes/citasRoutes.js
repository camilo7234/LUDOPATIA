/**
 * @file citasRoutes.js
 * @description Define las rutas para la gestión de citas entre pacientes y profesionales.
 */

const express = require('express');
const router = express.Router();

// Importa el controlador de citas
const citasController = require('../controllers/citasController');

/**
 * @route   GET /
 * @desc    Obtiene la lista completa de citas
 */
router.get('/', citasController.getAllCitas);

/**
 * @route   GET /:id
 * @desc    Obtiene los detalles de una cita en particular
 */
router.get('/:id', citasController.getCitaById);

/**
 * @route   POST /
 * @desc    Crea una nueva cita
 */
router.post('/', citasController.createCita);

/**
 * @route   PUT /:id
 * @desc    Actualiza la información de una cita existente
 */
router.put('/:id', citasController.updateCita);

/**
 * @route   DELETE /:id
 * @desc    Elimina una cita según su identificador
 */
router.delete('/:id', citasController.deleteCita);

module.exports = router;
