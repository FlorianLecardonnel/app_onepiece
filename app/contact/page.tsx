<<<<<<< HEAD
// app/contact/page.tsx
=======
>>>>>>> f1994565b32afe4b3f135725c7e91c004995447d
"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        subject: "",
        message: "",
        newsletter: "yes",
    });

<<<<<<< HEAD
    const [statusMessage, setStatusMessage] = useState(""); // État pour le message de statut

=======
>>>>>>> f1994565b32afe4b3f135725c7e91c004995447d
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

<<<<<<< HEAD
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatusMessage("Message envoyé avec succès");
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    address: "",
                    subject: "",
                    message: "",
                    newsletter: "yes",
                });
            } else {
                setStatusMessage(
                    `Erreur lors de l'envoi du message: ${data.message}`
                );
            }
        } catch (error) {
            console.error("Erreur:", error);
            setStatusMessage(
                `Erreur lors de l'envoi du message: ${
                    error instanceof Error ? error.message : String(error)
                }`
            );
        }
=======
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Vous pouvez envoyer les données du formulaire ici
        console.log("Form data submitted:", formData);
        // Remplacez cette partie par une requête axios ou fetch si vous avez un backend
>>>>>>> f1994565b32afe4b3f135725c7e91c004995447d
    };

    return (
        <main className="container">
            <section id="contact">
<<<<<<< HEAD
=======
                <h2>Contactez-nous</h2>
>>>>>>> f1994565b32afe4b3f135725c7e91c004995447d
                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstName">Prénom*:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="Prénom*"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="lastName">Nom*:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Nom*"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="email">Email*:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email*"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="phone">Numéro de téléphone:</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder="Numéro"
                        value={formData.phone}
                        onChange={handleChange}
                    />

                    <label htmlFor="address">Adresse:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Adresse"
                        value={formData.address}
                        onChange={handleChange}
                    />

                    <label htmlFor="subject">Objet*:</label>
                    <input
                        type="text"
<<<<<<< HEAD
                        id="subject"
                        name="subject"
=======
                        id="object"
                        name="object"
>>>>>>> f1994565b32afe4b3f135725c7e91c004995447d
                        placeholder="Objet*"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="message">Message*:</label>
                    <textarea
                        id="message"
                        name="message"
                        placeholder="Message*"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>

<<<<<<< HEAD
                    <label>Recevoir la newsletter par mail:</label>
=======
                    <label htmlFor="newsletter">
                        Recevoir la newsletter par mail:
                    </label>
>>>>>>> f1994565b32afe4b3f135725c7e91c004995447d
                    <div className="radio-group">
                        <input
                            type="radio"
                            id="newsletterYes"
                            name="newsletter"
                            value="yes"
                            checked={formData.newsletter === "yes"}
                            onChange={handleChange}
<<<<<<< HEAD
                        />
                        <label htmlFor="newsletterYes">Oui</label>
=======
                            required
                        />
                        Oui
>>>>>>> f1994565b32afe4b3f135725c7e91c004995447d
                        <input
                            type="radio"
                            id="newsletterNo"
                            name="newsletter"
                            value="no"
                            checked={formData.newsletter === "no"}
                            onChange={handleChange}
<<<<<<< HEAD
                        />
                        <label htmlFor="newsletterNo">Non</label>
                    </div>

=======
                            required
                        />
                        Non
                    </div>
>>>>>>> f1994565b32afe4b3f135725c7e91c004995447d
                    <div className="button-container">
                        <button className="buttonsubmit" type="submit">
                            Envoyer
                        </button>
                    </div>
<<<<<<< HEAD

                    {statusMessage && (
                        <p
                            style={{
                                marginTop: "10px",
                                color: statusMessage.includes("Erreur")
                                    ? "red"
                                    : "green",
                            }}
                        >
                            {statusMessage}
                        </p>
                    )}
=======
>>>>>>> f1994565b32afe4b3f135725c7e91c004995447d
                </form>
            </section>
        </main>
    );
};

export default ContactPage;
