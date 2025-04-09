/**
 * @file comentarioEvaluacionController.js
 * @description Controlador para la gestión de comentarios en evaluaciones.
 */

const ComentarioEvaluacion = require('../models/ComentarioEvaluacion'); // Verifica que el modelo existe

/**
 * Obtiene la lista de todos los comentarios.
 */
const getComentariosEvaluacion = async (req, res) => {
    try {
        const comentarios = await ComentarioEvaluacion.findAll();
        return res.status(200).json({ comentarios });
    } catch (error) {
        console.error('Error obteniendo comentarios:', error);
        return res.status(500).json({ message: 'Error al obtener comentarios.' });
    }
};

/**
 * Obtiene un comentario por su ID.
 */
const getComentarioEvaluacionById = async (req, res) => {
    try {
        const { id } = req.params;
        const comentario = await ComentarioEvaluacion.findByPk(id);
        if (!comentario) {
            return res.status(404).json({ message: 'Comentario no encontrado.' });
        }
        return res.status(200).json({ comentario });
    } catch (error) {
        console.error('Error obteniendo comentario:', error);
        return res.status(500).json({ message: 'Error al obtener comentario.' });
    }
};

/**
 * Crea un nuevo comentario.
 */
const createComentarioEvaluacion = async (req, res) => {
    try {
        const { id_evaluacion, id_profesional, comentario, fecha } = req.body;
        // Aquí puedes agregar validaciones según tus necesidades
        const nuevoComentario = await ComentarioEvaluacion.create({
            id_evaluacion,
            id_profesional,
            comentario,
            fecha: fecha || new Date()
        });
        return res.status(201).json({ mensaje: 'Comentario creado exitosamente.', comentario: nuevoComentario });
    } catch (error) {
        console.error('Error creando comentario:', error);
        return res.status(500).json({ message: 'Error al crear comentario.' });
    }
};

/**
 * Actualiza un comentario existente.
 */
const updateComentarioEvaluacion = async (req, res) => {
    try {
        const { id } = req.params;
        const { comentario } = req.body;
        const comentarioExistente = await ComentarioEvaluacion.findByPk(id);
        if (!comentarioExistente) {
            return res.status(404).json({ message: 'Comentario no encontrado.' });
        }
        comentarioExistente.comentario = comentario || comentarioExistente.comentario;
        await comentarioExistente.save();
        return res.status(200).json({ mensaje: 'Comentario actualizado exitosamente.', comentario: comentarioExistente });
    } catch (error) {
        console.error('Error actualizando comentario:', error);
        return res.status(500).json({ message: 'Error al actualizar comentario.' });
    }
};

/**
 * Elimina un comentario existente.
 */
const deleteComentarioEvaluacion = async (req, res) => {
    try {
        const { id } = req.params;
        const comentarioExistente = await ComentarioEvaluacion.findByPk(id);
        if (!comentarioExistente) {
            return res.status(404).json({ message: 'Comentario no encontrado.' });
        }
        await comentarioExistente.destroy();
        return res.status(200).json({ message: 'Comentario eliminado exitosamente.' });
    } catch (error) {
        console.error('Error eliminando comentario:', error);
        return res.status(500).json({ message: 'Error al eliminar comentario.' });
    }
};

module.exports = {
    getComentariosEvaluacion,
    getComentarioEvaluacionById,
    createComentarioEvaluacion,
    updateComentarioEvaluacion,
    deleteComentarioEvaluacion,
};
