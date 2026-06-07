import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { brandName, seoKeywords, siteUrl, studioAddress, studioEmail, studioPhones } from "../seo";

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
      <main className="px-6 pb-20 pt-32">
        <section className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Contact</p>
          <h1 className="mt-4 font-serif text-5xl font-semibold text-earth md:text-6xl">
            Contact {brandName}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            Reach the official Nikansha Yoga Arogya team for yoga classes in Ghaziabad, online yoga
            sessions, meditation, pranayama, prenatal yoga, postnatal yoga, face yoga, and therapeutic yoga.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <article className="rounded-xl border border-earth/15 bg-card p-6 shadow-sm">
              <h2 className="font-serif text-2xl font-semibold text-earth">Address</h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                {studioAddress.streetAddress}, {studioAddress.addressLocality}, {studioAddress.addressRegion} {studioAddress.postalCode}
              </p>
            </article>
            <article className="rounded-xl border border-earth/15 bg-card p-6 shadow-sm">
              <h2 className="font-serif text-2xl font-semibold text-earth">Phone</h2>
              <div className="mt-3 space-y-2">
                {studioPhones.map((phone) => (
                  <a key={phone} href={`tel:${phone.replace(/\D/g, "")}`} className="block leading-7 text-muted-foreground underline-offset-4 hover:underline">
                    {phone}
                  </a>
                ))}
              </div>
            </article>
            <article className="rounded-xl border border-earth/15 bg-card p-6 shadow-sm">
              <h2 className="font-serif text-2xl font-semibold text-earth">Email</h2>
              <a href={`mailto:${studioEmail}`} className="mt-3 block leading-7 text-muted-foreground underline-offset-4 hover:underline">
                {studioEmail}
              </a>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
