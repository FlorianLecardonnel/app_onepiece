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

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Vous pouvez envoyer les données du formulaire ici
        console.log("Form data submitted:", formData);
        // Remplacez cette partie par une requête axios ou fetch si vous avez un backend
    };

    return (
        <main className="container">
            <section id="contact">
                <h2>Contactez-nous</h2>
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
                        id="object"
                        name="object"
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

                    <label htmlFor="newsletter">
                        Recevoir la newsletter par mail:
                    </label>
                    <div className="radio-group">
                        <input
                            type="radio"
                            id="newsletterYes"
                            name="newsletter"
                            value="yes"
                            checked={formData.newsletter === "yes"}
                            onChange={handleChange}
                            required
                        />
                        Oui
                        <input
                            type="radio"
                            id="newsletterNo"
                            name="newsletter"
                            value="no"
                            checked={formData.newsletter === "no"}
                            onChange={handleChange}
                            required
                        />
                        Non
                    </div>
                    <div className="button-container">
                        <button className="buttonsubmit" type="submit">
                            Envoyer
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
};

export default ContactPage;
