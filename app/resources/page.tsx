import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ResourcesContent from "@/components/ResourcesContent";
import { seoKeywords, siteUrl } from "../seo";

export const metadata: Metadata = {
  title: "Yoga Resources, Beginner Guide & Meditation Tips",
  description:
    "Read yoga resources from Nikansha Yogaarogya, including beginner yoga guidance, meditation tips, pranayama basics, prenatal yoga notes, therapeutic yoga support, and studio policies.",
  keywords: [
    ...seoKeywords,
    "beginner yoga guide Ghaziabad",
    "online yoga and meditation classes in Ghaziabad",
    "pregnancy yoga classes in Ghaziabad",
    "yoga therapy for back pain Ghaziabad",
  ],
  alternates: {
    canonical: `${siteUrl}/resources`,
  },
};

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-cream text-foreground">
      <Navbar />
      <main className="pt-[55px]">
        <ResourcesContent />
      </main>
      <Footer />
    </div>
  );
}
