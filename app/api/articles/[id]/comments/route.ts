// app/api/articles/[id]/comments/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const id = url.pathname.split("/")[3];

    if (!id || isNaN(Number(id))) {
        return NextResponse.json(
            { error: "Invalid article ID" },
            { status: 400 }
        );
    }

    try {
        const comments = await prisma.comment.findMany({
            where: { articleId: Number(id) },
            orderBy: { createdAt: "asc" },
        });
        return NextResponse.json(comments);
    } catch (error) {
        console.error("Failed to load comments:", error);
        return NextResponse.json(
            { error: "Failed to load comments" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    const url = new URL(request.url);
    const id = url.pathname.split("/")[3];

    if (!id || isNaN(Number(id))) {
        return NextResponse.json(
            { error: "Invalid article ID" },
            { status: 400 }
        );
    }

    const session = await getServerSession(); // Assurez-vous que vous avez configuré next-auth correctement

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { content } = await request.json();
    const authorId = Number(session.user.id); // Assurez-vous que session.user.id est disponible et un nombre
    const articleId = Number(id);

    console.log("Received data:", { content, authorId, articleId });

    try {
        const newComment = await prisma.comment.create({
            data: {
                content,
                article: {
                    connect: { id: articleId }, // Connecter au modèle Article par ID
                },
                author: {
                    connect: { id: authorId }, // Connecter au modèle User par ID
                },
                authorUsername: session.user.name || "", // Nom d'utilisateur de la session
            },
        });
        console.log("Comment created:", newComment);
        return NextResponse.json(newComment, { status: 201 });
    } catch (error) {
        console.error("Failed to post comment:", error);
        return NextResponse.json(
            { error: "Failed to post comment" },
            { status: 500 }
        );
    }
}
