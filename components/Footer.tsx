"use client";

import { Leaf, Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import Image from "next/image";

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
              NIKANSHA YOGAAROGYA STUDIO & WELLNESS is a modern sanctuary dedicated to the art of yoga and mindful living. Join us to awaken your soul and transform your life.
            </p>
            <div className="flex gap-4">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-card text-primary transition-all hover:bg-primary hover:text-primary-foreground">
                <Instagram size={20} />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-card text-primary transition-all hover:bg-primary hover:text-primary-foreground">
                <Facebook size={20} />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-card text-primary transition-all hover:bg-primary hover:text-primary-foreground">
                <Twitter size={20} />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-card text-primary transition-all hover:bg-primary hover:text-primary-foreground">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif font-bold text-xl mb-8">Quick Links</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#classes" className="hover:text-primary transition-colors">Classes & Schedule</a></li>
              <li><a href="#schedule" className="hover:text-primary transition-colors">Weekly Timetable</a></li>
              <li><a href="#trainers" className="hover:text-primary transition-colors">Our Trainers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Workshops</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-xl mb-8">Resources</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Yoga Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Beginner&apos;s Guide</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Meditation Tips</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-xl mb-8">Newsletter</h4>
            <p className="text-muted-foreground mb-6">Subscribe to receive studio updates, wellness tips, and special offers.</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-full border border-earth/20 bg-card px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="rounded-full bg-primary p-2 text-primary-foreground transition-all hover:bg-primary/90" type="button">
                <Leaf size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t text-center text-sm text-muted-foreground">
          <p>Copyright {new Date().getFullYear()} NIKANSHA YOGAAROGYA STUDIO & WELLNESS. All rights reserved. Designed with love and mindfulness.</p>
        </div>
      </div>
    </footer>
  );
}

