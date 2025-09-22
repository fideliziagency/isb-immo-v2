"use client"

// Example usage of the email utilities

import { sendContactEmail, sendReservationEmail, sendNewsletterEmail } from "./utils/email-sender.js"

// Example: Sending a contact form email
async function handleContactForm() {
  const formData = {
    firstName: "Ahmed",
    lastName: "Ben Ali",
    email: "ahmed.benali@email.com",
    phone: "22 123 456",
    unitType: "Appartement S+2",
    message:
      "Je suis intéressé par un appartement S+2 avec vue sur mer. Pouvez-vous me contacter pour plus d'informations?",
  }

  try {
    const result = await sendContactEmail(formData)
    console.log("Contact email sent:", result)
  } catch (error) {
    console.error("Failed to send contact email:", error)
  }
}

// Example: Sending a reservation email
async function handleReservation() {
  const reservationData = {
    firstName: "Fatma",
    lastName: "Trabelsi",
    email: "fatma.trabelsi@email.com",
    phone: "98 765 432",
    unitType: "Duplex Premium",
    message: "Je souhaite réserver un duplex au 3ème étage si possible.",
  }

  try {
    const result = await sendReservationEmail(reservationData)
    console.log("Reservation email sent:", result)
  } catch (error) {
    console.error("Failed to send reservation email:", error)
  }
}

// Example: Newsletter subscription
async function handleNewsletterSubscription() {
  const email = "newsletter.subscriber@email.com"

  try {
    const result = await sendNewsletterEmail(email)
    console.log("Newsletter subscription email sent:", result)
  } catch (error) {
    console.error("Failed to send newsletter email:", error)
  }
}

// Example usage in a React component
export const ContactFormExample = () => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    const contactData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      unitType: formData.get("unitType"),
      message: formData.get("message"),
    }

    try {
      await sendContactEmail(contactData)
      alert("Votre message a été envoyé avec succès!")
    } catch (error) {
      alert("Erreur lors de l'envoi du message. Veuillez réessayer.")
    }
  }

  return <form onSubmit={handleSubmit}>{/* Form fields here */}</form>
}
