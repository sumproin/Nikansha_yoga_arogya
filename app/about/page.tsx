import type { Metadata } from "next";
import About from "@/components/About";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { seoKeywords, siteUrl } from "../seo";

export const metadata: Metadata = {
  title: "About Nikansha Yoga Arogya",
  description:
    "Learn about Nikansha Yoga Arogya, the official Yogaarogya yoga studio in Indirapuram, Ghaziabad for yoga, meditation, pranayama, prenatal yoga, and therapeutic wellness.",
  keywords: seoKeywords,
  alternates: {
    canonical: `${siteUrl}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream text-foreground">
      <Navbar />
      <main className="pt-[55px]">
        <About />
      </main>
      <Footer />
    </div>
  );
}
