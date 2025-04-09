const nodemailer = require("nodemailer");
require("dotenv").config();

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }

    async sendEmail(to, subject, htmlContent) {
        try {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to,
                subject,
                html: htmlContent,
            };

            const info = await this.transporter.sendMail(mailOptions);
            console.log("Correo enviado: ", info.response);
            return { success: true, message: "Correo enviado correctamente" };
        } catch (error) {
            console.error("Error enviando correo: ", error);
            return { success: false, message: "Error enviando correo" };
        }
    }
}

module.exports = new MailService();
