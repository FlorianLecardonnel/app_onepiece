// app/api/auth/signin/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    const { email, password } = await request.json();

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET as string,
                { expiresIn: "1h" }
            );

            return NextResponse.json({ token });
        } else {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }
    } catch (error) {
        console.error("Error logging in:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
