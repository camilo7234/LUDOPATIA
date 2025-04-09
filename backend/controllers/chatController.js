// backend/controllers/chatController.js

const { Op } = require('sequelize');
const ChatUsuario = require('../models/ChatUsuario');

/**
 * Obtiene todos los chats para un usuario.
 * GET /api/chats?usuarioId=
 */
const getChatsForUser = async (req, res) => {
  try {
    const { usuarioId } = req.query;
    if (!usuarioId) {
      return res.status(400).json({ message: 'El id de usuario es obligatorio.' });
    }
    // Buscar chats donde el usuario es participante (id_usuario1 o id_usuario2)
    const chats = await ChatUsuario.findAll({
      where: {
        [Op.or]: [
          { id_usuario1: usuarioId },
          { id_usuario2: usuarioId }
        ]
      }
    });
    return res.status(200).json({ chats });
  } catch (error) {
    console.error('Error obteniendo chats para usuario:', error);
    return res.status(500).json({ message: 'Error del servidor al obtener chats.' });
  }
};

/**
 * Obtiene un chat por su ID.
 * GET /api/chats/:id
 */
const getChatById = async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await ChatUsuario.findByPk(id);
    if (!chat) {
      return res.status(404).json({ message: 'Chat no encontrado.' });
    }
    return res.status(200).json({ chat });
  } catch (error) {
    console.error('Error obteniendo chat por ID:', error);
    return res.status(500).json({ message: 'Error del servidor al obtener el chat.' });
  }
};

/**
 * Crea un nuevo chat individual.
 * POST /api/chats
 */
const createChat = async (req, res) => {
  try {
    const { id_usuario1, id_usuario2, tipo_chat } = req.body;
    if (!id_usuario1 || !id_usuario2) {
      return res.status(400).json({ message: 'id_usuario1 e id_usuario2 son obligatorios.' });
    }
    // Para chats individuales, verificar si ya existe uno entre estos usuarios
    if (!tipo_chat || tipo_chat === 'individual') {
      const existingChat = await ChatUsuario.findOne({
        where: {
          [Op.or]: [
            { id_usuario1, id_usuario2 },
            { id_usuario1: id_usuario2, id_usuario2: id_usuario1 }
          ]
        }
      });
      if (existingChat) {
        return res.status(400).json({ message: 'Ya existe un chat individual entre estos usuarios.', chat: existingChat });
      }
    }
    const newChat = await ChatUsuario.create({
      id_usuario1,
      id_usuario2,
      tipo_chat: tipo_chat || 'individual'
    });
    return res.status(201).json({ message: 'Chat creado exitosamente.', chat: newChat });
  } catch (error) {
    console.error('Error creando chat:', error);
    return res.status(500).json({ message: 'Error del servidor al crear el chat.' });
  }
};

/**
 * Elimina un chat.
 * DELETE /api/chats/:id
 */
const deleteChat = async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await ChatUsuario.findByPk(id);
    if (!chat) {
      return res.status(404).json({ message: 'Chat no encontrado.' });
    }
    await chat.destroy();
    return res.status(200).json({ message: 'Chat eliminado exitosamente.' });
  } catch (error) {
    console.error('Error eliminando chat:', error);
    return res.status(500).json({ message: 'Error del servidor al eliminar el chat.' });
  }
};

module.exports = {
  getChatsForUser,
  getChatById,
  createChat,
  deleteChat,
};
