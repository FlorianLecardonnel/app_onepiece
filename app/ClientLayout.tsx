"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import "./styles/reset.css";
import "./styles/globals.css";
import { Crushed, Kulim_Park } from "next/font/google";

const crushed = Crushed({
    subsets: ["latin"],
    weight: ["400"],
});

const kulim_park = Kulim_Park({
    subsets: ["latin"],
    weight: ["200", "300", "400", "600", "700"],
});

interface IClientLayout {
    children: React.ReactNode;
}

const ClientLayout: React.FC<IClientLayout> = ({ children }) => {
    return (
        <SessionProvider>
            <div className={`${kulim_park.className}`}>
                <Navbar />
                <main>{children}</main>
                <BackToTop />
                <Footer />
            </div>
        </SessionProvider>
    );
};

export default ClientLayout;
