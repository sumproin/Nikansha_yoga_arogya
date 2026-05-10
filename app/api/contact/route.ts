import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  fullName?: string;
  email?: string;
  phone?: string;
  selectedClasses?: string[];
  message?: string;
};

const nameRegex = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function countWords(value: string) {
  return value
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const { fullName, email, phone, selectedClasses, message } = body;

    if (!fullName || !email || !phone || !message || !selectedClasses) {
      return NextResponse.json({ message: "fullName, email, phone, selectedClasses and message are required." }, { status: 400 });
    }

    const cleanName = fullName.trim();
    const cleanEmail = email.trim();
    const cleanPhone = phone.replace(/\D/g, "");
    const cleanSelectedClasses = selectedClasses.map((item) => item.trim()).filter(Boolean);
    const cleanMessage = message.trim();

    if (cleanName.length < 2) {
      return NextResponse.json({ message: "Name must be at least 2 characters." }, { status: 400 });
    }

    if (!nameRegex.test(cleanName)) {
      return NextResponse.json({ message: "Name cannot contain numbers." }, { status: 400 });
    }

    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
    }

    if (cleanPhone.length !== 10) {
      return NextResponse.json({ message: "Contact number must be exactly 10 digits." }, { status: 400 });
    }

    if (countWords(cleanMessage) < 5) {
      return NextResponse.json({ message: "Message must be at least 5 words." }, { status: 400 });
    }
    if (cleanSelectedClasses.length === 0) {
      return NextResponse.json({ message: "Please select at least one class." }, { status: 400 });
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
      replyTo: cleanEmail,
      subject: `New Contact Form Message: ${cleanEmail || "General Inquiry"}`,
      text: [
        `Name: ${cleanName}`,
        `Email: ${cleanEmail}`,
        `Contact Number: ${cleanPhone}`,
        `Selected Classes: ${cleanSelectedClasses.join(", ")}`,
        "",
        "Message:",
        cleanMessage,
      ].join("\n"),
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>Name:</strong> ${cleanName}</p>
        <p><strong>Email:</strong> ${cleanEmail}</p>
        <p><strong>Contact Number:</strong> ${cleanPhone}</p>
        <p><strong>Selected Classes:</strong> ${cleanSelectedClasses.join(", ")}</p>
        <p><strong>Message:</strong></p>
        <p>${cleanMessage.replace(/\n/g, "<br/>")}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ message: "Failed to send contact message.", error }, { status: 500 });
  }
}
