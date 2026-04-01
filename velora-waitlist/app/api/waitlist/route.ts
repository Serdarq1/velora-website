import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json(
      {
        message:
          "Supabase ayarlari eksik. SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY tanimlanmali.",
      },
      { status: 500 }
    );
  }

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
    return NextResponse.json(
      {
        message:
          "SMTP ayarlari eksik. SMTP_HOST, SMTP_PORT, SMTP_USER ve SMTP_PASS tanimlanmali.",
      },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);
  const { email } = await request.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { message: "Girilen e-posta adresi geçersiz." },
      { status: 400 }
    );
  }

  const { error } = await supabase.from("waitlist_emails").insert({ email });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { message: "Bu e-posta adresi zaten kayıtlı." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Kayıt başarısız." },
      { status: 500 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(smtpPort),
      secure: Number(smtpPort) === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: process.env.CONTACT_FROM || smtpUser,
      to: email,
      subject: "Kaydınız başarıyla alındı.",
      text: [
        "Merhaba,",
        "",
        "Velora bekleme listesi kaydınız başarıyla alındı.",
        "Uygulama yayına girdiğinde ve yeni gelişmeler olduğunda sizinle e-posta yoluyla iletişime geçeceğiz.",
        "",
        "İlginiz için şimdiden teşekkür ederiz.",
        "Velora Ekibi",
      ].join("\n"),
      html: `
        <h2>Kaydınız başarıyla alındı.</h2>
        <p>Merhaba,</p>
        <p>Velora bekleme listesi kaydınız başarıyla alındı.</p>
        <p>Uygulama yayına girdiğinde ve yeni gelişmeler olduğunda sizinle e-posta yoluyla iletişime geçeceğiz.</p>
        <p>İlginiz için şimdiden teşekkür ederiz.<br />Velora Ekibi</p>
      `,
    });
  } catch (mailError) {
    console.error("Waitlist confirmation mail error", mailError);

    return NextResponse.json(
      { message: "Kayıt oluştu ancak onay e-postası gönderilemedi." },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      message:
        "Kaydınız başarıyla alındı. Onay e-postasi tarafınıza gönderildi.",
    },
    { status: 200 }
  );
}
