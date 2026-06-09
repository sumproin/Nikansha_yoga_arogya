import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { SeoPage } from "@/app/seo-pages";
import { brandName, siteUrl, studioAddress, studioEmail, studioPhones } from "@/app/seo";

type SeoProgramPageProps = {
  page: SeoPage;
  canonicalUrl: string;
};

export default function SeoProgramPage({ page, canonicalUrl }: SeoProgramPageProps) {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    description: page.description,
    url: canonicalUrl,
    provider: {
      "@type": "HealthAndBeautyBusiness",
      name: brandName,
      url: siteUrl,
      telephone: studioPhones.map((phone) => phone.replace(/\s/g, "")),
      email: studioEmail,
      address: {
        "@type": "PostalAddress",
        ...studioAddress,
      },
    },
    areaServed: ["Ghaziabad", "Indirapuram", "Noida", "Delhi NCR", "Online"],
  };

  return (
    <div className="min-h-screen bg-cream text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <Navbar />
      <main className="px-6 pb-20 pt-32">
        <section className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            {brandName}
          </p>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-semibold text-earth md:text-6xl">
            {page.h1}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            {page.description}
          </p>

          <div className="mt-10 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <section className="rounded-xl border border-earth/15 bg-card p-6 shadow-sm">
              <h2 className="font-serif text-3xl font-semibold text-earth">Who This Is For</h2>
              <p className="mt-4 leading-8 text-muted-foreground">{page.audience}</p>
            </section>
            <section className="rounded-xl border border-earth/15 bg-card p-6 shadow-sm">
              <h2 className="font-serif text-3xl font-semibold text-earth">Book a Class</h2>
              <p className="mt-4 leading-8 text-muted-foreground">
                Speak with {brandName} to choose the right class format for your schedule and wellness goals.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground"
              >
                Contact Nikansha Yoga
              </Link>
            </section>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {page.benefits.map((benefit) => (
              <article key={benefit} className="rounded-xl border border-earth/15 bg-card p-5 shadow-sm">
                <p className="leading-7 text-muted-foreground">{benefit}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {page.sections.map((section) => (
              <section key={section.title} className="rounded-xl border border-earth/15 bg-card p-6 shadow-sm">
                <h2 className="font-serif text-3xl font-semibold text-earth">{section.title}</h2>
                <p className="mt-4 leading-8 text-muted-foreground">{section.text}</p>
              </section>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
