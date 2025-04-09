
const db = require("../config/db");

class BitacoraService {
    async logAction(userId, action, details) {
        try {
            const query = `
                INSERT INTO bitacora (usuario_id, accion, detalles, fecha)
                VALUES ($1, $2, $3, NOW()) RETURNING *;
            `;
            const values = [userId, action, details];
            const result = await db.query(query, values);

            return { success: true, log: result.rows[0] };
        } catch (error) {
            console.error("Error registrando acción en bitácora:", error);
            return { success: false, message: "Error al registrar acción en la bitácora" };
        }
    }

    async getLogs(limit = 50) {
        try {
            const query = `
                SELECT * FROM bitacora ORDER BY fecha DESC LIMIT $1;
            `;
            const result = await db.query(query, [limit]);
            return { success: true, logs: result.rows };
        } catch (error) {
            console.error("Error obteniendo bitácora:", error);
            return { success: false, message: "Error al obtener registros de bitácora" };
        }
    }
}

module.exports = new BitacoraService();
