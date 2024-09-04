import NextAuth from "next-auth";
import authOptions from "./authOptions"; // Importez les options depuis le fichier séparé

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
