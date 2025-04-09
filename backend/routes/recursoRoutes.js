/**
 * @file recursoRoutes.js
 * @description Rutas para la gestión de recursos educativos o informativos en la plataforma.
 *
 * Endpoints:
 *  - GET /recursos: Obtiene la lista de todos los recursos disponibles.
 *  - GET /recursos/:id: Obtiene la información de un recurso específico.
 *  - POST /recursos: Crea un nuevo recurso educativo o informativo.
 *  - PUT /recursos/:id: Actualiza un recurso existente.
 *  - DELETE /recursos/:id: Elimina un recurso de la plataforma.
 *
 * Estas rutas permiten la administración de los recursos de apoyo en la plataforma.
 */

const express = require('express');
const router = express.Router();

// Importa el controlador de recursos
const recursoController = require('../controllers/recursoController');

/**
 * @route   GET /recursos
 * @desc    Obtiene la lista de todos los recursos disponibles.
 * @access  Público
 */
router.get('/recursos', recursoController.getRecursos);

/**
 * @route   GET /recursos/:id
 * @desc    Obtiene la información detallada de un recurso específico.
 * @access  Público
 */
router.get('/recursos/:id', recursoController.getRecursoById);

/**
 * @route   POST /recursos
 * @desc    Crea un nuevo recurso educativo o informativo.
 * @access  Privado (Solo administradores)
 */
router.post('/recursos', recursoController.createRecurso);

/**
 * @route   PUT /recursos/:id
 * @desc    Actualiza la información de un recurso existente.
 * @access  Privado (Solo administradores)
 */
router.put('/recursos/:id', recursoController.updateRecurso);

/**
 * @route   DELETE /recursos/:id
 * @desc    Elimina un recurso de la plataforma.
 * @access  Privado (Solo administradores)
 */
router.delete('/recursos/:id', recursoController.deleteRecurso);

module.exports = router;
