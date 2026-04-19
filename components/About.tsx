"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Leaf, Heart, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: <Leaf className="text-teal" />,
    title: "Rooted in Tradition",
    description: "We honor the ancient lineages of yoga while making them accessible for modern life.",
  },
  {
    icon: <Heart className="text-saffron" />,
    title: "Compassionate Community",
    description: "A welcoming space where every body is celebrated and supported on their unique path.",
  },
  {
    icon: <Sparkles className="text-lavender" />,
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

      gsap.from(".value-item", {
        scrollTrigger: {
          trigger: ".value-item",
          start: "top 90%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-cream relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-5 pointer-events-none -translate-x-1/2 -translate-y-1/2">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-saffron">
          <circle cx="50" cy="50" r="40" />
        </svg>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div ref={imageRef} className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80&w=1000"
                alt="Yoga practice"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -bottom-10 -right-10 z-20 bg-white p-8 rounded-2xl shadow-xl max-w-xs hidden md:block border border-earth/10"
            >
              <p className="font-serif text-xl italic text-teal mb-2">"Yoga is the journey of the self, through the self, to the self."</p>
              <p className="text-sm text-muted-foreground">— The Bhagavad Gita</p>
            </motion.div>
            {/* Decorative Element */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          </div>

          {/* Text Side */}
          <div ref={textRef}>
            <span className="text-primary font-medium tracking-widest uppercase text-sm mb-4 block">Our Philosophy</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
              A Sanctuary for <span className="text-teal">Mindful</span> Living and Sacred Practice.
            </h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              At NIKANSHA YOGAAROGYA STUDIO & WELLNESS, we believe that yoga is more than just a workout—it's a way of life. Our studio is designed to be a retreat from the chaos of the world, a place where you can reconnect with your breath and rediscover your inner strength.
            </p>

            <div className="space-y-8">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="flex gap-6 value-item"
                >
                  <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center shrink-0">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
