"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Sparkles, Zap } from "lucide-react";

type ServiceClass = {
  title: string;
  level: string;
  duration: string;
  focus: string;
  image: string;
  color: string;
  textColor: string;
  buttonClass: string;
};

const classes: ServiceClass[] = [
  {
    title: "Hatha Yoga",
    level: "All Levels",
    duration: "60 min",
    focus: "Foundations & posture alignment",
    image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=1200&q=80",
    color: "bg-primary/12",
    textColor: "text-primary",
    buttonClass: "hover:bg-primary/10 hover:text-primary",
  },
  {
    title: "Vinyasa Flow",
    level: "All Levels",
    duration: "60 min",
    focus: "Breath-linked dynamic flow",
    image: "https://images.unsplash.com/photo-1695795634692-567cec15ad95?auto=format&fit=crop&w=1200&q=80",
    color: "bg-teal/15",
    textColor: "text-teal",
    buttonClass: "hover:bg-teal/12 hover:text-teal",
  },
  {
    title: "Meditation",
    level: "Beginner Friendly",
    duration: "45 min",
    focus: "Mindfulness & inner calm",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    color: "bg-earth/15",
    textColor: "text-earth",
    buttonClass: "hover:bg-earth/12 hover:text-earth",
  },
  {
    title: "Garbh Sanskar & Prenatal Yoga",
    level: "Prenatal",
    duration: "60 min",
    focus: "Mother wellness & conscious bonding",
    image: "https://images.unsplash.com/photo-1710897872810-363b7a8d3f95?auto=format&fit=crop&w=1200&q=80",
    color: "bg-lavender/14",
    textColor: "text-lavender",
    buttonClass: "hover:bg-lavender/12 hover:text-lavender",
  },
  {
    title: "Postnatal Yoga",
    level: "Postpartum",
    duration: "60 min",
    focus: "Recovery, strength & flexibility",
    image: "https://images.unsplash.com/photo-1570657891791-e39a9d185540?auto=format&fit=crop&w=1200&q=80",
    color: "bg-saffron/15",
    textColor: "text-saffron",
    buttonClass: "hover:bg-saffron/12 hover:text-saffron",
  },
  {
    title: "Face Yoga",
    level: "All Levels",
    duration: "40 min",
    focus: "Facial toning & stress release",
    image: "https://images.unsplash.com/photo-1697274715660-cf41497d7e69?auto=format&fit=crop&w=1200&q=80",
    color: "bg-primary/10",
    textColor: "text-primary",
    buttonClass: "hover:bg-primary/10 hover:text-primary",
  },
  {
    title: "Therapeutic Yoga",
    level: "Personalized",
    duration: "60 min",
    focus: "Pain care & lifestyle support",
    image: "https://images.unsplash.com/photo-1593811167565-4672e6c8ce4c?auto=format&fit=crop&w=1200&q=80",
    color: "bg-earth/12",
    textColor: "text-earth",
    buttonClass: "hover:bg-earth/12 hover:text-earth",
  },
];

export default function Classes() {
  return (
   <section id="classes" className="bg-gradient-to-br from-amber-50 via-stone-50 to-amber-100/30 py-24 relative overflow-hidden">
  {/* Artsy decorative elements */}
  <div className="absolute top-0 left-0 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl" />
  <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-300/10 rounded-full blur-3xl" />
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-200/5 rounded-full blur-3xl" />
  
 
  
  <svg className="absolute bottom-20 left-10 w-40 h-40 opacity-20 rotate-45" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="30" stroke="#8B6914" fill="none" strokeWidth="1.5" strokeDasharray="4 6"/>
    <circle cx="50" cy="50" r="20" stroke="#DAA520" fill="none" strokeWidth="1" strokeDasharray="3 5"/>
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
            <path d="M0,8 Q50,2 100,8 T200,8" stroke="#DAA520" fill="none" strokeWidth="1.5" opacity="0.4"/>
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
        Explore all the core services offered at Nikansha Yogaarogya, from foundational yoga to therapeutic and prenatal support.
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
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-amber-500/30 rounded-tl-2xl z-10" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-amber-500/30 rounded-tr-2xl z-10" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-amber-500/30 rounded-bl-2xl z-10" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-amber-500/30 rounded-br-2xl z-10" />
            
            {/* Golden gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:via-amber-500/5 group-hover:to-amber-500/10 transition-all duration-500 z-0" />
            
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
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
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
              
              <button className={`relative w-full group/btn overflow-hidden rounded-full border-2 ${item.textColor} ${item.buttonClass} bg-transparent px-6 py-2.5 text-sm font-semibold transition-all duration-300 hover:shadow-lg`}>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Sparkles size={16} className="group-hover/btn:rotate-12 transition-transform" />
                  Join This Class
                </span>
                <div className={`absolute inset-0 ${item.color.replace('bg-', 'bg-')} opacity-0 group-hover/btn:opacity-10 transition-opacity duration-300`} />
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
        <div className="w-2 h-2 rounded-full bg-amber-500/50" />
        <div className="w-2 h-2 rounded-full bg-amber-600/30" />
        <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-400" />
      </div>
    </div>
  </div>
</section>
  );
}
