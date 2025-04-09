// backend/models/ComentarioEvaluacion.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Importa sequelize desde db.js

/**
 * Modelo de Comentario de Evaluación
 * Representa la tabla "comentarios_evaluaciones" en la base de datos con las siguientes columnas:
 * - id: Identificador único del comentario.
 * - id_evaluacion: Identificador de la evaluación a la que pertenece el comentario (relacionado con la tabla evaluaciones).
 * - id_profesional: Identificador del profesional que realizó el comentario (relacionado con la tabla profesionales).
 * - comentario: El texto del comentario realizado por el profesional.
 * - fecha: Fecha en la que se hizo el comentario.
 */
const ComentarioEvaluacion = sequelize.define('ComentarioEvaluacion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_evaluacion: {
    type: DataTypes.INTEGER,
    references: {
      model: 'evaluaciones',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  id_profesional: {
    type: DataTypes.INTEGER,
    references: {
      model: 'profesionales',
      key: 'id'
    },
    onDelete: 'SET NULL' // Si el profesional es eliminado, no se borra el comentario, solo se establece a NULL
  },
  comentario: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'comentarios_evaluaciones',
  timestamps: false  // La tabla no maneja createdAt y updatedAt automáticamente
});

// Asociaciones
ComentarioEvaluacion.associate = (models) => {
  ComentarioEvaluacion.belongsTo(models.Evaluacion, { foreignKey: 'id_evaluacion' });
  ComentarioEvaluacion.belongsTo(models.Profesional, { foreignKey: 'id_profesional' });
};

module.exports = ComentarioEvaluacion;