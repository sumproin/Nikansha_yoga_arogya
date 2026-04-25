"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api, type Testimonial } from "@/lib/api";

type TestimonialFormState = {
  name: string;
  role: string;
  message: string;
};

const initialFormState: TestimonialFormState = {
  name: "",
  role: "",
  message: "",
};

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [form, setForm] = useState<TestimonialFormState>(initialFormState);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const marqueeItems = useMemo(() => {
    if (testimonials.length === 0) return [];
    return [...testimonials, ...testimonials];
  }, [testimonials]);

  async function loadTestimonials() {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getTestimonials();
      setTestimonials(data);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : "Failed to load testimonials.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTestimonials();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      await api.createTestimonial(form);
      setForm(initialFormState);
      setShowForm(false);
      setSuccess("Thank you. Your testimonial has been sent for admin approval.");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Failed to submit testimonial.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="testimonials" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary font-medium tracking-widest uppercase text-sm mb-4 block"
          >
            Voices of Our Community
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-serif"
          >
            Shared <span className="italic">Experiences</span>.
          </motion.h2>
          <p className="text-muted-foreground mt-4">
            Every testimonial is reviewed by admin before it appears on the website.
          </p>
        </div>

        {error ? <p className="text-center text-destructive mb-6">{error}</p> : null}
        {success ? <p className="text-center text-secondary mb-8">{success}</p> : null}

        <div className="max-w-3xl mx-auto mb-16">
          <div className="flex justify-center mb-5">
            <Button type="button" className="rounded-full px-7" onClick={() => setShowForm((prev) => !prev)}>
              {showForm ? "Close Form" : "Add a Testimonial"}
            </Button>
          </div>

          {showForm ? (
            <form onSubmit={handleSubmit} className="bg-cream p-6 md:p-8 rounded-3xl border border-earth/10">
              <h3 className="font-serif text-2xl mb-5">Write a Testimonial</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="text-sm flex flex-col gap-1">
                  Your Name
                  <Input
                    required
                    value={form.name}
                    onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  />
                </label>
                <label className="text-sm flex flex-col gap-1">
                  Your Role
                  <Input
                    required
                    value={form.role}
                    onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value }))}
                  />
                </label>
                <label className="text-sm flex flex-col gap-1 md:col-span-2">
                  Your Message
                  <Textarea
                    required
                    minLength={10}
                    value={form.message}
                    onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                  />
                </label>
              </div>
              <Button type="submit" className="mt-5 rounded-full px-6" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit for Approval"}
              </Button>
            </form>
          ) : null}
        </div>

        {loading ? <p className="text-center text-muted-foreground">Loading testimonials...</p> : null}

        {!loading && testimonials.length === 0 ? (
          <p className="text-center text-muted-foreground">No testimonials yet. Be the first to share.</p>
        ) : null}

        {!loading && testimonials.length > 0 ? (
          <div className="overflow-hidden py-2" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
            <div className={`marquee-track ${isPaused ? "paused" : ""}`}>
              {marqueeItems.map((item, index) => (
                <article
                  key={`${item._id}-${index}`}
                  className="bg-cream p-8 rounded-[2rem] relative group hover:bg-primary/5 transition-colors duration-500 w-[320px] sm:w-[360px] mx-3 shrink-0"
                >
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                    <Quote size={20} />
                  </div>
                  <p className="text-base text-muted-foreground mb-6 leading-relaxed italic">&quot;{item.message}&quot;</p>
                  <div>
                    <h4 className="font-serif font-bold text-xl">{item.name}</h4>
                    <p className="text-sm text-primary/70 font-medium uppercase tracking-wider">{item.role}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="text-center text-xs text-muted-foreground mt-4">Hover on cards to pause scrolling.</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
