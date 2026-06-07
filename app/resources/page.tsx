import type { Metadata } from "next";
import { seoKeywords } from "../seo";

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
    canonical: "/resources",
  },
};

const resources = [
  {
    id: "yoga-blog",
    title: "Yoga Blog",
    text: "Studio updates, practical yoga notes, and wellness reflections for students looking for yoga classes in Ghaziabad, online yoga classes, stress relief, better flexibility, and mindful daily practice.",
  },
  {
    id: "beginners-guide",
    title: "Beginner's Guide",
    text: "New students can begin with Hatha Yoga, online yoga classes for beginners, pranayama, or Meditation. Arrive a few minutes early, wear comfortable clothing, and choose a class that matches your current energy and mobility.",
  },
  {
    id: "meditation-tips",
    title: "Meditation Tips",
    text: "Begin with five minutes of steady breathing, sit comfortably, and return attention to the breath whenever the mind wanders. These simple meditation and pranayama practices can support stress relief, anxiety management, and mental clarity.",
  },
  {
    id: "workshops",
    title: "Workshops",
    text: "Upcoming workshops and special practice sessions will be announced here, including prenatal yoga, Garbh Sanskar, face yoga, therapeutic yoga for back pain, and wellness sessions at the Indirapuram, Ghaziabad studio.",
  },
  {
    id: "privacy-policy",
    title: "Privacy Policy",
    text: "Information submitted through the website is used only to respond to enquiries, bookings, testimonials, and studio communication.",
  },
  {
    id: "terms-of-service",
    title: "Terms of Service",
    text: "Class participation, bookings, cancellations, and studio use are subject to confirmation by Nikansha Yogaarogya Studio & Wellness.",
  },
];

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-cream via-background to-card px-6 py-16 text-foreground">
      <div className="mx-auto max-w-5xl">
        <a href="/" className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
          Back to Home
        </a>
        <div className="mt-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Resources</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold text-earth">Yoga & Studio Resources</h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Helpful guidance, studio information, and policy notes for students exploring yoga, meditation, pranayama, prenatal yoga, and therapeutic wellness classes.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {resources.map((resource) => (
            <section key={resource.id} id={resource.id} className="scroll-mt-24 rounded-2xl border border-earth/15 bg-card/85 p-6 shadow-sm">
              <h2 className="font-serif text-2xl font-semibold text-earth">{resource.title}</h2>
              <p className="mt-3 leading-7 text-muted-foreground">{resource.text}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
