const HistorialClinico = require('../models/HistorialClinico');
const Paciente = require('../models/Paciente');
const Profesional = require('../models/Profesional');

/**
 * Obtener el historial clínico de un paciente.
 */
const getHistorialClinicoByPaciente = async (req, res) => {
    try {
        const { pacienteId } = req.params;
        const historiales = await HistorialClinico.findAll({
            where: { paciente_id: pacienteId },
            include: [
                { model: Paciente, attributes: ['nombre', 'apellido', 'email'] },
                { model: Profesional, attributes: ['nombre', 'apellido', 'especialidad'] }
            ],
            order: [['fecha_registro', 'DESC']]
        });

        return res.status(200).json(historiales);
    } catch (error) {
        console.error('Error obteniendo el historial clínico:', error);
        return res.status(500).json({ message: 'Error al obtener el historial clínico.' });
    }
};

/**
 * Crear una nueva entrada en el historial clínico.
 */
const createHistorialClinico = async (req, res) => {
    try {
        const { paciente_id, profesional_id, diagnostico, tratamiento, notas_adicionales } = req.body;

        if (!paciente_id || !profesional_id || !diagnostico || !tratamiento) {
            return res.status(400).json({ message: 'Faltan datos requeridos.' });
        }

        const nuevoHistorial = await HistorialClinico.create({
            paciente_id,
            profesional_id,
            diagnostico,
            tratamiento,
            notas_adicionales,
            fecha_registro: new Date()
        });

        return res.status(201).json(nuevoHistorial);
    } catch (error) {
        console.error('Error creando historial clínico:', error);
        return res.status(500).json({ message: 'Error al crear el historial clínico.' });
    }
};

/**
 * Actualizar una entrada del historial clínico.
 */
const updateHistorialClinico = async (req, res) => {
    try {
        const { id } = req.params;
        const { diagnostico, tratamiento, notas_adicionales } = req.body;

        const historial = await HistorialClinico.findByPk(id);
        if (!historial) {
            return res.status(404).json({ message: 'Historial clínico no encontrado.' });
        }

        historial.diagnostico = diagnostico || historial.diagnostico;
        historial.tratamiento = tratamiento || historial.tratamiento;
        historial.notas_adicionales = notas_adicionales || historial.notas_adicionales;

        await historial.save();
        return res.status(200).json(historial);
    } catch (error) {
        console.error('Error actualizando historial clínico:', error);
        return res.status(500).json({ message: 'Error al actualizar el historial clínico.' });
    }
};

/**
 * Eliminar una entrada del historial clínico.
 */
const deleteHistorialClinico = async (req, res) => {
    try {
        const { id } = req.params;
        const historial = await HistorialClinico.findByPk(id);
        if (!historial) {
            return res.status(404).json({ message: 'Historial clínico no encontrado.' });
        }

        await historial.destroy();
        return res.status(200).json({ message: 'Historial clínico eliminado.' });
    } catch (error) {
        console.error('Error eliminando historial clínico:', error);
        return res.status(500).json({ message: 'Error al eliminar el historial clínico.' });
    }
};

module.exports = {
    getHistorialClinicoByPaciente,
    createHistorialClinico,
    updateHistorialClinico,
    deleteHistorialClinico,
};
