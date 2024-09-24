//app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import prisma from "@/lib/db";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
    logger: true,
    debug: true,
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const {
            firstName,
            lastName,
            email,
            phone,
            address,
            subject,
            message,
            newsletter,
        } = body;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.RECIPIENT_EMAIL,
            subject: `Nouveau message de ${firstName} ${lastName}`,
            text: `
                Nom: ${firstName} ${lastName}
                Email: ${email}
                Téléphone: ${phone}
                Adresse: ${address}
                Objet: ${subject}
                Message: ${message}
                Newsletter: ${newsletter}
            `,
        };

        await transporter.sendMail(mailOptions);

        // Conversion de newsletter en booléen
        const newsletterBoolean = newsletter === "yes";

        // Ajouter l'enregistrement dans la base de données
        const newContact = await prisma.contact.create({
            data: {
                firstName,
                lastName,
                email,
                phone,
                address,
                subject,
                message,
                newsletter: newsletterBoolean,
            },
        });

        return NextResponse.json(
            {
                message: "Message envoyé et enregistré avec succès",
                contact: newContact,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Erreur détaillée:", error);

        let errorMessage = "Erreur lors du traitement de la demande";
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return NextResponse.json({ message: errorMessage }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json(
        { message: "Méthode GET non supportée pour cette route" },
        { status: 405 }
    );
}
