// backend/models/Juego.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Importa sequelize desde db.js

/**
 * Modelo de Juego
 * Representa la tabla "juegos" en la base de datos con las siguientes columnas:
 * - id: Identificador único del juego.
 * - nombre: Nombre del juego.
 * - descripcion: Descripción del juego.
 * - url: URL del juego, puede ser una ruta de archivo o un enlace externo.
 */
const Juego = sequelize.define('Juego', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'juegos',
  timestamps: false  // La tabla no maneja createdAt y updatedAt automáticamente
});

// Asociaciones
Juego.associate = (models) => {
  Juego.hasMany(models.JuegoRealizado, { foreignKey: 'id_juego' });
};

module.exports = Juego;