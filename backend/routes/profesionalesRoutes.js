/**
 * @file profesionalesRoutes.js
 * @description Rutas para la gestión de profesionales de la salud en la plataforma.
 *
 * Endpoints:
 *  - GET /profesionales: Obtiene la lista de todos los profesionales registrados.
 *  - GET /profesionales/:id: Obtiene la información de un profesional específico.
 *  - POST /profesionales: Registra un nuevo profesional en la plataforma.
 *  - PUT /profesionales/:id: Actualiza la información de un profesional.
 *  - DELETE /profesionales/:id: Elimina un profesional del sistema.
 *
 * Estas rutas permiten la administración de los profesionales de salud dentro de la plataforma.
 */

const express = require('express');
const router = express.Router();

// Importa el controlador de profesionales
const profesionalesController = require('../controllers/profesionalesController');

/**
 * @route   GET /profesionales
 * @desc    Obtiene la lista de todos los profesionales registrados.
 * @access  Público
 */
router.get('/profesionales', profesionalesController.getProfesionales);

/**
 * @route   GET /profesionales/:id
 * @desc    Obtiene la información detallada de un profesional específico.
 * @access  Público
 */
router.get('/profesionales/:id', profesionalesController.getProfesionalById);

/**
 * @route   POST /profesionales
 * @desc    Registra un nuevo profesional en la plataforma.
 * @access  Privado (Solo administradores)
 */
router.post('/profesionales', profesionalesController.createProfesional);

/**
 * @route   PUT /profesionales/:id
 * @desc    Actualiza la información de un profesional existente.
 * @access  Privado (Solo administradores)
 */
router.put('/profesionales/:id', profesionalesController.updateProfesional);

/**
 * @route   DELETE /profesionales/:id
 * @desc    Elimina un profesional del sistema.
 * @access  Privado (Solo administradores)
 */
router.delete('/profesionales/:id', profesionalesController.deleteProfesional);

module.exports = router;
