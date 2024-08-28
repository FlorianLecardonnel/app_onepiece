// app/components/ArticleCard.tsx
import React from "react";
import Link from "next/link";
<<<<<<< HEAD

interface ArticleCardProps {
=======
import Image from "next/image";

type ArticleCardProps = {
>>>>>>> f1994565b32afe4b3f135725c7e91c004995447d
    id: number;
    title: string;
    image: string;
    introduction: string;
<<<<<<< HEAD
}
=======
};
>>>>>>> f1994565b32afe4b3f135725c7e91c004995447d

const ArticleCard: React.FC<ArticleCardProps> = ({
    id,
    title,
    image,
    introduction,
}) => {
<<<<<<< HEAD
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
=======
    return (
        <div className="card">
            <img src={image} alt={title} />
            <div className="card-content">
                <h2>{title}</h2>
                <p>{introduction}</p>
                <Link href={`/article/${id}`}>Lire l'article</Link>
            </div>
>>>>>>> f1994565b32afe4b3f135725c7e91c004995447d
        </div>
    );
};

export default ArticleCard;
