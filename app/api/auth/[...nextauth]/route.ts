// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/app/lib/db";
import bcrypt from "bcrypt";
import type { NextAuthOptions } from "next-auth";

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
                        };
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
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && token.sub) {
                session.user = {
                    ...session.user,
                    id: token.sub,
                };
            }
            console.log("Session after modification:", session);
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };  // Assurez-vous que `authOptions` est exporté ici
