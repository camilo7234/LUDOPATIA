// backend/controllers/usuariosController.js

const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

/**
 * Obtener la lista de usuarios.
 * GET /api/usuarios
 */
const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: { exclude: ['contraseña_hash'] },
    });
    return res.status(200).json({ usuarios });
  } catch (error) {
    console.error('Error obteniendo usuarios:', error);
    return res.status(500).json({ message: 'Error del servidor al obtener usuarios.' });
  }
};

/**
 * Obtener un usuario por su ID.
 * GET /api/usuarios/:id
 */
const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id, {
      attributes: { exclude: ['contraseña_hash'] },
    });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    return res.status(200).json({ usuario });
  } catch (error) {
    console.error('Error obteniendo usuario por ID:', error);
    return res.status(500).json({ message: 'Error del servidor al obtener el usuario.' });
  }
};

/**
 * Crear un nuevo usuario.
 * POST /api/usuarios
 */
const createUsuario = async (req, res) => {
  try {
    const { nombre_completo, cedula, correo, telefono, direccion, ciudad, pais, contraseña } = req.body;
    
    if (!contraseña) {
      return res.status(400).json({ message: 'La contraseña es requerida.' });
    }
    
    // Encriptar la contraseña
    const hash = await bcrypt.hash(contraseña, 10);
    
    // Crear el usuario
    const usuario = await Usuario.create({
      nombre_completo,
      cedula,
      correo,
      telefono,
      direccion,
      ciudad,
      pais,
      contraseña_hash: Buffer.from(hash)
    });
    
    // Preparar la respuesta eliminando la contraseña
    const usuarioData = usuario.toJSON();
    delete usuarioData.contraseña_hash;
    
    return res.status(201).json({ message: 'Usuario creado correctamente.', usuario: usuarioData });
  } catch (error) {
    console.error('Error creando usuario:', error);
    return res.status(500).json({ message: 'Error del servidor al crear el usuario.' });
  }
};

/**
 * Actualizar la información de un usuario.
 * PUT /api/usuarios/:id
 * Permite actualizar datos básicos del usuario (no la contraseña).
 */
const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_completo, correo, telefono, direccion, ciudad, pais, estado } = req.body;

    // Buscar el usuario
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Si se cambia el correo, verificar que no esté en uso por otro usuario.
    if (correo && correo !== usuario.correo) {
      const usuarioExistente = await Usuario.findOne({ 
        where: { 
          correo, 
          id: { [Op.ne]: id } 
        } 
      });
      if (usuarioExistente) {
        return res.status(400).json({ message: 'El correo ya está en uso por otro usuario.' });
      }
    }

    // Actualizar los campos
    usuario.nombre_completo = nombre_completo || usuario.nombre_completo;
    usuario.correo = correo || usuario.correo;
    usuario.telefono = telefono || usuario.telefono;
    usuario.direccion = direccion || usuario.direccion;
    usuario.ciudad = ciudad || usuario.ciudad;
    usuario.pais = pais || usuario.pais;
    usuario.estado = estado || usuario.estado;

    await usuario.save();

    const usuarioActualizado = usuario.toJSON();
    delete usuarioActualizado.contraseña_hash; // Remover la contraseña antes de enviar la respuesta

    return res.status(200).json({ message: 'Usuario actualizado correctamente.', usuario: usuarioActualizado });
  } catch (error) {
    console.error('Error actualizando usuario:', error);
    return res.status(500).json({ message: 'Error del servidor al actualizar el usuario.' });
  }
};

/**
 * Eliminar un usuario.
 * DELETE /api/usuarios/:id
 */
const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    await usuario.destroy();
    return res.status(200).json({ message: 'Usuario eliminado correctamente.' });
  } catch (error) {
    console.error('Error eliminando usuario:', error);
    return res.status(500).json({ message: 'Error del servidor al eliminar el usuario.' });
  }
};

/**
 * Actualizar la contraseña de un usuario.
 * PUT /api/usuarios/:id/actualizar-contraseña
 * Requiere enviar la contraseña actual y la nueva contraseña.
 */
const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { contraseña_actual, nueva_contraseña } = req.body;

    if (!contraseña_actual || !nueva_contraseña) {
      return res.status(400).json({ message: 'Se requieren la contraseña actual y la nueva contraseña.' });
    }

    // Buscar el usuario
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Comparar la contraseña actual proporcionada con la almacenada
    const storedHash = usuario.contraseña_hash.toString();
    const esValida = await bcrypt.compare(contraseña_actual, storedHash);
    if (!esValida) {
      return res.status(400).json({ message: 'La contraseña actual no es correcta.' });
    }

    // Encriptar la nueva contraseña y actualizar el registro
    const newHash = await bcrypt.hash(nueva_contraseña, 10);
    usuario.contraseña_hash = Buffer.from(newHash);
    await usuario.save();

    return res.status(200).json({ message: 'Contraseña actualizada correctamente.' });
  } catch (error) {
    console.error('Error actualizando contraseña:', error);
    return res.status(500).json({ message: 'Error del servidor al actualizar la contraseña.' });
  }
};

module.exports = {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  updatePassword,
};
