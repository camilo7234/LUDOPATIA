class DateHelper {
    /**
     * Obtiene la fecha actual en formato ISO (YYYY-MM-DD).
     * @returns {string} Fecha formateada en ISO.
     */
    static getCurrentDateISO() {
        return new Date().toISOString().split("T")[0];
    }

    /**
     * Formatea una fecha en el formato DD/MM/YYYY.
     * @param {string|Date} date - Fecha a formatear.
     * @returns {string} Fecha formateada.
     */
    static formatDateDDMMYYYY(date) {
        const d = new Date(date);
        return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1).toString().padStart(2, "0")}/${d.getFullYear()}`;
    }

    /**
     * Calcula la diferencia en días entre dos fechas.
     * @param {string|Date} date1 - Primera fecha.
     * @param {string|Date} date2 - Segunda fecha.
     * @returns {number} Diferencia en días.
     */
    static getDaysDifference(date1, date2) {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        return Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
    }
}

module.exports = DateHelper;
