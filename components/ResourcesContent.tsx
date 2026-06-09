"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { BookOpenText, CalendarDays, FileText, Leaf, ShieldCheck, Sparkles } from "lucide-react";

const resources = [
  {
    id: "yoga-blog",
    title: "Yoga Blog",
    eyebrow: "Studio Notes",
    icon: BookOpenText,
    text: "Studio updates, practical yoga notes, and wellness reflections for students looking for yoga classes in Ghaziabad, online yoga classes, stress relief, better flexibility, and mindful daily practice.",
  },
  {
    id: "beginners-guide",
    title: "Beginner's Guide",
    eyebrow: "Start Here",
    icon: Leaf,
    text: "New students can begin with Hatha Yoga, online yoga classes for beginners, pranayama, or meditation. Arrive a few minutes early, wear comfortable clothing, and choose a class that matches your current energy and mobility.",
  },
  {
    id: "meditation-tips",
    title: "Meditation Tips",
    eyebrow: "Calm Practice",
    icon: Sparkles,
    text: "Begin with five minutes of steady breathing, sit comfortably, and return attention to the breath whenever the mind wanders. These simple meditation and pranayama practices can support stress relief, anxiety management, and mental clarity.",
  },
  {
    id: "workshops",
    title: "Workshops",
    eyebrow: "Special Sessions",
    icon: CalendarDays,
    text: "Upcoming workshops and special practice sessions will be announced here, including prenatal yoga, Garbh Sanskar, face yoga, therapeutic yoga for back pain, and wellness sessions at the Indirapuram, Ghaziabad studio.",
  },
  {
    id: "privacy-policy",
    title: "Privacy Policy",
    eyebrow: "Student Trust",
    icon: ShieldCheck,
    text: "Information submitted through the website is used only to respond to enquiries, bookings, testimonials, and studio communication.",
  },
  {
    id: "terms-of-service",
    title: "Terms of Service",
    eyebrow: "Studio Policy",
    icon: FileText,
    text: "Class participation, bookings, cancellations, and studio use are subject to confirmation by Nikansha Yogaarogya Studio & Wellness.",
  },
];

const quickLinks = [
  { label: "Yoga Classes", href: "/classes" },
  { label: "About Studio", href: "/about" },
  { label: "Online Yoga", href: "/online-yoga-classes" },
  { label: "Contact", href: "/contact" },
];

export default function ResourcesContent() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-stone-50 to-amber-100/30 py-24 text-foreground">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full border border-amber-300/20" />
        <div className="absolute -right-28 top-28 h-96 w-96 rounded-full border-2 border-dashed border-amber-400/10" />
        <div className="absolute bottom-0 left-1/2 h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-amber-200/10 blur-3xl" />
        <svg className="absolute bottom-20 left-10 h-40 w-40 rotate-45 opacity-20" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="30" stroke="#8B6914" fill="none" strokeWidth="1.5" strokeDasharray="4 6" />
          <circle cx="50" cy="50" r="20" stroke="#DAA520" fill="none" strokeWidth="1" strokeDasharray="3 5" />
        </svg>
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mb-4 inline-block text-sm font-medium uppercase tracking-[0.2em] text-amber-700"
          >
            <span className="absolute -left-6 top-1/2 h-px w-4 -translate-y-1/2 bg-amber-600/50" />
            Resources
            <span className="absolute -right-6 top-1/2 h-px w-4 -translate-y-1/2 bg-amber-600/50" />
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="font-serif text-5xl leading-tight text-stone-800 md:text-6xl"
          >
            Yoga and Studio{" "}
            <span className="relative inline-block">
              <span className="italic text-amber-700">Resources</span>
              <svg className="absolute -bottom-2 left-0 h-3 w-full" viewBox="0 0 200 10">
                <path d="M0,8 Q50,2 100,8 T200,8" stroke="#DAA520" fill="none" strokeWidth="1.5" opacity="0.4" />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-stone-600"
          >
            Helpful guidance, studio information, and policy notes for students exploring yoga, meditation,
            pranayama, prenatal yoga, therapeutic wellness, and online yoga classes with Nikansha Yoga Arogya.
          </motion.p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-amber-300/60 bg-white/75 px-5 py-2 text-sm font-semibold text-amber-800 shadow-sm transition hover:-translate-y-px hover:bg-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <motion.section
                key={resource.id}
                id={resource.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.45 }}
                className="group scroll-mt-28"
              >
                <div className="relative h-full overflow-hidden rounded-2xl border border-amber-200/50 bg-white/80 p-6 shadow-lg shadow-amber-900/5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-amber-900/10">
                  <div className="absolute left-0 top-0 z-10 h-12 w-12 rounded-tl-2xl border-l-2 border-t-2 border-[#d6ab66]/30" />
                  <div className="absolute right-0 top-0 z-10 h-12 w-12 rounded-tr-2xl border-r-2 border-t-2 border-[#d6ab66]/30" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#d6ab66]/0 via-[#d6ab66]/0 to-[#d6ab66]/0 transition-all duration-500 group-hover:from-[#d6ab66]/5 group-hover:to-[#d6ab66]/10" />

                  <div className="relative z-10">
                    <div className="mb-6 flex items-center justify-between gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-amber-600/20 bg-gradient-to-br from-amber-600/10 to-amber-700/5 text-amber-700">
                        <Icon size={24} />
                      </div>
                      <span className="rounded-full border border-amber-200/60 bg-amber-50/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-amber-700">
                        {resource.eyebrow}
                      </span>
                    </div>

                    <h2 className="font-serif text-3xl font-semibold text-stone-800 transition-colors group-hover:text-amber-800">
                      {resource.title}
                    </h2>
                    <p className="mt-4 leading-8 text-stone-600">{resource.text}</p>
                  </div>
                </div>
              </motion.section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
