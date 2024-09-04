//app/components/NavBar.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
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
            <div className="header-content">
                <Link href="/">
                    <div className="logo-container">
                        <Image
                            src="/images/logo-onepiece.png"
                            alt="Logo One Piece"
                            width={80}
                            height={40}
                            priority
                        />
                    </div>
                </Link>
                <Link href="/" id="siteName">
                    <h1>The One Piece</h1>
                </Link>
                <button
                    className="burger-menu"
                    aria-label="Toggle navigation"
                    onClick={handleMenuToggle}
                >
                    &#9776;
                </button>
            </div>
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
                            Arcs
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
                            {session.user.role === "admin" && (
                                <li>
                                    <Link
                                        href="/admin"
                                        onClick={handleLinkClick}
                                    >
                                        Admin
                                    </Link>
                                </li>
                            )}
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
