// backend/controllers/reporteController.js

const Reporte = require('../models/Reporte');
const Usuario = require('../models/Usuario');

/**
 * Obtener un reporte por ID.
 * GET /api/reportes/:id
 */
const getReporteById = async (req, res) => {
  try {
    const { id } = req.params;
    const reporte = await Reporte.findByPk(id, {
      include: {
        model: Usuario,
        attributes: ['nombre_completo', 'correo'] // Usando el nombre correcto del campo
      }
    });

    if (!reporte) {
      return res.status(404).json({ message: 'Reporte no encontrado.' });
    }

    return res.status(200).json({ reporte });
  } catch (error) {
    console.error('Error obteniendo reporte:', error);
    return res.status(500).json({ message: 'Error del servidor al obtener el reporte.' });
  }
};

/**
 * Actualizar un reporte.
 * PUT /api/reportes/:id
 */
const updateReporte = async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion } = req.body; // Ajusta los campos que realmente quieres actualizar

    const reporte = await Reporte.findByPk(id);
    if (!reporte) {
      return res.status(404).json({ message: 'Reporte no encontrado.' });
    }

    await reporte.update({ descripcion }); // Actualiza los campos permitidos

    return res.status(200).json({ message: 'Reporte actualizado exitosamente.', reporte });
  } catch (error) {
    console.error('Error actualizando reporte:', error);
    return res.status(500).json({ message: 'Error del servidor al actualizar el reporte.' });
  }
};

/**
 * Eliminar un reporte.
 * DELETE /api/reportes/:id
 */
const deleteReporte = async (req, res) => {
  try {
    const { id } = req.params;
    const reporte = await Reporte.findByPk(id);

    if (!reporte) {
      return res.status(404).json({ message: 'Reporte no encontrado.' });
    }

    await reporte.destroy();
    return res.status(200).json({ message: 'Reporte eliminado exitosamente.' });
  } catch (error) {
    console.error('Error eliminando reporte:', error);
    return res.status(500).json({ message: 'Error del servidor al eliminar el reporte.' });
  }
};

module.exports = {
  getReporteById,
  updateReporte,
  deleteReporte,
};