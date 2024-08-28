// app/components/SessionCheck.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { getSession } from "next-auth/react";

const fetcher = async () => {
    const session = await getSession();
    return session;
};

export default function SessionCheck() {
    const { data: session, error, isLoading } = useSWR("session", fetcher);
    const router = useRouter();

    useEffect(() => {
        if (!session && !isLoading) {
            // Redirection si l'utilisateur n'est pas authentifié et qu'on n'est pas en train de charger
            router.push("/login");
        }
    }, [session, isLoading, router]);

    if (isLoading) {
        return <div>Loading...</div>; // État de chargement
    }

    if (!session) {
        return null; // Évite de montrer quoi que ce soit avant la redirection
    }

    return <div>Welcome, {session?.user?.name || "User"}!</div>;
}
