// app/articles/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import ArticleCard from "@/components/ArticleCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

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
                    throw new Error(
                        `Failed to fetch articles with status: ${response.status}`
                    );
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

    if (loading)
        return (
            <div className="loader-container">
                <div className="straw-hat-loader"></div>
            </div>
        );
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="articles">
            <h1 className="section-title">Articles</h1>
            <div className="swipper__wrapper">
                <div className="swiper__wrapper__container">
                    <Swiper
                        loop={true}
                        modules={[Pagination, Navigation]}
                        spaceBetween={30}
                        slidesPerView={1}
                        navigation={{
                            prevEl: ".swiper-button-prev",
                            nextEl: ".swiper-button-next",
                        }}
                        pagination={{
                            clickable: true,
                            el: ".custom-pagination",
                        }}
                        className="mySwiper"
                    >
                        {articles.map((article) => (
                            <SwiperSlide key={article.id}>
                                <ArticleCard
                                    id={article.id}
                                    title={article.title}
                                    image={`/images/${article.slug}.jpg`}
                                    introduction={article.content}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="swiper-navigation-and-pagination">
                    <div className="swiper-button-prev"></div>
                    <div className="custom-pagination"></div>{" "}
                    {/* Pagination centrée */}
                    <div className="swiper-button-next"></div>
                </div>
            </div>
        </div>
    );
};

export default ArticlesPage;
