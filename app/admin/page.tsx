"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

export default function AdminPage() {
    const { data: session, status } = useSession();
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [authorId, setAuthorId] = useState<number | null>(null);
    const [authors, setAuthors] = useState<{ id: number; name: string }[]>([]);
    const [message, setMessage] = useState<{
        text: string;
        type: string;
    } | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return;

        if (!session) {
            // Utilisateur non authentifié, redirige vers la page de connexion
            signIn(); // Redirige vers la page de connexion
            return;
        }

        if (session.user.role !== "admin") {
            // Utilisateur non admin, redirige vers une page d'accès refusé
            router.push("/accessdenied"); // Assurez-vous d'avoir une page d'accès refusé
            return;
        }

        const fetchAuthors = async () => {
            try {
                const response = await fetch("/api/authors");
                const data = await response.json();
                setAuthors(data);
            } catch (error) {
                console.error("Failed to fetch authors:", error);
            }
        };

        fetchAuthors();
    }, [status, session, router]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!title || !slug || !content || !image || authorId === null) {
            setMessage({
                text: "Le titre, le slug, le contenu, l'image et l'auteur sont requis.",
                type: "error",
            });
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("slug", slug);
        formData.append("content", content);
        formData.append("image", image);
        formData.append("authorId", authorId.toString());

        try {
            const response = await fetch("/api/articles", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Échec de la création de l'article.");
            }

            setTitle("");
            setSlug("");
            setContent("");
            setImage(null);
            setAuthorId(null);
            setMessage({ text: "Article créé avec succès.", type: "success" });
        } catch (error) {
            setMessage({ text: (error as Error).message, type: "error" });
        }
    };

    if (status === "loading" || !session || session.user.role !== "admin") {
        return <p>Loading...</p>; // Afficher un message de chargement pendant la vérification
    }

    return (
        <div className="container">
            <h2>Page Admin</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Titre :</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="slug">Slug :</label>
                    <input
                        type="text"
                        id="slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content">Contenu :</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="image">Image :</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="author">Auteur :</label>
                    <select
                        id="author"
                        value={authorId ?? ""}
                        onChange={(e) => setAuthorId(Number(e.target.value))}
                        required
                    >
                        <option value="" disabled>
                            Sélectionner un auteur
                        </option>
                        {authors.map((author) => (
                            <option key={author.id} value={author.id}>
                                {author.name}
                            </option>
                        ))}
                    </select>
                </div>
                {message && (
                    <p
                        style={{
                            color: message.type === "success" ? "green" : "red",
                        }}
                    >
                        {message.text}
                    </p>
                )}
                <button type="submit">Créer l'article</button>
            </form>
        </div>
    );
}
