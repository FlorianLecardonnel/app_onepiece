//app/article/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CommentSection } from "@/app/components/CommentSection";
import { postComment } from "@/app/api/comment";

interface Article {
    id: number;
    title: string;
    content: string;
    slug: string;
    authorId: number;
}

interface Comment {
    id: number;
    content: string;
    authorUsername: string;
}

export default function ArticlePage({ params }: { params: { id: string } }) {
    const [article, setArticle] = useState<Article | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loadingArticle, setLoadingArticle] = useState(true);
    const [loadingComments, setLoadingComments] = useState(true);
    const [errorArticle, setErrorArticle] = useState<string | null>(null);
    const [errorComments, setErrorComments] = useState<string | null>(null);
    const [showComments, setShowComments] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(`/api/articles/${params.id}`);
                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch article with status: ${response.status}`
                    );
                }
                const data: Article = await response.json();
                setArticle(data);
            } catch (err: any) {
                setErrorArticle(err.message);
            } finally {
                setLoadingArticle(false);
            }
        };

        const fetchComments = async () => {
            try {
                const response = await fetch(
                    `/api/articles/${params.id}/comments`
                );
                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch comments with status: ${response.status}`
                    );
                }
                const data: Comment[] = await response.json();
                setComments(data);
            } catch (err: any) {
                setErrorComments(err.message);
            } finally {
                setLoadingComments(false);
            }
        };

        fetchArticle();
        fetchComments();
    }, [params.id]);

    const handleCommentSubmit = async (content: string) => {
        if (!session || !session.user) {
            alert("Vous devez être connecté pour soumettre un commentaire.");
            return;
        }

        try {
            const response = await fetch(
                `/api/articles/${params.id}/comments`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        content,
                        authorUsername: session.user.name || "Anonymous",
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to submit comment");
            }

            const newComment = await response.json();
            setComments((prevComments) => [...prevComments, newComment]); // Met à jour les commentaires
        } catch (err) {
            console.error(err);
            alert(
                "Une erreur est survenue lors de la soumission du commentaire."
            );
        }
    };

    const toggleComments = () => {
        setShowComments((prevShowComments) => !prevShowComments);
    };

    if (loadingArticle)
        return (
            <div className="loader-container">
                <div className="straw-hat-loader"></div>
            </div>
        );
    if (errorArticle) return <div>Error: {errorArticle}</div>;
    if (!article) return <div>Article not found</div>;

    return (
        <div className="container">
            <div className="article-content">
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>

            <div className="comments-section">
                {session && article ? (
                    <>
                        <h2>Ajouter un commentaire</h2>
                        <CommentSection
                            articleId={article.id}
                            onSubmit={async (content) => {
                                try {
                                    const newComment = await postComment(
                                        article.id,
                                        content,
                                        session?.user?.name || "Anonymous"
                                    );
                                    setComments((prevComments) => [
                                        ...prevComments,
                                        newComment,
                                    ]);
                                } catch (error) {
                                    console.error(
                                        "Erreur lors de l'ajout du commentaire:",
                                        error
                                    );
                                    alert(
                                        "Une erreur est survenue lors de l'ajout du commentaire."
                                    );
                                }
                            }}
                        />
                    </>
                ) : (
                    <a href="/auth/signin">
                        Veuillez vous connecter pour poster un commentaire.
                    </a>
                )}

                <div className="comments-header" onClick={toggleComments}>
                    <h2>Commentaires</h2>
                    <span className={`arrow ${showComments ? "open" : ""}`}>
                        ▼
                    </span>
                </div>

                {showComments && (
                    <>
                        {loadingComments ? (
                            <div>Loading comments...</div>
                        ) : errorComments ? (
                            <div>Error: {errorComments}</div>
                        ) : (
                            comments.map((comment) => (
                                <div key={comment.id} className="comment">
                                    <p>
                                        <strong>
                                            {comment.authorUsername}
                                        </strong>
                                        : {comment.content}
                                    </p>
                                </div>
                            ))
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
