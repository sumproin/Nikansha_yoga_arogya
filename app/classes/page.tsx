import type { Metadata } from "next";
import Link from "next/link";
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
      <main className="px-6 pb-20 pt-32">
        <section className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Classes</p>
          <h1 className="mt-4 font-serif text-5xl font-semibold text-earth md:text-6xl">
            Yoga Classes in Ghaziabad and Online
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            {brandName} offers practical, supportive yoga classes for beginners, families,
            expecting mothers, postpartum recovery, meditation, pranayama, face yoga, and therapeutic
            yoga for back pain, stress relief, anxiety support, and everyday wellness.
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {yogaServices.map((service) => (
              <article key={service.slug} id={service.slug} className="scroll-mt-28 rounded-xl border border-earth/15 bg-card p-6 shadow-sm">
                <h2 className="font-serif text-2xl font-semibold text-earth">{service.name}</h2>
                <p className="mt-3 leading-7 text-muted-foreground">{service.description}</p>
              </article>
            ))}
          </div>

          <Link
            href="/contact"
            className="mt-10 inline-flex rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground"
          >
            Contact Nikansha Yoga
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
