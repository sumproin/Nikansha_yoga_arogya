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
import Link from "next/link";
import { brandAliases, brandName, homepageKeywords, shortBrandName, siteUrl, studioAddress, studioEmail, studioName, studioPhones, yogaServices } from "./seo";

export const metadata: Metadata = {
  title: "Nikansha Yoga Arogya Official Website | Yoga Classes in Ghaziabad",
  description:
    "Official homepage of Nikansha Yoga Arogya at yogaarogya.in, also searched as Nikansha Yoga, Yogaarogya, and Yogarogya. Book yoga classes in Indirapuram, Ghaziabad and online yoga sessions for Hatha Yoga, meditation, pranayama, prenatal yoga, face yoga, and therapeutic wellness.",
  keywords: homepageKeywords,
  alternates: {
    canonical: siteUrl,
  },
};

export default function Home() {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": ["HealthAndBeautyBusiness", "SportsActivityLocation"],
    name: brandName,
    legalName: studioName,
    alternateName: [shortBrandName, studioName, ...brandAliases],
    url: siteUrl,
    image: `${siteUrl}/og-image.png`,
    description:
      "Yoga studio and wellness center in Indirapuram, Ghaziabad offering Hatha Yoga, Vinyasa Flow, meditation, pranayama, prenatal yoga, postnatal yoga, face yoga, and therapeutic yoga.",
    telephone: studioPhones.map((phone) => phone.replace(/\s/g, "")),
    email: studioEmail,
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
      ...yogaServices.map((service) => service.name),
      "Yoga for stress relief",
      "Yoga for anxiety",
      "Yoga for back pain",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Nikansha Yoga Arogya Classes",
      itemListElement: yogaServices.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
          areaServed: ["Ghaziabad", "Indirapuram", "Delhi NCR", "Online"],
        },
      })),
    },
    sameAs: [],
  };

  const homepageLinks = [
    {
      label: "About",
      href: "/about",
      text: `Learn about ${brandName} and Nikansha Yogaarogya Studio & Wellness.`,
    },
    {
      label: "Classes",
      href: "/classes",
      text: "Explore Hatha Yoga, Vinyasa, meditation, prenatal yoga, face yoga, and therapeutic yoga.",
    },
    {
      label: "Resources",
      href: "/resources",
      text: "Read beginner yoga guidance, meditation tips, workshops, and studio policies.",
    },
    {
      label: "Contact",
      href: "/contact",
      text: "Contact Nikansha Yoga Arogya for Ghaziabad and online yoga class enquiries.",
    },
  ];

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: brandName,
    alternateName: [shortBrandName, studioName, ...brandAliases],
    url: siteUrl,
    inLanguage: "en-IN",
    publisher: {
      "@type": "Organization",
      name: brandName,
      legalName: studioName,
      alternateName: [shortBrandName, ...brandAliases],
      url: siteUrl,
      logo: `${siteUrl}/icon-512.png`,
    },
  };

  const homepageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteUrl}/#webpage`,
    url: siteUrl,
    name: "Nikansha Yoga Arogya Official Website",
    alternateName: [
      "Nikansha Yoga Arogya Homepage",
      "Official Nikansha Yoga Website",
      "Official Yogaarogya Website",
      ...brandAliases,
    ],
    description:
      "Official homepage of Nikansha Yoga Arogya for yoga classes in Indirapuram, Ghaziabad and online yoga sessions.",
    isPartOf: {
      "@id": `${siteUrl}/#website`,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${siteUrl}/og-image.png`,
    },
    about: {
      "@type": "Organization",
      name: brandName,
      url: siteUrl,
    },
    keywords: homepageKeywords.join(", "),
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brandName,
    legalName: studioName,
    alternateName: [shortBrandName, ...brandAliases],
    url: siteUrl,
    logo: `${siteUrl}/icon-512.png`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageJsonLd) }}
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
         <section aria-label="Important website pages" className="bg-cream px-6 py-10">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Explore {shortBrandName}
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-4">
              {homepageLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl border border-earth/15 bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/50"
                >
                  <span className="font-serif text-2xl font-semibold text-earth">{link.label}</span>
                  <span className="mt-3 block text-sm leading-6 text-muted-foreground">{link.text}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}
