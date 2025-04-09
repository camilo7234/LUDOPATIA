// middleware/roleMiddleware.js

/**
 * Middleware para restringir el acceso según el rol del usuario.
 * @param {Array} allowedRoles - Lista de roles permitidos para acceder al recurso.
 */
const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        try {
            const userRole = req.user?.rol?.nombre; // Se asume que el usuario ya está autenticado y su rol está en req.user
            
            if (!userRole) {
                return res.status(403).json({
                    success: false,
                    message: "Acceso denegado. No tienes un rol asignado.",
                });
            }

            if (!allowedRoles.includes(userRole)) {
                return res.status(403).json({
                    success: false,
                    message: `Acceso denegado. Se requiere uno de los siguientes roles: ${allowedRoles.join(", ")}`,
                });
            }

            next(); // Permitir acceso si el rol es válido
        } catch (error) {
            console.error("Error en roleMiddleware:", error);
            res.status(500).json({
                success: false,
                message: "Error interno del servidor en la verificación de roles.",
            });
        }
    };
};

module.exports = roleMiddleware;
