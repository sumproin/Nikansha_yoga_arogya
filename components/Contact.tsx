"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

type ContactForm = {
  fullName: string;
  email: string;
  interest: string;
  message: string;
};

const initialForm: ContactForm = {
  fullName: "",
  email: "",
  interest: "Vinyasa Flow",
  message: "",
};

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
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
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
                    className="rounded-xl bg-cream/50 border-none h-12 focus-visible:ring-primary"
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
                    className="rounded-xl bg-cream/50 border-none h-12 focus-visible:ring-primary"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground ml-1">Interested In</label>
                <select
                  className="w-full rounded-xl bg-cream/50 border-none h-12 px-3 text-sm focus:ring-2 focus:ring-primary outline-none"
                  value={form.interest}
                  onChange={(event) => setForm((prev) => ({ ...prev, interest: event.target.value }))}
                >
                  <option>Vinyasa Flow</option>
                  <option>Hatha Yoga</option>
                  <option>Ashtanga Power</option>
                  <option>Meditation</option>
                  <option>Teacher Training</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground ml-1">Your Message</label>
                <Textarea
                  required
                  minLength={10}
                  placeholder="How can we help you?"
                  value={form.message}
                  onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                  className="rounded-xl bg-cream/50 border-none min-h-[150px] focus-visible:ring-primary"
                />
              </div>
              <Button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full py-7 text-lg bg-primary hover:bg-primary/90 text-white transition-all shadow-lg shadow-primary/20"
              >
                {submitting ? "Sending..." : "Send Message"}
              </Button>
            </form>

            {error ? <p className="text-sm text-destructive mt-4">{error}</p> : null}
            {success ? <p className="text-sm text-secondary mt-4">{success}</p> : null}
          </div>

          <div className="bg-teal p-12 md:p-16 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 opacity-10 pointer-events-none translate-x-1/2 -translate-y-1/2">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
                <path d="M50 0 L100 50 L50 100 L0 50 Z" />
              </svg>
            </div>

            <div>
              <h3 className="text-3xl font-serif mb-12">Contact Information</h3>
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Our Sanctuary</h4>
                    <p className="text-white/70">123 Serenity Lane, Wellness District<br />San Francisco, CA 94103</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Call Us</h4>
                    <p className="text-white/70">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Email Us</h4>
                    <p className="text-white/70">hello@pranayoga.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Studio Hours</h4>
                    <p className="text-white/70">Mon - Fri: 6:00 AM - 9:00 PM<br />Sat - Sun: 8:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-white/10">
              <p className="text-white/50 text-sm">Follow our journey on social media for daily inspiration and studio updates.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
