import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get("page") || "1", 12);
        const limit = parseInt(url.searchParams.get("limit") || "12", 12);
        const start = (page - 1) * limit;

        const response = await fetch(
            "https://api.api-onepiece.com/v2/characters/fr/"
        );
        if (!response.ok) {
            throw new Error("Failed to fetch characters");
        }

        const data = await response.json();

        // Transformation des données
        const transformedData = data.map((character: any) => ({
            id: character.id,
            name: character.name,
            job: character.job,
            size: character.size,
            age: character.age,
            bounty: character.bounty,
            crew: character.crew
                ? {
                      name: character.crew.name,
                      status: character.crew.status,
                      number: character.crew.number,
                      total_prime: character.crew.total_prime,
                  }
                : null,
        }));

        // Pagination
        const paginatedData = transformedData.slice(start, start + limit);
        const totalPages = Math.ceil(transformedData.length / limit);

        return NextResponse.json({
            data: paginatedData,
            pagination: {
                page,
                limit,
                totalPages,
                totalItems: transformedData.length,
            },
        });
    } catch (error) {
        console.error("Error fetching characters:", error);
        return NextResponse.json(
            { error: "Erreur lors de la récupération des personnages." },
            { status: 500 }
        );
    }
}
