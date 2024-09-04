import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/app/lib/db";
import bcrypt from "bcrypt";
import type { NextAuthOptions, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";

// Définir un type pour l'utilisateur avec toutes les propriétés nécessaires
interface User {
    id: string;
    email: string;
    name: string;
    firstName: string;
    lastName: string;
    role: string;
}

// Définir un type pour le token avec les propriétés nécessaires
interface NextAuthToken extends JWT {
    id: string; // Assurez-vous que `id` est toujours une chaîne de caractères
    role?: string; // `role` peut être undefined
}

// Définir un type pour la session avec les propriétés nécessaires
interface NextAuthSession extends Session {
    user: User & {
        id: string;
        role: string;
    };
}

const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (user && user.password) {
                    const isPasswordValid = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );
                    if (isPasswordValid) {
                        return {
                            id: user.id.toString(),
                            email: user.email,
                            name: user.username,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            role: user.role,
                        } as User;
                    }
                }

                return null;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = (user as User).id;
                token.role = (user as User).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    ...session.user,
                    id: token.id as string, // Assurez-vous que `token.id` est une chaîne
                    role: token.role || "", // Fournir une chaîne vide par défaut si `role` est `undefined`
                };
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
