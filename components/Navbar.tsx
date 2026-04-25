"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Classes", href: "#classes" },
  { name: "Schedule", href: "#schedule" },
  { name: "Trainers", href: "#trainers" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const top = (target as HTMLElement).getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-background/80 backdrop-blur-md border-b py-1 shadow-sm"
          : "bg-transparent py-2"
        }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <img
            src={isScrolled ? "/mainlogo2.png" : "/mainlogo.png"}
            alt="Nikansha Yogaarogya logo"
            className={`${isScrolled
                ? "w-40 h-24 rounded-full object-cover border border-primary/20"
                : "w-40 h-24 bg-transparent"
              }`}
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-sm font-medium hover:text-primary transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </a>
          ))}
          <Button
            onClick={() => {
              const target = document.querySelector("#schedule");
              if (target) {
                const top = (target as HTMLElement).getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top, behavior: "smooth" });
              }
            }}
            className="rounded-full px-6 bg-secondary hover:bg-secondary/90 text-white"
          >
            Book a Class
          </Button>
          <a href="/admin" className="text-sm font-semibold text-primary hover:underline underline-offset-4">
            Admin
          </a>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger className="inline-flex size-9 items-center justify-center rounded-md hover:bg-muted transition-colors" aria-label="Open menu">
              <Menu className="w-6 h-6" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-8 mt-12">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-2xl font-serif hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <Button
                  onClick={() => {
                    const target = document.querySelector("#schedule");
                    if (target) {
                      const top = (target as HTMLElement).getBoundingClientRect().top + window.scrollY - 80;
                      window.scrollTo({ top, behavior: "smooth" });
                    }
                  }}
                  className="rounded-full w-full bg-primary text-white py-6 text-lg"
                >
                  Book a Class
                </Button>
                <a href="/admin" className="text-lg font-serif text-primary hover:underline underline-offset-4">
                  Admin
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}
