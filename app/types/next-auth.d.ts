// src/types/next-auth.d.ts

import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

// Extend the Session and JWT types
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            role?: string | null;  // Add role property
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role?: string | null;  // Add role property
    }
}
