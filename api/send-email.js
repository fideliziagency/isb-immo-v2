export default async function handler(req, res) {
  // Vérifier que c'est une requête POST
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const { to, subject, message, formData } = req.body

  // Mock email sending logic
  console.log("Sending email:", {
    to,
    subject,
    message,
    formData,
  })

  // Simulate email sending delay
  setTimeout(() => {
    res.status(200).json({
      success: true,
      message: "Email sent successfully",
      emailId: `email_${Date.now()}`,
    })
  }, 1000)

  // In a real application, you would implement proper email sending logic here
  // For demonstration purposes, the above mock logic is used

  // try {
  //   // Récupérer les données du formulaire
  //   const formData = req.body;

  //   // Validation basique
  //   if (!formData || Object.keys(formData).length === 0) {
  //     return res.status(400).json({
  //       success: false,
  //       message: 'Aucune donnée reçue.'
  //     });
  //   }

  //   // Configuration du transporteur SMTP
  //   const transporter = nodemailer.createTransport({
  //     host: process.env.SMTP_HOST || 'smtp.gmail.com',
  //     port: process.env.SMTP_PORT || 587,
  //     secure: process.env.SMTP_SECURE === 'true' || false, // true pour 465, false pour autres ports
  //     auth: {
  //       user: process.env.SMTP_USER, // Votre email SMTP
  //       pass: process.env.SMTP_PASS, // Votre mot de passe SMTP ou app password
  //     },
  //     tls: {
  //       rejectUnauthorized: false
  //     }
  //   });

  //   // Générer le contenu HTML de l'email
  //   const generateEmailContent = (data) => {
  //     let htmlContent = `
  //       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  //         <div style="background-color: #b6b09f; color: white; padding: 20px; text-align: center;">
  //           <h1>🏠 The Life Residence - Nouveau Contact</h1>
  //         </div>
  //         <div style="padding: 20px; background-color: #f9f9f9;">
  //           <h2 style="color: #333; border-bottom: 2px solid #b6b09f; padding-bottom: 10px;">
  //             Informations du Contact
  //           </h2>
  //     `;

  //     // Parcourir toutes les données du formulaire
  //     Object.entries(data).forEach(([key, value]) => {
  //       if (value && value.toString().trim() !== '') {
  //         // Formater le nom du champ
  //         const fieldName = key
  //           .replace(/([A-Z])/g, ' $1')
  //           .replace(/^./, str => str.toUpperCase())
  //           .replace('Email', 'E-mail')
  //           .replace('Phone', 'Téléphone')
  //           .replace('First Name', 'Prénom')
  //           .replace('Last Name', 'Nom')
  //           .replace('Unit Type', 'Type de logement')
  //           .replace('Message', 'Message');

  //         htmlContent += `
  //           <div style="margin-bottom: 15px; padding: 10px; background-color: white; border-left: 4px solid #b6b09f;">
  //             <strong style="color: #333;">${fieldName}:</strong>
  //             <div style="margin-top: 5px; color: #666;">${value}</div>
  //           </div>
  //         `;
  //       }
  //     });

  //     htmlContent += `
  //         </div>
  //         <div style="background-color: #333; color: white; padding: 15px; text-align: center; font-size: 12px;">
  //           <p>Email automatique envoyé depuis le site The Life Residence</p>
  //           <p>Date: ${new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Tunis' })}</p>
  //         </div>
  //       </div>
  //     `;

  //     return htmlContent;
  //   };

  //   // Générer le contenu texte simple
  //   const generateTextContent = (data) => {
  //     let textContent = `THE LIFE RESIDENCE - NOUVEAU CONTACT\n\n`;

  //     Object.entries(data).forEach(([key, value]) => {
  //       if (value && value.toString().trim() !== '') {
  //         const fieldName = key
  //           .replace(/([A-Z])/g, ' $1')
  //           .replace(/^./, str => str.toUpperCase());
  //         textContent += `${fieldName}: ${value}\n`;
  //       }
  //     });

  //     textContent += `\nDate: ${new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Tunis' })}`;
  //     return textContent;
  //   };

  //   // Déterminer le sujet basé sur le type de formulaire
  //   const getEmailSubject = (data) => {
  //     if (data.unitType || data.logementType) {
  //       return `🏠 Demande d'information - ${data.unitType || data.logementType}`;
  //     }
  //     if (data.firstName && data.lastName) {
  //       return `📧 Nouveau contact - ${data.firstName} ${data.lastName}`;
  //     }
  //     if (data.email) {
  //       return `📧 Nouveau contact depuis le site - ${data.email}`;
  //     }
  //     return '📧 Nouveau contact depuis The Life Residence';
  //   };

  //   // Configuration de l'email
  //   const mailOptions = {
  //     from: `"The Life Residence" <${process.env.SMTP_USER}>`,
  //     to: 'Isbimmobiliere@gmail.com', // Updated email address
  //     subject: getEmailSubject(formData),
  //     text: generateTextContent(formData),
  //     html: generateEmailContent(formData),
  //     replyTo: formData.email || process.env.SMTP_USER,
  //   };

  //   // Envoyer l'email
  //   const info = await transporter.sendMail(mailOptions);

  //   console.log('Email envoyé:', info.messageId);

  //   // Réponse de succès
  //   return res.status(200).json({
  //     success: true,
  //     message: 'Email envoyé avec succès!',
  //     messageId: info.messageId
  //   });

  // } catch (error) {
  //   console.error('Erreur lors de l\'envoi de l\'email:', error);

  //   return res.status(500).json({
  //     success: false,
  //     message: 'Erreur lors de l\'envoi de l\'email.',
  //     error: process.env.NODE_ENV === 'development' ? error.message : 'Erreur interne du serveur'
  //   });
  // }
}

// Configuration pour Next.js API routes
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
}
