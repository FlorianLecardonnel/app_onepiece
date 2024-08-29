// app/articles/page.tsx
"use client"

import React, { useEffect, useState } from "react";
import ArticleCard from "@/components/ArticleCard";

interface Article {
    id: number;
    title: string;
    slug: string;
    content: string;
}

const ArticlesPage = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch("/api/articles");
                if (!response.ok) {
                    throw new Error(`Failed to fetch articles with status: ${response.status}`);
                }
                const data: Article[] = await response.json();
                setArticles(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container">
            <h1 className="section-title">Articles</h1>
            <div className="grid-container">
                {articles.map((article) => (
                    <ArticleCard
                        key={article.id}
                        id={article.id}
                        title={article.title}
                        image={`/images/${article.slug}.jpg`}
                        introduction={article.content}
                    />
                ))}
            </div>
        </div>
    );
};

export default ArticlesPage;
