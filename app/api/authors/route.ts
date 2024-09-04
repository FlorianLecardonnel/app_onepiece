// app/api/authors/route.ts
import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";

export async function GET() {
    try {
        // Sélectionne uniquement les champs nécessaires pour les auteurs
        const authors = await prisma.user.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
            },
        });

        // Combine firstName et lastName pour afficher comme un seul nom
        const formattedAuthors = authors.map((author) => ({
            id: author.id,
            name: `${author.firstName} ${author.lastName}`,
        }));

        return NextResponse.json(formattedAuthors);
    } catch (error) {
        console.error("Error fetching authors:", error);
        return NextResponse.json(
            { error: "Failed to fetch authors" },
            { status: 500 }
        );
    }
}
