<<<<<<< HEAD
//app/article/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CommentSection } from "@/app/components/CommentSection";
import { postComment } from "@/app/api/comment";
=======
// app/article/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import CommentForm from "@/app/components/CommentForm";
import SignIn from "@/app/components/SignInForm";
>>>>>>> f1994565b32afe4b3f135725c7e91c004995447d

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
<<<<<<< HEAD
    const [loadingArticle, setLoadingArticle] = useState(true);
    const [loadingComments, setLoadingComments] = useState(true);
    const [errorArticle, setErrorArticle] = useState<string | null>(null);
    const [errorComments, setErrorComments] = useState<string | null>(null);
    const [showComments, setShowComments] = useState(false);
    const { data: session } = useSession();
=======
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { data: session } = useSession();
    const router = useRouter();
>>>>>>> f1994565b32afe4b3f135725c7e91c004995447d

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
<<<<<<< HEAD
                setErrorArticle(err.message);
            } finally {
                setLoadingArticle(false);
=======
                setError(err.message);
            } finally {
                setLoading(false);
>>>>>>> f1994565b32afe4b3f135725c7e91c004995447d
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
<<<<<<< HEAD
                setErrorComments(err.message);
            } finally {
                setLoadingComments(false);
=======
                setError(err.message);
>>>>>>> f1994565b32afe4b3f135725c7e91c004995447d
            }
        };

        fetchArticle();
        fetchComments();
<<<<<<< HEAD
    }, [params.id]);

    const handleCommentSubmit = async (content: string) => {
        if (!session || !session.user) {
            alert("Vous devez être connecté pour soumettre un commentaire.");
            return;
        }

=======
    }, [params.id, router]);

    const handleCommentSubmit = async (content: string) => {
>>>>>>> f1994565b32afe4b3f135725c7e91c004995447d
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
<<<<<<< HEAD
                        authorUsername: session.user.name || "Anonymous",
=======
                        authorUsername: session?.user?.name || "Anonymous",
>>>>>>> f1994565b32afe4b3f135725c7e91c004995447d
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to submit comment");
            }

<<<<<<< HEAD
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

    if (loadingArticle) return <div>Loading article...</div>;
    if (errorArticle) return <div>Error: {errorArticle}</div>;
=======
            const newComment: Comment = await response.json();
            setComments([...comments, newComment]);
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
>>>>>>> f1994565b32afe4b3f135725c7e91c004995447d
    if (!article) return <div>Article not found</div>;

    return (
        <div className="container">
<<<<<<< HEAD
=======
            <h1 className="section-title">{article.title}</h1>
>>>>>>> f1994565b32afe4b3f135725c7e91c004995447d
            <div className="article-content">
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>

            <div className="comments-section">
<<<<<<< HEAD
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
=======
                <h2>Commentaires</h2>
                {comments.map((comment) => (
                    <div key={comment.id} className="comment">
                        <p>
                            <strong>{comment.authorUsername}</strong>:{" "}
                            {comment.content}
                        </p>
                    </div>
                ))}

                {session ? (
                    <CommentForm articleId={article.id} />
>>>>>>> f1994565b32afe4b3f135725c7e91c004995447d
                ) : (
                    <a href="/auth/signin">
                        Veuillez vous connecter pour poster un commentaire.
                    </a>
                )}
<<<<<<< HEAD

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
=======
>>>>>>> f1994565b32afe4b3f135725c7e91c004995447d
            </div>
        </div>
    );
}
