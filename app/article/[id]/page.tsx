// app/article/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import CommentForm from "@/app/components/CommentForm";
import SignIn from "@/app/components/SignInForm";

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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { data: session } = useSession();
    const router = useRouter();

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
                setError(err.message);
            } finally {
                setLoading(false);
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
                setError(err.message);
            }
        };

        fetchArticle();
        fetchComments();
    }, [params.id, router]);

    const handleCommentSubmit = async (content: string) => {
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
                        authorUsername: session?.user?.name || "Anonymous",
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to submit comment");
            }

            const newComment: Comment = await response.json();
            setComments([...comments, newComment]);
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!article) return <div>Article not found</div>;

    return (
        <div className="container">
            <h1 className="section-title">{article.title}</h1>
            <div className="article-content">
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>

            <div className="comments-section">
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
                ) : (
                    <a href="/auth/signin">
                        Veuillez vous connecter pour poster un commentaire.
                    </a>
                )}
            </div>
        </div>
    );
}
