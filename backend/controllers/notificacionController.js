const Notificacion = require('../models/Notificacion');
const Usuario = require('../models/Usuario');

/**
 * Obtener todas las notificaciones.
 * GET /api/notificaciones
 */
const getNotificaciones = async (req, res) => {
  try {
    const notificaciones = await Notificacion.findAll({
      include: {
        model: Usuario,
        attributes: ['nombre', 'apellido', 'email']
      },
      order: [['fecha', 'DESC']]
    });

    return res.status(200).json({ notificaciones });
  } catch (error) {
    console.error('Error obteniendo notificaciones:', error);
    return res.status(500).json({ message: 'Error del servidor al obtener notificaciones.' });
  }
};

/**
 * Obtener notificaciones de un usuario en específico.
 * GET /api/notificaciones/usuario/:usuario_id
 */
const getNotificacionesByUsuario = async (req, res) => {
  try {
    const { usuario_id } = req.params;
    const notificaciones = await Notificacion.findAll({
      where: { id_usuario: usuario_id },
      order: [['fecha', 'DESC']]
    });

    return res.status(200).json({ notificaciones });
  } catch (error) {
    console.error('Error obteniendo notificaciones del usuario:', error);
    return res.status(500).json({ message: 'Error del servidor al obtener notificaciones del usuario.' });
  }
};

/**
 * Crear una nueva notificación.
 * POST /api/notificaciones
 * Se esperan en el body: usuario_id, mensaje, tipo.
 */
const createNotificacion = async (req, res) => {
  try {
    const { usuario_id, mensaje, tipo } = req.body;

    if (!usuario_id || !mensaje || !tipo) {
      return res.status(400).json({ message: 'Se requieren usuario_id, mensaje y tipo para la notificación.' });
    }

    const nuevaNotificacion = await Notificacion.create({
      id_usuario: usuario_id,
      mensaje,
      tipo,
      fecha: new Date(),
      leido: false
    });

    return res.status(201).json({ message: 'Notificación creada exitosamente.', notificacion: nuevaNotificacion });
  } catch (error) {
    console.error('Error creando notificación:', error);
    return res.status(500).json({ message: 'Error del servidor al crear la notificación.' });
  }
};

/**
 * Marcar una notificación como leída.
 * PUT /api/notificaciones/:id
 */
const marcarComoLeida = async (req, res) => {
  try {
    const { id } = req.params;
    const notificacion = await Notificacion.findByPk(id);

    if (!notificacion) {
      return res.status(404).json({ message: 'Notificación no encontrada.' });
    }

    notificacion.leido = true;
    await notificacion.save();

    return res.status(200).json({ message: 'Notificación marcada como leída.', notificacion });
  } catch (error) {
    console.error('Error marcando notificación como leída:', error);
    return res.status(500).json({ message: 'Error del servidor al actualizar la notificación.' });
  }
};

/**
 * Eliminar una notificación.
 * DELETE /api/notificaciones/:id
 */
const deleteNotificacion = async (req, res) => {
  try {
    const { id } = req.params;
    const notificacion = await Notificacion.findByPk(id);
    if (!notificacion) {
      return res.status(404).json({ message: 'Notificación no encontrada.' });
    }

    await notificacion.destroy();
    return res.status(200).json({ message: 'Notificación eliminada exitosamente.' });
  } catch (error) {
    console.error('Error eliminando notificación:', error);
    return res.status(500).json({ message: 'Error del servidor al eliminar la notificación.' });
  }
};

/**
 * Obtener una notificación por ID.
 * GET /api/notificaciones/:id
 */
const getNotificacionById = async (req, res) => {
  try {
    const { id } = req.params;
    const notificacion = await Notificacion.findByPk(id, {
      include: {
        model: Usuario,
        attributes: ['nombre', 'apellido', 'email']
      }
    });

    if (!notificacion) {
      return res.status(404).json({ message: 'Notificación no encontrada.' });
    }

    return res.status(200).json({ notificacion });
  } catch (error) {
    console.error('Error obteniendo notificación por ID:', error);
    return res.status(500).json({ message: 'Error del servidor al obtener la notificación.' });
  }
};


module.exports = {
  getNotificaciones,
  getNotificacionesByUsuario,
  createNotificacion,
  marcarComoLeida,
  deleteNotificacion,
  getNotificacionById // Add the new function to the exports
};