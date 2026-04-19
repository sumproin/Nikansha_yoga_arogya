"use client";

import { Leaf, Instagram, Facebook, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white pt-24 pb-12 border-t">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <a href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white">
                <Leaf size={20} />
              </div>
              <span className="text-xl font-serif font-bold tracking-tight">
                NIKANSHA <span className="text-primary">YOGAAROGYA</span>
              </span>
            </a>
            <p className="text-muted-foreground leading-relaxed">
              NIKANSHA YOGAAROGYA STUDIO & WELLNESS is a modern sanctuary dedicated to the art of yoga and mindful living. Join us to awaken your soul and transform your life.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
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
              <li><a href="#" className="hover:text-primary transition-colors">Beginner's Guide</a></li>
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
                className="bg-cream border-none rounded-full px-4 py-2 w-full focus:ring-2 focus:ring-primary outline-none text-sm"
              />
              <button className="bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-all">
                <Leaf size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} NIKANSHA YOGAAROGYA STUDIO & WELLNESS. All rights reserved. Designed with love and mindfulness.</p>
        </div>
      </div>
    </footer>
  );
}
