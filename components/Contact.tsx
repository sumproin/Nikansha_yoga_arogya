"use client";

import { useEffect, useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail } from "lucide-react";
import { yogaClassOptions } from "@/lib/classes";

type ContactForm = {
  fullName: string;
  email: string;
  phone: string;
  selectedClasses: string[];
  message: string;
};

type ContactErrors = Partial<Record<keyof ContactForm, string>>;
type ContactTextField = "fullName" | "email" | "phone" | "message";

const initialForm: ContactForm = {
  fullName: "",
  email: "",
  phone: "",
  selectedClasses: [],
  message: "",
};

const googleMapsLink = "https://maps.app.goo.gl/P1haXtED7Z9HZmRi7";
const mapEmbedSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.5307296237943!2d77.3726379!3d28.6438234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfba3df7c96f3%3A0xd0c446bdaebf8881!2sNikansha%20Yoga%20Arogya!5e0!3m2!1sen!2sin!4v1779324448599!5m2!1sen!2sin";
const nameRegex = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizePhone(value: string) {
  return value.replace(/\D/g, "").slice(0, 10);
}

function countWords(value: string) {
  return value
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function validateField(field: ContactTextField, value: string) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return "This field is required.";
  }

  if (field === "fullName") {
    if (trimmedValue.length < 2) {
      return "Name must be at least 2 characters.";
    }
    if (!nameRegex.test(trimmedValue)) {
      return "Name cannot contain numbers.";
    }
  }

  if (field === "email" && !emailRegex.test(trimmedValue)) {
    return "Please enter a valid email address.";
  }

  if (field === "phone" && normalizePhone(trimmedValue).length !== 10) {
    return "Contact number must be exactly 10 digits.";
  }

  if (field === "message" && countWords(trimmedValue) < 5) {
    return "Message must be at least 5 words.";
  }

  return null;
}

function validateForm(values: ContactForm): ContactErrors {
  const nextErrors: ContactErrors = {};
  const fields: ContactTextField[] = ["fullName", "email", "phone", "message"];

  fields.forEach((field) => {
    const fieldError = validateField(field, values[field]);
    if (fieldError) {
      nextErrors[field] = fieldError;
    }
  });
  if (values.selectedClasses.length === 0) {
    nextErrors.selectedClasses = "Please select at least one class.";
  }

  return nextErrors;
}

function toggleClassSelection(selectedClasses: string[], className: string) {
  if (selectedClasses.includes(className)) {
    return selectedClasses.filter((item) => item !== className);
  }
  return [...selectedClasses, className];
}

export default function Contact() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [fieldErrors, setFieldErrors] = useState<ContactErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    function handlePrefill(event: Event) {
      const customEvent = event as CustomEvent<{ classes?: string[] }>;
      const classes = (customEvent.detail?.classes || []).filter((item): item is string => typeof item === "string");
      if (classes.length === 0) return;
      setForm((prev) => ({
        ...prev,
        selectedClasses: Array.from(new Set([...prev.selectedClasses, ...classes])),
      }));
    }

    window.addEventListener("prefill-classes", handlePrefill as EventListener);
    return () => window.removeEventListener("prefill-classes", handlePrefill as EventListener);
  }, []);

  function handleFieldBlur(field: ContactTextField) {
    const fieldError = validateField(field, form[field]);
    setFieldErrors((prev) => ({
      ...prev,
      [field]: fieldError ?? undefined,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const nextErrors = validateForm(form);
    setFieldErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setError("Please fix the highlighted fields and try again.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          phone: normalizePhone(form.phone),
          selectedClasses: form.selectedClasses,
          message: form.message.trim(),
        }),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { message?: string } | null;
        throw new Error(body?.message || "Failed to send message.");
      }

      setSuccess("Your message has been sent successfully.");
      setForm(initialForm);
      setFieldErrors({});
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

            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground ml-1">Full Name</label>
                  <Input
                    required
                    placeholder="John Doe"
                    value={form.fullName}
                    onChange={(event) => {
                      const nextName = event.target.value.replace(/[0-9]/g, "");
                      setForm((prev) => ({ ...prev, fullName: nextName }));
                      if (fieldErrors.fullName) {
                        setFieldErrors((prev) => ({ ...prev, fullName: validateField("fullName", nextName) ?? undefined }));
                      }
                    }}
                    onBlur={() => handleFieldBlur("fullName")}
                    aria-invalid={Boolean(fieldErrors.fullName)}
                    className="h-12 rounded-xl border border-earth/20 bg-cream/60 focus-visible:ring-primary"
                  />
                  {fieldErrors.fullName ? <p className="text-xs text-destructive ml-1">{fieldErrors.fullName}</p> : null}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground ml-1">Email Address</label>
                  <Input
                    required
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={(event) => {
                      const nextEmail = event.target.value;
                      setForm((prev) => ({ ...prev, email: nextEmail }));
                      if (fieldErrors.email) {
                        setFieldErrors((prev) => ({ ...prev, email: validateField("email", nextEmail) ?? undefined }));
                      }
                    }}
                    onBlur={() => handleFieldBlur("email")}
                    aria-invalid={Boolean(fieldErrors.email)}
                    className="h-12 rounded-xl border border-earth/20 bg-cream/60 focus-visible:ring-primary"
                  />
                  {fieldErrors.email ? <p className="text-xs text-destructive ml-1">{fieldErrors.email}</p> : null}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground ml-1">Contact Number</label>
                <Input
                  required
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  pattern="[0-9]{10}"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(event) => {
                    const nextPhone = normalizePhone(event.target.value);
                    setForm((prev) => ({ ...prev, phone: nextPhone }));
                    if (fieldErrors.phone) {
                      setFieldErrors((prev) => ({ ...prev, phone: validateField("phone", nextPhone) ?? undefined }));
                    }
                  }}
                  onBlur={() => handleFieldBlur("phone")}
                  aria-invalid={Boolean(fieldErrors.phone)}
                  className="h-12 rounded-xl border border-earth/20 bg-cream/60 focus-visible:ring-primary"
                />
                {fieldErrors.phone ? <p className="text-xs text-destructive ml-1">{fieldErrors.phone}</p> : null}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground ml-1">Select Class (Multiple)</label>
                <div className="rounded-xl border border-earth/20 bg-cream/60 p-3">
                  <div className="mb-3 flex flex-wrap gap-2">
                    {form.selectedClasses.length === 0 ? (
                      <span className="text-xs text-muted-foreground">No classes selected yet.</span>
                    ) : (
                      form.selectedClasses.map((className) => (
                        <button
                          key={className}
                          type="button"
                          onClick={() =>
                            setForm((prev) => ({
                              ...prev,
                              selectedClasses: prev.selectedClasses.filter((item) => item !== className),
                            }))
                          }
                          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/15 px-3 py-1 text-xs font-medium text-primary"
                          aria-label={`Remove ${className}`}
                        >
                          <span className="text-primary/80">x</span>
                          {className}
                        </button>
                      ))
                    )}
                  </div>

                  <div className="max-h-44 space-y-2 overflow-y-auto pr-1">
                    {yogaClassOptions.map((className) => {
                      const isSelected = form.selectedClasses.includes(className);
                      return (
                        <button
                          key={className}
                          type="button"
                          onClick={() =>
                            setForm((prev) => ({
                              ...prev,
                              selectedClasses: toggleClassSelection(prev.selectedClasses, className),
                            }))
                          }
                          className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                            isSelected
                              ? "border-primary/40 bg-primary/15 text-primary"
                              : "border-earth/25 bg-card/70 text-foreground hover:bg-card"
                          }`}
                          aria-pressed={isSelected}
                        >
                          {className}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {fieldErrors.selectedClasses ? <p className="text-xs text-destructive ml-1">{fieldErrors.selectedClasses}</p> : null}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground ml-1">Your Message</label>
                <Textarea
                  required
                  placeholder="How can we help you?"
                  value={form.message}
                  onChange={(event) => {
                    const nextMessage = event.target.value;
                    setForm((prev) => ({ ...prev, message: nextMessage }));
                    if (fieldErrors.message) {
                      setFieldErrors((prev) => ({ ...prev, message: validateField("message", nextMessage) ?? undefined }));
                    }
                  }}
                  onBlur={() => handleFieldBlur("message")}
                  aria-invalid={Boolean(fieldErrors.message)}
                  className="min-h-[150px] rounded-xl border border-earth/20 bg-cream/60 focus-visible:ring-primary"
                />
                {fieldErrors.message ? <p className="text-xs text-destructive ml-1">{fieldErrors.message}</p> : null}
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
