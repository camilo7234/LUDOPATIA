const db = require('../database/db_connection');

// Obtener todos los administradores
exports.getAdministradores = async (req, res) => {
  try {
    const result = await db.any('SELECT * FROM administrador');
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un administrador por ID
exports.getAdministradorById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.one('SELECT * FROM administrador WHERE id = $1', [id]);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo administrador
exports.createAdministrador = async (req, res) => {
  try {
    const { usuario_id } = req.body;
    await db.none('INSERT INTO administrador (usuario_id) VALUES ($1)', [usuario_id]);
    res.status(201).json({ message: 'Administrador creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un administrador
exports.updateAdministrador = async (req, res) => {
  try {
    const id = req.params.id;
    const { usuario_id } = req.body;
    await db.none('UPDATE administrador SET usuario_id = $1 WHERE id = $2', [usuario_id, id]);
    res.json({ message: 'Administrador actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un administrador
exports.deleteAdministrador = async (req, res) => {
  try {
    const id = req.params.id;
    await db.none('DELETE FROM administrador WHERE id = $1', [id]);
    res.json({ message: 'Administrador eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
