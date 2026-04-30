"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Classes from "@/components/Classes";
import Schedule from "@/components/Schedule";
import Trainers from "@/components/Trainers";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  return (
    <div className="relative min-h-screen selection:bg-primary/30 selection:text-primary-foreground">
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Classes />
        <Schedule />
        <Trainers />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}
