const fs = require("fs");
const path = require("path");

class FileHelper {
    /**
     * Guarda un archivo en una ruta específica.
     * @param {string} directory - Ruta del directorio donde se almacenará el archivo.
     * @param {string} filename - Nombre del archivo.
     * @param {Buffer|string} data - Contenido del archivo.
     * @returns {boolean} `true` si el archivo se guardó correctamente, `false` en caso de error.
     */
    static saveFile(directory, filename, data) {
        try {
            if (!fs.existsSync(directory)) {
                fs.mkdirSync(directory, { recursive: true });
            }
            fs.writeFileSync(path.join(directory, filename), data);
            return true;
        } catch (error) {
            console.error("Error guardando archivo:", error);
            return false;
        }
    }

    /**
     * Verifica si un archivo existe en una ruta específica.
     * @param {string} filePath - Ruta del archivo a verificar.
     * @returns {boolean} `true` si el archivo existe, `false` en caso contrario.
     */
    static fileExists(filePath) {
        return fs.existsSync(filePath);
    }

    /**
     * Elimina un archivo si existe.
     * @param {string} filePath - Ruta del archivo a eliminar.
     * @returns {boolean} `true` si se eliminó correctamente, `false` en caso de error.
     */
    static deleteFile(filePath) {
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error eliminando archivo:", error);
            return false;
        }
    }
}

module.exports = FileHelper;
