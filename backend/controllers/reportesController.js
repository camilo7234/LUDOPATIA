// backend/controllers/reportesController.js

const Reporte = require('../models/Reporte');
const Usuario = require('../models/Usuario');
const Paciente = require('../models/Paciente');
const Profesional = require('../models/Profesional');
const { Op } = require('sequelize');

/**
 * Obtener todos los reportes.
 * GET /api/reportes
 */
const obtenerTodosLosReportes = async (req, res) => {
  try {
    const reportes = await Reporte.findAll({
      include: [
        { model: Usuario, as: 'reportado', attributes: ['nombre_completo', 'correo'] },
        { model: Usuario, as: 'reportador', attributes: ['nombre_completo', 'correo'] },
      ],
      order: [['fecha_reporte', 'DESC']],
    });

    return res.status(200).json({ reportes });
  } catch (error) {
    console.error('Error obteniendo reportes:', error);
    return res.status(500).json({ message: 'Error del servidor al obtener los reportes.' });
  }
};

/**
 * Obtener un reporte por ID.
 * GET /api/reportes/:id
 */
const obtenerReportePorId = async (req, res) => {
  try {
    const { reporteId } = req.params; // Usa el mismo nombre del parámetro de la ruta
    const reporte = await Reporte.findByPk(reporteId, {
      include: [
        { model: Usuario, as: 'reportado', attributes: ['nombre_completo', 'correo'] },
        { model: Usuario, as: 'reportador', attributes: ['nombre_completo', 'correo'] },
      ],
    });

    if (!reporte) {
      return res.status(404).json({ message: 'Reporte no encontrado.' });
    }

    return res.status(200).json({ reporte });
  } catch (error) {
    console.error('Error obteniendo reporte:', error);
    return res.status(500).json({ message: 'Error del servidor al obtener el reporte.' });
  }
};

/**
 * Crear un nuevo reporte.
 * POST /api/reportes
 */
const crearReporte = async (req, res) => {
  try {
    const { reportador_id, reportado_id, motivo, descripcion } = req.body;

    if (!reportador_id || !reportado_id || !motivo || !descripcion) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    const nuevoReporte = await Reporte.create({
      reportador_id,
      reportado_id,
      motivo,
      descripcion,
      fecha_reporte: new Date(),
    });

    return res.status(201).json({ message: 'Reporte creado exitosamente.', reporte: nuevoReporte });
  } catch (error) {
    console.error('Error creando reporte:', error);
    return res.status(500).json({ message: 'Error del servidor al crear el reporte.' });
  }
};

/**
 * Actualizar un reporte.
 * PUT /api/reportes/:id
 */
const actualizarReporte = async (req, res) => {
  try {
    const { reporteId } = req.params; // Usa el mismo nombre del parámetro de la ruta
    const { motivo, descripcion } = req.body;

    const reporte = await Reporte.findByPk(reporteId);
    if (!reporte) {
      return res.status(404).json({ message: 'Reporte no encontrado.' });
    }

    await reporte.update({ motivo, descripcion });

    return res.status(200).json({ message: 'Reporte actualizado exitosamente.', reporte });
  } catch (error) {
    console.error('Error actualizando reporte:', error);
    return res.status(500).json({ message: 'Error del servidor al actualizar el reporte.' });
  }
};

/**
 * Eliminar un reporte.
 * DELETE /api/reportes/:id
 */
const eliminarReporte = async (req, res) => {
  try {
    const { reporteId } = req.params; // Usa el mismo nombre del parámetro de la ruta
    const reporte = await Reporte.findByPk(reporteId);

    if (!reporte) {
      return res.status(404).json({ message: 'Reporte no encontrado.' });
    }

    await reporte.destroy();

    return res.status(200).json({ message: 'Reporte eliminado exitosamente.' });
  } catch (error) {
    console.error('Error eliminando reporte:', error);
    return res.status(500).json({ message: 'Error del servidor al eliminar el reporte.' });
  }
};

module.exports = {
  obtenerTodosLosReportes, // Renombrado para coincidir con la ruta
  obtenerReportePorId,    // Renombrado para coincidir con la ruta
  crearReporte,
  actualizarReporte,
  eliminarReporte,
};