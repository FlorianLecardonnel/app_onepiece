"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
    const [token, setToken] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        // Initial check on load
        setToken(localStorage.getItem("token"));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setIsMenuOpen(false); // Close the menu on logout
    };

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLinkClick = () => {
        setIsMenuOpen(false); // Close the menu on link click
    };

    useEffect(() => {
        setIsMenuOpen(false); // Close the menu when pathname changes
    }, [pathname]);

    return (
        <header className="container">
            <Link href="/">
                <img src="/images/logo-onepiece.png" alt="Logo One Piece" />
            </Link>
            <h1>The One Piece</h1>
            <button
                className="burger-menu"
                aria-label="Toggle navigation"
                onClick={handleMenuToggle}
            >
                &#9776;
            </button>
            <nav>
                <ul className={isMenuOpen ? 'show' : ''}>
                    <li>
                        <Link href="/" onClick={handleLinkClick}>Accueil</Link>
                    </li>
                    <li>
                        <Link href="/characters" onClick={handleLinkClick}>Personnages</Link>
                    </li>
                    <li>
                        <Link href="/arcs" onClick={handleLinkClick}>Arcs narratifs</Link>
                    </li>
                    <li>
                        <Link href="/blog" onClick={handleLinkClick}>Blog</Link>
                    </li>
                    <li>
                        <Link href="/contact" onClick={handleLinkClick}>Contact</Link>
                    </li>
                    <li className={`connexion ${token ? "hidden" : ""}`}>
                        <Link href="/signup" onClick={handleLinkClick}>Connexion</Link>
                    </li>
                    <li className={`deconnexion ${token ? "" : "hidden"}`}>
                        <a href="/" onClick={handleLogout}>Déconnexion</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
