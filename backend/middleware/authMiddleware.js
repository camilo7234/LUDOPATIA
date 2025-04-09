// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config(); // Cargar variables de entorno

/**
 * Middleware de autenticación para proteger rutas privadas.
 * Verifica si el usuario tiene un token válido en la cabecera de la solicitud.
 */
const authMiddleware = (req, res, next) => {
  try {
    // Obtener el token del encabezado 'Authorization'
    const authHeader = req.headers.authorization;

    // Verificar si el token está presente
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Acceso denegado. Token no proporcionado." });
    }

    // Extraer el token real
    const token = authHeader.split(" ")[1];

    // Verificar el token con la clave secreta
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token inválido o expirado." });
      }
      // Guardar la información del usuario en la solicitud para su uso posterior
      req.user = decoded;
      next();  // Continuar a la siguiente función en la ruta
    });

  } catch (error) {
    console.error("Error en authMiddleware:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

module.exports = authMiddleware;
