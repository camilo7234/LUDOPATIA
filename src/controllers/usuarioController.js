const db = require('../../database/db_connection');

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
    try {
        const users = await db.any('SELECT * FROM usuario');
        res.json(users);
    } catch (err) {
        res.status(500).send('Error al obtener usuarios');
    }
};

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
    const { username, email, contrasena, rol } = req.body;
    try {
        await db.none('INSERT INTO usuario (username, email, contrasena, rol) VALUES ($1, $2, $3, $4)', [username, email, contrasena, rol]);
        res.status(201).send('Usuario creado');
    } catch (err) {
        res.status(500).send('Error al crear usuario');
    }
};
