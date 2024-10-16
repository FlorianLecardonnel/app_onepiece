// app/components/CommentSection.tsx
"use client";
import { useState, useEffect } from "react";
import { fetchComments, postComment } from "../api/comment";

interface CommentSectionProps {
    articleId: number;
    onSubmit: (content: string) => Promise<void>;
}

export function CommentSection({ articleId, onSubmit }: CommentSectionProps) {
    const [comments, setComments] = useState<any[]>([]);
    const [newComment, setNewComment] = useState({
        content: "",
        authorUsername: "",
    });

    useEffect(() => {
        async function loadComments() {
            const fetchedComments = await fetchComments(articleId);
            setComments(fetchedComments || []);
        }

        loadComments();
    }, [articleId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await onSubmit(newComment.content);
            setNewComment({ content: "", authorUsername: "" });
            // Recharger les commentaires après l'ajout
            const fetchedComments = await fetchComments(articleId);
            setComments(fetchedComments || []);
        } catch (error) {
            console.error("Failed to post comment:", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={newComment.content}
                    onChange={(e) =>
                        setNewComment({
                            ...newComment,
                            content: e.target.value,
                        })
                    }
                    placeholder="Ecrivez votre commentaire..."
                />
                <button type="submit">Poster le commentaire</button>
            </form>
        </div>
    );
}
