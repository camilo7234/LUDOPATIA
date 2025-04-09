// backend/controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const Rol = require('../models/Rol');

const login = async (req, res) => {
    try {
        const { correo, contraseña } = req.body;

        if (!correo || !contraseña) {
            return res.status(400).json({ message: 'Correo y contraseña son obligatorios.' });
        }

        const user = await Usuario.findOne({
            where: { correo },
            include: [{
                model: Rol,
                as: 'roles', // Asegúrate de que el alias coincida con el modelo Usuario
                attributes: ['nombre'],
                through: { attributes: [] }
            }]
        });

        if (!user) {
            return res.status(400).json({ message: 'Credenciales incorrectas.' });
        }

        const storedHash = user.contraseña_hash.toString('utf8');
        const isMatch = await bcrypt.compare(contraseña, storedHash);

        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales incorrectas.' });
        }

        const roles = user.roles.map(rol => rol.nombre);

        const payload = {
            id: user.id,
            correo: user.correo,
            nombre: user.nombre_completo,
            roles: roles,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({
            message: 'Login exitoso.',
            token,
            user: payload,
        });
    } catch (error) {
        console.error('Error en login:', error);
        return res.status(500).json({ message: 'Error del servidor.' });
    }
};

const register = async (req, res) => {
    try {
        const { nombre_completo, correo, contraseña, rolNombre = 'paciente' } = req.body; // Permite especificar el rol en el registro (opcional)

        if (!nombre_completo || !correo || !contraseña) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
        }

        const existingUser = await Usuario.findOne({ where: { correo } });
        if (existingUser) {
            return res.status(400).json({ message: 'El correo ya está registrado.' });
        }

        const saltRounds = 10;
        const contraseña_hash = await bcrypt.hash(contraseña, saltRounds);

        const newUser = await Usuario.create({
            nombre_completo,
            correo,
            contraseña_hash: Buffer.from(contraseña_hash), // Almacena como Buffer
        });

        // Asignar el rol al nuevo usuario
        const role = await Rol.findOne({ where: { nombre: rolNombre } });
        if (role) {
            await newUser.addRol(role); // Usa la función de asociación addRol
            return res.status(201).json({ message: `Usuario registrado con éxito como ${role.nombre}.` });
        } else {
            console.warn(`Rol "${rolNombre}" no encontrado.`);
            await newUser.destroy(); // Revertir la creación del usuario si el rol no existe
            return res.status(400).json({ message: 'Rol inválido.' });
        }

    } catch (error) {
        console.error('Error en register:', error);
        return res.status(500).json({ message: 'Error del servidor.' });
    }
};

module.exports = { register, login };