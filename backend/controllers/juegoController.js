// backend/controllers/juegoController.js

const Juego = require('../models/Juego');

/**
 * Obtener todos los juegos.
 * GET /api/juegos
 */
const getJuegos = async (req, res) => {
  try {
    const juegos = await Juego.findAll({ order: [['nombre', 'ASC']] });
    return res.status(200).json({ juegos });
  } catch (error) {
    console.error('Error obteniendo juegos:', error);
    return res.status(500).json({ message: 'Error del servidor al obtener los juegos.' });
  }
};

/**
 * Obtener un juego por su ID.
 * GET /api/juegos/:id
 */
const getJuegoById = async (req, res) => {
  try {
    const { id } = req.params;
    const juego = await Juego.findByPk(id);
    if (!juego) {
      return res.status(404).json({ message: 'Juego no encontrado.' });
    }
    return res.status(200).json({ juego });
  } catch (error) {
    console.error('Error obteniendo juego por ID:', error);
    return res.status(500).json({ message: 'Error del servidor al obtener el juego.' });
  }
};

/**
 * Crear un nuevo juego.
 * POST /api/juegos
 * Se esperan en el body: nombre, descripcion, tipo.
 */
const createJuego = async (req, res) => {
  try {
    const { nombre, descripcion, tipo } = req.body;

    // Validar campos obligatorios
    if (!nombre || !descripcion || !tipo) {
      return res.status(400).json({ message: 'Se requieren nombre, descripcion y tipo para crear el juego.' });
    }

    const nuevoJuego = await Juego.create({
      nombre,
      descripcion,
      url: req.body.url, // Asegúrate de que 'url' esté presente en el body si tu modelo lo requiere
      tipo
    });

    return res.status(201).json({ message: 'Juego creado exitosamente.', juego: nuevoJuego });
  } catch (error) {
    console.error('Error creando juego:', error);
    return res.status(500).json({ message: 'Error del servidor al crear el juego.' });
  }
};

/**
 * Actualizar un juego existente.
 * PUT /api/juegos/:id
 * Permite actualizar: nombre, descripcion, tipo.
 */
const updateJuego = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, tipo, url } = req.body; // Incluye 'url' si es necesario

    const juego = await Juego.findByPk(id);
    if (!juego) {
      return res.status(404).json({ message: 'Juego no encontrado.' });
    }

    juego.nombre = nombre || juego.nombre;
    juego.descripcion = descripcion || juego.descripcion;
    juego.tipo = tipo || juego.tipo;
    juego.url = url || juego.url; // Actualiza 'url' si se proporciona

    await juego.save();

    return res.status(200).json({ message: 'Juego actualizado exitosamente.', juego });
  } catch (error) {
    console.error('Error actualizando juego:', error);
    return res.status(500).json({ message: 'Error del servidor al actualizar el juego.' });
  }
};

/**
 * Eliminar un juego.
 * DELETE /api/juegos/:id
 */
const deleteJuego = async (req, res) => {
  try {
    const { id } = req.params;
    const juego = await Juego.findByPk(id);
    if (!juego) {
      return res.status(404).json({ message: 'Juego no encontrado.' });
    }
    await juego.destroy();
    return res.status(200).json({ message: 'Juego eliminado exitosamente.' });
  } catch (error) {
    console.error('Error eliminando juego:', error);
    return res.status(500).json({ message: 'Error del servidor al eliminar el juego.' });
  }
};

module.exports = {
  getJuegos,
  getJuegoById,
  createJuego,
  updateJuego,
  deleteJuego,
};