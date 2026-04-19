"use client";

import { motion } from "motion/react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    text: "Prana Yoga has completely changed my perspective on wellness. The atmosphere is so calming, and the instructors are truly knowledgeable. I feel more centered than ever.",
    author: "Sarah Jenkins",
    role: "Member since 2022",
  },
  {
    text: "The Vinyasa classes here are like a moving meditation. I love how they blend traditional philosophy with modern movement. It's my favorite part of the week.",
    author: "David Miller",
    role: "Regular Practitioner",
  },
  {
    text: "A beautiful sanctuary in the heart of the city. The attention to detail, from the scent of the studio to the quality of the mats, is exceptional.",
    author: "Elena Rodriguez",
    role: "Yoga Enthusiast",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary font-medium tracking-widest uppercase text-sm mb-4 block"
          >
            Voices of Our Community
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-serif"
          >
            Shared <span className="italic">Experiences</span>.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.author}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="bg-cream p-10 rounded-[2rem] relative group hover:bg-primary/5 transition-colors duration-500"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                <Quote size={20} />
              </div>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed italic">
                "{item.text}"
              </p>
              <div>
                <h4 className="font-serif font-bold text-xl">{item.author}</h4>
                <p className="text-sm text-primary/70 font-medium uppercase tracking-wider">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative Element */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
          className="w-64 h-64 border-2 border-dashed border-primary/20 rounded-full mx-auto mt-20 flex items-center justify-center"
        >
          <div className="w-48 h-48 border border-primary/10 rounded-full flex items-center justify-center">
            <span className="font-serif italic text-primary/40 text-lg">Breathe</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
