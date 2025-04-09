const db = require("../config/db");

class ReportService {
    async createReport(userId, type, description) {
        try {
            const query = `
                INSERT INTO reportes (usuario_id, tipo, descripcion, fecha_creacion)
                VALUES ($1, $2, $3, NOW()) RETURNING *;
            `;
            const values = [userId, type, description];
            const result = await db.query(query, values);
            return { success: true, report: result.rows[0] };
        } catch (error) {
            console.error("Error creando reporte:", error);
            return { success: false, message: "Error al crear el reporte" };
        }
    }

    async getAllReports() {
        try {
            const query = `SELECT * FROM reportes ORDER BY fecha_creacion DESC;`;
            const result = await db.query(query);
            return { success: true, reports: result.rows };
        } catch (error) {
            console.error("Error obteniendo reportes:", error);
            return { success: false, message: "Error al obtener reportes" };
        }
    }

    async getReportById(reportId) {
        try {
            const query = `SELECT * FROM reportes WHERE id = $1;`;
            const result = await db.query(query, [reportId]);
            return result.rows.length
                ? { success: true, report: result.rows[0] }
                : { success: false, message: "Reporte no encontrado" };
        } catch (error) {
            console.error("Error obteniendo reporte:", error);
            return { success: false, message: "Error al obtener el reporte" };
        }
    }
}

module.exports = new ReportService();
