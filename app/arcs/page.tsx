"use client";

import React, { useEffect, useState } from "react";
import { Arc } from "../../interfaces/arc";

const ArcsPage: React.FC = () => {
    const [arcs, setArcs] = useState<Arc[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadArcs() {
            try {
                const response = await fetch("/api/arcs");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setArcs(data);
            } catch (error) {
                setError("Erreur lors de la récupération des arcs narratifs.");
                console.error(
                    "Erreur lors de la récupération des arcs narratifs:",
                    error
                );
            } finally {
                setLoading(false);
            }
        }

        loadArcs();
    }, []);

    if (loading) {
        return <p>Chargement...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <main>
            <section id="arcs">
                <div id="arcs-container">
                    {arcs.length > 0 ? (
                        arcs.map((arc) => (
                            <div className="arc" key={arc.id}>
                                <h2>{arc.title || "Titre inconnu"}</h2>
                                <p>
                                    <strong>Saga :</strong> {arc.saga.title}
                                </p>
                                <p>
                                    <strong>Chapitre :</strong>{" "}
                                    {arc.saga.saga_chapitre}
                                </p>
                                <p>
                                    <strong>Volume :</strong>{" "}
                                    {arc.saga.saga_volume}
                                </p>
                                <p>
                                    <strong>Épisode :</strong>{" "}
                                    {arc.saga.saga_episode}
                                </p>
                                <p>
                                    <strong>Description :</strong>{" "}
                                    {arc.description ||
                                        "Description non disponible"}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p>Aucun arc narratif trouvé.</p>
                    )}
                </div>
            </section>
        </main>
    );
};

export default ArcsPage;
