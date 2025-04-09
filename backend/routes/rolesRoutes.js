/**
 * @file rolesRoutes.js
 * @description Rutas para la administración de roles y permisos en la plataforma.
 *
 * Endpoints:
 *  - GET /roles: Obtiene la lista de todos los roles disponibles.
 *  - GET /roles/:id: Obtiene la información de un rol específico.
 *  - POST /roles: Crea un nuevo rol en la plataforma.
 *  - PUT /roles/:id: Actualiza un rol existente.
 *  - DELETE /roles/:id: Elimina un rol de la plataforma.
 *
 * Estas rutas permiten gestionar los roles y permisos de los usuarios.
 */

const express = require('express');
const router = express.Router();

// Importa el controlador de roles
const rolesController = require('../controllers/rolesController');

/**
 * @route   GET /roles
 * @desc    Obtiene la lista de todos los roles disponibles.
 * @access  Privado (Solo administradores)
 */
router.get('/roles', rolesController.getRoles);

/**
 * @route   GET /roles/:id
 * @desc    Obtiene la información detallada de un rol específico.
 * @access  Privado (Solo administradores)
 */
router.get('/roles/:id', rolesController.getRoleById); // Corregido: antes era getRolById

/**
 * @route   POST /roles
 * @desc    Crea un nuevo rol en la plataforma.
 * @access  Privado (Solo administradores)
 */
router.post('/roles', rolesController.createRole); // Corregido: antes era createRol

/**
 * @route   PUT /roles/:id
 * @desc    Actualiza la información de un rol existente.
 * @access  Privado (Solo administradores)
 */
router.put('/roles/:id', rolesController.updateRole); // Corregido: antes era updateRol

/**
 * @route   DELETE /roles/:id
 * @desc    Elimina un rol de la plataforma.
 * @access  Privado (Solo administradores)
 */
router.delete('/roles/:id', rolesController.deleteRole); // Corregido: antes era deleteRol

module.exports = router;
