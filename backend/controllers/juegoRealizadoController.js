// backend/controllers/juegoRealizadoController.js

const JuegoRealizado = require('../models/JuegoRealizado');
const Juego = require('../models/Juego');
const Usuario = require('../models/Usuario');

/**
 * Obtener todos los juegos realizados.
 * GET /api/juegos-realizados
 */
const getJuegosRealizados = async (req, res) => {
  try {
    const juegosRealizados = await JuegoRealizado.findAll({
      include: [
        { model: Juego, attributes: ['nombre', 'tipo'] },
        { model: Usuario, attributes: ['nombre', 'email'] }
      ],
      order: [['fecha_realizacion', 'DESC']]
    });
    return res.status(200).json({ juegosRealizados });
  } catch (error) {
    console.error('Error obteniendo juegos realizados:', error);
    return res.status(500).json({ message: 'Error del servidor al obtener los juegos realizados.' });
  }
};

/**
 * Obtener un juego realizado por ID.
 * GET /api/juegos-realizados/:id
 */
const getJuegoRealizadoById = async (req, res) => {
  try {
    const { id } = req.params;
    const juegoRealizado = await JuegoRealizado.findByPk(id, {
      include: [
        { model: Juego, attributes: ['nombre', 'tipo'] },
        { model: Usuario, attributes: ['nombre', 'email'] }
      ]
    });

    if (!juegoRealizado) {
      return res.status(404).json({ message: 'Juego realizado no encontrado.' });
    }
    return res.status(200).json({ juegoRealizado });
  } catch (error) {
    console.error('Error obteniendo juego realizado por ID:', error);
    return res.status(500).json({ message: 'Error del servidor al obtener el juego realizado.' });
  }
};

/**
 * Registrar un nuevo juego realizado.
 * POST /api/juegos-realizados
 * Se esperan en el body: usuario_id, juego_id, puntuacion, comentarios.
 */
const createJuegoRealizado = async (req, res) => {
  try {
    const { usuario_id, juego_id, puntuacion, comentarios } = req.body;

    if (!usuario_id || !juego_id || puntuacion === undefined) {
      return res.status(400).json({ message: 'Se requieren usuario_id, juego_id y puntuacion para registrar el juego realizado.' });
    }

    const nuevoJuegoRealizado = await JuegoRealizado.create({
      usuario_id,
      juego_id,
      puntaje: puntuacion, // Corrección: El campo en el modelo es 'puntaje'
      comentarios,
      fecha: new Date() // Corrección: El campo en el modelo es 'fecha'
    });

    return res.status(201).json({ message: 'Juego realizado registrado exitosamente.', juegoRealizado: nuevoJuegoRealizado });
  } catch (error) {
    console.error('Error registrando juego realizado:', error);
    return res.status(500).json({ message: 'Error del servidor al registrar el juego realizado.' });
  }
};

/**
 * Actualizar un juego realizado.
 * PUT /api/juegos-realizados/:id
 * Permite actualizar: puntuacion, comentarios.
 */
const updateJuegoRealizado = async (req, res) => {
  try {
    const { id } = req.params;
    const { puntuacion, comentarios } = req.body;

    const juegoRealizado = await JuegoRealizado.findByPk(id);
    if (!juegoRealizado) {
      return res.status(404).json({ message: 'Juego realizado no encontrado.' });
    }

    juegoRealizado.puntaje = puntuacion !== undefined ? puntuacion : juegoRealizado.puntaje; // Corrección: El campo en el modelo es 'puntaje'
    juegoRealizado.comentarios = comentarios || juegoRealizado.comentarios;

    await juegoRealizado.save();

    return res.status(200).json({ message: 'Juego realizado actualizado exitosamente.', juegoRealizado });
  } catch (error) {
    console.error('Error actualizando juego realizado:', error);
    return res.status(500).json({ message: 'Error del servidor al actualizar el juego realizado.' });
  }
};

/**
 * Eliminar un juego realizado.
 * DELETE /api/juegos-realizados/:id
 */
const deleteJuegoRealizado = async (req, res) => {
  try {
    const { id } = req.params;
    const juegoRealizado = await JuegoRealizado.findByPk(id);
    if (!juegoRealizado) {
      return res.status(404).json({ message: 'Juego realizado no encontrado.' });
    }
    await juegoRealizado.destroy();
    return res.status(200).json({ message: 'Juego realizado eliminado exitosamente.' });
  } catch (error) {
    console.error('Error eliminando juego realizado:', error);
    return res.status(500).json({ message: 'Error del servidor al eliminar el juego realizado.' });
  }
};

module.exports = {
  getJuegosRealizados,
  getJuegoRealizadoById,
  createJuegoRealizado,
  updateJuegoRealizado,
  deleteJuegoRealizado,
};