"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, User, MapPin } from "lucide-react";
import { api, type DayName, type ScheduleEntry } from "@/lib/api";

const days: DayName[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function Schedule() {
  const [activeDay, setActiveDay] = useState<DayName>("Monday");
  const [entries, setEntries] = useState<ScheduleEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const groupedEntries = useMemo(() => {
    return days.reduce<Record<DayName, ScheduleEntry[]>>((acc, day) => {
      acc[day] = entries.filter((entry) => entry.day === day);
      return acc;
    }, {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: [],
    });
  }, [entries]);

  async function loadSchedule() {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getSchedule();
      setEntries(data);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : "Failed to load timetable.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSchedule();
  }, []);

  return (
    <section id="schedule" className="relative overflow-hidden bg-background pb-24">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-earth/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto my-16">
          <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-4 inline-block text-sm font-medium tracking-[0.2em] text-amber-700 uppercase relative"
      >
        <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-px bg-amber-600/50"></span>
        Our Schedule
        <span className="absolute -right-6 top-1/2 -translate-y-1/2 w-4 h-px bg-amber-600/50"></span>
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
            Explore the weekly routine and choose your ideal time to practice.
          </motion.p>
        </div>

        {error ? (
          <p className="text-center text-destructive mb-8">{error}</p>
        ) : null}

        <Tabs value={activeDay} className="w-full flex flex-col justify-center items-center" onValueChange={(value) => setActiveDay(value as DayName)}>
          <div className="flex flex-col justify-center mb-12 overflow-x-auto pb-4 no-scrollbar">
            <TabsList className="bg-gradient-to-r from-cream to-card p-1 rounded-full h-auto flex flex-row gap-6 border border-earth/20 min-w-max shadow-sm">
              {days.map((day) => (
                <TabsTrigger
                  key={day}
                  value={day}
                  className="rounded-full px-4 md:px-8 py-2 md:py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-300 text-xs md:text-sm"
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
                    <div className="grid grid-cols-1 gap-5">
                      {loading ? (
                        <div className="text-center text-muted-foreground py-6">Loading timetable...</div>
                      ) : groupedEntries[day].length === 0 ? (
                        <div className="text-center text-muted-foreground py-6">No classes yet for {day}.</div>
                      ) : (
                        groupedEntries[day].map((item, idx) => (
                          <motion.div
                            key={item._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.08 }}
                            className={`bg-gradient-to-r from-cream/75 to-card p-5 md:p-8 rounded-2xl border border-earth/15 border-l-8 ${item.color} shadow-sm transition-all duration-300 hover:shadow-xl hover:from-card hover:to-card flex flex-col md:flex-row items-start md:items-center justify-between gap-5 md:gap-6 group`}
                          >
                            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 w-full text-left">
                              <div className="flex items-center gap-2 md:gap-3 text-primary font-semibold min-w-[120px] md:min-w-[200px]">
                                <Clock size={16} className="md:w-5 md:h-5" />
                                <span className="text-sm md:text-base lg:text-lg">{item.time}</span>
                              </div>

                              <div className="flex flex-col">
                                <h3 className="text-xl md:text-2xl font-serif font-bold group-hover:text-primary transition-colors">
                                  {item.className}
                                </h3>
                                <div className="flex flex-wrap items-center justify-start gap-2 md:gap-4 mt-2 text-xs md:text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1.5">
                                    <User size={12} className="text-earth md:w-3.5 md:h-3.5" />
                                    <span>{item.instructor}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <MapPin size={12} className="text-primary md:w-3.5 md:h-3.5" />
                                    <span>{item.room}</span>
                                  </div>
                                  <span className="px-2.5 py-1 rounded-full bg-background/95 text-[10px] font-bold uppercase tracking-wider border border-primary/15">
                                    {item.level}
                                  </span>
                                </div>
                              </div>
                            </div>

                          </motion.div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>

      </div>
    </section>
  );
}
