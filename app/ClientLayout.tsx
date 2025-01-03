"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import "./styles/globals.scss";
import { Crushed, Kulim_Park, Rye } from "next/font/google";

const crushed = Crushed({
    subsets: ["latin"],
    weight: ["400"],
});

const kulim_park = Kulim_Park({
    subsets: ["latin"],
    weight: ["200", "300", "400", "600", "700"],
});

const rye = Rye({
    subsets: ["latin"],
    weight: ["400"],
});
interface IClientLayout {
    children: React.ReactNode;
}

const ClientLayout: React.FC<IClientLayout> = ({ children }) => {
    return (
        <SessionProvider>
            <Navbar />
            <main className={`${kulim_park.className}`}>{children}</main>
            <Footer />
        </SessionProvider>
    );
};

export default ClientLayout;
