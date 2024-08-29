// app/page.tsx
import React from "react";
import "./styles/globals.scss";
import Image from "next/image";

const HomePage: React.FC = () => {
    return (
        <main className="container">
            <section id="home" className="section">
                <p>
                    &quot;One Piece&quot; est bien plus qu&apos;une simple
                    histoire de pirates à la recherche d&apos;un trésor.
                    C&apos;est une épopée riche en émotions, en aventures et en
                    leçons de vie. À travers ses personnages inoubliables et ses
                    thèmes universels, Eiichiro Oda a créé une œuvre qui
                    continue de captiver et d&apos;inspirer des millions de
                    personnes à travers le monde.
                </p>
                <div id="home-container"></div>
            </section>
            <section className="section">
                <h2>Un Équipage Héroïque</h2>
                <div className="image-container">
                    <Image
                        src="/images/fondecranOP.jpeg"
                        alt="L'équipage au chapeau de paille"
                        width={800}
                        height={450}
                        style={{ width: "auto", height: "auto" }}
                    />
                </div>
                <div className="paragraphe">
                    <p>
                        Monkey D. Luffy reconnaissable avec son chapeau de
                        paille est un jeune homme audacieux, au corps élastique
                        grâce au pouvoir du fruit du démon, rêve de trouver le
                        One Piece et de devenir le Roi des Pirates. Son
                        insatiable soif de liberté et sa détermination sans
                        faille l&apos;entraînent dans une aventure incroyable à
                        travers les mers.
                    </p>
                </div>
                <div className="paragraphe">
                    <p>
                        Rejoignez le capitaine Luffy et son équipage coloré, les
                        Pirates du Chapeau de Paille, composé de personnages
                        charismatiques comme Zoro le bretteur, Nami la
                        navigatrice, Usopp le tireur d&apos;élite,
                        S&apos;archéologue, Franky le charpentier, Brook le
                        musicien et Jinbe le timonier. Ensemble, ils affrontent
                        des ennemis redoutables, découvrent des îles
                        mystérieuses et forment des alliances improbables.
                    </p>
                </div>
            </section>
            <section className="section">
                <h2>Pourquoi One Piece ?</h2>
                <div className="paragraphe">
                    <p>
                        Une Odyssée Inoubliable One Piece n&apos;est pas
                        seulement une histoire de pirates; c&apos;est une
                        odyssée épique remplie de mystères, d&apos;émotions et
                        de rebondissements inattendus. Chaque arc narratif est
                        une aventure unique qui explore des thèmes universels
                        comme l&apos;amitié, la liberté, le sacrifice et le
                        rêve.
                    </p>
                </div>
                <div className="paragraphe">
                    <p>
                        L&apos;univers de One Piece est immense et détaillé,
                        avec une myriade d&apos;îles exotiques, de créatures
                        fantastiques et de cultures diverses. Chaque nouvelle
                        destination apporte son lot de surprises et de dangers,
                        rendant chaque chapitre plus excitant que le précédent.
                    </p>
                </div>
                <div className="paragraphe">
                    <p>
                        Les personnages de One Piece sont profondément
                        développés et attachants. Chaque membre de
                        l&apos;équipage a ses propres rêves, motivations et
                        histoires, créant une dynamique de groupe riche et
                        complexe.
                    </p>
                </div>
            </section>
            <section id="homeaventure" className="section">
                <h2>Rejoignez l&apos;Aventure</h2>
                <div className="image-container">
                    <Image
                        src="/images/banniereOP.jpg"
                        alt="L'équipage au chapeau de paille heureux pleins d'or"
                        width={1200}
                        height={600}
                        style={{ width: "auto", height: "auto" }}
                    />
                </div>
                <div className="paragraphe">
                    <p>
                        Commencez le voyage avec nous que vous soyez un nouveau
                        lecteur curieux ou un fan de longue date, notre page
                        d&apos;accueil est votre portail vers le monde
                        extraordinaire de One Piece. Retrouvez les derniers
                        chapitres, les analyses détaillées, les discussions
                        entre fans, et bien plus encore.
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
                        Préparez-vous à lever l&apos;ancre et à naviguer vers
                        des horizons inexplorés avec Luffy et les Pirates du
                        Chapeau de Paille. L&apos;aventure vous attend!
                    </p>
                </div>
                <div className="paragrapheunivers">
                    <h2>Bienvenue dans l&apos;univers de One Piece!</h2>
                </div>
            </section>
        </main>
    );
};

export default HomePage;
