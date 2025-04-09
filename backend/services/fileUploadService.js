const path = require("path");
const fs = require("fs");
const db = require("../config/db");

class FileUploadService {
    constructor() {
        this.uploadsDir = path.join(__dirname, "../uploads");
        if (!fs.existsSync(this.uploadsDir)) {
            fs.mkdirSync(this.uploadsDir, { recursive: true });
        }
    }

    async saveFile(file) {
        try {
            const filePath = path.join(this.uploadsDir, file.name);
            await file.mv(filePath);

            const query = `
                INSERT INTO archivos_adjuntos (nombre, ruta, fecha_subida)
                VALUES ($1, $2, NOW()) RETURNING *;
            `;
            const values = [file.name, filePath];
            const result = await db.query(query, values);

            return { success: true, file: result.rows[0] };
        } catch (error) {
            console.error("Error guardando archivo:", error);
            return { success: false, message: "Error al subir el archivo" };
        }
    }

    async getFileById(fileId) {
        try {
            const query = `SELECT * FROM archivos_adjuntos WHERE id = $1;`;
            const result = await db.query(query, [fileId]);

            return result.rows.length
                ? { success: true, file: result.rows[0] }
                : { success: false, message: "Archivo no encontrado" };
        } catch (error) {
            console.error("Error obteniendo archivo:", error);
            return { success: false, message: "Error al obtener el archivo" };
        }
    }
}

module.exports = new FileUploadService();
