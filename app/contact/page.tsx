import type { Metadata } from "next";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { seoKeywords, siteUrl } from "../seo";

export const metadata: Metadata = {
  title: "Contact Nikansha Yoga Arogya",
  description:
    "Contact Nikansha Yoga Arogya at Yogaarogya.in for yoga classes in Indirapuram, Ghaziabad, online yoga classes, meditation, pranayama, prenatal yoga, and therapeutic yoga.",
  keywords: seoKeywords,
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-cream text-foreground">
      <Navbar />
      <main className="pt-[55px]">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
