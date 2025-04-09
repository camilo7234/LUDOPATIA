/**
 * @file comentarioEvaluacionRoutes.js
 * @description Rutas para la gestión de comentarios en evaluaciones.
 *
 * Endpoints:
 *  - GET /comentarioEvaluacion: Obtiene la lista de todos los comentarios.
 *  - GET /comentarioEvaluacion/:id: Obtiene un comentario por su identificador.
 *  - POST /comentarioEvaluacion: Crea un nuevo comentario.
 *  - PUT /comentarioEvaluacion/:id: Actualiza un comentario existente.
 *  - DELETE /comentarioEvaluacion/:id: Elimina un comentario.
 */

const express = require('express');
const router = express.Router();

// Importa el controlador de comentarios en evaluaciones
const comentarioEvaluacionController = require('../controllers/comentarioEvaluacionController');

// Obtiene la lista de todos los comentarios
router.get('/', comentarioEvaluacionController.getComentariosEvaluacion);

// Obtiene un comentario por su ID
router.get('/:id', comentarioEvaluacionController.getComentarioEvaluacionById);

// Crea un nuevo comentario
router.post('/', comentarioEvaluacionController.createComentarioEvaluacion);

// Actualiza un comentario existente
router.put('/:id', comentarioEvaluacionController.updateComentarioEvaluacion);

// Elimina un comentario
router.delete('/:id', comentarioEvaluacionController.deleteComentarioEvaluacion);

module.exports = router;
