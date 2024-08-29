// app/profile/page.tsx
"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Profile() {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (!session) {
        router.push("/login"); // Redirige vers la page de connexion si non connecté
        return null;
    }

    return (
        <div className="profil">
            <h1>Profil</h1>
            <p>Bienvenue, {session.user?.name || "User"}!</p>
            <button onClick={() => signOut({ callbackUrl: '/login' })}>
                Se déconnecter
            </button>
        </div>
    );
}
