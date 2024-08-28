// app/api/articles/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/db';

export async function GET() {
    console.log("GET /api/articles called");
    try {
        const articles = await prisma.article.findMany();
        console.log("Fetched articles:", articles);
        return NextResponse.json(articles);
    } catch (error) {
        console.error('Error fetching articles:', error);
        return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
    }
}