import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  fullName?: string;
  email?: string;
  phone?: string;
  message?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const { fullName, email, phone, message } = body;

    if (!fullName || !email || !phone || !message) {
      return NextResponse.json({ message: "fullName, email, phone and message are required." }, { status: 400 });
    }

    const phoneRegex = /^[+\d][\d\s\-().]{6,19}$/;
    if (!phoneRegex.test(phone.trim())) {
      return NextResponse.json({ message: "Please enter a valid contact number." }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || "587");
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const contactToEmail = process.env.CONTACT_TO_EMAIL;
    const contactFromEmail = process.env.CONTACT_FROM_EMAIL || smtpUser;

    if (!smtpHost || !smtpUser || !smtpPass || !contactToEmail || !contactFromEmail) {
      return NextResponse.json(
        { message: "Missing SMTP configuration. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: contactFromEmail,
      to: contactToEmail,
      replyTo: email,
      subject: `New Contact Form Message: ${email || "General Inquiry"}`,
      text: [
        `Name: ${fullName}`,
        `Email: ${email}`,
        `Contact Number: ${phone}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Contact Number:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ message: "Failed to send contact message.", error }, { status: 500 });
  }
}
