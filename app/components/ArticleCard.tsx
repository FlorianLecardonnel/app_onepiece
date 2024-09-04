// app/components/ArticleCard.tsx

import React from "react";
import Link from "next/link";

interface ArticleCardProps {
    id: number;
    title: string;
    image: string;
    introduction: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
    id,
    title,
    image,
    introduction,
}) => {
    const extractFirstParagraph = (content: string) => {
        const match = content.match(/<p>(.*?)<\/p>/);
        return match ? match[1] : content.substring(0, 100) + "...";
    };

    const firstParagraph = extractFirstParagraph(introduction);

    return (
        <div className="article-card">
            <img src={image} alt={title} className="article-image" />
            <div className="article-content">
                <h2>{title}</h2>
                <p>{firstParagraph}</p>
                <Link href={`/article/${id}`} className="read-more-link">
                    Lire l'article
                </Link>
            </div>
        </div>
    );
};

export default ArticleCard;
