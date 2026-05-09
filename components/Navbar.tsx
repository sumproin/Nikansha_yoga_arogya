"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { CircleUserRound, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Classes", href: "#classes" },
  { name: "Schedule", href: "#schedule" },
  { name: "Trainers", href: "#trainers" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLElement>, href: string) => {
    e.preventDefault();
    if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      const top = (target as HTMLElement).getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed inset-x-0 top-0 z-[100]"
    >
      <div
        className={`absolute inset-0 h-[86px] border-b backdrop-blur-md transition-colors duration-300 lg:h-[118px] ${
          isScrolled
            ? "border-[#d2a55c4d] bg-[#0a0807e6]"
            : "border-[#d2a55c38] bg-[#0a0807bd]"
        }`}
      />

      <div className="relative z-[2] mx-auto flex h-[86px] max-w-[1420px] items-center justify-center px-4 lg:h-[118px] lg:px-[26px]">
        <a
          href="#home"
          className={`absolute ${isScrolled ? "top-1 h-[110px] w-[186px]" : "top-10 h-[140px] w-[228px]"} transition-all duration-300 left-6 hidden  overflow-hidden rounded-full border border-[#d2a55c94] bg-[#1c1714] shadow-[0_10px_35px_rgba(0,0,0,0.34)] lg:flex`}
          onClick={(e) => scrollToSection(e, "#home")}
          aria-label="Go to home section"
        >
          <Image src="/mainlogo.png" alt="Nikansha Yogaarogya logo" fill sizes="(min-width: 1024px) 228px, 0px" priority className="h-full w-full scale-105 object-cover" />
        </a>

        <div className="hidden items-center gap-8 xl:gap-10 lg:flex">
          {navLinks.map((link, index) => (
            <button
              key={link.name}
              type="button"
              onClick={(e) => scrollToSection(e, link.href)}
              className={`group cursor-pointer relative border-0 bg-transparent p-0 text-sm font-normal leading-none tracking-[0.01em] transition-colors ${
                index === 0 ? "text-[#d7aa63]" : "text-white/90 hover:text-[#d7aa63]"
              }`}
            >
              {link.name}
              <span
                className={`absolute -bottom-[10px] left-0 h-[2px] bg-[#d7aa63] transition-all ${
                  index === 0 ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 items-center gap-6 lg:flex">
          <button
            type="button"
            onClick={() => {
              const target = document.querySelector("#contact");
              if (target) {
                const top = (target as HTMLElement).getBoundingClientRect().top + window.scrollY - 96;
                window.scrollTo({ top, behavior: "smooth" });
              }
            }}
            className="cursor-pointer rounded-2xl border-0 bg-[#d7aa63] px-7 py-3.5 text-[17px] font-semibold text-[#15110d] transition hover:brightness-105"
          >
            Book a Class
          </button>
        </div>

        <div className="flex w-full items-center justify-between lg:hidden">
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, "#home")}
            className="relative inline-flex h-[54px] w-[54px] overflow-hidden rounded-full border border-[#d2a55c94] bg-[#1c1714]"
            aria-label="Go to home section"
          >
            <Image src="/mainlogo.png" alt="Nikansha Yogaarogya logo" fill sizes="54px" priority className="h-full w-full scale-110 object-cover" />
          </a>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#d2a55c66] bg-[#0a0807a6] text-[#f5e9d8]" aria-label="Open menu">
              <Menu className="w-6 h-6" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(330px,86vw)] border-l border-[#d2a55c4d] bg-[#120f0d] pt-11 text-[#f8f3eb]">
              <div className="flex flex-col gap-4 px-4">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    type="button"
                    onClick={(e) => {
                      scrollToSection(e, link.href);
                      setIsOpen(false);
                    }}
                    className="border-0 bg-transparent text-left font-serif text-[30px] text-[#f8f3eb]"
                  >
                    {link.name}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const target = document.querySelector("#schedule");
                    if (target) {
                      const top = (target as HTMLElement).getBoundingClientRect().top + window.scrollY - 96;
                      window.scrollTo({ top, behavior: "smooth" });
                    }
                    setIsOpen(false);
                  }}
                  className="mt-2 rounded-[14px] border-0 bg-[#d7aa63] px-5 py-4 text-[17px] font-semibold text-[#18130e]"
                >
                  Book a Class
                </button>
                <a href="/admin" className="mt-1 inline-flex justify-center items-center gap-2 text-base text-[#d7aa63]">
                  Admin
                  <CircleUserRound size={18} />
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}

