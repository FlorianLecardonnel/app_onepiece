// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/app/lib/db";

export async function POST(request: Request) {
    const { email, password, firstName, lastName, username } =
        await request.json();

    // Validation simple
    if (!email || !password || !firstName || !lastName || !username) {
        return NextResponse.json(
            { error: "Tous les champs sont requis." },
            { status: 400 }
        );
    }

    // Vérifiez si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return NextResponse.json(
            { error: "L'utilisateur existe déjà." },
            { status: 400 }
        );
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    try {
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
                username,
            },
        });

        return NextResponse.json(
            { message: "Utilisateur créé avec succès." },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Erreur lors de la création de l'utilisateur." },
            { status: 500 }
        );
    }
}
