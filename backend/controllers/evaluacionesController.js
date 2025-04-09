/**
 * @file evaluacionesController.js
 * @description Controlador para la gestión de evaluaciones
 */

const Evaluacion = require('../models/Evaluacion');

/**
 * Obtener todas las evaluaciones.
 * GET /api/evaluaciones
 */
const getEvaluaciones = async (req, res) => {
  try {
    const evaluaciones = await Evaluacion.findAll({ order: [['fecha', 'DESC']] });
    return res.status(200).json({ evaluaciones });
  } catch (error) {
    console.error('Error obteniendo evaluaciones:', error);
    return res.status(500).json({ message: 'Error del servidor al obtener evaluaciones.' });
  }
};

/**
 * Obtener una evaluación por su ID.
 * GET /api/evaluaciones/:id
 */
const getEvaluacionById = async (req, res) => {
  try {
    const { id } = req.params;
    const evaluacion = await Evaluacion.findByPk(id);
    if (!evaluacion) {
      return res.status(404).json({ message: 'Evaluación no encontrada.' });
    }
    return res.status(200).json({ evaluacion });
  } catch (error) {
    console.error('Error obteniendo evaluación por ID:', error);
    return res.status(500).json({ message: 'Error del servidor al obtener la evaluación.' });
  }
};

/**
 * Crear una nueva evaluación.
 * POST /api/evaluaciones
 * Se esperan en el body: id_paciente, id_profesional, tipo y resultado.
 */
const createEvaluacion = async (req, res) => {
  try {
    const { id_paciente, id_profesional, tipo, resultado } = req.body;
    
    // Validar campos obligatorios
    if (!id_paciente || !id_profesional || !tipo || !resultado) {
      return res.status(400).json({ message: 'Se requieren id_paciente, id_profesional, tipo y resultado para crear la evaluación.' });
    }

    const nuevaEvaluacion = await Evaluacion.create({
      id_paciente,
      id_profesional,
      tipo,
      resultado
    });

    return res.status(201).json({ message: 'Evaluación creada exitosamente.', evaluacion: nuevaEvaluacion });
  } catch (error) {
    console.error('Error creando evaluación:', error);
    return res.status(500).json({ message: 'Error del servidor al crear la evaluación.' });
  }
};

/**
 * Actualizar una evaluación existente.
 * PUT /api/evaluaciones/:id
 * Permite actualizar: id_paciente, id_profesional, tipo y resultado.
 */
const updateEvaluacion = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_paciente, id_profesional, tipo, resultado } = req.body;

    const evaluacion = await Evaluacion.findByPk(id);
    if (!evaluacion) {
      return res.status(404).json({ message: 'Evaluación no encontrada.' });
    }

    evaluacion.id_paciente = id_paciente || evaluacion.id_paciente;
    evaluacion.id_profesional = id_profesional || evaluacion.id_profesional;
    evaluacion.tipo = tipo || evaluacion.tipo;
    evaluacion.resultado = resultado || evaluacion.resultado;

    await evaluacion.save();

    return res.status(200).json({ message: 'Evaluación actualizada exitosamente.', evaluacion });
  } catch (error) {
    console.error('Error actualizando evaluación:', error);
    return res.status(500).json({ message: 'Error del servidor al actualizar la evaluación.' });
  }
};

/**
 * Eliminar una evaluación.
 * DELETE /api/evaluaciones/:id
 */
const deleteEvaluacion = async (req, res) => {
  try {
    const { id } = req.params;
    const evaluacion = await Evaluacion.findByPk(id);
    if (!evaluacion) {
      return res.status(404).json({ message: 'Evaluación no encontrada.' });
    }
    await evaluacion.destroy();
    return res.status(200).json({ message: 'Evaluación eliminada exitosamente.' });
  } catch (error) {
    console.error('Error eliminando evaluación:', error);
    return res.status(500).json({ message: 'Error del servidor al eliminar la evaluación.' });
  }
};

module.exports = {
  getEvaluaciones,
  getEvaluacionById,
  createEvaluacion,
  updateEvaluacion,
  deleteEvaluacion
};