// backend/models/ChatUsuario.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Importa sequelize desde db.js

/**
 * Modelo de ChatUsuario
 * Representa la tabla "chat" que almacena las relaciones entre usuarios para las conversaciones
 * - id: Identificador único del chat.
 * - id_usuario1: Identificador del primer usuario en el chat.
 * - id_usuario2: Identificador del segundo usuario en el chat.
 */
const ChatUsuario = sequelize.define('ChatUsuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_usuario1: {
    type: DataTypes.INTEGER,
    references: {
      model: 'usuarios',
      key: 'id'
    },
    onDelete: 'CASCADE' // Si el primer usuario es eliminado, se elimina el chat
  },
  id_usuario2: {
    type: DataTypes.INTEGER,
    references: {
      model: 'usuarios',
      key: 'id'
    },
    onDelete: 'CASCADE' // Si el segundo usuario es eliminado, se elimina el chat
  }
}, {
  tableName: 'chat',
  timestamps: false // La tabla no maneja createdAt y updatedAt automáticamente
});

// Asociaciones
ChatUsuario.associate = (models) => {
  ChatUsuario.belongsTo(models.Usuario, { foreignKey: 'id_usuario1', as: 'Usuario1' });
  ChatUsuario.belongsTo(models.Usuario, { foreignKey: 'id_usuario2', as: 'Usuario2' });
};

module.exports = ChatUsuario;