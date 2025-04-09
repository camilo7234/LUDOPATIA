// backend/models/Usuario.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Importa sequelize desde db.js
const Rol = require('./Rol'); // Importa el modelo Rol

/**
 * Modelo de Usuario
 * Representa la tabla "usuarios" en la base de datos con las siguientes columnas:
 * - id: Identificador único del usuario.
 * - nombre_completo: Nombre completo del usuario.
 * - cedula: Documento de identidad del usuario (opcional).
 * - correo: Correo electrónico (único y obligatorio).
 * - telefono: Número de teléfono (opcional).
 * - direccion: Dirección física (opcional).
 * - ciudad: Ciudad (opcional).
 * - pais: País (opcional).
 * - contraseña_hash: Contraseña encriptada almacenada como BYTEA.
 * - creado_en: Fecha de creación del registro (valor por defecto: NOW).
 * - estado: Estado del usuario (activo, suspendido, eliminado; valor por defecto: 'activo').
 */
const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_completo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cedula: {
    type: DataTypes.STRING,
    allowNull: true
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true
  },
  direccion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  ciudad: {
    type: DataTypes.STRING,
    allowNull: true
  },
  pais: {
    type: DataTypes.STRING,
    allowNull: true
  },
  contraseña_hash: {
    type: DataTypes.BLOB,
    allowNull: false
  },
  creado_en: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  estado: {
    type: DataTypes.STRING,
    defaultValue: 'activo'
  }
}, {
  tableName: 'usuarios',
  timestamps: false   // Si la tabla no maneja createdAt y updatedAt automáticamente
});

// Definir la asociación con el modelo Rol
// ¡CORRECCIÓN AQUÍ! Cambia 'rol' a 'roles' para que coincida con authController.js
Usuario.belongsToMany(Rol, {
  through: 'usuario_roles', // Nombre de la tabla intermedia
  foreignKey: 'id_usuario',
  otherKey: 'id_rol',
  as: 'roles' // Alias para la asociación
});

module.exports = Usuario;