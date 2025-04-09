// backend/models/Rol.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Importa sequelize desde db.js

/**
 * Modelo de Rol
 * Representa la tabla "roles" en la base de datos con las siguientes columnas:
 * - id: Identificador único del rol.
 * - nombre: Nombre del rol (único y obligatorio).
 */
const Rol = sequelize.define('Rol', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'roles',
  timestamps: false  // La tabla no requiere createdAt y updatedAt
});

module.exports = Rol;