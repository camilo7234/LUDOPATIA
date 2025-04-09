// backend/models/Bitacora.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Importa sequelize desde db.js

/**
 * Modelo de Bitácora
 * Representa la tabla "bitacora" que almacena las acciones realizadas en la plataforma
 * - id: Identificador único de la bitácora.
 * - id_usuario: Identificador del usuario que realizó la acción.
 * - accion: Descripción de la acción realizada.
 * - tabla_afectada: Nombre de la tabla afectada por la acción.
 * - id_registro_afectado: Identificador del registro afectado.
 * - fecha: Fecha y hora de la acción.
 */
const Bitacora = sequelize.define('Bitacora', {
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
    onDelete: 'SET NULL' // Si el usuario es eliminado, la acción quedará registrada con el campo id_usuario como NULL
  },
  accion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  tabla_afectada: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  id_registro_afectado: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE, // Corrección: Usar DataTypes.DATE para fechas y horas
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'bitacora',
  timestamps: false // La tabla no maneja createdAt y updatedAt automáticamente
});

// Asociaciones
Bitacora.associate = (models) => {
  // Relaciona la bitácora con los usuarios
  Bitacora.belongsTo(models.Usuario, { foreignKey: 'id_usuario', as: 'Usuario' });
};

module.exports = Bitacora;