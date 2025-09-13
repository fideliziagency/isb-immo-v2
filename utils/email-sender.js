// utils/email-sender.js
// Fonctions utilitaires pour envoyer des emails depuis The Life Residence

/**
 * Envoie un email de contact
 * @param {Object} formData - Données du formulaire de contact
 */
export const sendContactEmail = async (formData) => {
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: "Isbimmobiliere@gmail.com",
        subject: `Nouvelle demande de contact - ${formData.firstName} ${formData.lastName}`,
        message: `
Nouvelle demande de contact reçue:

Nom: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Téléphone: ${formData.phone}
Type de logement: ${formData.unitType || "Non spécifié"}

Message:
${formData.message}
        `,
        formData,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email de contact:", error);
    throw error;
  }
};

/**
 * Envoie un email de réservation
 * @param {Object} reservationData - Données de réservation
 */
export const sendReservationEmail = async (reservationData) => {
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: "Isbimmobiliere@gmail.com",
        subject: `Nouvelle réservation - ${reservationData.firstName} ${reservationData.lastName}`,
        message: `
Nouvelle réservation reçue:

Client: ${reservationData.firstName} ${reservationData.lastName}
Email: ${reservationData.email}
Téléphone: ${reservationData.phone}
Logement choisi: ${reservationData.unitType || "Non spécifié"}

Message:
${reservationData.message || "Aucun message"}

Date de réservation: ${new Date().toLocaleDateString("fr-FR")}
        `,
        formData: reservationData,
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
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: "Isbimmobiliere@gmail.com",
        subject: "Nouvelle inscription à la newsletter",
        message: `
Nouvelle inscription à la newsletter:

Email: ${email}
Date d'inscription: ${new Date().toLocaleDateString("fr-FR")}
        `,
        formData: { email },
      }),
    });

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email newsletter:", error);
    throw error;
  }
};
