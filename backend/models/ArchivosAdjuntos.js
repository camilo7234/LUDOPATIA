// backend/models/ArchivosAdjuntos.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Importa sequelize desde db.js

/**
 * Modelo de Archivos Adjuntos
 * Representa la tabla "archivos_adjuntos" que almacena archivos subidos por los usuarios
 * - id: Identificador único del archivo adjunto.
 * - id_usuario: Identificador del usuario que subió el archivo.
 * - id_registro_afectado: Identificador del registro asociado al archivo (puede ser un paciente, profesional, etc.).
 * - archivo_url: URL del archivo almacenado.
 * - tipo_archivo: Tipo de archivo (por ejemplo, imagen, documento).
 * - fecha_subida: Fecha y hora en que se subió el archivo.
 */
const ArchivosAdjuntos = sequelize.define('ArchivosAdjuntos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    references: {
      model: 'usuarios',
      key: 'id'
    },
    onDelete: 'SET NULL' // Si el usuario es eliminado, la relación con los archivos se actualizará a NULL
  },
  id_registro_afectado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'ID del registro afectado (ej. paciente, profesional, etc.).'
  },
  archivo_url: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: 'Ruta o URL donde está almacenado el archivo.'
  },
  tipo_archivo: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: 'Tipo de archivo (imagen, documento, etc.).'
  },
  fecha_subida: {
    type: DataTypes.DATE, // Corrección: Usar DataTypes.DATE para fechas y horas
    defaultValue: DataTypes.NOW,
    comment: 'Fecha y hora en que se subió el archivo.'
  }
}, {
  tableName: 'archivos_adjuntos',
  timestamps: false // La tabla no maneja createdAt y updatedAt automáticamente
});

// Asociaciones
ArchivosAdjuntos.associate = (models) => {
  // Relaciona los archivos adjuntos con los usuarios
  ArchivosAdjuntos.belongsTo(models.Usuario, { foreignKey: 'id_usuario', as: 'Usuario' });
};

module.exports = ArchivosAdjuntos;