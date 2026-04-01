import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const CONTACT_EMAIL = "iletisim@veloraappy.com";

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  topic?: string;
  priority?: string;
  message?: string;
};

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const getRequiredEnv = () => {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    return null;
  }

  return {
    host,
    port: Number(port),
    user,
    pass,
    from: process.env.CONTACT_FROM || user,
  };
};

export async function POST(request: Request) {
  const body = (await request.json()) as ContactPayload;

  const name = body.name?.trim() || "";
  const email = body.email?.trim() || "";
  const company = body.company?.trim() || "";
  const topic = body.topic?.trim() || "";
  const priority = body.priority?.trim() || "";
  const message = body.message?.trim() || "";

  if (!name || !email || !company || !topic || !priority || !message) {
    return NextResponse.json(
      { message: "Lütfen tüm alanları doldurun." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { message: "Geçerli bir e-posta adresi girin." },
      { status: 400 }
    );
  }

  const smtpConfig = getRequiredEnv();

  if (!smtpConfig) {
    return NextResponse.json(
      {
        message:
          "E-posta ayarları eksik. SMTP_HOST, SMTP_PORT, SMTP_USER ve SMTP_PASS tanımlanmalı.",
      },
      { status: 500 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: smtpConfig.port === 465,
      auth: {
        user: smtpConfig.user,
        pass: smtpConfig.pass,
      },
    });

    await transporter.sendMail({
      from: smtpConfig.from,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `Yeni destek talebi: ${topic}`,
      text: [
        `Ad: ${name}`,
        `E-posta: ${email}`,
        `Şirket/Salon: ${company}`,
        `Konu: ${topic}`,
        `Öncelik: ${priority}`,
        "",
        "Mesaj:",
        message,
      ].join("\n"),
      html: `
        <h2>Yeni destek talebi</h2>
        <p><strong>Ad:</strong> ${name}</p>
        <p><strong>E-posta:</strong> ${email}</p>
        <p><strong>Şirket/Salon:</strong> ${company}</p>
        <p><strong>Konu:</strong> ${topic}</p>
        <p><strong>Öncelik:</strong> ${priority}</p>
        <p><strong>Mesaj:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    });

    await transporter.sendMail({
      from: smtpConfig.from,
      to: email,
      subject: "Destek talebinizi aldik",
      text: [
        `Merhaba ${name},`,
        "",
        "Destek talebinizi aldik.",
        "Ekibimiz en kisa surede inceleyip size geri donus yapacak.",
        "",
        `Talep konusu: ${topic}`,
        `Oncelik: ${priority}`,
        "",
        "Bu e-postayi yanitlayarak bize ek bilgi iletebilirsiniz.",
        "",
        "Tesekkurler,",
        "Velora Destek",
      ].join("\n"),
      html: `
        <h2>Destek talebinizi aldik</h2>
        <p>Merhaba ${escapeHtml(name)},</p>
        <p>Destek talebinizi aldik. Ekibimiz en kisa surede inceleyip size geri donus yapacak.</p>
        <p><strong>Talep konusu:</strong> ${escapeHtml(topic)}</p>
        <p><strong>Oncelik:</strong> ${escapeHtml(priority)}</p>
        <p>Bu e-postayi yanitlayarak bize ek bilgi iletebilirsiniz.</p>
        <p>Tesekkurler,<br />Velora Destek</p>
      `,
    });

    return NextResponse.json({
      message: "Talebiniz alındı. En kısa sürede size dönüş yapacağız.",
    });
  } catch (error) {
    console.error("Contact form send error", error);

    return NextResponse.json(
      { message: "Mesaj gönderilemedi. Lütfen tekrar deneyin." },
      { status: 500 }
    );
  }
}
