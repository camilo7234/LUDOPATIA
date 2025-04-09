/**
 * @file index.js
 * @description Archivo principal de rutas que centraliza y exporta todas las rutas de la API.
 */

const express = require('express');
const router = express.Router();

// Importación de todas las rutas del sistema
const authRoutes = require('./authRoutes');
const usuariosRoutes = require('./usuariosRoutes');
const rolesRoutes = require('./rolesRoutes');
const profesionalesRoutes = require('./profesionalesRoutes');
const citasRoutes = require('./citasRoutes');
const historialClinicoRoutes = require('./historialClinicoRoutes');
const evaluacionesRoutes = require('./evaluacionesRoutes');
const comentarioEvaluacionRoutes = require('./comentarioEvaluacionRoutes');
const chatRoutes = require('./chatRoutes');
const mensajesRoutes = require('./mensajesRoutes');
const reportesRoutes = require('./reportesRoutes');
const reporteRoutes = require('./reporteRoutes');
const archivosAdjuntosRoutes = require('./archivosAdjuntosRoutes');
const bitacoraRoutes = require('./bitacoraRoutes');
const juegoRoutes = require('./juegoRoutes');
const juegoRealizadoRoutes = require('./juegoRealizadoRoutes');
const notificacionRoutes = require('./notificacionRoutes');
const recursoRoutes = require('./recursoRoutes');

// Definición de prefijos de rutas
router.use('/auth', authRoutes);
router.use('/usuarios', usuariosRoutes);
router.use('/roles', rolesRoutes);
router.use('/profesionales', profesionalesRoutes);
router.use('/citas', citasRoutes);
router.use('/historial-clinico', historialClinicoRoutes);
router.use('/evaluaciones', evaluacionesRoutes);
router.use('/comentarios-evaluacion', comentarioEvaluacionRoutes);
router.use('/chat', chatRoutes);
router.use('/mensajes', mensajesRoutes);
router.use('/reportes', reportesRoutes);
router.use('/reporte', reporteRoutes);
router.use('/archivos-adjuntos', archivosAdjuntosRoutes);
router.use('/bitacora', bitacoraRoutes);
router.use('/juegos', juegoRoutes);
router.use('/juegos-realizados', juegoRealizadoRoutes);
router.use('/notificaciones', notificacionRoutes);
router.use('/recursos', recursoRoutes);

module.exports = router;
