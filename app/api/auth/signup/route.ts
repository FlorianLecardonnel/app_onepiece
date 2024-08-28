//app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/db"; // Assurez-vous que ce chemin est correct
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
    const { email, password, firstName, lastName, username } =
        await request.json();

    if (!email || !password) {
        return NextResponse.json(
            { error: "Email and password are required" },
            { status: 400 }
        );
    }

    try {
        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
                username,
            },
        });

        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
