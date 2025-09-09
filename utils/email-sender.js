// Email utility functions for The Life Residence

export const sendContactEmail = async (formData) => {
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
    })

    const result = await response.json()
    return result
  } catch (error) {
    console.error("Error sending email:", error)
    throw error
  }
}

export const sendReservationEmail = async (reservationData) => {
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "Isbimmobiliere@gmail.com",
        subject: `Nouvelle réservation - ${reservationData.firstName} ${reservationData.lastName}`,
        message: `
          Nouvelle réservation reçue:
          
          Client: ${reservationData.firstName} ${reservationData.lastName}
          Email: ${reservationData.email}
          Téléphone: ${reservationData.phone}
          Logement choisi: ${reservationData.unitType}
          
          Message:
          ${reservationData.message}
          
          Date de réservation: ${new Date().toLocaleDateString("fr-FR")}
        `,
        formData: reservationData,
      }),
    })

    const result = await response.json()
    return result
  } catch (error) {
    console.error("Error sending reservation email:", error)
    throw error
  }
}

export const sendNewsletterEmail = async (email) => {
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "Isbimmobiliere@gmail.com",
        subject: "Nouvelle inscription newsletter",
        message: `
          Nouvelle inscription à la newsletter:
          
          Email: ${email}
          Date d'inscription: ${new Date().toLocaleDateString("fr-FR")}
        `,
        formData: { email },
      }),
    })

    const result = await response.json()
    return result
  } catch (error) {
    console.error("Error sending newsletter email:", error)
    throw error
  }
}
