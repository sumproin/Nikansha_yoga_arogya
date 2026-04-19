"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const ref = useRef(null);
  const titleRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-content > *", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.5
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-black/30 z-10" />
        <img
          src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=2000"
          alt="Yoga at sunrise"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl hero-content">
        <span className="inline-block text-white/90 uppercase tracking-[0.3em] text-sm mb-6 font-medium">
          Find Your Inner Peace
        </span>
        <h1 ref={titleRef} className="text-5xl md:text-7xl font-serif text-white mb-8 leading-[1.1] tracking-tight">
          NIKANSHA <span className="italic text-primary">YOGAAROGYA</span> <br />
          STUDIO & WELLNESS
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Experience the ancient art of yoga in a modern sanctuary. Join our community and embark on a journey of self-discovery and holistic wellness.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            onClick={() => {
              const target = document.querySelector("#about");
              if (target) {
                gsap.to(window, {
                  duration: 1.2,
                  scrollTo: { y: target, offsetY: 80 },
                  ease: "power4.inOut",
                });
              }
            }}
            size="lg" 
            className="rounded-full px-10 py-7 text-lg bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 cursor-pointer"
          >
            Start Your Journey
          </Button>
          <Button 
            onClick={() => {
              const target = document.querySelector("#schedule");
              if (target) {
                gsap.to(window, {
                  duration: 1.2,
                  scrollTo: { y: target, offsetY: 80 },
                  ease: "power4.inOut",
                });
              }
            }}
            size="lg" 
            variant="outline" 
            className="rounded-full px-10 py-7 text-lg border-white text-black hover:bg-white/10 backdrop-blur-sm cursor-pointer"
          >
            View Schedule
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest opacity-60">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown size={24} className="opacity-60" />
        </motion.div>
      </motion.div>

      {/* Decorative Mandala Accent */}
      <div className="absolute -bottom-32 -right-32 w-96 h-96 opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full text-white fill-current">
          <path d="M100 0C100 0 110 40 150 40C150 40 160 0 200 0C200 0 190 40 150 80C150 80 190 90 190 130C190 130 150 120 150 160C150 160 160 200 120 200C120 200 110 160 70 160C70 160 40 200 0 200C0 200 10 160 50 120C50 120 10 110 10 70C10 70 50 80 50 40C50 40 40 0 80 0C80 0 90 40 100 0Z" />
        </svg>
      </div>
    </section>
  );
}
