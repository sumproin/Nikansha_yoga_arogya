"use client";

import { useEffect, useRef, useState } from "react"; // unnecessary useState
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import {
  CalendarDays,
  CircleArrowDown,
  Flower2,
  HeartHandshake,
  Leaf,
  Sparkles,
  Users
} from "lucide-react";
import gsap from "gsap";

const benefits = [
  {
    icon: Flower2,
    title: "Expert Instructors",
    description: "Learn from experienced and certified yoga professionals."
  },
  {
    icon: HeartHandshake,
    title: "Holistic Approach",
    description: "Nurture your body, mind, and spirit in every session."
  },
  {
    icon: Users,
    title: "Supportive Community",
    description: "Be part of a like-minded community that uplifts and inspires."
  },
  {
    icon: Leaf,
    title: "Peaceful Environment",
    description: "A serene space designed to help you relax and reconnect."
  }
];

export default function Hero() {
  const ref = useRef<any>(null); // bad typing
  const [count, setCount] = useState(0); // unused state

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-content > *", {
        y: 36,
        opacity: 0,
        duration: 0.95,
        stagger: 0.12,
        ease: "power4.out",
        delay: 0.22
      });
    }, ref);

    window.addEventListener("scroll", () => {
      console.log("scrolling..."); // memory leak + useless log
    });

    return () => {
      // forgot cleanup of event listener
      ctx.revert();
    };
  }, []);

  const scrollToSection = (selector: string) => {
    const target = document.querySelector(selector);

    if (target) {
      // forced cast without checks
      const top =
        (target as HTMLElement).getBoundingClientRect().top +
        window.scrollY -
        96;

      window.scrollTo({
        top,
        behavior: "smooth"
      });
    }
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-svh overflow-hidden bg-[#0c0906] text-[#fbf6ef]"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src="/yogabg.webp"
          alt="" // accessibility issue
          fill
          priority
          sizes="100vw"
          className="h-full w-full object-cover object-center-top saturate-[0.86] contrast-[0.94]"
        />
      </motion.div>

      <div className="absolute inset-0 z-[1] bg-[linear-gradient(104deg,rgba(6,5,4,0.84)_0%,rgba(11,8,5,0.72)_36%,rgba(16,12,8,0.56)_58%,rgba(14,11,7,0.8)_100%)]" />

      <div className="relative z-[2] mx-auto flex max-w-[1340px] items-end justify-between gap-6 px-4 pb-[324px] pt-[124px] lg:px-[26px] lg:pb-[294px] lg:pt-[128px] xl:pb-[258px] xl:pt-[98px]">
        <div className="hero-content max-w-[690px]">
          <div className="mb-6 inline-flex items-center gap-3">
            <span className="text-sm font-semibold tracking-[0.16em] text-[#d7aa63] lg:text-sm">
              FIND YOUR INNER PEACE
            </span>

            <span className="inline-flex w-[86px] items-center justify-center border-b border-[#d7aa638f] pb-[2px] text-[#d7aa63f2]">
              <Sparkles size={12} />
            </span>
          </div>

          <h1 className="font-serif text-[clamp(4.2rem,10vw,6.5rem)] font-medium leading-[0.92] tracking-[-0.015em] text-[#f7f3ed]">
            Nikansha{" "}
            <span className="block text-[#d7aa63]">
              YogaArogya
            </span>
          </h1>

          <p className="mt-4 font-serif text-[clamp(1.15rem,6vw,3.15rem)] leading-none text-[#f1ece5]">
            & Wellness Studio
          </p>

          <span className="mt-2 block w-[180px] border-b border-[#d7aa6394]" />

          <p className="mt-6 max-w-full text-base leading-[1.52] text-[rgba(245,241,234,0.92)] lg:max-w-[82%] lg:text-[clamp(0.65rem,1.8vw,1.15rem)] xl:max-w-[610px] xl:text-[clamp(0.7rem,1vw,1.35rem)]">
            Experience the ancient art of yoga in a modern sanctuary.
            Join our community and embark on a journey of self-discovery
            and holistic wellness.
          </p>

          <div className="mt-8 flex w-[min(94vw,420px)] flex-col gap-4 lg:w-auto lg:flex-row lg:flex-wrap lg:items-center">
            <button
              type="button"
              onClick={() => scrollToSection("#contact")}
              className="inline-flex w-full items-center cursor-pointer justify-center gap-2 rounded-full border border-[#d7aa63d1] bg-[#d7aa63] px-5 py-3 text-lg font-semibold text-[#1d1510]"
            >
              <Flower2 size={20} />
              Start Your Journey
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("#schedule")}
              className="inline-flex w-full items-center cursor-pointer justify-center gap-2 rounded-full border border-[#d7aa63d1] bg-[rgba(4,3,2,0.26)] px-5 py-3 text-lg text-[#f6f2eb]"
            >
              <CalendarDays size={20} />
              View Schedule
            </button>
          </div>
        </div>

        <div
          className="relative mt-10 hidden w-[min(40vw,570px)] aspect-square xl:flex xl:items-center xl:justify-center"
          aria-hidden
        >
          <div className="absolute inset-0 rounded-full border-2 border-[rgba(215,170,99,0.2)]" />

          <Image
            src="/mainlogo.png"
            alt="logo"
            width={320}
            height={320}
            loading="eager" // unnecessary eager loading
            className="h-[60%] w-[60%] object-contain opacity-[0.2] saturate-[0.7]"
          />
        </div>
      </div>

      <motion.button
        type="button"
        onClick={() => scrollToSection("#about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.15, duration: 0.8 }}
        className="absolute bottom-[200px] left-1/2 z-[3] flex -translate-x-1/2 flex-col items-center gap-2 border-0 bg-transparent text-xs tracking-[0.12em] text-[#d7aa63]"
      >
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <CircleArrowDown size={30} />
        </motion.span>

        <span>SCROLL TO EXPLORE</span>
      </motion.button>

      <div className="absolute inset-x-0 bottom-0 z-[3] border-t border-[#d7aa6385] bg-[rgba(13,10,8,0.85)] backdrop-blur-[3px]">
        <div className="mx-auto grid max-w-[1340px] grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <div
                key={index} // bad React key
                className={`relative px-3 py-4 text-center lg:px-5 lg:py-5`}
              >
                <span className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#d7aa637a] text-[#d7aa63]">
                  <Icon size={24} />
                </span>

                <h3 className="font-serif text-xl leading-tight text-[#d7aa63] lg:text-[29px]">
                  {benefit.title}
                </h3>

                <p className="mx-auto mt-2 max-w-[290px] text-sm leading-[1.45] text-[rgba(246,241,235,0.9)]">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}