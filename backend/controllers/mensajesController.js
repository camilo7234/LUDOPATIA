// backend/controllers/mensajesController.js

const { Op } = require('sequelize');
const Mensaje = require('../models/Mensaje');

/**
 * Obtener mensajes.
 * GET /api/mensajes
 * Permite filtrar mensajes por id_chat (opcional) mediante query parameter.
 */
const getMensajes = async (req, res) => {
  try {
    const { id_chat } = req.query;
    const filter = id_chat ? { id_chat } : {};

    const mensajes = await Mensaje.findAll({ where: filter, order: [['fecha', 'ASC']] });
    return res.status(200).json({ mensajes });
  } catch (error) {
    console.error('Error obteniendo mensajes:', error);
    return res.status(500).json({ message: 'Error del servidor al obtener mensajes.' });
  }
};

/**
 * Obtener un mensaje por su ID.
 * GET /api/mensajes/:id
 */
const getMensajeById = async (req, res) => {
  try {
    const { id } = req.params;
    const mensaje = await Mensaje.findByPk(id);
    if (!mensaje) {
      return res.status(404).json({ message: 'Mensaje no encontrado.' });
    }
    return res.status(200).json({ mensaje });
  } catch (error) {
    console.error('Error obteniendo mensaje por ID:', error);
    return res.status(500).json({ message: 'Error del servidor al obtener el mensaje.' });
  }
};

/**
 * Crear un nuevo mensaje.
 * POST /api/mensajes
 * Se esperan en el body: id_chat, id_remitente y mensaje.
 */
const createMensaje = async (req, res) => {
  try {
    const { id_chat, id_remitente, mensaje } = req.body;
    if (!id_chat || !id_remitente || !mensaje) {
      return res.status(400).json({ message: 'id_chat, id_remitente y mensaje son obligatorios.' });
    }

    const nuevoMensaje = await Mensaje.create({
      id_chat,
      id_remitente,
      mensaje
    });

    return res.status(201).json({ message: 'Mensaje creado exitosamente.', mensaje: nuevoMensaje });
  } catch (error) {
    console.error('Error creando mensaje:', error);
    return res.status(500).json({ message: 'Error del servidor al crear el mensaje.' });
  }
};

/**
 * Actualizar un mensaje.
 * PUT /api/mensajes/:id
 * Permite actualizar el contenido del mensaje.
 */
const updateMensaje = async (req, res) => {
  try {
    const { id } = req.params;
    const { mensaje } = req.body;

    if (!mensaje) {
      return res.status(400).json({ message: 'El nuevo contenido del mensaje es obligatorio.' });
    }

    const mensajeExistente = await Mensaje.findByPk(id);
    if (!mensajeExistente) {
      return res.status(404).json({ message: 'Mensaje no encontrado.' });
    }

    mensajeExistente.mensaje = mensaje;
    await mensajeExistente.save();

    return res.status(200).json({ message: 'Mensaje actualizado exitosamente.', mensaje: mensajeExistente });
  } catch (error) {
    console.error('Error actualizando mensaje:', error);
    return res.status(500).json({ message: 'Error del servidor al actualizar el mensaje.' });
  }
};

/**
 * Eliminar un mensaje.
 * DELETE /api/mensajes/:id
 */
const deleteMensaje = async (req, res) => {
  try {
    const { id } = req.params;
    const mensaje = await Mensaje.findByPk(id);
    if (!mensaje) {
      return res.status(404).json({ message: 'Mensaje no encontrado.' });
    }
    await mensaje.destroy();
    return res.status(200).json({ message: 'Mensaje eliminado exitosamente.' });
  } catch (error) {
    console.error('Error eliminando mensaje:', error);
    return res.status(500).json({ message: 'Error del servidor al eliminar el mensaje.' });
  }
};

module.exports = {
  getMensajes,
  getMensajeById,
  createMensaje,
  updateMensaje,
  deleteMensaje,
};
