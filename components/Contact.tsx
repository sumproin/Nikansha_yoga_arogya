"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail } from "lucide-react";

type ContactForm = {
  fullName: string;
  email: string;
  phone: string;
  message: string;
};

const initialForm: ContactForm = {
  fullName: "",
  email: "",
  phone: "",
  message: "",
};

const googleMapsLink = "https://maps.app.goo.gl/F43tUAZDya6dp9Fq7";
const mapEmbedSrc = "https://maps.google.com/maps?q=F-1605%20Rishabh%20Cloud%209%2C%20Indirapuram%2C%20Ghaziabad&t=&z=15&ie=UTF8&iwloc=&output=embed";

export default function Contact() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { message?: string } | null;
        throw new Error(body?.message || "Failed to send message.");
      }

      setSuccess("Your message has been sent successfully.");
      setForm(initialForm);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Failed to send message.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-24 bg-cream">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 overflow-hidden rounded-[3rem] border border-earth/20 bg-card shadow-2xl lg:grid-cols-2">
          <div className="p-12 md:p-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-primary font-medium tracking-widest uppercase text-sm mb-4 block"
            >
              Get in Touch
            </motion.span>
            <h2 className="text-4xl font-serif mb-8">Begin Your Journey Today.</h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground ml-1">Full Name</label>
                  <Input
                    required
                    placeholder="John Doe"
                    value={form.fullName}
                    onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
                    className="h-12 rounded-xl border border-earth/20 bg-cream/60 focus-visible:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground ml-1">Email Address</label>
                  <Input
                    required
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                    className="h-12 rounded-xl border border-earth/20 bg-cream/60 focus-visible:ring-primary"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground ml-1">Contact Number</label>
                <Input
                  required
                  type="tel"
                  inputMode="tel"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                  className="h-12 rounded-xl border border-earth/20 bg-cream/60 focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground ml-1">Your Message</label>
                <Textarea
                  required
                  minLength={10}
                  placeholder="How can we help you?"
                  value={form.message}
                  onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                  className="min-h-[150px] rounded-xl border border-earth/20 bg-cream/60 focus-visible:ring-primary"
                />
              </div>
              <Button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-primary py-7 text-lg text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
              >
                {submitting ? "Sending..." : "Send Message"}
              </Button>
            </form>

            {error ? <p className="text-sm text-destructive mt-4">{error}</p> : null}
            {success ? <p className="text-sm text-primary mt-4">{success}</p> : null}
          </div>

          <div className="relative flex flex-col justify-between overflow-hidden bg-[linear-gradient(150deg,#0f0b08_0%,#261b13_50%,#3c2a1d_100%)] p-12 text-[#f6ecdf] md:p-16">
            <div className="absolute top-0 right-0 w-64 h-64 opacity-10 pointer-events-none translate-x-1/2 -translate-y-1/2">
              <svg viewBox="0 0 100 100" className="h-full w-full fill-primary">
                <path d="M50 0 L100 50 L50 100 L0 50 Z" />
              </svg>
            </div>

            <div>
              <h3 className="text-3xl font-serif mb-12">Contact Information</h3>
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/20 text-primary">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Our Sanctuary</h4>
                    <p className="text-[#ebdcc8]/80">F-1605 Rishabh Cloud 9, Indirapuram<br />Ghaziabad</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/20 text-primary">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Call Us</h4>
                    <p className="text-[#ebdcc8]/80">+91 9217746084</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/20 text-primary">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Email Us</h4>
                    <a href="mailto:nikansha@zohomail.in" className="text-[#ebdcc8]/80 underline-offset-4 hover:underline">
                      nikansha@zohomail.in
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 border-t border-primary/20 pt-12">
              <p className="text-sm text-[#ddc7aa]/70">Visit our studio in Indirapuram, Ghaziabad for personalized classes and wellness guidance.</p>
            </div>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-[2rem] border border-earth/20 bg-card shadow-xl">
          <div className="flex flex-col gap-3 border-b border-earth/20 px-6 py-5 md:flex-row md:items-center md:justify-between">
            <h3 className="font-serif text-2xl">Find Us on the Map</h3>
            <a
              href={googleMapsLink}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-primary underline underline-offset-4 hover:text-earth"
            >
              Open in Google Maps
            </a>
          </div>
          <iframe
            title="Nikansha Yogaarogya Studio Location"
            src={mapEmbedSrc}
            className="h-[340px] w-full border-0 md:h-[420px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
