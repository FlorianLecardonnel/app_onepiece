// app/lib/email.ts
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // SMTP host, ex: smtp.gmail.com
    port: parseInt(process.env.SMTP_PORT || "587"), // Port, généralement 587 pour TLS
    secure: process.env.SMTP_SECURE === "true", // true pour 465, false pour 587
    auth: {
        user: process.env.EMAIL_USER, // Votre email
        pass: process.env.EMAIL_PASS, // Mot de passe ou app password
    },
});

export async function sendEmail(formData: any) {
    try {
        await transporter.sendMail({
            from: `"${formData.firstName} ${formData.lastName}" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO, // Le destinataire
            subject: formData.subject, // Sujet de l'email
            text: formData.message, // Contenu en texte brut
            html: `<p>${formData.message}</p>`, // Contenu HTML
        });
        console.log("Email envoyé avec succès");
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email :", error);
        throw new Error("Erreur lors de l'envoi de l'email");
    }
}
