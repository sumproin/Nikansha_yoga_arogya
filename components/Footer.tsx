"use client";

import { Leaf, Instagram, Facebook, Twitter, Youtube, Phone, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { MouseEvent } from "react";

const quickLinks = [
  { label: "About Us", href: "/#about" },
  { label: "Classes & Schedule", href: "/#classes" },
  { label: "Weekly Timetable", href: "/#classes" },
  { label: "Our Trainers", href: "/#trainers" },
  { label: "Workshops", href: "/resources#workshops" },
];

const resourceLinks = [
  { label: "Yoga Blog", href: "/resources#yoga-blog" },
  { label: "Beginner's Guide", href: "/resources#beginners-guide" },
  { label: "Meditation Tips", href: "/resources#meditation-tips" },
  { label: "Privacy Policy", href: "/resources#privacy-policy" },
  { label: "Terms of Service", href: "/resources#terms-of-service" },
];

const studioPhoneNumbers = ["+91 9217746084", "+91 9907370722"];

function handleSafeLinkClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
  try {
    const url = new URL(href, window.location.origin);
    const allowedProtocol = ["http:", "https:", "mailto:", "tel:"].includes(url.protocol);

    if (!allowedProtocol) {
      event.preventDefault();
      window.location.href = "/resources";
    }
  } catch {
    event.preventDefault();
    window.location.href = "/resources";
  }
}

export default function Footer() {
  return (
    <footer className="border-t border-earth/20 bg-cream/70 pb-12 pt-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <a href="/" className="flex items-center gap-2 group">
              <Image src="/mainlogo2.png" alt="Nikansha Yogaarogya logo" width={240} height={144} sizes="(max-width: 768px) 180px, 240px" loading="lazy" className="w-60 h-36 rounded-full object-cover border border-primary/20" />
            </a>
            <p className="text-muted-foreground leading-relaxed">
              Nikansha Yoga Arogya, NIKANSHA YOGAAROGYA STUDIO & WELLNESS, is a yoga center in Indirapuram, Ghaziabad for yoga classes, online yoga, meditation, pranayama, prenatal care, face yoga, and therapeutic wellness.
            </p>
            <div className="flex gap-4">
              <a href="#" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-card text-primary transition-all hover:bg-primary hover:text-primary-foreground">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="Facebook" className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-card text-primary transition-all hover:bg-primary hover:text-primary-foreground">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-card text-primary transition-all hover:bg-primary hover:text-primary-foreground">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="YouTube" className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-card text-primary transition-all hover:bg-primary hover:text-primary-foreground">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif font-bold text-xl mb-8">Quick Links</h4>
            <ul className="space-y-4 text-muted-foreground">
              {quickLinks.map((link) => (
                <li key={`${link.label}-${link.href}`}>
                  <Link href={link.href} onClick={(event) => handleSafeLinkClick(event, link.href)} className="hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-xl mb-8">Resources</h4>
            <ul className="space-y-4 text-muted-foreground">
              {resourceLinks.map((link) => (
                <li key={`${link.label}-${link.href}`}>
                  <Link href={link.href} onClick={(event) => handleSafeLinkClick(event, link.href)} className="hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-xl mb-8">Newsletter</h4>
            <div className="mb-6 space-y-3 text-muted-foreground">
              <div className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5 shrink-0 text-primary" />
                <div className="space-y-1">
                  {studioPhoneNumbers.map((phoneNumber) => (
                    <a
                      key={phoneNumber}
                      href={`tel:${phoneNumber.replace(/\D/g, "")}`}
                      className="block transition-colors hover:text-primary"
                    >
                      {phoneNumber}
                    </a>
                  ))}
                </div>
              </div>
              <a href="mailto:nikansha@zohomail.in" className="flex items-center gap-3 transition-colors hover:text-primary">
                <Mail size={18} className="shrink-0 text-primary" />
                nikansha@zohomail.in
              </a>
            </div>
            <p className="text-muted-foreground mb-6">Subscribe to receive studio updates, wellness tips, and special offers.</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-full border border-earth/20 bg-card px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
              <button aria-label="Subscribe to newsletter" className="rounded-full bg-primary p-2 text-primary-foreground transition-all hover:bg-primary/90" type="button">
                <Leaf size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t text-center text-sm flex flex-col items-center gap-4 justify-center">
          <p>Copyright {new Date().getFullYear()} NIKANSHA YOGAAROGYA STUDIO & WELLNESS. All rights reserved. Designed with love and mindfulness.</p>
           <a
              href="/admin"
              aria-label="Admin login"
              className="inline-flex items-center rounded-full border border-earth/30 bg-card/70 px-3 py-1.5 text-xs font-medium tracking-[0.08em] text-primary/80 transition-colors hover:text-primary"
            >
              Admin
            </a>
        </div>
        
      </div>
    </footer>
  );
}

