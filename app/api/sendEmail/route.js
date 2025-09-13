import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { to, subject, message } = await req.json();

    if (!to || !subject || !message) {
      return new Response(JSON.stringify({ error: "Paramètres manquants" }), { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"The Life Residence" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject,
      text: message,
      html: `<pre style="font-family:inherit;">${message}</pre>`,
    });

    return new Response(JSON.stringify({ success: true, message: "Email envoyé avec succès" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    return new Response(JSON.stringify({ error: "Impossible d'envoyer l'email" }), { status: 500 });
  }
}
