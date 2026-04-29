"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";

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
          src="/yogabg.webp"
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
          Nikansha <span className="italic text-primary">YogaArogya</span> <br />
           <p className="text-2xl md:text-4xl text-white/80 mt-4 font-light tracking-wide">
            & Wellness Studio
          </p>
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Experience the ancient art of yoga in a modern sanctuary. Join our community and embark on a journey of self-discovery and holistic wellness.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            onClick={() => {
              const target = document.querySelector("#about");
              if (target) {
                const top = (target as HTMLElement).getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top, behavior: "smooth" });
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
                const top = (target as HTMLElement).getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top, behavior: "smooth" });
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
    </section>
  );
}
