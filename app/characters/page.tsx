"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const CharactersPage: React.FC = () => {
    const [characters, setCharacters] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit] = useState(10);

    const characterImages: { [key: string]: string } = {
        "Monkey D Luffy": "/images/luffy.jpg",
        "Roronoa Zoro": "/images/zoro.jpg",
        Nami: "/images/nami.jpg",
        Sanji: "/images/sanji.jpg",
        Usopp: "/images/usopp.jpg",
        "Nico Robin": "/images/robin.jpg",
        Franky: "/images/franky.jpg",
        Brook: "/images/brook.jpg",
        Jinbe: "/images/jinbe.jpg",
        "Tony-Tony Chopper": "/images/chopper.jpg",
    };

    useEffect(() => {
        async function loadCharacters() {
            try {
                const response = await fetch(
                    `/api/characters?page=${page}&limit=${limit}`
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const { data, pagination } = await response.json();
                setCharacters(data);
                setTotalPages(pagination.totalPages);
            } catch (error) {
                setError("Erreur lors de la récupération des personnages.");
                console.error(
                    "Erreur lors de la récupération des personnages:",
                    error
                );
            } finally {
                setLoading(false);
            }
        }

        loadCharacters();
    }, [page, limit]);

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

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

    return (
        <div className="container">
            <h1 className="section-title">Personnages</h1>
            <section id="characters">
                <div
                    id="characters__container"
                    className="characters__container"
                >
                    {characters.length > 0 ? (
                        characters.map((character: any) => (
                            <div className="character" key={character.id}>
                                <div className="character__image">
                                    <Image
                                        src={
                                            characterImages[character.name] ||
                                            "/images/one_piece_defaut.jpg" // Image par défaut
                                        }
                                        alt={
                                            character.name || "Image par défaut"
                                        }
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                    <h2>{character.name || "Nom inconnu"}</h2>
                                    <div className="character__overlay">
                                        <div className="character__description">
                                            <p>
                                                <strong>Métier :</strong>{" "}
                                                {character.job || "Inconnu"}
                                            </p>
                                            <p>
                                                <strong>Taille :</strong>{" "}
                                                {character.size || "Inconnu"}
                                            </p>
                                            <p>
                                                <strong>Âge :</strong>{" "}
                                                {character.age || "Inconnu"}
                                            </p>
                                            <p>
                                                <strong>Prime :</strong>{" "}
                                                {character.bounty || "Inconnu"}
                                            </p>
                                            <p>
                                                <strong>Équipage :</strong>{" "}
                                                {character.crew?.name ||
                                                    "Inconnu"}
                                            </p>
                                            <p>
                                                <strong>
                                                    Statut de l&apos;équipage :
                                                </strong>{" "}
                                                {character.crew?.status ||
                                                    "Inconnu"}
                                            </p>
                                            <p>
                                                <strong>
                                                    Nombre de membres :
                                                </strong>{" "}
                                                {character.crew?.number ||
                                                    "Inconnu"}
                                            </p>
                                            <p>
                                                <strong>
                                                    Prime totale de
                                                    l&apos;équipage :
                                                </strong>{" "}
                                                {character.crew?.total_prime ||
                                                    "Inconnu"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Aucun personnage trouvé.</p>
                    )}
                </div>
                <div id="pagination">
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                    >
                        Précédent
                    </button>
                    <span>
                        Page {page} sur {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                    >
                        Suivant
                    </button>
                </div>
            </section>
        </div>
    );
};

export default CharactersPage;
