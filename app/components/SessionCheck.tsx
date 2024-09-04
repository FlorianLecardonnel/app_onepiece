// app/components/SessionCheck.tsx
"use client";

import { useEffect } from "react";
import useSWR from "swr";
import { getSession } from "next-auth/react";

const fetcher = async () => {
    const session = await getSession();
    return session;
};

interface SessionCheckProps {
    onSessionChange: (session: any) => void;
}

export default function SessionCheck({ onSessionChange }: SessionCheckProps) {
    const { data: session, isLoading } = useSWR("session", fetcher);

    useEffect(() => {
        if (!isLoading) {
            onSessionChange(session); // Notifie le composant parent du changement de session
        }
    }, [session, isLoading, onSessionChange]);

    return null; // Aucun rendu nécessaire ici
}
