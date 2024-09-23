import type { Metadata } from "next";
import React from "react";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
    title: "The One Piece",
    description:
        "The One Piece est une application destinée à partager l'univers du manga One Piece aussi bien pour ceux qui découvrent le manga que pour les fans de longue date.  ",
};

interface IRootLayout {
    children: React.ReactNode;
}

const RootLayout: React.FC<IRootLayout> = ({ children }) => {
    return (
        <html lang="fr">
            <head>
                <link rel="icon" href="images/favicon.ico" />
            </head>
            <body>
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    );
};

export default RootLayout;
