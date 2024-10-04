const db = require('../database/db_connection');

// Obtener todos los pacientes
const getPacientes = async (req, res) => {
    try {
        const pacientes = await db.any('SELECT * FROM paciente');
        res.status(200).json(pacientes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un paciente por ID
const getPacienteById = async (req, res) => {
    const { id } = req.params;
    try {
        const paciente = await db.one('SELECT * FROM paciente WHERE id = $1', [id]);
        res.status(200).json(paciente);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo paciente
const createPaciente = async (req, res) => {
    const { usuario_id, fecha_diagnostico } = req.body;
    try {
        const newPaciente = await db.none('INSERT INTO paciente (usuario_id, fecha_diagnostico) VALUES ($1, $2)', [usuario_id, fecha_diagnostico]);
        res.status(201).json({ message: 'Paciente creado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar paciente
const updatePaciente = async (req, res) => {
    const { id } = req.params;
    const { fecha_diagnostico } = req.body;
    try {
        await db.none('UPDATE paciente SET fecha_diagnostico = $1 WHERE id = $2', [fecha_diagnostico, id]);
        res.status(200).json({ message: 'Paciente actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar paciente
const deletePaciente = async (req, res) => {
    const { id } = req.params;
    try {
        await db.none('DELETE FROM paciente WHERE id = $1', [id]);
        res.status(200).json({ message: 'Paciente eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getPacientes,
    getPacienteById,
    createPaciente,
    updatePaciente,
    deletePaciente
};
