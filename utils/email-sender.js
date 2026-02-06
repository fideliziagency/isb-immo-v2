// utils/email-sender.js
// Fonctions utilitaires pour envoyer des emails depuis The Life Residence

// Base URL du backend (NestJS). Utiliser la var d'environnement côté client si définie.
const API_BASE_URL =
  (typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_API_BASE_URL) ||
  "https://isb-immo-backend-latest.onrender.com";

/**
 * Envoie un email de contact
 * @param {Object} formData - Données du formulaire de contact
 */
export const sendContactEmail = async (formData) => {
  try {
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      name: `${formData.firstName || ""} ${formData.lastName || ""}`.trim(),
      email: formData.email,
      phone: formData.phone,
      unitType: formData.unitType,
      message: formData.message,
    };

    // Inclure propertyId si fourni et convertible en nombre
    if (formData.propertyId) {
      const idNum = Number(formData.propertyId);
      if (!Number.isNaN(idNum)) payload.propertyId = idNum;
    }

    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Échec d'envoi (HTTP ${response.status}): ${errText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de l'envoi de la demande de contact au backend:", error);
    throw error;
  }
};

/**
 * Envoie un email de réservation
 * @param {Object} reservationData - Données de réservation
 */
export const sendReservationEmail = async (reservationData) => {
  try {
    const messageContent = `
Nouvelle réservation reçue:

Client: ${reservationData.firstName} ${reservationData.lastName}
Email: ${reservationData.email}
Téléphone: ${reservationData.phone}
Logement choisi: ${reservationData.unitType || "Non spécifié"}

Message:
${reservationData.message || "Aucun message"}

Date de réservation: ${new Date().toLocaleDateString("fr-FR")}
    `;

    const response = await fetch("/api/sendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: "Isbimmobiliere@gmail.com",
        subject: `Nouvelle réservation - ${reservationData.firstName} ${reservationData.lastName}`,
        message: messageContent,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email de réservation:", error);
    throw error;
  }
};

/**
 * Envoie un email pour une inscription à la newsletter
 * @param {string} email - Email de l'utilisateur
 */
export const sendNewsletterEmail = async (email) => {
  try {
    const messageContent = `
Nouvelle inscription à la newsletter:

Email: ${email}
Date d'inscription: ${new Date().toLocaleDateString("fr-FR")}
    `;

    const response = await fetch("/api/sendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: "Isbimmobiliere@gmail.com",
        subject: "Nouvelle inscription à la newsletter",
        message: messageContent,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email newsletter:", error);
    throw error;
  }
};
