// backend/models/JuegoRealizado.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Importa sequelize desde db.js

/**
 * Modelo de JuegoRealizado
 * Representa la tabla "juegos_realizados" en la base de datos con las siguientes columnas:
 * - id: Identificador único del juego realizado.
 * - id_paciente: Identificador del paciente que ha jugado el juego (relacionado con la tabla pacientes).
 * - id_juego: Identificador del juego que ha sido jugado (relacionado con la tabla juegos).
 * - fecha: Fecha en la que se jugó el juego.
 * - puntaje: Puntaje obtenido por el paciente al jugar el juego.
 */
const JuegoRealizado = sequelize.define('JuegoRealizado', {
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
  id_juego: {
    type: DataTypes.INTEGER,
    references: {
      model: 'juegos',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'fecha_realizacion' // Asegúrate de que el nombre de la columna coincida
  },
  puntaje: {
    type: DataTypes.INTEGER,
    allowNull: true  // El puntaje es opcional y puede no ser proporcionado en ciertos casos
  },
  comentarios: { // Añade la columna 'comentarios' si la estás utilizando
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'juegos_realizados',
  timestamps: false  // La tabla no maneja createdAt y updatedAt automáticamente
});

// Asociaciones
JuegoRealizado.associate = (models) => {
  JuegoRealizado.belongsTo(models.Paciente, { foreignKey: 'id_paciente' });
  JuegoRealizado.belongsTo(models.Juego, { foreignKey: 'id_juego' });
};

module.exports = JuegoRealizado;