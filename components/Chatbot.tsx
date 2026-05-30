"use client";

import { useEffect, useMemo, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { api, type ScheduleEntry } from "@/lib/api";

type ChatMessage = {
  role: "user" | "bot";
  text: string;
};

const dayNames = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const;

function formatDay(day: string): string {
  return day.charAt(0).toUpperCase() + day.slice(1);
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [schedule, setSchedule] = useState<ScheduleEntry[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "bot",
      text: "Namaste. I can help with yoga classes, timings, and website details. Ask me about schedule, beginner classes, or our theme.",
    },
  ]);

  const scheduleByDay = useMemo(() => {
    return schedule.reduce<Record<string, ScheduleEntry[]>>((acc, entry) => {
      const key = entry.day.toLowerCase();
      if (!acc[key]) acc[key] = [];
      acc[key].push(entry);
      return acc;
    }, {});
  }, [schedule]);

  useEffect(() => {
    api.getSchedule().then(setSchedule).catch(() => {
      // ignore silent failure for chatbot schedule fetch
    });
  }, []);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  function getBotReply(question: string): string {
    const normalized = question.toLowerCase();
    const askedDay = dayNames.find((day) => normalized.includes(day));

    if (askedDay) {
      const entries = scheduleByDay[askedDay] || [];
      if (entries.length === 0) {
        return `No class is currently listed for ${formatDay(askedDay)}. You can check again after admin updates the timetable.`;
      }
      const details = entries
        .slice(0, 4)
        .map((entry) => `${entry.time}: ${entry.className}`)
        .join(" | ");
      return `Classes on ${formatDay(askedDay)}: ${details}.`;
    }

    if (normalized.includes("time") || normalized.includes("timing") || normalized.includes("schedule")) {
      if (schedule.length === 0) {
        return "The timetable is loading right now. Please check the Schedule section or ask for a specific day.";
      }
      return "You can view full timings in the Schedule section. Ask me for a specific day like Monday or Friday.";
    }

    if (normalized.includes("beginner") || normalized.includes("new to yoga")) {
      return "For beginners, Hatha Yoga and Meditation are great starting options. You can gradually move to Vinyasa Flow as your confidence builds.";
    }

    if (normalized.includes("vinyasa") || normalized.includes("hatha") || normalized.includes("ashtanga")) {
      return "We offer Hatha, Vinyasa, Ashtanga, Meditation, and therapeutic styles. Tell me your goal and I can suggest a class type.";
    }

    if (normalized.includes("theme") || normalized.includes("design") || normalized.includes("color")) {
      return "The website theme uses a rich brown-and-gold palette with warm cream accents to reflect calm, balance, and grounding.";
    }

    if (normalized.includes("trainer") || normalized.includes("nikansha")) {
      return "The lead trainer is Yogacharya Nikansha, a certified yoga and wellness expert with a therapeutic and personalized approach.";
    }

    return "I can help with class timings, yoga class types, trainer details, and website theme info. Try asking: 'Monday timings' or 'Which class is best for beginners?'";
  }

  function sendMessage() {
    const text = input.trim();
    if (!text) return;

    const userMessage: ChatMessage = { role: "user", text };
    const botMessage: ChatMessage = { role: "bot", text: getBotReply(text) };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-5 right-5 z-[80] rounded-full bg-primary p-4 text-primary-foreground shadow-xl transition-colors hover:bg-primary/90"
        aria-label="Toggle chatbot"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {open ? (
        <>
        <button
          type="button"
          className="fixed inset-0 z-[79] cursor-default bg-black/20 backdrop-blur-[1px]"
          aria-label="Close chatbot"
          onClick={() => setOpen(false)}
        />
        <section
          className="fixed bottom-24 right-5 z-[80] w-[92vw] max-w-[380px] overflow-hidden rounded-2xl border border-earth/20 bg-card shadow-2xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="yoga-assistant-title"
        >
          <header className="bg-primary px-4 py-3 text-primary-foreground">
            <h3 id="yoga-assistant-title" className="font-semibold">Yoga Assistant</h3>
            <p className="text-xs text-primary-foreground/80">Ask about classes and timings</p>
          </header>

          <div className="h-[320px] overflow-y-auto px-3 py-3 bg-cream/50">
            <div className="space-y-3">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`max-w-[88%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                    message.role === "user" ? "ml-auto bg-secondary text-secondary-foreground" : "border border-earth/20 bg-background text-foreground"
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 border-t border-earth/20 bg-card p-3">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Ask a question..."
              className="flex-1 h-10 rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />
            <button
              type="button"
              onClick={sendMessage}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
        </section>
        </>
      ) : null}
    </>
  );
}
