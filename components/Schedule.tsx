"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, User, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const scheduleData = {
  Monday: [
    { time: "06:00 AM - 07:15 AM", class: "Sunrise Vinyasa", instructor: "Aria Sharma", room: "Studio A", level: "Intermediate", color: "border-l-teal" },
    { time: "09:00 AM - 10:15 AM", class: "Hatha Basics", instructor: "Kaelen Voss", room: "Studio B", level: "Beginner", color: "border-l-saffron" },
    { time: "05:30 PM - 06:45 PM", class: "Power Flow", instructor: "Maya Chen", room: "Studio A", level: "Advanced", color: "border-l-lavender" },
    { time: "07:15 PM - 08:30 PM", class: "Yin & Sound Bath", instructor: "Kaelen Voss", room: "Studio B", level: "All Levels", color: "border-l-earth" },
  ],
  Tuesday: [
    { time: "07:00 AM - 08:15 AM", class: "Ashtanga Primary", instructor: "Maya Chen", room: "Studio A", level: "Advanced", color: "border-l-lavender" },
    { time: "10:30 AM - 11:45 AM", class: "Gentle Flow", instructor: "Aria Sharma", room: "Studio B", level: "Beginner", color: "border-l-teal" },
    { time: "06:00 PM - 07:15 PM", class: "Vinyasa II", instructor: "Aria Sharma", room: "Studio A", level: "Intermediate", color: "border-l-teal" },
  ],
  Wednesday: [
    { time: "06:00 AM - 07:15 AM", class: "Sunrise Vinyasa", instructor: "Aria Sharma", room: "Studio A", level: "Intermediate", color: "border-l-teal" },
    { time: "12:00 PM - 01:00 PM", class: "Lunch Hour Flow", instructor: "Kaelen Voss", room: "Studio A", level: "All Levels", color: "border-l-saffron" },
    { time: "05:30 PM - 06:45 PM", class: "Restorative Yoga", instructor: "Kaelen Voss", room: "Studio B", level: "All Levels", color: "border-l-earth" },
  ],
  Thursday: [
    { time: "07:00 AM - 08:15 AM", class: "Morning Meditation", instructor: "Kaelen Voss", room: "Studio B", level: "All Levels", color: "border-l-earth" },
    { time: "09:00 AM - 10:15 AM", class: "Hatha Basics", instructor: "Kaelen Voss", room: "Studio B", level: "Beginner", color: "border-l-saffron" },
    { time: "06:00 PM - 07:30 PM", class: "Advanced Ashtanga", instructor: "Maya Chen", room: "Studio A", level: "Advanced", color: "border-l-lavender" },
  ],
  Friday: [
    { time: "06:00 AM - 07:15 AM", class: "Sunrise Vinyasa", instructor: "Aria Sharma", room: "Studio A", level: "Intermediate", color: "border-l-teal" },
    { time: "10:30 AM - 11:45 AM", class: "Flow & Let Go", instructor: "Aria Sharma", room: "Studio A", level: "All Levels", color: "border-l-teal" },
    { time: "05:00 PM - 06:15 PM", class: "Weekend Warmup", instructor: "Maya Chen", room: "Studio A", level: "Intermediate", color: "border-l-saffron" },
  ],
  Saturday: [
    { time: "08:30 AM - 10:00 AM", class: "Community Flow", instructor: "Rotating Teachers", room: "Studio A", level: "All Levels", color: "border-l-earth" },
    { time: "10:30 AM - 12:00 PM", class: "Yoga Philosophy", instructor: "Kaelen Voss", room: "Studio B", level: "All Levels", color: "border-l-saffron" },
  ],
  Sunday: [
    { time: "09:00 AM - 10:30 AM", class: "Soulful Sunday", instructor: "Aria Sharma", room: "Studio A", level: "All Levels", color: "border-l-lavender" },
    { time: "11:00 AM - 12:15 PM", class: "Pranayama", instructor: "Kaelen Voss", room: "Studio B", level: "Intermediate", color: "border-l-teal" },
  ],
};

export default function Schedule() {
  const [activeDay, setActiveDay] = useState("Monday");

  return (
    <section id="schedule" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary font-medium tracking-widest uppercase text-sm mb-4 block"
          >
            Weekly Timetable
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-serif mb-6"
          >
            Find Your <span className="italic">Flow</span> Time.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-lg"
          >
            Our diverse schedule is designed to fit your lifestyle. Choose a class that resonates with your energy today.
          </motion.p>
        </div>

        <Tabs
          value={activeDay}
          className="w-full flex flex-col justify-center items-center"
          onValueChange={setActiveDay}
        >
          <div className="flex flex-col justify-center mb-12 overflow-x-auto pb-4 no-scrollbar">
            <TabsList className="bg-gradient-to-r from-cream to-white p-1 rounded-full h-auto flex flex-row gap-6 border border-earth/10 min-w-max shadow-sm">
              {days.map((day) => (
                <TabsTrigger
                  key={day}
                  value={day}
                  className="rounded-full px-4 md:px-8 py-2 md:py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 text-xs md:text-sm"
                >
                  {day}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {days.map((day) => (
            <TabsContent value={day} key={day} className="mt-0 outline-none w-full">
              <AnimatePresence mode="wait">
                {activeDay === day && (
                  <motion.div
                    key={day}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.35 }}
                    className="w-full max-w-5xl mx-auto"
                  >
                    {/* <div className="mb-6 md:mb-8 text-left">
                      <p className="text-xs uppercase tracking-[0.24em] text-primary/80 font-medium mb-2">
                        {day}
                      </p>
                      <h3 className="text-2xl md:text-3xl font-serif">
                        Classes for {day}
                      </h3>
                    </div> */}

                    <div className="grid grid-cols-1 gap-5">
                      {scheduleData[day as keyof typeof scheduleData].map(
                        (item, idx) => (
                          <motion.div
                            key={`${day}-${idx}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.08 }}
                            className={`bg-gradient-to-r from-cream/70 to-white hover:from-white hover:to-white p-5 md:p-8 rounded-2xl border border-earth/10 border-l-8 ${item.color} shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 md:gap-6 group`}
                          >
                            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 w-full text-left">
                              <div className="flex items-center gap-2 md:gap-3 text-primary font-semibold min-w-[120px] md:min-w-[200px]">
                                <Clock size={16} className="md:w-5 md:h-5" />
                                <span className="text-sm md:text-base lg:text-lg">
                                  {item.time}
                                </span>
                              </div>

                              <div className="flex flex-col">
                                <h3 className="text-xl md:text-2xl font-serif font-bold group-hover:text-primary transition-colors">
                                  {item.class}
                                </h3>
                                <div className="flex flex-wrap items-center justify-start gap-2 md:gap-4 mt-2 text-xs md:text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1.5">
                                    <User
                                      size={12}
                                      className="text-teal md:w-3.5 md:h-3.5"
                                    />
                                    <span>{item.instructor}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <MapPin
                                      size={12}
                                      className="text-saffron md:w-3.5 md:h-3.5"
                                    />
                                    <span>{item.room}</span>
                                  </div>
                                  <span className="px-2.5 py-1 bg-white rounded-full text-[10px] font-bold uppercase tracking-wider border border-earth/10">
                                    {item.level}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <Button className="rounded-full px-5 md:px-8 py-5 md:py-6 bg-secondary hover:bg-secondary/90 text-white text-xs md:text-base shadow-lg shadow-secondary/10 group-hover:scale-105 transition-transform shrink-0">
                              Book Slot
                            </Button>
                          </motion.div>
                        )
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 p-8 bg-cream rounded-3xl border border-earth/10 text-center max-w-3xl mx-auto"
        >
          <h4 className="font-serif text-xl mb-4">New to NIKANSHA YOGAAROGYA?</h4>
          <p className="text-muted-foreground mb-6">
            We recommend arriving 15 minutes early for your first class to get settled and meet your instructor. All equipment is provided.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-teal" />
              <span>Vinyasa</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-saffron" />
              <span>Hatha</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-lavender" />
              <span>Ashtanga</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-earth" />
              <span>Restorative</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
