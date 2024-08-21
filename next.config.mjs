/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Active le mode strict de React pour le développement
    // Autres options de configuration ici, si nécessaire
    env: {
        // Ajoutez vos variables d'environnement ici si nécessaire
        DATABASE_URL: process.env.DATABASE_URL,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        JWT_SECRET: process.env.JWT_SECRET,
    },
};

export default nextConfig;
