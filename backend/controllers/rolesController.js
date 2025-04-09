// backend/controllers/rolesController.js

const Rol = require('../models/Rol');

/**
 * Obtener la lista de roles.
 * GET /api/roles
 */
const getRoles = async (req, res) => {
  try {
    const roles = await Rol.findAll();
    return res.status(200).json({ roles });
  } catch (error) {
    console.error('Error obteniendo roles:', error);
    return res.status(500).json({ message: 'Error del servidor al obtener roles.' });
  }
};

/**
 * Obtener un rol por su ID.
 * GET /api/roles/:id
 */
const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const rol = await Rol.findByPk(id);
    if (!rol) {
      return res.status(404).json({ message: 'Rol no encontrado.' });
    }
    return res.status(200).json({ rol });
  } catch (error) {
    console.error('Error obteniendo rol por ID:', error);
    return res.status(500).json({ message: 'Error del servidor al obtener el rol.' });
  }
};

/**
 * Crear un nuevo rol.
 * POST /api/roles
 * Recibe en el body: nombre (nombre del rol)
 */
const createRole = async (req, res) => {
  try {
    const { nombre } = req.body;
    if (!nombre) {
      return res.status(400).json({ message: 'El nombre del rol es obligatorio.' });
    }

    // Verificar si el rol ya existe
    const rolExistente = await Rol.findOne({ where: { nombre } });
    if (rolExistente) {
      return res.status(400).json({ message: 'El rol ya existe.' });
    }

    const nuevoRol = await Rol.create({ nombre });
    return res.status(201).json({ message: 'Rol creado exitosamente.', rol: nuevoRol });
  } catch (error) {
    console.error('Error creando rol:', error);
    return res.status(500).json({ message: 'Error del servidor al crear el rol.' });
  }
};

/**
 * Actualizar un rol existente.
 * PUT /api/roles/:id
 * Recibe en el body: nombre (nuevo nombre del rol)
 */
const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    if (!nombre) {
      return res.status(400).json({ message: 'El nombre del rol es obligatorio.' });
    }

    const rol = await Rol.findByPk(id);
    if (!rol) {
      return res.status(404).json({ message: 'Rol no encontrado.' });
    }

    // Verificar que el nuevo nombre no esté en uso por otro rol
    const rolExistente = await Rol.findOne({ where: { nombre, id: { $ne: id } } });
    if (rolExistente) {
      return res.status(400).json({ message: 'Otro rol con ese nombre ya existe.' });
    }

    rol.nombre = nombre;
    await rol.save();

    return res.status(200).json({ message: 'Rol actualizado exitosamente.', rol });
  } catch (error) {
    console.error('Error actualizando rol:', error);
    return res.status(500).json({ message: 'Error del servidor al actualizar el rol.' });
  }
};

/**
 * Eliminar un rol.
 * DELETE /api/roles/:id
 */
const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const rol = await Rol.findByPk(id);
    if (!rol) {
      return res.status(404).json({ message: 'Rol no encontrado.' });
    }

    await rol.destroy();
    return res.status(200).json({ message: 'Rol eliminado exitosamente.' });
  } catch (error) {
    console.error('Error eliminando rol:', error);
    return res.status(500).json({ message: 'Error del servidor al eliminar el rol.' });
  }
};

module.exports = {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};
