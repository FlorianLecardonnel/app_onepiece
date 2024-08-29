// app/contact/page.tsx
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

    const [statusMessage, setStatusMessage] = useState(""); // État pour le message de statut

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

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
    };

    return (
        <main className="container">
            <section id="contact">
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
                        id="subject"
                        name="subject"
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

                    <label>Recevoir la newsletter par mail:</label>
                    <div className="radio-group">
                        <input
                            type="radio"
                            id="newsletterYes"
                            name="newsletter"
                            value="yes"
                            checked={formData.newsletter === "yes"}
                            onChange={handleChange}
                        />
                        <label htmlFor="newsletterYes">Oui</label>
                        <input
                            type="radio"
                            id="newsletterNo"
                            name="newsletter"
                            value="no"
                            checked={formData.newsletter === "no"}
                            onChange={handleChange}
                        />
                        <label htmlFor="newsletterNo">Non</label>
                    </div>

                    <div className="button-container">
                        <button className="buttonsubmit" type="submit">
                            Envoyer
                        </button>
                    </div>

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
                </form>
            </section>
        </main>
    );
};

export default ContactPage;
