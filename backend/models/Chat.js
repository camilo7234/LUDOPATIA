// backend/models/Chat.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Importa sequelize desde db.js

/**
 * Modelo de Chat
 * Representa la tabla "mensajes" que almacena los mensajes enviados dentro de los chats entre usuarios
 * - id: Identificador único del mensaje.
 * - id_chat: Identificador del chat al que pertenece el mensaje.
 * - id_remitente: Identificador del usuario que envía el mensaje.
 * - mensaje: Contenido del mensaje.
 * - fecha: Fecha y hora del mensaje.
 */
const Chat = sequelize.define('Chat', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_chat: {
    type: DataTypes.INTEGER,
    references: {
      model: 'chat',
      key: 'id'
    },
    onDelete: 'CASCADE' // Si el chat es eliminado, se eliminan los mensajes asociados
  },
  id_remitente: {
    type: DataTypes.INTEGER,
    references: {
      model: 'usuarios',
      key: 'id'
    },
    onDelete: 'CASCADE' // Si el usuario es eliminado, se eliminan los mensajes enviados por él
  },
  mensaje: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  fecha: {
    type: DataTypes.TIMESTAMP,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'mensajes',
  timestamps: false // La tabla no maneja createdAt y updatedAt automáticamente
});

// Asociaciones
Chat.associate = (models) => {
  // Relaciona los mensajes con los usuarios (remitente)
  Chat.belongsTo(models.Usuario, { foreignKey: 'id_remitente', as: 'Remitente' });

  // Relaciona los mensajes con los chats
  Chat.belongsTo(models.ChatUsuario, { foreignKey: 'id_chat', as: 'Chat' });
};

module.exports = Chat;