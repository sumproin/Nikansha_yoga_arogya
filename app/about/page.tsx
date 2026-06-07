import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { brandName, seoKeywords, siteUrl, studioAddress, studioName } from "../seo";

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
      <main className="px-6 pb-20 pt-32">
        <section className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">About</p>
          <h1 className="mt-4 font-serif text-5xl font-semibold text-earth md:text-6xl">
            {brandName}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            {brandName}, also known as {studioName}, is the official Yogaarogya yoga studio for
            students searching for Nikansha Yoga, Nikansha Yogaarogya, or yoga classes in Ghaziabad.
            The studio helps beginners, regular practitioners, expecting mothers, and wellness seekers
            build strength, calm, flexibility, breath awareness, and long-term balance.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              ["Local Studio", `${studioAddress.streetAddress}, ${studioAddress.addressLocality}`],
              ["Online Classes", "Hatha Yoga, Vinyasa, Meditation, Pranayama, and Face Yoga"],
              ["Therapeutic Care", "Yoga for stress relief, anxiety support, back pain, and mobility"],
            ].map(([title, text]) => (
              <article key={title} className="rounded-xl border border-earth/15 bg-card p-6 shadow-sm">
                <h2 className="font-serif text-2xl font-semibold text-earth">{title}</h2>
                <p className="mt-3 leading-7 text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>

          <Link
            href="/contact"
            className="mt-10 inline-flex rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground"
          >
            Book a Yoga Class
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
