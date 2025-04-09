/**
 * @file usuariosRoutes.js
 * @description Rutas para la gestión de usuarios en la plataforma.
 *
 * Endpoints:
 *  - GET /usuarios: Obtiene la lista de todos los usuarios registrados.
 *  - GET /usuarios/:id: Obtiene la información de un usuario específico.
 *  - POST /usuarios: Crea un nuevo usuario en la plataforma.
 *  - PUT /usuarios/:id: Actualiza la información de un usuario existente.
 *  - DELETE /usuarios/:id: Elimina un usuario de la plataforma.
 *
 * Estas rutas permiten administrar la información de los usuarios registrados.
 */

const express = require('express');
const router = express.Router();

// Importa el controlador de usuarios
const usuariosController = require('../controllers/usuariosController');

/**
 * @route   GET /usuarios
 * @desc    Obtiene la lista de todos los usuarios registrados en la plataforma.
 * @access  Privado (Solo administradores)
 */
router.get('/usuarios', usuariosController.getUsuarios);

/**
 * @route   GET /usuarios/:id
 * @desc    Obtiene la información detallada de un usuario específico.
 * @access  Privado (Solo administradores y el propio usuario)
 */
router.get('/usuarios/:id', usuariosController.getUsuarioById);

/**
 * @route   POST /usuarios
 * @desc    Crea un nuevo usuario en la plataforma.
 * @access  Público (Registro de nuevos usuarios)
 */
router.post('/usuarios', usuariosController.createUsuario);

/**
 * @route   PUT /usuarios/:id
 * @desc    Actualiza la información de un usuario existente.
 * @access  Privado (Solo el usuario propietario o un administrador)
 */
router.put('/usuarios/:id', usuariosController.updateUsuario);

/**
 * @route   DELETE /usuarios/:id
 * @desc    Elimina un usuario de la plataforma.
 * @access  Privado (Solo administradores)
 */
router.delete('/usuarios/:id', usuariosController.deleteUsuario);

module.exports = router;
