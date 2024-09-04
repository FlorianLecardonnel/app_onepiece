"use client";

import React, { useEffect, useState } from "react";
import { Arc } from "../interfaces/arc";

const ArcsPage: React.FC = () => {
    const [arcs, setArcs] = useState<Arc[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedSaga, setSelectedSaga] = useState<string | null>(null);

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
        return (
            <div className="loader-container">
                <div className="straw-hat-loader"></div>
            </div>
        );
    }

    if (error) {
        return <p>{error}</p>;
    }

    // Extract unique saga titles for filtering
    const sagaTitles = Array.from(new Set(arcs.map((arc) => arc.saga.title)));

    const getBadges = (arc: Arc): string[] => {
        const badges: string[] = [];
        const sagaVolume = Number(arc.saga.saga_volume); // Convertir en nombre
        const sagaChapitre = Number(arc.saga.saga_chapitre); // Convertir en nombre

        if (sagaVolume > 10) {
            badges.push("Volume élevé");
        }
        if (sagaChapitre === 1) {
            badges.push("Chapitre initial");
        }
        if (arc.description && arc.description.length > 100) {
            badges.push("Description longue");
        }
        return badges;
    };

    const filteredArcs = selectedSaga
        ? arcs.filter((arc) => arc.saga.title === selectedSaga)
        : arcs;

    return (
        <div>
            <h1 className="section-title">Arcs</h1>
            <section id="arcs">
                <div className="saga-filter">
                    <div className="saga-badges">
                        {sagaTitles.map((title) => (
                            <button
                                key={title}
                                className={`saga-badge ${
                                    selectedSaga === title ? "active" : ""
                                }`}
                                onClick={() => setSelectedSaga(title)}
                            >
                                {title}
                            </button>
                        ))}
                        <button
                            className={`saga-badge ${
                                selectedSaga === null ? "active" : ""
                            }`}
                            onClick={() => setSelectedSaga(null)}
                        >
                            Tous
                        </button>
                    </div>
                </div>
                <div id="arcs__container">
                    {filteredArcs.length > 0 ? (
                        filteredArcs.map((arc) => {
                            const badges = getBadges(arc);

                            return (
                                <div className="arc" key={arc.id}>
                                    <div className="left-column">
                                        <h2>{arc.title || "Titre inconnu"}</h2>
                                        <div className="badges">
                                            {badges.map((badge) => (
                                                <span
                                                    key={badge}
                                                    className="badge"
>
                                                    {badge}
                                                </span>
                                            ))}
                                        </div>
                                        <p>
                                            <strong>Saga :</strong>{" "}
                                            {arc.saga.title}
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
                                    </div>
                                    <div className="right-column">
                                        <p className="description">
                                            <strong>Description :</strong>{" "}
                                            {arc.description ||
                                                "Description non disponible"}
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>Aucun arc narratif trouvé.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default ArcsPage;
