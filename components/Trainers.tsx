"use client";

import { motion } from "motion/react";
import { Instagram, Twitter, Linkedin } from "lucide-react";

const trainers = [
  {
    name: "Aria Sharma",
    role: "Lead Vinyasa Instructor",
    bio: "With over 10 years of experience in India and Bali, Aria brings a soulful, flowing energy to every class.",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=800",
    color: "bg-saffron/20",
  },
  {
    name: "Kaelen Voss",
    role: "Hatha & Meditation Specialist",
    bio: "Kaelen focuses on the therapeutic aspects of yoga, helping students find stillness in a busy world.",
    image: "https://images.unsplash.com/photo-1552196564-97c84b138723?auto=format&fit=crop&q=80&w=800",
    color: "bg-teal/20",
  },
  {
    name: "Maya Chen",
    role: "Ashtanga Master",
    bio: "Maya's classes are dynamic and challenging, designed to build heat, strength, and unwavering focus.",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=800",
    color: "bg-lavender/20",
  },
];

export default function Trainers() {
  return (
    <section id="trainers" className="py-24 bg-cream relative overflow-hidden">
      {/* Decorative Lotus Pattern */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03] pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-primary">
          <path d="M50 0C50 0 60 30 90 30C90 30 60 40 50 70C50 70 40 40 10 40C10 40 40 30 50 0ZM50 100C50 100 40 70 10 70C10 70 40 60 50 30C50 30 60 60 90 60C90 60 60 70 50 100Z" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-primary font-medium tracking-widest uppercase text-sm mb-4 block"
            >
              Meet Our Guides
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-serif"
            >
              Guided by <span className="italic">Wisdom</span>, <br />
              Inspired by Passion.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground max-w-sm text-right"
          >
            Our instructors are more than just teachers—they are dedicated practitioners committed to your growth.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {trainers.map((trainer, index) => (
            <motion.div
              key={trainer.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="group"
            >
              <div className="relative mb-8">
                <div className={`absolute inset-0 ${trainer.color} rounded-full scale-90 group-hover:scale-100 transition-transform duration-500 blur-2xl opacity-50`} />
                <div className="relative z-10 aspect-square rounded-full overflow-hidden border-8 border-white shadow-2xl">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Social Links */}
                <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0">
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-colors">
                    <Instagram size={18} />
                  </button>
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-colors">
                    <Twitter size={18} />
                  </button>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-serif font-bold mb-2">{trainer.name}</h3>
                <p className="text-primary font-medium text-sm uppercase tracking-wider mb-4">{trainer.role}</p>
                <p className="text-muted-foreground leading-relaxed italic">"{trainer.bio}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
