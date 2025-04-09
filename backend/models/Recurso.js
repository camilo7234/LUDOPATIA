// backend/models/Recurso.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Importa sequelize desde db.js

/**
 * Modelo de Recurso
 * Representa la tabla "recursos" en la base de datos con las siguientes columnas:
 * - id: Identificador único del recurso.
 * - titulo: Título del recurso (obligatorio).
 * - descripcion: Descripción detallada del recurso (opcional).
 * - enlace: Enlace al recurso (opcional, URL).
 * - categoria: Categoría del recurso (por ejemplo, "educativo", "prevención", etc.).
 * - creado_por: Identificador del usuario que creó el recurso (relacionado con la tabla usuarios).
 * - fecha_publicacion: Fecha en que el recurso fue publicado.
 */
const Recurso = sequelize.define('Recurso', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  enlace: {
    type: DataTypes.STRING,
    allowNull: true
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: true
  },
  creado_por: {
    type: DataTypes.INTEGER,
    references: {
      model: 'usuarios',
      key: 'id'
    },
    onDelete: 'SET NULL'
  },
  fecha_publicacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'recursos',
  timestamps: false  // La tabla no maneja createdAt y updatedAt automáticamente
});

module.exports = Recurso;