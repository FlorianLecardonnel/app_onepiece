// app/api/articles/[id]/comments/route.ts
import { NextRequest, NextResponse } from "next/server";
<<<<<<< HEAD
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/lib/db";

export async function POST(request: NextRequest) {
    const url = new URL(request.url);
    const id = url.pathname.split("/")[3];
    console.log("id:", id);

    if (!id || isNaN(Number(id))) {
        return NextResponse.json(
            { error: "Invalid article ID" },
            { status: 400 }
        );
    }

    const session = await getServerSession({
        req: request as any,
        ...authOptions,
    }); // Utilisez `req: request as any` pour contourner le problème de typage
    console.log("Session:", session);

    if (!session || !session.user) {
        console.log("Unauthorized: Session or user missing");
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { content, authorUsername } = await request.json();
    console.log("Request Data:", { content, authorUsername });

    const authorId = session.user.id ? Number(session.user.id) : undefined;
    console.log("Author ID:", authorId);
    const articleId = Number(id);

    // || isNaN(authorId)

    if (!content || !authorUsername || isNaN(articleId)) {
        console.log("Invalid data", {
            content,
            authorId,
            articleId,
            authorUsername,
        });
        return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    try {
        const newComment = await prisma.comment.create({
            data: {
                content,
                article: { connect: { id: articleId } },
                author: { connect: { id: authorId } },
                authorUsername: authorUsername,
            },
        });
        return NextResponse.json(newComment, { status: 201 });
    } catch (error) {
        console.error("Failed to post comment:", error);
        return NextResponse.json(
            { error: "Failed to post comment" },
            { status: 500 }
        );
    }
}
=======
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();
>>>>>>> f1994565b32afe4b3f135725c7e91c004995447d

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
<<<<<<< HEAD
            include: { author: true },
        });

        return NextResponse.json(comments);
    } catch (error) {
        console.error("Failed to fetch comments:", error);
        return NextResponse.json(
            { error: "Failed to fetch comments" },
=======
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
>>>>>>> f1994565b32afe4b3f135725c7e91c004995447d
            { status: 500 }
        );
    }
}
