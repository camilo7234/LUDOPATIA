/**
 * @file authRoutes.js
 * @description Define las rutas relacionadas con la autenticación de usuarios.
 * Se incluyen endpoints para el registro y el inicio de sesión.
 *
 * Endpoints:
 *  - POST /register: Registra un nuevo usuario en la plataforma.
 *  - POST /login: Autentica a un usuario y retorna un token de sesión.
 *
 * Cada ruta invoca el método correspondiente del controlador de autenticación.
 */

const express = require('express');
const router = express.Router();

// Importa el controlador de autenticación.
const authController = require('../controllers/authController');

/**
 * @route   POST /register
 * @desc    Registra un nuevo usuario.
 * @access  Público
 */
router.post('/register', authController.register);

/**
 * @route   POST /login
 * @desc    Autentica a un usuario y retorna un token JWT.
 * @access  Público
 */
router.post('/login', authController.login);

// Se pueden agregar rutas adicionales relacionadas con la autenticación (por ejemplo, logout, refresh token, etc.)

module.exports = router;
