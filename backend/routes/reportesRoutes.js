/**
 * @file reportesRoutes.js
 * @description Rutas para la gestión de múltiples reportes.
 */

const express = require('express');
const router = express.Router();
const reportesController = require('../controllers/reportesController');
// Corregido: Apuntando a la carpeta 'middleware' (singular) según tu confirmación
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware'); // Importa tu middleware de roles unificado


// Crear un nuevo reporte
// Nota: Se mantiene solo con authMiddleware. Define qué roles pueden crear reportes
// si es necesario, añadiendo roleMiddleware(['rol1', 'rol2']) después de authMiddleware.
router.post('/reportes', authMiddleware, reportesController.crearReporte);

// Obtener todos los reportes (Solo Admin)
// Corregido: Se reemplaza adminMiddleware por roleMiddleware(['admin'])
router.get('/reportes', authMiddleware, roleMiddleware(['admin']), reportesController.obtenerTodosLosReportes);

// Obtener un reporte específico por ID
// Nota: Se mantiene solo con authMiddleware. Considera si se necesita verificar
// que el usuario sea el creador, un profesional asociado o un admin.
router.get('/reportes/:reporteId', authMiddleware, reportesController.obtenerReportePorId);

// Actualizar un reporte (Solo Admin)
// Corregido: Se reemplaza adminMiddleware por roleMiddleware(['admin'])
router.put('/reportes/:reporteId', authMiddleware, roleMiddleware(['admin']), reportesController.actualizarReporte);

// Eliminar un reporte (Solo Admin)
// Corregido: Se reemplaza adminMiddleware por roleMiddleware(['admin'])
router.delete('/reportes/:reporteId', authMiddleware, roleMiddleware(['admin']), reportesController.eliminarReporte);

module.exports = router;