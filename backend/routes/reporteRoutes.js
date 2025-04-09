/**
 * @file reporteRoutes.js
 * @description Define las rutas para la gestión de un único reporte.
 * Permite obtener, actualizar y eliminar un reporte específico.
 *
 * Endpoints:
 * - GET /reporte/:id: Obtiene un reporte por su ID.
 * - PUT /reporte/:id: Actualiza un reporte específico.
 * - DELETE /reporte/:id: Elimina un reporte específico.
 *
 * Se asume que solo los administradores pueden gestionar reportes.
 */

const express = require('express');
const router = express.Router();

// Importa el controlador de reportes individuales
const reporteController = require('../controllers/reporteController');

/**
 * @route   GET /reporte/:id
 * @desc    Obtiene un reporte específico por su ID.
 * @access  Privado (Solo administradores pueden acceder)
 */
router.get('/reporte/:id', reporteController.getReporteById);

/**
 * @route   PUT /reporte/:id
 * @desc    Actualiza un reporte específico.
 * @access  Privado (Solo administradores pueden actualizar reportes)
 */
router.put('/reporte/:id', reporteController.updateReporte);

/**
 * @route   DELETE /reporte/:id
 * @desc    Elimina un reporte específico.
 * @access  Privado (Solo administradores pueden eliminar reportes)
 */
router.delete('/reporte/:id', reporteController.deleteReporte);

module.exports = router;