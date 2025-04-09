/**
 * @file citasController.js
 * @description Controlador que maneja la lógica para la gestión de citas.
 */

const db = require('../config/db'); // Asegúrate de que tienes una conexión a la base de datos

// Obtener todas las citas
const getAllCitas = async (req, res) => {
    try {
        const citas = await db.query('SELECT * FROM citas');
        res.status(200).json(citas.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las citas', error });
    }
};

// Obtener una cita por ID
const getCitaById = async (req, res) => {
    const { id } = req.params;
    try {
        const cita = await db.query('SELECT * FROM citas WHERE id = $1', [id]);
        if (cita.rows.length === 0) {
            return res.status(404).json({ message: 'Cita no encontrada' });
        }
        res.status(200).json(cita.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la cita', error });
    }
};

// Crear una nueva cita
const createCita = async (req, res) => {
    const { paciente_id, profesional_id, fecha, hora, motivo } = req.body;
    try {
        const nuevaCita = await db.query(
            'INSERT INTO citas (paciente_id, profesional_id, fecha, hora, motivo) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [paciente_id, profesional_id, fecha, hora, motivo]
        );
        res.status(201).json(nuevaCita.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la cita', error });
    }
};

// Actualizar una cita
const updateCita = async (req, res) => {
    const { id } = req.params;
    const { paciente_id, profesional_id, fecha, hora, motivo } = req.body;
    try {
        const citaActualizada = await db.query(
            'UPDATE citas SET paciente_id = $1, profesional_id = $2, fecha = $3, hora = $4, motivo = $5 WHERE id = $6 RETURNING *',
            [paciente_id, profesional_id, fecha, hora, motivo, id]
        );
        if (citaActualizada.rows.length === 0) {
            return res.status(404).json({ message: 'Cita no encontrada' });
        }
        res.status(200).json(citaActualizada.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la cita', error });
    }
};

// Eliminar una cita
const deleteCita = async (req, res) => {
    const { id } = req.params;
    try {
        const citaEliminada = await db.query('DELETE FROM citas WHERE id = $1 RETURNING *', [id]);
        if (citaEliminada.rows.length === 0) {
            return res.status(404).json({ message: 'Cita no encontrada' });
        }
        res.status(200).json({ message: 'Cita eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la cita', error });
    }
};

module.exports = {
    getAllCitas,
    getCitaById,
    createCita,
    updateCita,
    deleteCita
};
