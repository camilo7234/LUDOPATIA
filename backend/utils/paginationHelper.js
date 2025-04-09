class PaginationHelper {
    /**
     * Calcula los valores de paginación a partir de los parámetros recibidos.
     * @param {number} page - Número de página actual (por defecto 1).
     * @param {number} pageSize - Cantidad de elementos por página (por defecto 10).
     * @returns {Object} Objeto con `limit` y `offset`.
     */
    static getPagination(page = 1, pageSize = 10) {
        const limit = parseInt(pageSize, 10);
        const offset = (parseInt(page, 10) - 1) * limit;
        return { limit, offset };
    }

    /**
     * Formatea la respuesta de paginación.
     * @param {Object} data - Datos obtenidos de la base de datos.
     * @param {number} page - Página actual.
     * @param {number} pageSize - Cantidad de elementos por página.
     * @returns {Object} Objeto con la estructura de paginación.
     */
    static getPaginationResponse(data, page, pageSize) {
        return {
            totalItems: data.count,
            totalPages: Math.ceil(data.count / pageSize),
            currentPage: page,
            pageSize: pageSize,
            items: data.rows,
        };
    }
}

module.exports = PaginationHelper;
