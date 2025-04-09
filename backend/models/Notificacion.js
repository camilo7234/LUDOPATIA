// backend/models/Notificacion.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Importa sequelize desde db.js

/**
 * Modelo de Notificación
 * Representa la tabla "notificaciones" en la base de datos con las siguientes columnas:
 * - id: Identificador único de la notificación.
 * - id_usuario: Identificador del usuario al que se le envía la notificación (relacionado con la tabla usuarios).
 * - mensaje: Contenido del mensaje de la notificación.
 * - leido: Indica si la notificación ha sido leída (por defecto es false).
 * - fecha: Fecha en la que se creó la notificación.
 */
const Notificacion = sequelize.define('Notificacion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_usuario: {
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
  leido: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  tipo: { // Añade la columna 'tipo' si la estás utilizando
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'notificaciones',
  timestamps: false  // La tabla no maneja createdAt y updatedAt automáticamente
});

// Asociaciones
Notificacion.associate = (models) => {
  Notificacion.belongsTo(models.Usuario, { foreignKey: 'id_usuario' });
};

module.exports = Notificacion;