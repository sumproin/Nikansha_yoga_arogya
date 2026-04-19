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
    image: "https://images.unsplash.com/photo-1545208393-2160281bd89f?auto=format&fit=crop&q=80&w=800",
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
              <Card className="overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm ${item.textColor}`}>
                      {item.level}
                    </span>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl font-serif">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-primary" />
                      <span>{item.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap size={16} className="text-primary" />
                      <span>Intensity: {item.intensity}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="ghost" className={`w-full justify-between group/btn ${item.textColor} hover:${item.color}`}>
                    Book Now
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      →
                    </motion.span>
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
