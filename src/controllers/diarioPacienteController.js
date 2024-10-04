// src/controllers/diarioPacienteController.js
const db = require('../database/db_connection');

// Obtener todas las entradas de diario de los pacientes
exports.getDiarioPacientes = async (req, res) => {
  try {
    const result = await db.any('SELECT * FROM diario_paciente');
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una entrada de diario por ID
exports.getDiarioPacienteById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.one('SELECT * FROM diario_paciente WHERE id = $1', [id]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear una nueva entrada de diario
exports.createDiarioPaciente = async (req, res) => {
  try {
    const { paciente_id, fecha, contenido, estado_animo } = req.body;
    await db.none(
      'INSERT INTO diario_paciente (paciente_id, fecha, contenido, estado_animo) VALUES ($1, $2, $3, $4)', 
      [paciente_id, fecha, contenido, estado_animo]
    );
    res.status(201).json({ message: 'Entrada de diario creada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una entrada de diario
exports.updateDiarioPaciente = async (req, res) => {
  try {
    const id = req.params.id;
    const { paciente_id, fecha, contenido, estado_animo } = req.body;
    await db.none(
      'UPDATE diario_paciente SET paciente_id = $1, fecha = $2, contenido = $3, estado_animo = $4 WHERE id = $5', 
      [paciente_id, fecha, contenido, estado_animo, id]
    );
    res.json({ message: 'Entrada de diario actualizada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una entrada de diario
exports.deleteDiarioPaciente = async (req, res) => {
  try {
    const id = req.params.id;
    await db.none('DELETE FROM diario_paciente WHERE id = $1', [id]);
    res.json({ message: 'Entrada de diario eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
