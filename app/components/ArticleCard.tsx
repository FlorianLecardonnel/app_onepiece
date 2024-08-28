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
    // Fonction pour extraire le premier paragraphe
    const extractFirstParagraph = (content: string) => {
        const match = content.match(/<p>(.*?)<\/p>/);
        return match ? match[1] : content.substring(0, 100) + "..."; // Si pas de paragraphe, on tronque
    };

    const firstParagraph = extractFirstParagraph(introduction);

    return (
        <div className="article-card">
            <img src={image} alt={title} className="article-image" />
            <h2>{title}</h2>
            <p>{firstParagraph}</p>
            <Link href={`/article/${id}`} className="read-more-link">
                Lire l'article
            </Link>
        </div>
    );
};

export default ArticleCard;
