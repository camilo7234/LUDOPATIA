// backend/controllers/bitacoraController.js

const Bitacora = require('../models/Bitacora');
const Usuario = require('../models/Usuario');

/**
 * Obtener todos los registros de la bitácora.
 * GET /api/bitacora
 */
const getBitacora = async (req, res) => {
  try {
    const registros = await Bitacora.findAll({
      include: {
        model: Usuario,
        attributes: ['nombre', 'apellido', 'email']
      },
      order: [['fecha', 'DESC']]
    });

    return res.status(200).json({ registros });
  } catch (error) {
    console.error('Error obteniendo bitácora:', error);
    return res.status(500).json({ message: 'Error del servidor al obtener la bitácora.' });
  }
};

/**
 * Obtener un registro de la bitácora por ID.
 * GET /api/bitacora/:id
 */
const getBitacoraById = async (req, res) => {
  try {
    const { id } = req.params;
    const registro = await Bitacora.findByPk(id, {
      include: {
        model: Usuario,
        attributes: ['nombre', 'apellido', 'email']
      }
    });

    if (!registro) {
      return res.status(404).json({ message: 'Registro no encontrado en la bitácora.' });
    }

    return res.status(200).json({ registro });
  } catch (error) {
    console.error('Error obteniendo registro de bitácora por ID:', error);
    return res.status(500).json({ message: 'Error del servidor al obtener el registro.' });
  }
};

/**
 * Crear un nuevo registro en la bitácora.
 * POST /api/bitacora
 * Se esperan en el body: usuario_id, accion, descripcion.
 */
const createBitacora = async (req, res) => {
  try {
    const { usuario_id, accion, descripcion } = req.body;

    if (!usuario_id || !accion || !descripcion) {
      return res.status(400).json({ message: 'Se requieren usuario_id, acción y descripción para registrar en la bitácora.' });
    }

    const nuevoRegistro = await Bitacora.create({
      usuario_id,
      accion,
      descripcion,
      fecha: new Date()
    });

    return res.status(201).json({ message: 'Registro agregado a la bitácora exitosamente.', registro: nuevoRegistro });
  } catch (error) {
    console.error('Error registrando en bitácora:', error);
    return res.status(500).json({ message: 'Error del servidor al registrar en la bitácora.' });
  }
};

/**
 * Eliminar un registro de la bitácora.
 * DELETE /api/bitacora/:id
 */
const deleteBitacora = async (req, res) => {
  try {
    const { id } = req.params;
    const registro = await Bitacora.findByPk(id);
    if (!registro) {
      return res.status(404).json({ message: 'Registro no encontrado en la bitácora.' });
    }

    await registro.destroy();
    return res.status(200).json({ message: 'Registro de bitácora eliminado exitosamente.' });
  } catch (error) {
    console.error('Error eliminando registro de bitácora:', error);
    return res.status(500).json({ message: 'Error del servidor al eliminar el registro de la bitácora.' });
  }
};

module.exports = {
  getBitacora,
  getBitacoraById,
  createBitacora,
  deleteBitacora,
};