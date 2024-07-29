// app/page.tsx
import React from "react";
import "./styles/reset.css";
import "./styles/globals.css";

const HomePage: React.FC = () => {
    return (
        <main className="container">
            <section id="home" className="section">
                <p>
                    "One Piece" est bien plus qu'une simple histoire de pirates
                    à la recherche d'un trésor. C'est une épopée riche en
                    émotions, en aventures et en leçons de vie. À travers ses
                    personnages inoubliables et ses thèmes universels, Eiichiro
                    Oda a créé une œuvre qui continue de captiver et d'inspirer
                    des millions de personnes à travers le monde.
                </p>
                <div id="home-container"></div>
            </section>
            <section className="section">
                <h2>Un Équipage Héroïque</h2>
                <img
                    src="/images/fondecranOP.jpeg"
                    alt="L'équipage au chapeau de paille"
                />
                <div className="paragraphe">
                    <p>
                        Monkey D. Luffy reconnaissable avec son chapeau de
                        paille est un jeune homme audacieux, au corps élastique
                        grâce au pouvoir du fruit du démon, rêve de trouver le
                        One Piece et de devenir le Roi des Pirates. Son
                        insatiable soif de liberté et sa détermination sans
                        faille l'entraînent dans une aventure incroyable à
                        travers les mers.
                    </p>
                </div>
                <div className="paragraphe">
                    <p>
                        Rejoignez le capitaine Luffy et son équipage coloré, les
                        Pirates du Chapeau de Paille, composé de personnages
                        charismatiques comme Zoro le bretteur, Nami la
                        navigatrice, Usopp le tireur d'élite, Sanji le
                        cuisinier, Chopper le médecin, Robin l'archéologue,
                        Franky le charpentier, Brook le musicien et Jinbe le
                        timonier. Ensemble, ils affrontent des ennemis
                        redoutables, découvrent des îles mystérieuses et forment
                        des alliances improbables.
                    </p>
                </div>
            </section>
            <section className="section">
                <h2>Pourquoi One Piece ?</h2>
                <div className="paragraphe">
                    <p>
                        Une Odyssée Inoubliable One Piece n'est pas seulement
                        une histoire de pirates; c'est une odyssée épique
                        remplie de mystères, d'émotions et de rebondissements
                        inattendus. Chaque arc narratif est une aventure unique
                        qui explore des thèmes universels comme l'amitié, la
                        liberté, le sacrifice et le rêve.
                    </p>
                </div>
                <div className="paragraphe">
                    <p>
                        L'univers de One Piece est immense et détaillé, avec une
                        myriade d'îles exotiques, de créatures fantastiques et
                        de cultures diverses. Chaque nouvelle destination
                        apporte son lot de surprises et de dangers, rendant
                        chaque chapitre plus excitant que le précédent.
                    </p>
                </div>
                <div className="paragraphe">
                    <p>
                        Les personnages de One Piece sont profondément
                        développés et attachants. Chaque membre de l'équipage a
                        ses propres rêves, motivations et histoires, créant une
                        dynamique de groupe riche et complexe.
                    </p>
                </div>
            </section>
            <section id="homeaventure" className="section">
                <h2>Rejoignez l'Aventure</h2>
                <img
                    src="/images/banniereOP.jpg"
                    alt="L'équipage au chapeau de paille heureux pleins d'or"
                />
                <div className="paragraphe">
                    <p>
                        Commencez le voyage avec nous que vous soyez un nouveau
                        lecteur curieux ou un fan de longue date, notre page
                        d'accueil est votre portail vers le monde extraordinaire
                        de One Piece. Retrouvez les derniers chapitres, les
                        analyses détaillées, les discussions entre fans, et bien
                        plus encore.
                    </p>
                </div>
                <div className="paragraphe">
                    <p>
                        Partagez votre passion engagez-vous avec la communauté
                        mondiale de One Piece! Partagez vos théories, participez
                        aux débats, et découvrez les fan-arts et les cosplays
                        inspirés par vos personnages préférés.
                    </p>
                </div>
                <div className="paragraphe">
                    <p>
                        Préparez-vous à lever l'ancre et à naviguer vers des
                        horizons inexplorés avec Luffy et les Pirates du Chapeau
                        de Paille. L'aventure vous attend!
                    </p>
                </div>
                <div className="paragrapheunivers">
                    <h2>Bienvenue dans l'univers de One Piece!</h2>
                </div>
            </section>
        </main>
    );
};

export default HomePage;
