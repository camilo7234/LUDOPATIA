// src/controllers/pacienteActividadController.js
const db = require('../database/db_connection');

// Obtener todas las relaciones paciente-actividad
exports.getPacienteActividades = async (req, res) => {
  try {
    const result = await db.any('SELECT * FROM paciente_actividad');
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una relación paciente-actividad por ID
exports.getPacienteActividadById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.one('SELECT * FROM paciente_actividad WHERE id = $1', [id]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear una nueva relación paciente-actividad
exports.createPacienteActividad = async (req, res) => {
  try {
    const { paciente_id, actividad_id, fecha_inicio, fecha_fin, estado } = req.body;
    await db.none(
      'INSERT INTO paciente_actividad (paciente_id, actividad_id, fecha_inicio, fecha_fin, estado) VALUES ($1, $2, $3, $4, $5)', 
      [paciente_id, actividad_id, fecha_inicio, fecha_fin, estado]
    );
    res.status(201).json({ message: 'Relación paciente-actividad creada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una relación paciente-actividad
exports.updatePacienteActividad = async (req, res) => {
  try {
    const id = req.params.id;
    const { paciente_id, actividad_id, fecha_inicio, fecha_fin, estado } = req.body;
    await db.none(
      'UPDATE paciente_actividad SET paciente_id = $1, actividad_id = $2, fecha_inicio = $3, fecha_fin = $4, estado = $5 WHERE id = $6', 
      [paciente_id, actividad_id, fecha_inicio, fecha_fin, estado, id]
    );
    res.json({ message: 'Relación paciente-actividad actualizada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una relación paciente-actividad
exports.deletePacienteActividad = async (req, res) => {
  try {
    const id = req.params.id;
    await db.none('DELETE FROM paciente_actividad WHERE id = $1', [id]);
    res.json({ message: 'Relación paciente-actividad eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
