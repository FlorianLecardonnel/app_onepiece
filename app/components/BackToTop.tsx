"use client";

import React, { useEffect, useState } from "react";

const BackToTop: React.FC = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowButton(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        showButton && (
            <button
                id="backToTop"
                title="Remonter en haut"
                onClick={scrollToTop}
            >
                &#8679;
            </button>
        )
    );
};

export default BackToTop;
