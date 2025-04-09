// backend/models/Mensaje.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Importa sequelize desde db.js

/**
 * Modelo de Mensaje
 * Representa la tabla "mensajes" en la base de datos con las siguientes columnas:
 * - id: Identificador único del mensaje.
 * - id_chat: Identificador del chat al que pertenece el mensaje (relacionado con la tabla chat).
 * - id_remitente: Identificador del usuario que envía el mensaje (relacionado con la tabla usuarios).
 * - mensaje: Contenido del mensaje.
 * - fecha: Fecha en la que se envió el mensaje.
 */
const Mensaje = sequelize.define('Mensaje', {
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
    onDelete: 'CASCADE'
  },
  id_remitente: {
    type: DataTypes.INTEGER,
    references: {
      model: 'usuarios',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  mensaje: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'mensajes',
  timestamps: false  // La tabla no maneja createdAt y updatedAt automáticamente
});

// Asociaciones
Mensaje.associate = (models) => {
  Mensaje.belongsTo(models.Chat, { foreignKey: 'id_chat' });
  Mensaje.belongsTo(models.Usuario, { foreignKey: 'id_remitente' });
};

module.exports = Mensaje;