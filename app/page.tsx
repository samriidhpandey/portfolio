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
import Experience from "@/components/experience/Experience";
import GitHubActivity from "@/components/github/GitHubActivity";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen text-zinc-900 selection:bg-orange-500/20 selection:text-orange-700">
        {/* Cinematic System Boot Sequence */}
        {!loaded && <Loader onComplete={() => setLoaded(true)} />}

        {/* Floating Minimal Glass Navbar */}
        <Navbar />

        {/* Main Content Sections */}
        <main className={`transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}>
          <Hero />
          <Services />
          <About />
          <TechUniverse />
          <Projects />
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
