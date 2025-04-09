const db = require("../config/db");

class GameService {
    async getAllGames() {
        try {
            const query = `SELECT * FROM juegos ORDER BY nombre ASC;`;
            const result = await db.query(query);
            return { success: true, games: result.rows };
        } catch (error) {
            console.error("Error obteniendo juegos:", error);
            return { success: false, message: "Error al obtener juegos" };
        }
    }

    async getGameById(gameId) {
        try {
            const query = `SELECT * FROM juegos WHERE id = $1;`;
            const result = await db.query(query, [gameId]);

            return result.rows.length
                ? { success: true, game: result.rows[0] }
                : { success: false, message: "Juego no encontrado" };
        } catch (error) {
            console.error("Error obteniendo juego:", error);
            return { success: false, message: "Error al obtener el juego" };
        }
    }

    async recordGameCompletion(userId, gameId, score) {
        try {
            const query = `
                INSERT INTO juegos_realizados (usuario_id, juego_id, puntaje, fecha_completado)
                VALUES ($1, $2, $3, NOW()) RETURNING *;
            `;
            const values = [userId, gameId, score];
            const result = await db.query(query, values);

            return { success: true, record: result.rows[0] };
        } catch (error) {
            console.error("Error registrando juego completado:", error);
            return { success: false, message: "Error al registrar el juego" };
        }
    }
}

module.exports = new GameService();
