"use client";

import { useState, useEffect } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/hero/Hero";
import Services from "@/components/services/Services";
import About from "@/components/about/About";
import TechUniverse from "@/components/skills/TechUniverse";
import Projects from "@/components/projects/Projects";
import AILab from "@/components/ailab/AILab";
import Experience from "@/components/experience/Experience";
import GitHubActivity from "@/components/github/GitHubActivity";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";

import AmbientBackground from "@/components/AmbientBackground";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#FAFAFB] text-zinc-900 selection:bg-orange-500/20 selection:text-orange-700">
        {/* Cinematic System Boot Sequence */}
        {!loaded && <Loader onComplete={() => setLoaded(true)} />}

        {/* Dynamic Animated Ambient Glows & Floating Particles */}
        <AmbientBackground />

        {/* Ambient Subtle Grid Overlay */}
        <div className="fixed inset-0 friendly-grid opacity-25 pointer-events-none -z-20" />

        {/* Floating Minimal Glass Navbar */}
        <Navbar />

        {/* Main Content Sections */}
        <main className={`transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}>
          <Hero />
          <Services />
          <About />
          <TechUniverse />
          <Projects />
          <AILab />
          <Experience />
          <GitHubActivity />
          <Contact />
        </main>

        {/* Cinematic Footer */}
        <Footer />
      </div>
    </SmoothScroll>
  );
}
