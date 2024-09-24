import { NextResponse } from "next/server";
import { Arc } from "../../interfaces/arc";

export async function GET() {
    try {
        const response = await fetch(
            "https://api.api-onepiece.com/v2/arcs/fr/"
        );
        if (!response.ok) {
            throw new Error("Failed to fetch arcs");
        }

        const data: Arc[] = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching arcs:", error);
        return NextResponse.json(
            { error: "Erreur lors de la récupération des arcs narratifs." },
            { status: 500 }
        );
    }
}
