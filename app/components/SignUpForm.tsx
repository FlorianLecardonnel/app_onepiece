// app/components/SignUpForm.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignupPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
                firstName,
                lastName,
                username,
            }),
        });

        if (res.ok) {
            router.push("/auth/signin");
        } else {
            console.error("Failed to sign up");
        }
    };

    return (
        <div className="container__form">
            <form onSubmit={handleSubmit}>
                <h1>Inscription</h1>
                <label>
                    Prénom:
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Nom:
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Pseudo:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Mot de passe:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <ul>
                    <span>Le mot de passe doit contenir : </span>
                    <li>Une lettre maj</li>
                    <li>Au minimum 1 chiffre</li>
                    <li>Au minimum 8 caractères</li>
                    <li>Au minimum 1 caractère spécial ( @$!%*?& )</li>
                </ul>
                <br />
                <button type="submit">S&apos;inscrire</button>
            </form>
            <Link href="/auth/signin">
                Vous avez déjà un compte? Se connecter
            </Link>
        </div>
    );
};

export default SignupPage;
