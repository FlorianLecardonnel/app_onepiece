// app/components/CommentForm.tsx
"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";

interface CommentFormProps {
    articleId: number;
}

const CommentForm: React.FC<CommentFormProps> = ({ articleId }) => {
    const [content, setContent] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const { data: session } = useSession();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!session) {
            alert("Vous devez être connecté pour commenter.");
            return;
        }

        try {
            const response = await fetch(
                `/api/articles/${articleId}/comments`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        content,
                        authorUsername: session.user?.name || "Anonymous", // Utilisez le nom d'utilisateur de la session ou "Anonymous"
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Failed to post comment with status: ${response.status}`
                );
            }

            const newComment = await response.json();
            setContent(""); // Réinitialiser le formulaire après l'ajout du commentaire
            setError(null); // Réinitialiser l'erreur
            setSuccess("Commentaire ajouté avec succès!");
        } catch (error) {
            console.error("Error posting comment:", error);
            setError(
                "Erreur lors de l'ajout du commentaire. Veuillez réessayer."
            );
            setSuccess(null); // Réinitialiser le message de succès
        }
    };

    if (!session) {
        return <p>Veuillez vous connecter pour poster un commentaire.</p>;
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Ajoutez votre commentaire ici..."
                    required
                    aria-label="Commentaire"
                />
                <button type="submit">Soumettre le commentaire</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
        </div>
    );
};

export default CommentForm;
