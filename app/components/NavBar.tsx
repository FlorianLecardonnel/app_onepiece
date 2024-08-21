//app/components/NavBar.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Navbar: React.FC = () => {
    const { data: session, status } = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const handleLogout = async () => {
        await signOut();
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
                <div className="logo-container">
                    <Image
                        src="/images/logo-onepiece.png"
                        alt="Logo One Piece"
                        width={150}
                        height={50}
                        priority
                    />
                </div>
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
                <ul className={isMenuOpen ? "show" : ""}>
                    <li>
                        <Link href="/" onClick={handleLinkClick}>
                            Accueil
                        </Link>
                    </li>
                    <li>
                        <Link href="/characters" onClick={handleLinkClick}>
                            Personnages
                        </Link>
                    </li>
                    <li>
                        <Link href="/arcs" onClick={handleLinkClick}>
                            Arcs narratifs
                        </Link>
                    </li>
                    <li>
                        <Link href="/articles" onClick={handleLinkClick}>
                            Blog
                        </Link>
                    </li>
                    {status === "authenticated" ? (
                        <>
                            <li>
                                <Link href="/profile" onClick={handleLinkClick}>
                                    Profil
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link
                                    href="/auth/signin"
                                    onClick={handleLinkClick}
                                >
                                    Connexion
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/auth/signup"
                                    onClick={handleLinkClick}
                                >
                                    Inscription
                                </Link>
                            </li>
                        </>
                    )}
                    <li>
                        <Link href="/contact" onClick={handleLinkClick}>
                            Contact
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
