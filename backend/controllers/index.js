// backend/controllers/index.js

const authController = require('./authController');
const citasController = require('./citasController');
const evaluacionesController = require('./evaluacionesController');
const chatController = require('./chatController');
const reportesController = require('./reportesController');
const chatUsuariosController = require('./chatUsuariosController');

module.exports = {
  authController,
  citasController,
  evaluacionesController,
  chatController,
  reportesController,
  chatUsuariosController,
};
