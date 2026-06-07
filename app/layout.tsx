import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { siteUrl } from "./seo";

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
  applicationName: "Nikansha Yogaarogya Studio & Wellness",
  title: {
    default: "Nikansha Yogaarogya Studio & Wellness | Yoga Classes in Ghaziabad",
    template: "%s | Nikansha Yogaarogya",
  },
  description:
    "Join Nikansha Yogaarogya Studio & Wellness for yoga classes in Ghaziabad and online sessions in Hatha Yoga, Vinyasa, meditation, pranayama, prenatal yoga, postnatal yoga, face yoga, and therapeutic yoga.",
  keywords: [
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
  ],
  authors: [{ name: "Nikansha Yogaarogya Studio & Wellness" }],
  creator: "Nikansha Yogaarogya Studio & Wellness",
  publisher: "Nikansha Yogaarogya Studio & Wellness",
  category: "Yoga Studio",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Nikansha Yogaarogya Studio & Wellness",
    title: "Nikansha Yogaarogya Studio & Wellness | Yoga Classes in Ghaziabad",
    description:
      "Yoga, meditation, pranayama, prenatal, postnatal, face yoga, and therapeutic yoga classes in Indirapuram, Ghaziabad and online.",
    url: "/",
    images: [
      {
        url: "/mainlogo.png",
        width: 1200,
        height: 630,
        alt: "Nikansha Yogaarogya Studio & Wellness",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nikansha Yogaarogya Studio & Wellness | Yoga Classes in Ghaziabad",
    description:
      "Yoga classes in Ghaziabad and online wellness sessions for beginners, stress relief, prenatal care, meditation, and therapeutic yoga.",
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
