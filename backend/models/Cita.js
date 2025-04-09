// backend/models/Cita.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Importa sequelize desde db.js

/**
 * Modelo de Cita
 * Representa la tabla "citas" en la base de datos con las siguientes columnas:
 * - id: Identificador único de la cita.
 * - id_paciente: Identificador del paciente relacionado con la cita (relacionado con la tabla pacientes).
 * - id_profesional: Identificador del profesional que atiende la cita (relacionado con la tabla profesionales).
 * - fecha: Fecha y hora de la cita.
 * - estado: Estado de la cita (ej. pendiente, confirmada, cancelada).
 */
const Cita = sequelize.define('Cita', {
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
    onDelete: 'CASCADE' // Si el paciente es eliminado, la cita se elimina automáticamente
  },
  id_profesional: {
    type: DataTypes.INTEGER,
    references: {
      model: 'profesionales',
      key: 'id'
    },
    onDelete: 'SET NULL' // Si el profesional es eliminado, la cita no se elimina pero el id_profesional se establece como NULL
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'pendiente', // Valor por defecto es "pendiente"
    validate: {
      isIn: [['pendiente', 'confirmada', 'cancelada']]
    }
  }
}, {
  tableName: 'citas',
  timestamps: false  // La tabla no maneja createdAt y updatedAt automáticamente
});

// Asociaciones
Cita.associate = (models) => {
  Cita.belongsTo(models.Paciente, { foreignKey: 'id_paciente' });
  Cita.belongsTo(models.Profesional, { foreignKey: 'id_profesional' });
};

module.exports = Cita;