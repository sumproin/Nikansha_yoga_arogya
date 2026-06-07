"use client";

import { motion } from "motion/react";
import { Clock } from "lucide-react";

type ServiceClass = {
  title: string;
  level: string;
  duration: string;
  focus: string;
  description: string;
  image: string;
  color: string;
  textColor: string;
};

const classes: ServiceClass[] = [
  {
    title: "Hatha Yoga",
    level: "All Levels",
    duration: "60 min",
    focus: "Foundations, posture alignment & breathwork",
    description: "Ideal for beginners searching for online Hatha Yoga classes or yoga classes in Ghaziabad to build balance, flexibility, and mindful breathing habits.",
    image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=1200&q=80",
    color: "bg-primary/12",
    textColor: "text-primary",
  },
  {
    title: "Vinyasa Flow",
    level: "All Levels",
    duration: "60 min",
    focus: "Breath-linked dynamic flow",
    description: "A rhythmic online Vinyasa Yoga class style that improves stamina and focus while keeping the practice energetic and uplifting.",
    image: "https://images.unsplash.com/photo-1695795634692-567cec15ad95?auto=format&fit=crop&w=1200&q=80",
    color: "bg-teal/15",
    textColor: "text-teal",
  },
  {
    title: "Meditation",
    level: "Beginner Friendly",
    duration: "60 min",
    focus: "Mindfulness, pranayama & inner calm",
    description: "Gentle meditation and pranayama classes designed to reduce stress, support anxiety relief, improve mental clarity, and create emotional stability.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    color: "bg-earth/15",
    textColor: "text-earth",
  },
  {
    title: "Garbh Sanskar & Prenatal Yoga",
    level: "Prenatal",
    duration: "60 min",
    focus: "Mother wellness & conscious bonding",
    description: "Supportive prenatal yoga and Garbh Sanskar classes online and in Ghaziabad that nurture physical comfort, breath awareness, and mother-baby connection.",
    image: "https://images.unsplash.com/photo-1710897872810-363b7a8d3f95?auto=format&fit=crop&w=1200&q=80",
    color: "bg-lavender/14",
    textColor: "text-lavender",
  },
  {
    title: "Postnatal Yoga",
    level: "Postpartum",
    duration: "60 min",
    focus: "Recovery, strength & flexibility",
    description: "Postnatal yoga classes to rebuild core stability, posture, and mobility with mindful movements tailored for postpartum recovery.",
    image: "https://images.unsplash.com/photo-1570657891791-e39a9d185540?auto=format&fit=crop&w=1200&q=80",
    color: "bg-saffron/15",
    textColor: "text-saffron",
  },
  {
    title: "Face Yoga",
    level: "All Levels",
    duration: "60 min",
    focus: "Facial toning & stress release",
    description: "Face yoga classes online and in studio with targeted exercises and relaxation techniques that soften tension and support natural facial vitality.",
    image: "https://houseofbeautyindia.com/cdn/shop/articles/ee9553c8f0b75a926f3ed89c08e520cb_30f29412-9a3d-445a-9109-18afbdbb5e5f.jpg?v=1755859052&width=800",
    color: "bg-primary/10",
    textColor: "text-primary",
  },
  {
    title: "Therapeutic Yoga",
    level: "Personalized",
    duration: "60 min",
    focus: "Pain care, back support & lifestyle balance",
    description: "Therapeutic yoga for back pain, chronic pain relief, mobility improvement, and long-term wellness support through customized sessions.",
    image: "https://images.unsplash.com/photo-1593811167565-4672e6c8ce4c?auto=format&fit=crop&w=1200&q=80",
    color: "bg-earth/12",
    textColor: "text-earth",
  },
];

function handleJoinClass(className: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("prefill-classes", { detail: { classes: [className] } }));
  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Classes() {
  return (
    <section id="classes" className="bg-gradient-to-br from-amber-50 via-stone-50 to-amber-100/30 py-24 relative overflow-hidden">
      {/* Artsy decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-300/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-200/5 rounded-full blur-3xl" />



      <svg className="absolute bottom-20 left-10 w-40 h-40 opacity-20 rotate-45" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="30" stroke="#8B6914" fill="none" strokeWidth="1.5" strokeDasharray="4 6" />
        <circle cx="50" cy="50" r="20" stroke="#DAA520" fill="none" strokeWidth="1" strokeDasharray="3 5" />
      </svg>

      <div className="container mx-auto px-6  relative z-10">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-block text-sm font-medium tracking-[0.2em] text-amber-700 uppercase relative"
          >
            <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-px bg-amber-600/50"></span>
            Our Services
            <span className="absolute -right-6 top-1/2 -translate-y-1/2 w-4 h-px bg-amber-600/50"></span>
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-6 font-serif text-4xl md:text-5xl text-stone-800"
          >
            Classes Crafted for Your{" "}
            <span className="relative inline-block">
              <span className="italic text-amber-700">Wellness Journey</span>
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 10">
                <path d="M0,8 Q50,2 100,8 T200,8" stroke="#DAA520" fill="none" strokeWidth="1.5" opacity="0.4" />
              </svg>
            </span>
            .
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-lg text-stone-600 max-w-2xl mx-auto"
          >
            Explore yoga classes in Ghaziabad and online wellness sessions at Nikansha Yogaarogya, from foundational yoga and meditation to therapeutic, prenatal, postnatal, and face yoga support.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {classes.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="relative h-full rounded-2xl bg-white/80 backdrop-blur-sm border border-amber-200/50 shadow-lg shadow-amber-900/5 transition-all duration-500 overflow-hidden hover:shadow-xl hover:shadow-amber-900/10">

                {/* Golden corner accents */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#d6ab66]/30 rounded-tl-2xl z-10" />
                <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#d6ab66]/30 rounded-tr-2xl z-10" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#d6ab66]/30 rounded-bl-2xl z-10" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#d6ab66]/30 rounded-br-2xl z-10" />

                {/* Golden gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#d6ab66]/0 via-[#d6ab66]/0 to-[#d6ab66]/0 group-hover:from-[#d6ab66]/5 group-hover:via-[#d6ab66]/5 group-hover:to-[#d6ab66]/10 transition-all duration-500 z-0" />

                <button
                  type="button"
                  onClick={() => handleJoinClass(item.title)}
                  className="absolute inset-0 z-[5] cursor-pointer"
                  aria-label={`Join ${item.title} class`}
                />

                <div className="relative overflow-hidden">
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-amber-100 to-stone-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                    />
                    {/* Golden shimmer overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Artsy frame overlay */}
                    <div className="absolute inset-4 border border-amber-400/30 rounded-lg pointer-events-none" />
                  </div>

                  <div className="absolute top-4 right-4 z-20">
                    <span className={`relative px-3 py-1.5 text-xs font-semibold tracking-wide uppercase bg-white/95 backdrop-blur-sm rounded-full shadow-lg ${item.textColor} border border-amber-200/50`}>
                      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#d6ab66]/20 to-amber-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.level}
                    </span>
                  </div>
                </div>

                <div className="p-6 relative z-10">
                  <div className="mb-4 flex items-center gap-2">
                    <div className={`h-px w-8 bg-gradient-to-r ${item.color} to-transparent`} />
                    <div className={`w-1.5 h-1.5 rounded-full ${item.color.replace('bg-', 'bg-')}`} />
                  </div>

                  <h3 className="text-xl font-serif font-semibold text-stone-800 mb-3 group-hover:text-amber-800 transition-colors">
                    {item.title}
                  </h3>

                  <div className="mb-4 flex gap-4 text-sm text-stone-500">
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-amber-600" />
                      <span>{item.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1 h-1 rounded-full bg-stone-300" />
                      <span className="text-amber-600/80">Service Class</span>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-stone-600 mb-6">{item.focus}</p>

                  <div className="rounded-2xl border border-amber-200/60 bg-amber-50/60 px-4 py-3">
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-700/90">Why choose this class</p>
                    <p className="text-sm leading-relaxed text-stone-700/90">{item.description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleJoinClass(item.title)}
                    className="relative z-20 mt-4 inline-flex w-full items-center justify-center rounded-full border border-[#d6ab66]/40 bg-[#d6ab66] px-4 py-2.5 text-sm font-semibold text-amber-950 transition-colors hover:bg-amber-400"
                  >
                    Join This Class
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative bottom element */}
        <div className="flex justify-center mt-16">
          <div className="flex items-center gap-3">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-400" />
            <div className="w-2 h-2 rounded-full bg-[#d6ab66]/50" />
            <div className="w-2 h-2 rounded-full bg-amber-600/30" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-400" />
          </div>
        </div>
      </div>
    </section>
  );
}
