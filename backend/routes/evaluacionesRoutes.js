/**
 * @file evaluacionesRoutes.js
 * @description Define las rutas para la gestión de evaluaciones dentro de la plataforma.
 * Este archivo permite crear, obtener, actualizar y eliminar evaluaciones, conectándose
 * con el controlador correspondiente para ejecutar la lógica de negocio.
 *
 * Endpoints:
 *  - GET /:         Obtiene la lista completa de evaluaciones.
 *  - GET /:id:      Obtiene una evaluación específica por su identificador.
 *  - POST /:        Crea una nueva evaluación.
 *  - PUT /:id:      Actualiza una evaluación existente.
 *  - DELETE /:id:   Elimina una evaluación por su identificador.
 *
 * Nota: Se asume que se aplicarán middlewares de autenticación y validación según sea necesario.
 */

const express = require('express');
const router = express.Router();

// Importa el controlador de evaluaciones.
const evaluacionesController = require('../controllers/evaluacionesController');

/**
 * @route   GET /
 * @desc    Obtiene la lista completa de evaluaciones
 * @access  Privado
 */
router.get('/', evaluacionesController.getEvaluaciones);

/**
 * @route   GET /:id
 * @desc    Obtiene una evaluación específica por su ID
 * @access  Privado
 */
router.get('/:id', evaluacionesController.getEvaluacionById);

/**
 * @route   POST /
 * @desc    Crea una nueva evaluación
 * @access  Privado
 */
router.post('/', evaluacionesController.createEvaluacion);

/**
 * @route   PUT /:id
 * @desc    Actualiza una evaluación existente
 * @access  Privado
 */
router.put('/:id', evaluacionesController.updateEvaluacion);

/**
 * @route   DELETE /:id
 * @desc    Elimina una evaluación por su ID
 * @access  Privado
 */
router.delete('/:id', evaluacionesController.deleteEvaluacion);

module.exports = router;