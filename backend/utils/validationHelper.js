class ValidationHelper {
    /**
     * Valida si una dirección de correo es válida.
     * @param {string} email - Dirección de correo a validar.
     * @returns {boolean} `true` si es válida, `false` en caso contrario.
     */
    static isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    /**
     * Valida si una contraseña cumple con los requisitos mínimos.
     * @param {string} password - Contraseña a validar.
     * @returns {boolean} `true` si es válida, `false` en caso contrario.
     */
    static isValidPassword(password) {
        return password.length >= 8;
    }

    /**
     * Valida si una cédula de identidad es un número válido.
     * @param {string} cedula - Cédula a validar.
     * @returns {boolean} `true` si es válida, `false` en caso contrario.
     */
    static isValidCedula(cedula) {
        const regex = /^\d{8,10}$/;
        return regex.test(cedula);
    }

    /**
     * Valida si un número de teléfono es válido.
     * @param {string} phone - Número de teléfono a validar.
     * @returns {boolean} `true` si es válido, `false` en caso contrario.
     */
    static isValidPhone(phone) {
        const regex = /^\+?[0-9]{10,15}$/;
        return regex.test(phone);
    }
}

module.exports = ValidationHelper;
