import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { brandName, shortBrandName, siteUrl, studioName } from "./seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: brandName,
  title: {
    default: "Nikansha Yoga Arogya | Official YogaArogya Website",
    template: `%s | ${shortBrandName}`,
  },
  description:
    "Official website of Nikansha Yoga Arogya at yogaarogya.in, also known as Nikansha Yoga and Nikansha Yogaarogya Studio & Wellness, offering yoga classes in Ghaziabad and online sessions.",
  keywords: [
    "Nikansha Yoga",
    "Nikansha Yogaarogya",
    "Nikansha YogaArogya",
    "Nikansha Yogaarogya Studio",
    "yoga classes in Ghaziabad",
    "best yoga classes in Ghaziabad",
    "yoga center in Ghaziabad",
    "online yoga classes Ghaziabad",
    "yoga trainer in Ghaziabad",
    "meditation classes in Ghaziabad",
    "pranayama classes in Ghaziabad",
    "prenatal yoga classes Ghaziabad",
    "postnatal yoga classes",
    "Garbh Sanskar classes online",
    "face yoga classes online",
    "therapeutic yoga for back pain",
    "yoga for stress relief",
    "yoga for anxiety",
    "ayurveda consultation online",
    "ayurvedic wellness center",
    "holistic healing online",
    "holistic wellness center Ghaziabad",
    "mindfulness meditation classes online",
    "breathwork classes online",
    "yoga for beginners online",
    "yoga for weight loss online",
    "yoga for flexibility online",
    "yoga for strength online",
    "yoga for mental health online",
    "yoga for sleep online",
    "yoga for energy online",
    "yoga for immunity online",
    "yoga for detox online",
    "yoga for digestion online",
    "yoga for back pain online",
    "yoga for neck pain online",
    "yoga for shoulder pain online",
    "yoga for arthritis online",
    "yoga for diabetes online",
    "yoga for hypertension online",
    "yoga for depression online",
    "yoga for anxiety online",
    "yoga for stress relief online",
    "prenatal yoga classes online",
    "postnatal yoga classes online",
    "Garbh Sanskar classes online",
    "face yoga classes online",
    "therapeutic yoga for back pain online",
    "ayurveda consultation online",
    "ayurvedic wellness center online",
    "holistic healing online",
    "holistic wellness center online",
    "mindfulness meditation classes online",
    "breathwork classes online",
    "yoga for beginners online",
    "yoga for weight loss online",
    "yoga for flexibility online",
    "yoga for strength online",
    "yoga for mental health online",
    "yoga for sleep online",
    "yoga for energy online",
    "yoga for immunity online",
    "yoga for detox online",
    "yoga for digestion online",
    "yoga for back pain online",
    "yoga for neck pain online",
    "yoga for shoulder pain online",
    "yoga for arthritis online",
    "yoga for diabetes online",
    "yoga for hypertension online",
    "yoga for depression online",
    "yoga for anxiety online",
    "yoga for stress relief online",
  ],
  authors: [{ name: studioName }],
  creator: studioName,
  publisher: studioName,
  category: "Yoga Studio",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: brandName,
    title: "Nikansha Yoga Arogya | Official YogaArogya Website",
    description:
      "Official website of Nikansha Yoga Arogya for yoga, meditation, pranayama, prenatal, postnatal, face yoga, and therapeutic yoga classes in Indirapuram, Ghaziabad and online.",
    url: siteUrl,
    images: [
      {
        url: "/mainlogo.png",
        width: 1200,
        height: 630,
        alt: "Nikansha Yoga Arogya official logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nikansha Yoga Arogya | Official YogaArogya Website",
    description:
      "Official Nikansha Yoga Arogya website for yoga classes in Ghaziabad and online wellness sessions for beginners, stress relief, prenatal care, meditation, and therapeutic yoga.",
    images: ["/mainlogo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${cormorant.variable} antialiased font-sans bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
