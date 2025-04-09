const db = require("../config/db");

class NotificationService {
    async createNotification(userId, type, message) {
        try {
            const query = `
                INSERT INTO notificaciones (usuario_id, tipo, mensaje, fecha_creacion)
                VALUES ($1, $2, $3, NOW()) RETURNING *;
            `;
            const values = [userId, type, message];
            const result = await db.query(query, values);
            return { success: true, notification: result.rows[0] };
        } catch (error) {
            console.error("Error creando notificación:", error);
            return { success: false, message: "Error al crear la notificación" };
        }
    }

    async getUserNotifications(userId) {
        try {
            const query = `SELECT * FROM notificaciones WHERE usuario_id = $1 ORDER BY fecha_creacion DESC;`;
            const result = await db.query(query, [userId]);
            return { success: true, notifications: result.rows };
        } catch (error) {
            console.error("Error obteniendo notificaciones:", error);
            return { success: false, message: "Error al obtener notificaciones" };
        }
    }
}

module.exports = new NotificationService();
