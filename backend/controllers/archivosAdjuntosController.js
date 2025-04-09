// backend/controllers/archivosAdjuntosController.js

const ArchivosAdjuntos = require('../models/ArchivosAdjuntos');
const HistorialClinico = require('../models/HistorialClinico');
const { Op } = require('sequelize');
const path = require('path');
const fs = require('fs');

/**
 * Obtener un archivo adjunto por ID.
 * GET /api/archivosAdjuntos/:id
 */
const getArchivoById = async (req, res) => {
  try {
    const { id } = req.params;
    const archivo = await ArchivosAdjuntos.findByPk(id, {
      include: {
        model: HistorialClinico,
        attributes: ['paciente_id', 'descripcion']
      }
    });

    if (!archivo) {
      return res.status(404).json({ message: 'Archivo no encontrado.' });
    }

    return res.status(200).json({ archivo });
  } catch (error) {
    console.error('Error obteniendo archivo adjunto:', error);
    return res.status(500).json({ message: 'Error del servidor al obtener el archivo adjunto.' });
  }
};

/**
 * Subir un nuevo archivo adjunto.
 * POST /api/archivosAdjuntos
 * Se esperan en el body: historial_id, archivo.
 */
const uploadArchivoAdjunto = async (req, res) => {
  try {
    const { historial_id } = req.body;
    const archivo = req.file; // Se asume el uso de multer para manejo de archivos

    if (!archivo) {
      return res.status(400).json({ message: 'No se proporcionó ningún archivo.' });
    }

    const nuevoArchivo = await ArchivosAdjuntos.create({
      historial_id,
      nombre_archivo: archivo.originalname, // Corrección de nombre de campo
      tipo_archivo: archivo.mimetype,      // Corrección de nombre de campo
      ruta_archivo: archivo.path,          // Corrección de nombre de campo
      fecha_subida: new Date()
    });

    return res.status(201).json({ message: 'Archivo subido exitosamente.', archivo: nuevoArchivo });
  } catch (error) {
    console.error('Error subiendo archivo adjunto:', error);
    return res.status(500).json({ message: 'Error del servidor al subir el archivo.' });
  }
};

/**
 * Eliminar un archivo adjunto.
 * DELETE /api/archivosAdjuntos/:id
 */
const deleteArchivoAdjunto = async (req, res) => {
  try {
    const { id } = req.params;
    const archivo = await ArchivosAdjuntos.findByPk(id);

    if (!archivo) {
      return res.status(404).json({ message: 'Archivo no encontrado.' });
    }

    // Eliminar el archivo del sistema de archivos
    fs.unlink(archivo.ruta_archivo, async (err) => { // Corrección de nombre de campo
      if (err) {
        console.error('Error eliminando archivo del sistema:', err);
      }
      await archivo.destroy();
      return res.status(200).json({ message: 'Archivo eliminado exitosamente.' });
    });
  } catch (error) {
    console.error('Error eliminando archivo adjunto:', error);
    return res.status(500).json({ message: 'Error del servidor al eliminar el archivo.' });
  }
};

module.exports = {
  getArchivoById,            // Corrección de nombre de función
  uploadArchivoAdjunto,
  deleteArchivoAdjunto,      // Corrección de nombre de función
};