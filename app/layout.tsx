// app/layout.tsx
import Navbar from "./components/NavBar"; // Assurez-vous que le nom du fichier et l'import sont corrects
import Footer from "./components/Footer";
import "./styles/reset.css";
import "./styles/globals.css";
import { Crushed, Kulim_Park } from "next/font/google";

const crushed = Crushed({
    subsets: ["latin"],
    weight: ["400"],
});

const kulim_park = Kulim_Park({
    subsets: ["latin"],
    weight: ["200", "300", "400", "600", "700"],
});

export const metadata = {
    title: "The One Piece",
    description: "A One Piece fan site",
};

interface IRootLayout {
    children: React.ReactNode;
}

const RootLayout: React.FC<IRootLayout> = ({ children }) => {
    return (
        <html lang="fr">
            <body className={`${crushed.className} ${kulim_park.className}`}>
                <Navbar />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
};

export default RootLayout;
