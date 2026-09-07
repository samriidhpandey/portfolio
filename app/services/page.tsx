"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import ServiceDeepDive from "@/components/services/ServiceDeepDive";
import ToolStackMatrix from "@/components/services/ToolStackMatrix";
import ProjectEstimator from "@/components/services/ProjectEstimator";
import ServicesFaqAndProcess from "@/components/services/ServicesFaqAndProcess";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";
import { ArrowRight, Sparkles, Layers, Wrench, Calculator, HelpCircle, ShieldCheck, Zap, Globe, TrendingUp, Bot, CheckCircle2 } from "lucide-react";
import { sound } from "@/lib/audio";
import Link from "next/link";

export default function ServicesPage() {
  const scrollToAnchor = (id: string) => {
    sound.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <SmoothScroll>
      <div className="relative min-h-screen text-zinc-900 selection:bg-orange-500/20 selection:text-orange-700">
        
        {/* Persistent Smart Navbar */}
        <Navbar />

        {/* Main Content Area */}
        <main className="pt-28 sm:pt-32 pb-16">
          
          {/* Services Hero Section */}
          <section className="relative px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center pt-8 pb-16">
            
            {/* Floating Live Badge 1 */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="hidden lg:flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/95 border border-orange-500/30 shadow-md absolute top-12 left-0 pointer-events-none font-mono text-xs"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
              <span className="font-bold text-zinc-900">Next.js 15 & React 19 Stack</span>
            </motion.div>

            {/* Floating Live Badge 2 */}
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="hidden lg:flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/95 border border-amber-500/30 shadow-md absolute top-12 right-0 pointer-events-none font-mono text-xs"
            >
              <TrendingUp className="w-4 h-4 text-amber-600" />
              <span className="font-bold text-zinc-900">Ahrefs & Meta Ads Driven</span>
            </motion.div>

            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-white/95 backdrop-blur-md mb-6 shadow-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500" />
              </span>
              <span className="text-xs font-mono font-bold text-orange-800 uppercase tracking-wide">
                FREELANCE CLIENT PORTAL & SERVICES
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-zinc-900 leading-[1.1] mb-6">
              Complete Services & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500">
                Production Tool Stack
              </span>
            </h1>

            {/* Explanatory Subtitle */}
            <p className="text-base sm:text-xl text-zinc-600 max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
              Hum kya, kaise, aur kis tool pe kaam karte hain — yaha aapko har service ki complete detailing milegi: frontend, backend, performance SEO, digital marketing funnels, aur custom AI automation pipelines.
            </p>

            {/* Anchor Navigation Jump Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
              <button
                onClick={() => scrollToAnchor("catalog")}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-orange-50 border border-zinc-200 hover:border-orange-300 text-xs font-semibold text-zinc-700 shadow-xs transition-colors cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5 text-orange-600" />
                <span>Services Detailing</span>
              </button>

              <button
                onClick={() => scrollToAnchor("tools")}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-orange-50 border border-zinc-200 hover:border-orange-300 text-xs font-semibold text-zinc-700 shadow-xs transition-colors cursor-pointer"
              >
                <Wrench className="w-3.5 h-3.5 text-orange-600" />
                <span>Tool Stack (20+ Tools)</span>
              </button>

              <button
                onClick={() => scrollToAnchor("estimator")}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 border border-orange-300 text-xs font-bold text-orange-800 shadow-xs transition-colors cursor-pointer"
              >
                <Calculator className="w-3.5 h-3.5 text-orange-600" />
                <span>Scope Estimator</span>
              </button>

              <button
                onClick={() => scrollToAnchor("process")}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-orange-50 border border-zinc-200 hover:border-orange-300 text-xs font-semibold text-zinc-700 shadow-xs transition-colors cursor-pointer"
              >
                <span>4-Phase Process</span>
              </button>

              <button
                onClick={() => scrollToAnchor("faqs")}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-orange-50 border border-zinc-200 hover:border-orange-300 text-xs font-semibold text-zinc-700 shadow-xs transition-colors cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-orange-600" />
                <span>Client FAQs</span>
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto p-4 sm:p-6 rounded-3xl bg-white border border-zinc-200/80 shadow-sm text-left">
              <div className="p-3 border-r border-zinc-100 last:border-0">
                <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase block">SPEED GUARANTEE</span>
                <span className="text-base sm:text-lg font-black text-zinc-900 mt-1 block">95+ PageSpeed</span>
                <span className="text-[11px] text-orange-600 font-medium">Sub-Second Load Time</span>
              </div>
              <div className="p-3 border-r border-zinc-100 last:border-0">
                <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase block">AVERAGE ROAS</span>
                <span className="text-base sm:text-lg font-black text-zinc-900 mt-1 block">3.5x – 8x Return</span>
                <span className="text-[11px] text-amber-600 font-medium">Google & Meta Ads</span>
              </div>
              <div className="p-3 border-r border-zinc-100 last:border-0">
                <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase block">AI TIME SAVED</span>
                <span className="text-base sm:text-lg font-black text-zinc-900 mt-1 block">15+ Hours/Wk</span>
                <span className="text-[11px] text-orange-600 font-medium">Auto Lead Qualifying</span>
              </div>
              <div className="p-3">
                <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase block">POST-LAUNCH</span>
                <span className="text-base sm:text-lg font-black text-zinc-900 mt-1 block">30 Days Support</span>
                <span className="text-[11px] text-zinc-600 font-medium">100% Free Bug Fixes</span>
              </div>
            </div>

          </section>

          {/* Section 1: In-Depth Service Breakdown (Deliverables, Tools Used & 5-Phase Workflow) */}
          <ServiceDeepDive />

          {/* Section 2: Interactive Tool Stack Matrix */}
          <ToolStackMatrix />

          {/* Section 3: Interactive Scope & Timeline Estimator */}
          <ProjectEstimator />

          {/* Section 4: Collaboration Process & FAQs */}
          <ServicesFaqAndProcess />

          {/* Section 5: Direct Contact Inquiry */}
          <Contact />

        </main>

        {/* Global Footer */}
        <Footer />

      </div>
    </SmoothScroll>
  );
}
