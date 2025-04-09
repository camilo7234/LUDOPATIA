const jwt = require("jsonwebtoken");
require("dotenv").config();

class TokenHelper {
    /**
     * Genera un token JWT con los datos proporcionados.
     * @param {Object} payload - Datos a incluir en el token.
     * @param {string} [expiresIn='1h'] - Tiempo de expiración del token.
     * @returns {string} Token generado.
     */
    static generateToken(payload, expiresIn = "1h") {
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
    }

    /**
     * Verifica la validez de un token JWT.
     * @param {string} token - Token a verificar.
     * @returns {Object|null} Decodificación del token si es válido, `null` si es inválido.
     */
    static verifyToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return null;
        }
    }

    /**
     * Decodifica un token sin validarlo.
     * @param {string} token - Token a decodificar.
     * @returns {Object|null} Información del token decodificado.
     */
    static decodeToken(token) {
        return jwt.decode(token);
    }
}

module.exports = TokenHelper;
