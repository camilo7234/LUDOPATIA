// backend/routes/chatRoutes.js

const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * Rutas para la gestión de chats.
 */
// Crear un nuevo chat
router.post('/chats', authMiddleware, chatController.createChat);

// Obtener los chats de un usuario
router.get('/chats', authMiddleware, chatController.getChatsForUser);

// Obtener un chat específico por ID
router.get('/chats/:chatId', authMiddleware, chatController.getChatById);

// Eliminar un chat
router.delete('/chats/:chatId', authMiddleware, chatController.deleteChat);

module.exports = router;
