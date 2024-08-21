// app/components/ArticleCard.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";

type ArticleCardProps = {
    id: number;
    title: string;
    image: string;
    introduction: string;
};

const ArticleCard: React.FC<ArticleCardProps> = ({
    id,
    title,
    image,
    introduction,
}) => {
    return (
        <div className="card">
            <img src={image} alt={title} />
            <div className="card-content">
                <h2>{title}</h2>
                <p>{introduction}</p>
                <Link href={`/article/${id}`}>Lire l'article</Link>
            </div>
        </div>
    );
};

export default ArticleCard;
