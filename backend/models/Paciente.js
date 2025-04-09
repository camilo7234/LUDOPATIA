// backend/models/Paciente.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Importa sequelize desde db.js

/**
 * Modelo de Paciente
 * Representa la tabla "pacientes" en la base de datos con las siguientes columnas:
 * - id: Identificador único del paciente.
 * - fecha_nacimiento: Fecha de nacimiento del paciente.
 * - genero: Género del paciente.
 * - estado: Estado del paciente (por ejemplo, "activo", "inactivo").
 * - antecedentes: Antecedentes médicos o personales relevantes del paciente.
 * - id_usuario: Identificador del usuario relacionado al paciente (relacionado con la tabla usuarios).
 */
const Paciente = sequelize.define('Paciente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fecha_nacimiento: {
    type: DataTypes.DATE,
    allowNull: true
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: true
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'activo'
  },
  antecedentes: {
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
  tableName: 'pacientes',
  timestamps: false  // La tabla no maneja createdAt y updatedAt automáticamente
});

// Asociaciones
Paciente.associate = (models) => {
  Paciente.hasMany(models.Evaluacion, { foreignKey: 'id_paciente' });
  Paciente.hasMany(models.ComentarioEvaluacion, { foreignKey: 'id_paciente' });
  Paciente.hasMany(models.Cita, { foreignKey: 'id_paciente' });
  Paciente.hasMany(models.JuegoRealizado, { foreignKey: 'id_paciente' });
  Paciente.hasMany(models.EncuestaSatisfaccion, { foreignKey: 'id_paciente' });
  Paciente.hasMany(models.HistorialClinico, { foreignKey: 'id_paciente' });
  Paciente.hasMany(models.Familiar, { foreignKey: 'id_paciente' });
};

module.exports = Paciente;