const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rutas
router.get('/', usuarioController.getAllUsers);
router.post('/', usuarioController.createUser);

module.exports = router;
