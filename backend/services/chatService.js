const db = require("../config/db");

class ChatService {
    async createChat(participants) {
        try {
            const query = `
                INSERT INTO chats (fecha_creacion)
                VALUES (NOW()) RETURNING id;
            `;
            const result = await db.query(query);
            const chatId = result.rows[0].id;

            for (const userId of participants) {
                await db.query(`
                    INSERT INTO chat_usuarios (chat_id, usuario_id)
                    VALUES ($1, $2);
                `, [chatId, userId]);
            }

            return { success: true, chatId };
        } catch (error) {
            console.error("Error creando chat:", error);
            return { success: false, message: "Error al crear el chat" };
        }
    }

    async sendMessage(chatId, senderId, message) {
        try {
            const query = `
                INSERT INTO mensajes (chat_id, usuario_id, contenido, fecha_envio)
                VALUES ($1, $2, $3, NOW()) RETURNING *;
            `;
            const values = [chatId, senderId, message];
            const result = await db.query(query, values);
            return { success: true, message: result.rows[0] };
        } catch (error) {
            console.error("Error enviando mensaje:", error);
            return { success: false, message: "Error al enviar el mensaje" };
        }
    }

    async getChatMessages(chatId) {
        try {
            const query = `
                SELECT * FROM mensajes WHERE chat_id = $1 ORDER BY fecha_envio ASC;
            `;
            const result = await db.query(query, [chatId]);
            return { success: true, messages: result.rows };
        } catch (error) {
            console.error("Error obteniendo mensajes del chat:", error);
            return { success: false, message: "Error al obtener mensajes" };
        }
    }
}

module.exports = new ChatService();
