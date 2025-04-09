// backend/models/Profesional.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Importa sequelize desde db.js

/**
 * Modelo de Profesional
 * Representa la tabla "profesionales" en la base de datos con las siguientes columnas:
 * - id: Identificador único del profesional.
 * - especialidad: Especialidad del profesional (obligatorio).
 * - numero_tarjeta_profesional: Número de tarjeta profesional (obligatorio).
 * - experiencia: Descripción de la experiencia del profesional (opcional).
 * - id_usuario: Identificador del usuario relacionado al profesional (relacionado con la tabla usuarios).
 */
const Profesional = sequelize.define('Profesional', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  especialidad: {
    type: DataTypes.STRING,
    allowNull: false
  },
  numero_tarjeta_profesional: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  experiencia: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    references: {
      model: 'usuarios',
      key: 'id'
    },
    onDelete: 'SET NULL'
  }
}, {
  tableName: 'profesionales',
  timestamps: false  // La tabla no maneja createdAt y updatedAt automáticamente
});

// Asociaciones
Profesional.associate = (models) => {
  Profesional.hasMany(models.Evaluacion, { foreignKey: 'id_profesional' });
  Profesional.hasMany(models.HistorialClinico, { foreignKey: 'id_profesional' });
  Profesional.hasMany(models.Cita, { foreignKey: 'id_profesional' });
  Profesional.hasMany(models.ComentarioEvaluacion, { foreignKey: 'id_profesional' });
  Profesional.hasMany(models.EncuestaSatisfaccion, { foreignKey: 'id_profesional' });
};

module.exports = Profesional;