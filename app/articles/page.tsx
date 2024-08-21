// app/articles/page.tsx
import React from "react";
import ArticleCard from "../components/ArticleCard";

const articles = [
    {
        id: 1,
        title: "L'équipage au Chapeau de Paille",
        image: "/images/dessin_op.jpeg",
        introduction:
            "L’équipage au chapeau de paille, également connu sous le nom de l’équipage de Monkey D. Luffy, est l’un des groupes les plus emblématiques et captivants de l’univers de One Piece. Créé par Eiichiro Oda, ce groupe hétéroclite de pirates est au cœur de l’aventure épique de la série, traversant des mers périlleuses et affrontant des adversaires redoutables pour réaliser leurs rêves individuels et collectifs. Dans cet article, nous explorerons les membres de cet équipage, leurs caractéristiques uniques et les liens qui les unissent.",
    },
    {
        id: 2,
        title: "Un Voyage Épique à Travers le Monde des Pirates",
        image: "/images/bateau.jpg",
        introduction:
            "« One Piece », manga créé par Eiichiro Oda en 1997, est devenu une œuvre incontournable de la culture populaire mondiale. Suivant les aventures de Monkey D. Luffy et de son équipage de pirates, les Mugiwara, ce récit complexe et riche a captivé des millions de lecteurs et spectateurs à travers le monde. Au-delà de ses intrigues captivantes, « One Piece » se distingue par son univers vaste, ses personnages mémorables et ses thèmes profonds.",
    },
    {
        id: 3,
        title: "L’équipage de Barbe Blanche",
        image: "/images/barbe_blanche.jpeg",
        introduction:
            "L’Équipage de Barbe Blanche : Une Force Légendaire des Mers. L’univers de « One Piece », créé par Eiichiro Oda, est riche en personnages fascinants et en équipages redoutables. Parmi eux, l’équipage de Barbe Blanche se distingue comme l’un des plus puissants et respectés. Cet article plonge dans l’histoire, la structure et les membres clés de cet équipage légendaire.",
    },
    {
        id: 4,
        title: "La Marine",
        image: "/images/marine_op.jpeg",
        introduction:
            "La Marine dans l’univers de One Piece, est l’une des institutions les plus puissantes et influentes du monde. Représentant la justice et l’ordre, la Marine se bat contre les pirates et maintient la paix dans les mers. Cet article explore la structure, les personnages clés et les principes de la Marine.",
    },
    {
        id: 5,
        title: "L'équipage de Barbe Noire",
        image: "/images/barbe_noir.jpg",
        introduction:
            "Dirigé par le redoutable Marshall D. Teach, est l'un des groupes de pirates les plus infâmes et puissants de l'univers de One Piece, créé par Eiichiro Oda. Cet équipage, connu pour sa brutalité et son ambition sans limite, joue un rôle crucial dans l'histoire de la série. Dans cet article, nous explorerons les membres principaux de l'équipage, leur évolution et l'impact de leurs actions sur le monde de One Piece.",
    },
];

const ArticlesPage = () => {
    return (
        <div className="container">
            <h1 className="section-title">Articles</h1>
            <div className="grid-container">
                {articles.map((article) => (
                    <ArticleCard
                        key={article.id}
                        id={article.id}
                        title={article.title}
                        image={article.image}
                        introduction={article.introduction}
                    />
                ))}
            </div>
        </div>
    );
};

export default ArticlesPage;
