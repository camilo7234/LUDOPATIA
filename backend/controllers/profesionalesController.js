// backend/controllers/profesionalesController.js

const Profesional = require('../models/Profesional');
const { Op } = require('sequelize');

/**
 * Obtener la lista de profesionales.
 * GET /api/profesionales
 */
const getProfesionales = async (req, res) => {
  try {
    const profesionales = await Profesional.findAll();
    return res.status(200).json({ profesionales });
  } catch (error) {
    console.error('Error obteniendo profesionales:', error);
    return res.status(500).json({ message: 'Error del servidor al obtener profesionales.' });
  }
};

/**
 * Obtener un profesional por su ID.
 * GET /api/profesionales/:id
 */
const getProfesionalById = async (req, res) => {
  try {
    const { id } = req.params;
    const profesional = await Profesional.findByPk(id);
    if (!profesional) {
      return res.status(404).json({ message: 'Profesional no encontrado.' });
    }
    return res.status(200).json({ profesional });
  } catch (error) {
    console.error('Error obteniendo profesional por ID:', error);
    return res.status(500).json({ message: 'Error del servidor al obtener el profesional.' });
  }
};

/**
 * Crear un nuevo profesional.
 * POST /api/profesionales
 * Se esperan en el body: especialidad, numero_tarjeta_profesional, experiencia (opcional) e id_usuario.
 */
const createProfesional = async (req, res) => {
  try {
    const { especialidad, numero_tarjeta_profesional, experiencia, id_usuario } = req.body;

    // Validar campos obligatorios
    if (!especialidad || !numero_tarjeta_profesional || !id_usuario) {
      return res.status(400).json({ message: 'Los campos especialidad, número de tarjeta profesional e id_usuario son obligatorios.' });
    }

    // Crear el profesional
    const nuevoProfesional = await Profesional.create({
      especialidad,
      numero_tarjeta_profesional,
      experiencia: experiencia || null,
      id_usuario,
    });

    return res.status(201).json({ message: 'Profesional creado exitosamente.', profesional: nuevoProfesional });
  } catch (error) {
    console.error('Error creando profesional:', error);
    return res.status(500).json({ message: 'Error del servidor al crear el profesional.' });
  }
};

/**
 * Actualizar un profesional existente.
 * PUT /api/profesionales/:id
 * Se pueden actualizar: especialidad, numero_tarjeta_profesional, experiencia e id_usuario.
 */
const updateProfesional = async (req, res) => {
  try {
    const { id } = req.params;
    const { especialidad, numero_tarjeta_profesional, experiencia, id_usuario } = req.body;

    const profesional = await Profesional.findByPk(id);
    if (!profesional) {
      return res.status(404).json({ message: 'Profesional no encontrado.' });
    }

    // Actualizar los campos, conservando los valores actuales si no se proveen nuevos
    profesional.especialidad = especialidad || profesional.especialidad;
    profesional.numero_tarjeta_profesional = numero_tarjeta_profesional || profesional.numero_tarjeta_profesional;
    profesional.experiencia = (experiencia !== undefined) ? experiencia : profesional.experiencia;
    profesional.id_usuario = id_usuario || profesional.id_usuario;

    await profesional.save();

    return res.status(200).json({ message: 'Profesional actualizado exitosamente.', profesional });
  } catch (error) {
    console.error('Error actualizando profesional:', error);
    return res.status(500).json({ message: 'Error del servidor al actualizar el profesional.' });
  }
};

/**
 * Eliminar un profesional.
 * DELETE /api/profesionales/:id
 */
const deleteProfesional = async (req, res) => {
  try {
    const { id } = req.params;
    const profesional = await Profesional.findByPk(id);
    if (!profesional) {
      return res.status(404).json({ message: 'Profesional no encontrado.' });
    }

    await profesional.destroy();
    return res.status(200).json({ message: 'Profesional eliminado exitosamente.' });
  } catch (error) {
    console.error('Error eliminando profesional:', error);
    return res.status(500).json({ message: 'Error del servidor al eliminar el profesional.' });
  }
};

module.exports = {
  getProfesionales,
  getProfesionalById,
  createProfesional,
  updateProfesional,
  deleteProfesional,
};
