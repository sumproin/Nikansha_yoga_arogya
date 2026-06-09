import type { Metadata } from "next";
import Classes from "@/components/Classes";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { brandName, seoKeywords, siteUrl, yogaServices } from "../seo";

export const metadata: Metadata = {
  title: "Yoga Classes in Ghaziabad & Online",
  description:
    "Explore Nikansha Yoga Arogya classes in Ghaziabad and online, including Hatha Yoga, Vinyasa Flow, Meditation, Pranayama, Prenatal Yoga, Garbh Sanskar, Postnatal Yoga, Face Yoga, and Therapeutic Yoga.",
  keywords: seoKeywords,
  alternates: {
    canonical: `${siteUrl}/classes`,
  },
};

export default function ClassesPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Nikansha Yoga Arogya Classes",
    itemListElement: yogaServices.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        url: `${siteUrl}/classes#${service.slug}`,
        provider: {
          "@type": "Organization",
          name: brandName,
          url: siteUrl,
        },
      },
    })),
  };

  return (
    <div className="min-h-screen bg-cream text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <Navbar />
      <main className="pt-[55px]">
        <Classes />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
