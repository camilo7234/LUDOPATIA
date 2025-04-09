// backend/models/EncuestaSatisfaccion.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Importa sequelize desde db.js

/**
 * Modelo de Encuesta de Satisfacción
 * Representa la tabla "encuestas_satisfaccion" en la base de datos con las siguientes columnas:
 * - id: Identificador único de la encuesta.
 * - id_paciente: Identificador del paciente que respondió la encuesta (relacionado con la tabla pacientes).
 * - id_profesional: Identificador del profesional que atendió al paciente (relacionado con la tabla profesionales).
 * - puntuacion: Puntuación otorgada por el paciente (escala numérica, por ejemplo, de 1 a 5).
 * - comentarios: Comentarios adicionales proporcionados por el paciente.
 * - fecha: Fecha en la que se respondió la encuesta.
 */
const EncuestaSatisfaccion = sequelize.define('EncuestaSatisfaccion', {
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
    onDelete: 'SET NULL' // Si el profesional es eliminado, no se borra la encuesta, solo se establece a NULL
  },
  puntuacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  comentarios: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'encuestas_satisfaccion',
  timestamps: false  // La tabla no maneja createdAt y updatedAt automáticamente
});

// Asociaciones
EncuestaSatisfaccion.associate = (models) => {
  EncuestaSatisfaccion.belongsTo(models.Paciente, { foreignKey: 'id_paciente' });
  EncuestaSatisfaccion.belongsTo(models.Profesional, { foreignKey: 'id_profesional' });
};

module.exports = EncuestaSatisfaccion;