// backend/models/HistorialClinico.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Importa sequelize desde db.js

/**
 * Modelo de Historial Clínico
 * Representa la tabla "historial_clinico" en la base de datos con las siguientes columnas:
 * - id: Identificador único del historial clínico.
 * - id_paciente: Identificador del paciente relacionado con el historial clínico (relacionado con la tabla pacientes).
 * - id_profesional: Identificador del profesional relacionado con el historial clínico (relacionado con la tabla profesionales).
 * - fecha: Fecha en la que se creó el historial clínico.
 * - descripcion: Descripción de la consulta o sesión.
 * - diagnostico: Diagnóstico dado al paciente durante la consulta.
 * - tratamiento: Tratamiento propuesto o seguido para el paciente.
 */
const HistorialClinico = sequelize.define('HistorialClinico', {
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
    onDelete: 'SET NULL' // Si se elimina un profesional, no se borra el historial, solo se establece a NULL
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  diagnostico: {
    type: DataTypes.TEXT,
    allowNull: true  // Puede estar vacío si el diagnóstico aún no se ha establecido
  },
  tratamiento: {
    type: DataTypes.TEXT,
    allowNull: true  // Puede estar vacío si el tratamiento no ha sido prescrito
  }
}, {
  tableName: 'historial_clinico',
  timestamps: false  // La tabla no maneja createdAt y updatedAt automáticamente
});

// Asociaciones
HistorialClinico.associate = (models) => {
  HistorialClinico.belongsTo(models.Paciente, { foreignKey: 'id_paciente' });
  HistorialClinico.belongsTo(models.Profesional, { foreignKey: 'id_profesional' });
};

module.exports = HistorialClinico;