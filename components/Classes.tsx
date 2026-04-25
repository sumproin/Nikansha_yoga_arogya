"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Zap } from "lucide-react";

const classes = [
  {
    title: "Vinyasa Flow",
    level: "All Levels",
    duration: "60 min",
    intensity: "Moderate",
    image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&q=80&w=800",
    color: "bg-teal/10",
    textColor: "text-teal",
  },
  {
    title: "Hatha Yoga",
    level: "Beginner Friendly",
    duration: "75 min",
    intensity: "Low",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
    color: "bg-saffron/10",
    textColor: "text-saffron",
  },
  {
    title: "Ashtanga Power",
    level: "Advanced",
    duration: "90 min",
    intensity: "High",
    image: "data:image/jpeg;base64,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",
    color: "bg-lavender/10",
    textColor: "text-lavender",
  },
  {
    title: "Yin & Meditation",
    level: "All Levels",
    duration: "60 min",
    intensity: "Very Low",
    image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&q=80&w=800",
    color: "bg-earth/10",
    textColor: "text-earth",
  },
];

export default function Classes() {
  return (
    <section id="classes" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-medium tracking-widest uppercase text-sm mb-4 block"
          >
            Our Offerings
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-serif mb-6"
          >
            Classes Designed for Every <span className="italic">Journey</span>.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-lg"
          >
            Whether you're stepping onto the mat for the first time or deepening a lifelong practice, we have a class that will challenge and inspire you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {classes.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="group"
            >
      <Card className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col rounded-xl">
  <div className="relative h-56 overflow-hidden bg-gray-100">
    <img
      src={item.image}
      alt={item.title}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      referrerPolicy="no-referrer"
    />
    <div className="absolute top-3 right-3">
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.textColor} bg-white/80 backdrop-blur-sm`}>
        {item.level}
      </span>
    </div>
  </div>
  
  <CardHeader className="pb-2 px-5 pt-5">
    <CardTitle className="text-xl font-semibold">{item.title}</CardTitle>
  </CardHeader>
  
  <CardContent className="pb-4 px-5">
    <div className="flex gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-1.5">
        <Clock size={14} />
        <span>{item.duration}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Zap size={14} />
        <span>{item.intensity}</span>
      </div>
    </div>
  </CardContent>
  
  <CardFooter className="pt-0 pb-5 px-5">
    <Button variant="outline" className={`w-full ${item.textColor} border-gray-200 hover:${item.color}`}>
      Book Now {"->"}
    </Button>
  </CardFooter>
</Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Button variant="outline" className="rounded-full px-8 py-6 border-primary text-primary hover:bg-primary hover:text-white transition-all">
            View Full Schedule
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
