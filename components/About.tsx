"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Leaf, Heart, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: <Leaf className="text-primary" />,
    title: "Rooted in Tradition",
    description: "We honor the ancient lineages of yoga while making them accessible for modern life.",
  },
  {
    icon: <Heart className="text-earth" />,
    title: "Compassionate Community",
    description: "A welcoming space where every body is celebrated and supported on their unique path.",
  },
  {
    icon: <Sparkles className="text-teal" />,
    title: "Holistic Transformation",
    description: "Beyond physical poses, we focus on mental clarity, emotional balance, and spiritual growth.",
  },
];

export default function About() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
        },
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        },
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      const valueItems = gsap.utils.toArray<HTMLElement>(".value-item");
      valueItems.forEach((item, index) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
            once: true,
          },
          y: 24,
          autoAlpha: 0,
          duration: 0.7,
          delay: index * 0.08,
          ease: "power2.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-stone-50 to-amber-100/30 py-24">
      {/* Artsy decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Golden mandala-inspired circles */}
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full border border-amber-300/20" />
        <div className="absolute -left-10 -top-10 h-96 w-96 rounded-full border-2 border-dashed border-amber-400/10" />
        <div className="absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full border border-amber-300/20" />
        <div className="absolute -bottom-20 -right-20 h-[400px] w-[400px] rounded-full border-2 border-dotted border-amber-400/10" />

        {/* Hand-drawn lotus petal shapes */}
        <svg className="absolute left-10 top-1/3 w-24 h-24 opacity-10" viewBox="0 0 100 100">
          <path d="M50,20 Q65,50 50,80 Q35,50 50,20Z" fill="#B8860B" />
          <path d="M50,30 Q60,50 50,70 Q40,50 50,30Z" fill="#DAA520" />
        </svg>

        <svg className="absolute right-10 bottom-1/4 w-32 h-32 opacity-10 rotate-45" viewBox="0 0 100 100">
          <path d="M50,15 Q70,50 50,85 Q30,50 50,15Z" fill="#8B6914" />
          <path d="M50,25 Q62,50 50,75 Q38,50 50,25Z" fill="#DAA520" />
        </svg>

        {/* Floating golden particles */}
        <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-[#d6ab66]/30 rounded-full animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-amber-600/20 rounded-full animate-pulse delay-1000" />
        <div className="absolute top-2/3 right-1/3 w-0.5 h-0.5 bg-amber-400/40 rounded-full animate-pulse delay-700" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 xl:px-16 relative z-10">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Image Section */}
          <div ref={imageRef} className="relative group">
            {/* Ornate frame behind image */}
            <div className="absolute -inset-4 bg-gradient-to-br from-amber-600/20 to-amber-800/10 rounded-3xl transform -rotate-2 group-hover:rotate-0 transition-transform duration-700" />
            <div className="absolute -inset-4 bg-gradient-to-tr from-amber-400/10 to-transparent rounded-3xl transform rotate-2 group-hover:rotate-0 transition-transform duration-700" />

            <div className="relative z-10">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl shadow-amber-900/20">
                <img
                  src="https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80&w=1000"
                  alt="Yoga practice"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Golden overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/40 via-amber-900/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Decorative border overlay */}
                <div className="absolute inset-4 border border-amber-400/30 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>

            {/* Quote Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -bottom-10 -right-4 md:-right-10 z-20 w-[320px] md:max-w-xs rounded-2xl bg-white/95 backdrop-blur-sm shadow-xl shadow-amber-900/15  border border-amber-200/50"
            >
              <div className="relative p-4 md:p-8">
                {/* Golden quotation marks */}
                <svg className="absolute top-4 left-4 w-8 h-8 text-amber-400/30" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10,11 L7,11 C7,8.2 9.2,6 12,6 L12,8 C10.3,8 9,9.3 9,11 L10,11 L10,17 L4,17 L4,11 L10,11 Z M20,11 L17,11 C17,8.2 19.2,6 22,6 L22,8 C20.3,8 19,9.3 19,11 L20,11 L20,17 L14,17 L14,11 L20,11 Z" />
                </svg>
                <p className="mb-3 pt-6 font-serif text-lg md:text-xl italic text-stone-700 relative z-10">
                  "Yoga is the journey of the self, through the self, to the self."
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-px w-8 bg-gradient-to-r from-amber-600 to-transparent" />
                  <p className="text-sm text-amber-700 font-medium">- The Bhagavad Gita</p>
                </div>
              </div>
            </motion.div>

            {/* Decorative corner elements */}
            <div className="absolute -left-4 -top-4 w-16 h-16 border-l-2 border-t-2 border-[#d6ab66]/40 rounded-tl-2xl" />
            <div className="absolute -right-4 -bottom-4 w-16 h-16 border-r-2 border-b-2 border-[#d6ab66]/40 rounded-br-2xl" />

            {/* Background blur circles */}
            <div className="absolute -left-6 -top-6 h-32 w-32 rounded-full bg-amber-600/10 blur-3xl animate-pulse" />
            <div className="absolute -right-6 -bottom-6 h-40 w-40 rounded-full bg-[#d6ab66]/5 blur-3xl" />
          </div>

          {/* Text Content Section */}
          <div ref={textRef}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative inline-block mb-6">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-4 inline-block text-sm font-medium tracking-[0.2em] text-amber-700 uppercase relative"
                >
                  <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-px bg-amber-600/50"></span>
                  About Us
                  <span className="absolute -right-6 top-1/2 -translate-y-1/2 w-4 h-px bg-amber-600/50"></span>
                </motion.span>
              </div>

              <h2 className="mb-6 font-serif text-4xl leading-tight md:text-5xl text-stone-800">
                A Sanctuary for{" "}
                <span className="relative inline-block">
                  <span className="text-amber-700 italic">Mindful</span>
                  <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 150 8">
                    <path d="M0,5 Q37.5,1 75,5 T150,5" stroke="#DAA520" fill="none" strokeWidth="1.5" opacity="0.5" />
                  </svg>
                </span>{" "}
                Living and Sacred Practice.
              </h2>

              <div className="relative mb-10 pl-4 border-l-3 border-amber-600/30">
                <p className="text-lg leading-relaxed text-stone-600">
                  At NIKANSHA YOGAAROGYA STUDIO & WELLNESS in Indirapuram, Ghaziabad, we believe that yoga is more than just a workout - it is a way of life. Our studio is designed for beginners, regular practitioners, expecting mothers, and anyone seeking mindful movement, breathwork, meditation, and therapeutic yoga support.
                </p>
              </div>
            </motion.div>

            <div className="space-y-6">
              {values.map((value) => (
                <div key={value.title} className="group value-item flex gap-5 rounded-xl p-4 transition-all duration-300 hover:bg-[#d6ab66]/5 hover:shadow-lg hover:shadow-amber-900/5">
                  <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
                    {/* Golden circle background */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-600/10 to-amber-700/5 transition-all duration-300 group-hover:from-amber-600/20 group-hover:to-amber-700/10" />
                    <div className="absolute inset-0 rounded-full border border-amber-600/20 transition-all duration-300 group-hover:border-amber-600/40" />
                    <div className="relative z-10 text-amber-700 transition-transform duration-300 group-hover:scale-110">
                      {value.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 font-serif text-xl font-bold text-stone-800 transition-colors group-hover:text-amber-800">
                      {value.title}
                    </h3>
                    <p className="leading-relaxed text-stone-600">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative bottom element */}
            <div className="mt-10 flex items-center gap-3">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-600/40" />
              <div className="w-2 h-2 rounded-full bg-[#d6ab66]/30" />
              <div className="w-1 h-1 rounded-full bg-amber-600/20" />
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
