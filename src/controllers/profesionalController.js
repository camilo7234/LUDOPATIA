// src/controllers/profesionalController.js
const db = require('../../database/db_connection');

// Obtener todos los profesionales
exports.getAllProfessionals = async (req, res) => {
    try {
        const professionals = await db.any('SELECT * FROM profesional');
        res.json(professionals);
    } catch (err) {
        res.status(500).send('Error al obtener profesionales');
    }
};
