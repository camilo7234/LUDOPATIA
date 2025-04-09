// backend/models/Reporte.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Importa sequelize desde db.js

/**
 * Modelo de Reporte
 * Representa la tabla "reportes" en la base de datos con las siguientes columnas:
 * - id: Identificador único del reporte.
 * - id_reportante: Identificador del usuario que realiza el reporte.
 * - id_usuario_reportado: Identificador del usuario que está siendo reportado.
 * - tipo: Tipo de reporte (por ejemplo, "comportamiento", "fraude", etc.).
 * - descripcion: Descripción detallada del reporte.
 * - estado: Estado del reporte (por ejemplo, "pendiente", "resuelto", etc.).
 * - fecha: Fecha en que se realiza el reporte.
 */
const Reporte = sequelize.define('Reporte', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_reportante: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'usuarios',
      key: 'id'
    },
    onDelete: 'SET NULL'
  },
  id_usuario_reportado: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'usuarios',
      key: 'id'
    },
    onDelete: 'SET NULL'
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING,
    defaultValue: 'pendiente',
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'reportes',
  timestamps: false  // La tabla no maneja createdAt y updatedAt automáticamente
});

module.exports = Reporte;