"use server";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const createTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const sendEmail = async (
  formData: FormData
): Promise<SMTPTransport.SentMessageInfo> => {
  try {
    const lastName = formData.get("lastName") as string;
    const firstName = formData.get("firstName") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    const transporter = createTransporter();

    // Options pour l'e-mail
    const sendEmail = await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Destinataire
      subject: "Nouveau message depuis le portfolio",
      text: `
          Nom: ${lastName} ${firstName}
          Email: ${email}
          Message: ${message}
        `,
      html: `
          <p><strong>Nom:</strong> ${lastName} ${firstName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
    });

    return sendEmail;
  } catch {
    throw new Error("Failed to send email.");
  }
};
