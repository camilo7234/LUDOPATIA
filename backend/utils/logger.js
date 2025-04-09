const fs = require("fs");
const path = require("path");

class Logger {
    constructor() {
        this.logDir = path.join(__dirname, "../logs");
        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir, { recursive: true });
        }
        this.logFile = path.join(this.logDir, "app.log");
    }

    /**
     * Registra un mensaje en el archivo de logs con nivel INFO.
     * @param {string} message - Mensaje a registrar.
     */
    info(message) {
        this.writeLog("INFO", message);
    }

    /**
     * Registra un mensaje en el archivo de logs con nivel WARNING.
     * @param {string} message - Mensaje a registrar.
     */
    warn(message) {
        this.writeLog("WARNING", message);
    }

    /**
     * Registra un mensaje en el archivo de logs con nivel ERROR.
     * @param {string} message - Mensaje a registrar.
     */
    error(message) {
        this.writeLog("ERROR", message);
    }

    /**
     * Escribe un log en el archivo con formato estandarizado.
     * @param {string} level - Nivel del log (INFO, WARNING, ERROR).
     * @param {string} message - Mensaje del log.
     */
    writeLog(level, message) {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] [${level}] ${message}\n`;
        fs.appendFile(this.logFile, logMessage, (err) => {
            if (err) console.error("Error escribiendo log:", err);
        });
    }
}

module.exports = new Logger();
