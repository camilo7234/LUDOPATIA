// middleware/errorMiddleware.js

/**
 * Middleware global para manejar errores en la API.
 * @param {Object} err - Objeto de error.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @param {Function} next - Función para continuar el flujo.
 */
const errorMiddleware = (err, req, res, next) => {
    console.error("🔥 Error detectado:", err);

    // Definir código de estado (500 si no está definido)
    const statusCode = err.status || 500;

    // Enviar respuesta con mensaje de error
    res.status(statusCode).json({
        success: false,
        message: err.message || "Error interno del servidor",
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Solo muestra detalles en desarrollo
    });
};

module.exports = { errorHandler: errorMiddleware };