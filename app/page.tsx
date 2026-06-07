import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Classes from "@/components/Classes";
// import Schedule from "@/components/Schedule";
import Trainers from "@/components/Trainers";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import Gallery from "@/components/Gallery";
import type { Metadata } from "next";
import { brandName, seoKeywords, shortBrandName, siteUrl, studioAddress, studioName } from "./seo";

export const metadata: Metadata = {
  title: "Nikansha Yoga Arogya Official Website",
  description:
    "Official website of Nikansha Yoga Arogya, also searched as Nikansha Yoga. Book yoga classes in Ghaziabad and online sessions for Hatha Yoga, Vinyasa, meditation, pranayama, prenatal yoga, postnatal yoga, face yoga, and therapeutic yoga.",
  keywords: seoKeywords,
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": ["HealthAndBeautyBusiness", "SportsActivityLocation"],
    name: brandName,
    legalName: studioName,
    alternateName: [shortBrandName, studioName, "Nikansha Yogaarogya", "Nikansha YogaArogya"],
    url: siteUrl,
    image: `${siteUrl}/mainlogo.png`,
    description:
      "Yoga studio and wellness center in Indirapuram, Ghaziabad offering Hatha Yoga, Vinyasa Flow, meditation, pranayama, prenatal yoga, postnatal yoga, face yoga, and therapeutic yoga.",
    telephone: ["+919217746084", "+919907370722"],
    email: "nikansha@zohomail.in",
    address: {
      "@type": "PostalAddress",
      ...studioAddress,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.6457252,
      longitude: 77.3854641,
    },
    areaServed: ["Indirapuram", "Ghaziabad", "Noida", "Delhi NCR", "India"],
    priceRange: "$$",
    knowsAbout: [
      "Hatha Yoga",
      "Vinyasa Yoga",
      "Meditation",
      "Pranayama",
      "Prenatal Yoga",
      "Postnatal Yoga",
      "Garbh Sanskar",
      "Face Yoga",
      "Therapeutic Yoga",
      "Yoga for stress relief",
      "Yoga for back pain",
    ],
    sameAs: [],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brandName,
    alternateName: [shortBrandName, studioName, "Nikansha Yogaarogya", "Nikansha YogaArogya"],
    url: siteUrl,
    inLanguage: "en-IN",
    publisher: {
      "@type": "Organization",
      name: brandName,
      legalName: studioName,
      alternateName: [shortBrandName, "Nikansha Yogaarogya", "Nikansha YogaArogya"],
      url: siteUrl,
      logo: `${siteUrl}/mainlogo.png`,
    },
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brandName,
    legalName: studioName,
    alternateName: [shortBrandName, "Nikansha Yogaarogya", "Nikansha YogaArogya"],
    url: siteUrl,
    logo: `${siteUrl}/mainlogo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+919217746084",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
  };

  return (
    <div className="relative min-h-screen selection:bg-primary/30 selection:text-primary-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Classes />
        {/* <Schedule /> */}
        <Trainers />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}
