const Sequelize = require('sequelize');

const sequelize = new Sequelize('bd_ludopatia', 'postgres', '1234', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  logging: false,
});

// Función para probar la conexión
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a PostgreSQL establecida con éxito.');
  } catch (error) {
    console.error('Error al conectar con PostgreSQL:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };