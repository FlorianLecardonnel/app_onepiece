"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
<<<<<<< HEAD
import "./styles/globals.scss";
=======
import "./styles/reset.css";
import "./styles/globals.css";
>>>>>>> f1994565b32afe4b3f135725c7e91c004995447d
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
<<<<<<< HEAD
            <Navbar />
            {/* <div className={`${kulim_park.className}`}>
                <main>{children}</main>
                <BackToTop />
                <Footer />
            </div> */}
            <main className={`${kulim_park.className}`}>
                {children}
                <BackToTop />
            </main>
            <Footer />
=======
            <div className={`${kulim_park.className}`}>
                <Navbar />
                <main>{children}</main>
                <BackToTop />
                <Footer />
            </div>
>>>>>>> f1994565b32afe4b3f135725c7e91c004995447d
        </SessionProvider>
    );
};

export default ClientLayout;
