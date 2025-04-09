class RoleHelper {
    /**
     * Verifica si un usuario tiene el rol requerido.
     * @param {string} userRole - Rol del usuario.
     * @param {string[]} allowedRoles - Lista de roles permitidos.
     * @returns {boolean} `true` si el usuario tiene permiso, `false` en caso contrario.
     */
    static hasRole(userRole, allowedRoles) {
        return allowedRoles.includes(userRole);
    }

    /**
     * Determina si un usuario es administrador.
     * @param {string} userRole - Rol del usuario.
     * @returns {boolean} `true` si el usuario es administrador, `false` en caso contrario.
     */
    static isAdmin(userRole) {
        return userRole === "Administrador";
    }

    /**
     * Determina si un usuario es un profesional de la salud.
     * @param {string} userRole - Rol del usuario.
     * @returns {boolean} `true` si el usuario es un profesional, `false` en caso contrario.
     */
    static isProfessional(userRole) {
        return userRole === "Profesional";
    }

    /**
     * Determina si un usuario es un paciente.
     * @param {string} userRole - Rol del usuario.
     * @returns {boolean} `true` si el usuario es paciente, `false` en caso contrario.
     */
    static isPatient(userRole) {
        return userRole === "Paciente";
    }
}

module.exports = RoleHelper;
