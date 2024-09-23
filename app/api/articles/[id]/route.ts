// app/api/articles/[id]/route.ts
"use server";

import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";

// Fonction de récupération d'article par ID
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;

    // Validation de l'ID
    if (!id || isNaN(Number(id))) {
        return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    try {
        // Récupération de l'article de la base de données
        const article = await prisma.article.findUnique({
            where: { id: parseInt(id) },
        });

        // Gestion du cas où l'article n'est pas trouvé
        if (!article) {
            return NextResponse.json(
                { message: "Article not found" },
                { status: 404 }
            );
        }

        // Retour des données de l'article
        return NextResponse.json(article);
    } catch (error) {
        console.error(error); // Ajoutez cette ligne pour aider au débogage
        return NextResponse.json(
            { message: "Error fetching article" },
            { status: 500 }
        );
    }
}
