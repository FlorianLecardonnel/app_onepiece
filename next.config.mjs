/** @type {import('next').NextConfig} */
<<<<<<< HEAD

import path from "path";

const sassOptions = {
    includePaths: [path.join(process.cwd(), "styles")],
};

=======
>>>>>>> f1994565b32afe4b3f135725c7e91c004995447d
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
<<<<<<< HEAD
    sassOptions,
    // async rewrites() {
    //     return [    
    //         {
    //             source: "/:path*", // Attrape toutes les autres routes
    //             destination: "/views/:path*", // Redirige vers le fichier dans /views
    //         },
    //     ];
    // },
=======
>>>>>>> f1994565b32afe4b3f135725c7e91c004995447d
};

export default nextConfig;
