// src/controllers/historialClinicoController.js
const db = require('../database/db_connection');

// Obtener todos los historiales clínicos
exports.getHistorialesClinicos = async (req, res) => {
  try {
    const result = await db.any('SELECT * FROM historial_clinico');
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un historial clínico por ID
exports.getHistorialClinicoById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.one('SELECT * FROM historial_clinico WHERE id = $1', [id]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo historial clínico
exports.createHistorialClinico = async (req, res) => {
  try {
    const { paciente_id, profesional_id, fecha, notas, tratamiento } = req.body;
    await db.none(
      'INSERT INTO historial_clinico (paciente_id, profesional_id, fecha, notas, tratamiento) VALUES ($1, $2, $3, $4, $5)', 
      [paciente_id, profesional_id, fecha, notas, tratamiento]
    );
    res.status(201).json({ message: 'Historial clínico creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un historial clínico
exports.updateHistorialClinico = async (req, res) => {
  try {
    const id = req.params.id;
    const { paciente_id, profesional_id, fecha, notas, tratamiento } = req.body;
    await db.none(
      'UPDATE historial_clinico SET paciente_id = $1, profesional_id = $2, fecha = $3, notas = $4, tratamiento = $5 WHERE id = $6', 
      [paciente_id, profesional_id, fecha, notas, tratamiento, id]
    );
    res.json({ message: 'Historial clínico actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un historial clínico
exports.deleteHistorialClinico = async (req, res) => {
  try {
    const id = req.params.id;
    await db.none('DELETE FROM historial_clinico WHERE id = $1', [id]);
    res.json({ message: 'Historial clínico eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
