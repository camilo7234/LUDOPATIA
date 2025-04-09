// middlewares/validacionMiddleware.js
import { validationResult } from "express-validator";

/**
 * Middleware para validar los datos de la solicitud.
 * Si hay errores, responde con un 400 y la lista de errores.
 */
const validacionMiddleware = (req, res, next) => {
    // Extraer errores de validación
    const errores = validationResult(req);

    // Si hay errores, devolver respuesta con detalles
    if (!errores.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Errores en la validación de datos",
            errores: errores.array(),
        });
    }

    // Si no hay errores, continuar con la siguiente función
    next();
};

export default validacionMiddleware;
