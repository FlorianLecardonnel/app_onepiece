//app/api/articles/route.ts

import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";
import { writeFile } from "fs/promises";
import path from "path";
import { getToken } from "next-auth/jwt";

export async function GET() {
    try {
        const articles = await prisma.article.findMany();
        return NextResponse.json(articles);
    } catch (error) {
        console.error("Error fetching articles:", error);
        return NextResponse.json(
            { error: "Failed to fetch articles" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    const token = await getToken({ req: request as any });

    // Vérifie si l'utilisateur est authentifié et a le rôle d'administrateur
    if (!token || token.role !== "admin") {
        return NextResponse.json(
            { error: "Vous devez être administrateur pour créer un article." },
            { status: 403 }
        );
    }

    try {
        const formData = await request.formData();
        const title = formData.get("title") as string;
        const slug = formData.get("slug") as string;
        const content = formData.get("content") as string;
        const authorId = parseInt(formData.get("authorId") as string);
        const image = formData.get("image") as File;

        if (!title || !slug || !content || isNaN(authorId) || !image) {
            return NextResponse.json(
                { error: "Les champs requis sont manquants." },
                { status: 400 }
            );
        }

        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Renommer l'image avec le slug et sauvegarder
        const imageName = `${slug}.jpg`;
        const imagePath = path.join(
            process.cwd(),
            "public",
            "images",
            imageName
        );

        // Vérifiez si le répertoire existe, sinon créez-le
        await writeFile(imagePath, buffer);

        // Créer l'article dans la base de données
        const article = await prisma.article.create({
            data: {
                title,
                slug,
                content,
                image: `/images/${imageName}`,
                author: { connect: { id: authorId } },
            },
        });

        return NextResponse.json(article, { status: 201 });
    } catch (error) {
        console.error("Error creating article:", error);
        return NextResponse.json(
            { error: "Erreur lors de la création de l'article" },
            { status: 500 }
        );
    }
}
