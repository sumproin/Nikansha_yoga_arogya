"use client";

import { motion } from "motion/react";
import { Award, HeartPulse, Leaf, Sparkles } from "lucide-react";

const specialties = [
  "Hatha Yoga",
  "Vinyasa Yoga",
  "Pranayama",
  "Meditation",
  "Therapeutic Yoga",
  "Nutrition Guidance",
];

export default function Trainers() {
  return (
    <section id="trainers" className="relative overflow-hidden bg-cream py-24">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(215,170,99,0.18),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(75,52,33,0.14),transparent_40%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
         <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-4 inline-block text-sm font-medium tracking-[0.2em] text-amber-700 uppercase relative"
      >
        <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-px bg-amber-600/50"></span>
        Our Trainer
        <span className="absolute -right-6 top-1/2 -translate-y-1/2 w-4 h-px bg-amber-600/50"></span>
      </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-serif"
          >
            Yogacharya <span className="italic">Nikansha</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-6xl rounded-[2.2rem] border border-earth/20 bg-card p-8 shadow-xl md:p-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            <div className="lg:col-span-2">
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden border-4 border-cream shadow-lg">
                <img
                  src="/trainimg.jpeg"
                  alt="Yogacharya Nikansha"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {specialties.map((item) => (
                  <span key={item} className="rounded-full border border-earth/20 bg-background/85 px-3 py-1.5 text-xs font-semibold tracking-wide uppercase">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3">
              <p className="text-primary uppercase tracking-[0.18em] text-sm font-semibold mb-2">Yoga & Wellness Expert</p>
              <h3 className="font-serif text-3xl md:text-4xl font-bold mb-6">A Holistic Path to Strength, Calm, and Balance.</h3>

              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  A certified yoga instructor trained in Rishikesh, Yogacharya Nikansha is devoted to enhancing physical vitality and mental
                  well-being through holistic, mindful practices rooted in authentic yogic traditions.
                </p>
                <p>
                  Holding a Master&apos;s Degree in Yoga, she brings depth of knowledge and a refined, therapeutic approach to every session,
                  combining classical wisdom with modern wellness needs.
                </p>
                <p>
                  She specializes in addressing lifestyle disorders, joint pain, and stress through highly personalized, result-oriented programs.
                </p>
                <p>
                  As a Certified Dietician, Nikansha offers an integrated path to wellness by blending yoga, nutrition, and conscious living,
                  empowering individuals to restore balance and build a sustainable healthy lifestyle.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="rounded-2xl bg-cream p-4 border border-earth/15 flex items-start gap-3">
                  <Award className="text-primary mt-0.5" size={18} />
                  <div>
                    <p className="font-semibold">Professional Training</p>
                    <p className="text-sm text-muted-foreground">Certified in Rishikesh with academic mastery in Yoga.</p>
                  </div>
                </div>
                <div className="rounded-2xl bg-cream p-4 border border-earth/15 flex items-start gap-3">
                  <HeartPulse className="text-secondary mt-0.5" size={18} />
                  <div>
                    <p className="font-semibold">Therapeutic Focus</p>
                    <p className="text-sm text-muted-foreground">Programs for stress relief, joint care, and lifestyle disorders.</p>
                  </div>
                </div>
                <div className="rounded-2xl bg-cream p-4 border border-earth/15 flex items-start gap-3">
                  <Leaf className="text-teal mt-0.5" size={18} />
                  <div>
                    <p className="font-semibold">Mind-Body Integration</p>
                    <p className="text-sm text-muted-foreground">Balances movement, breathwork, meditation, and mindfulness.</p>
                  </div>
                </div>
                <div className="rounded-2xl bg-cream p-4 border border-earth/15 flex items-start gap-3">
                  <Sparkles className="text-saffron mt-0.5" size={18} />
                  <div>
                    <p className="font-semibold">Diet + Yoga Guidance</p>
                    <p className="text-sm text-muted-foreground">A complete approach for long-term wellness and resilience.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
