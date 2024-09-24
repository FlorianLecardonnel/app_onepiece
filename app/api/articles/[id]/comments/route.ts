// app/api/articles/[id]/comments/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/app/lib/db";

export async function POST(request: NextRequest) {
    const url = new URL(request.url);
    const id = url.pathname.split("/")[3];

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

    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { content, authorUsername } = await request.json();


    const authorId = session.user.id ? Number(session.user.id) : undefined;

    const articleId = Number(id);

    // || isNaN(authorId)

    if (!content || !authorUsername || isNaN(articleId)) {
        
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
            include: { author: true },
        });

        return NextResponse.json(comments);
    } catch (error) {
        console.error("Failed to fetch comments:", error);
        return NextResponse.json(
            { error: "Failed to fetch comments" },
            { status: 500 }
        );
    }
}
