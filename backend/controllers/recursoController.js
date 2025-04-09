// backend/controllers/recursoController.js

const Recurso = require('../models/Recurso');
const Usuario = require('../models/Usuario');

/**
 * Obtener todos los recursos disponibles.
 * GET /api/recursos
 */
const getRecursos = async (req, res) => {
  try {
    const recursos = await Recurso.findAll({
      include: {
        model: Usuario,
        attributes: ['nombre', 'apellido', 'email']
      },
      order: [['fecha_subida', 'DESC']]
    });

    return res.status(200).json({ recursos });
  } catch (error) {
    console.error('Error obteniendo recursos:', error);
    return res.status(500).json({ message: 'Error del servidor al obtener los recursos.' });
  }
};

/**
 * Obtener un recurso por su ID.
 * GET /api/recursos/:id
 */
const getRecursoById = async (req, res) => {
  try {
    const { id } = req.params;
    const recurso = await Recurso.findByPk(id, {
      include: {
        model: Usuario,
        attributes: ['nombre', 'apellido', 'email']
      }
    });

    if (!recurso) {
      return res.status(404).json({ message: 'Recurso no encontrado.' });
    }

    return res.status(200).json({ recurso });
  } catch (error) {
    console.error('Error obteniendo recurso por ID:', error);
    return res.status(500).json({ message: 'Error del servidor al obtener el recurso.' });
  }
};

/**
 * Registrar un nuevo recurso.
 * POST /api/recursos
 * Se esperan en el body: usuario_id, titulo, descripcion, url, tipo.
 */
const createRecurso = async (req, res) => {
  try {
    const { usuario_id, titulo, descripcion, url, tipo } = req.body;

    if (!usuario_id || !titulo || !url || !tipo) {
      return res.status(400).json({ message: 'Se requieren usuario_id, título, URL y tipo de recurso para registrarlo.' });
    }

    const nuevoRecurso = await Recurso.create({
      usuario_id,
      titulo,
      descripcion,
      url,
      tipo,
      fecha_subida: new Date()
    });

    return res.status(201).json({ message: 'Recurso registrado exitosamente.', recurso: nuevoRecurso });
  } catch (error) {
    console.error('Error registrando recurso:', error);
    return res.status(500).json({ message: 'Error del servidor al registrar el recurso.' });
  }
};

/**
 * Actualizar un recurso.
 * PUT /api/recursos/:id
 * Permite actualizar: titulo, descripcion, url, tipo.
 */
const updateRecurso = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, url, tipo } = req.body;

    const recurso = await Recurso.findByPk(id);
    if (!recurso) {
      return res.status(404).json({ message: 'Recurso no encontrado.' });
    }

    recurso.titulo = titulo || recurso.titulo;
    recurso.descripcion = descripcion || recurso.descripcion;
    recurso.url = url || recurso.url;
    recurso.tipo = tipo || recurso.tipo;

    await recurso.save();

    return res.status(200).json({ message: 'Recurso actualizado exitosamente.', recurso });
  } catch (error) {
    console.error('Error actualizando recurso:', error);
    return res.status(500).json({ message: 'Error del servidor al actualizar el recurso.' });
  }
};

/**
 * Eliminar un recurso.
 * DELETE /api/recursos/:id
 */
const deleteRecurso = async (req, res) => {
  try {
    const { id } = req.params;
    const recurso = await Recurso.findByPk(id);
    if (!recurso) {
      return res.status(404).json({ message: 'Recurso no encontrado.' });
    }

    await recurso.destroy();
    return res.status(200).json({ message: 'Recurso eliminado exitosamente.' });
  } catch (error) {
    console.error('Error eliminando recurso:', error);
    return res.status(500).json({ message: 'Error del servidor al eliminar el recurso.' });
  }
};

module.exports = {
  getRecursos,
  getRecursoById,
  createRecurso,
  updateRecurso,
  deleteRecurso,
};
