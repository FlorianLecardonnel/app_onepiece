"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignInForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            setError(result.error);
        } else {
            router.push("/articles"); // Changez le chemin si nécessaire
        }
    };

    return (
        <div className="container__form">
            <form onSubmit={handleSubmit}>
                <h1>Connexion</h1>
                <label>Email:</label>
                <input
                    type="email"
                    placeholder="Email*"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Mot de passe:</label>
                <input
                    type="password"
                    placeholder="Mot de passe*"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p>{error}</p>}
                <button type="submit">Se connecter</button>
            </form>
            <Link href="/auth/signup">
                Vous n&apos;avez pas de compte ? S&apos;inscrire
            </Link>
        </div>
    );
};

export default SignInForm;
