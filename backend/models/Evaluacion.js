// backend/models/Evaluacion.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Importa sequelize desde db.js

/**
 * Modelo de Evaluación
 * Representa la tabla "evaluaciones" en la base de datos con las siguientes columnas:
 * - id: Identificador único de la evaluación.
 * - id_paciente: Identificador del paciente relacionado con la evaluación (relacionado con la tabla pacientes).
 * - id_profesional: Identificador del profesional que realiza la evaluación (relacionado con la tabla profesionales).
 * - tipo: Tipo de evaluación (por ejemplo, "Inicial", "Seguimiento", "Evaluación final").
 * - resultado: Resultado de la evaluación (puede ser un texto con detalles o una breve conclusión).
 * - fecha: Fecha en la que se realizó la evaluación.
 */
const Evaluacion = sequelize.define('Evaluacion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_paciente: {
    type: DataTypes.INTEGER,
    references: {
      model: 'pacientes',
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
    onDelete: 'SET NULL' // Si el profesional es eliminado, no se borra la evaluación, solo se establece a NULL
  },
  tipo: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  resultado: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'evaluaciones',
  timestamps: false  // La tabla no maneja createdAt y updatedAt automáticamente
});

// Asociaciones
Evaluacion.associate = (models) => {
  Evaluacion.belongsTo(models.Paciente, { foreignKey: 'id_paciente' });
  Evaluacion.belongsTo(models.Profesional, { foreignKey: 'id_profesional' });
  Evaluacion.hasMany(models.ComentarioEvaluacion, { foreignKey: 'id_evaluacion' });
};

module.exports = Evaluacion;