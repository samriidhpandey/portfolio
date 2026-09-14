"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Terminal, Activity, ShieldCheck, ChevronDown, CheckCircle2, TrendingUp, Globe, Briefcase, Zap, Bot, Star } from "lucide-react";
import { profileData } from "@/data/profile";
import { sound } from "@/lib/audio";
import Link from "next/link";

export default function Hero() {
  const scrollToSection = (id: string) => {
    sound.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between pt-24 sm:pt-32 pb-10 sm:pb-16 px-3.5 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Main Centered High-Impact Presentation */}
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center my-auto z-10 relative">
        
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-1.5 rounded-full border border-orange-500/30 bg-white/95 backdrop-blur-md mb-6 sm:mb-8 shadow-xs max-w-[95vw]"
        >
          <span className="relative flex h-2 sm:h-2.5 w-2 sm:w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-orange-500" />
          </span>
          <span className="text-[11px] sm:text-xs font-mono font-bold tracking-wide text-orange-800 text-center">
            {profileData.availability}
          </span>
        </motion.div>

        {/* Greeting & Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-2 sm:space-y-3 mb-5 sm:mb-6"
        >
          <p className="text-xs sm:text-sm md:text-base font-mono font-bold text-orange-600 tracking-wider">
            FREELANCE DIGITAL PARTNER //
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-zinc-900 leading-[1.15] sm:leading-[1.1]">
            Hi, I’m <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500">{profileData.name}</span>
          </h1>
        </motion.div>

        {/* Role Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-5 sm:mb-6 flex flex-wrap justify-center gap-1.5 sm:gap-2 max-w-xl"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-xl bg-orange-50 border border-orange-200/80 font-mono text-[11px] sm:text-sm text-orange-700 font-bold tracking-wide shadow-xs">
            <Globe className="w-3.5 h-3.5 text-orange-600 shrink-0" />
            <span>Website Development</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-xl bg-amber-50 border border-amber-200/80 font-mono text-[11px] sm:text-sm text-amber-700 font-bold tracking-wide shadow-xs">
            <TrendingUp className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Digital Marketing & SEO</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-xl bg-orange-50/70 border border-orange-200/70 font-mono text-[11px] sm:text-sm text-orange-800 font-bold tracking-wide shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-orange-600 shrink-0" />
            <span>AI & Automation</span>
          </div>
        </motion.div>

        {/* Mission Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-sm sm:text-lg text-zinc-600 max-w-2xl leading-relaxed mb-8 sm:mb-10 font-normal px-2"
        >
          {profileData.tagline}
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-4 mb-10 sm:mb-14 w-full sm:w-auto max-w-md sm:max-w-none"
        >
          <Link
            href="/hire"
            onMouseEnter={() => sound.playHover()}
            className="group flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-[0_4px_20px_rgba(249,115,22,0.35)] hover:shadow-[0_6px_25px_rgba(249,115,22,0.45)] transition-all duration-300 hover:scale-[1.02] cursor-pointer text-center"
          >
            <Briefcase className="w-4 h-4 shrink-0" />
            <span>Hire Me / View Profile & Resume</span>
            <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
          </Link>

          <div className="grid grid-cols-2 gap-2 w-full sm:flex sm:w-auto">
            <button
              onClick={() => scrollToSection("services")}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center justify-center gap-1.5 px-3 sm:px-7 py-3 rounded-xl bg-white hover:bg-orange-50 text-zinc-800 border border-zinc-200 hover:border-orange-300 font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-xs cursor-pointer"
            >
              <span>Explore Services</span>
            </button>

            <button
              onClick={() => scrollToSection("projects")}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center justify-center gap-1.5 px-3 sm:px-5 py-3 rounded-xl text-xs font-mono font-medium text-zinc-600 hover:text-orange-600 bg-white hover:bg-orange-50 border border-zinc-200/80 transition-colors shadow-xs cursor-pointer"
            >
              <span>View Client Work</span>
            </button>
          </div>
        </motion.div>

        {/* Real-time System / Freelance Telemetry Ribbon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-3 gap-2 sm:gap-4 pt-6 sm:pt-8 border-t border-zinc-200/80 w-full max-w-2xl font-mono"
        >
          <div className="flex flex-col items-center bg-white/95 backdrop-blur-md p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-zinc-200/80 shadow-xs text-center">
            <span className="text-[9px] sm:text-[11px] text-zinc-500 uppercase tracking-wider flex items-center justify-center gap-1 font-semibold">
              <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange-500 shrink-0" />
              <span className="truncate">Delivered</span>
            </span>
            <span className="text-xs sm:text-lg font-black text-zinc-900 mt-0.5 sm:mt-1">
              28+ Worldwide
            </span>
          </div>

          <div className="flex flex-col items-center bg-white/95 backdrop-blur-md p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-zinc-200/80 shadow-xs text-center">
            <span className="text-[9px] sm:text-[11px] text-zinc-500 uppercase tracking-wider flex items-center justify-center gap-1 font-semibold">
              <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange-500 shrink-0" />
              <span className="truncate">Client Surge</span>
            </span>
            <span className="text-xs sm:text-base font-bold text-orange-600 mt-0.5 sm:mt-1">
              350% Avg
            </span>
          </div>

          <div className="flex flex-col items-center bg-white/95 backdrop-blur-md p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-zinc-200/80 shadow-xs text-center">
            <span className="text-[9px] sm:text-[11px] text-zinc-500 uppercase tracking-wider flex items-center justify-center gap-1 font-semibold">
              <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500 shrink-0" />
              <span className="truncate">Satisfaction</span>
            </span>
            <span className="text-xs sm:text-lg font-black text-zinc-900 mt-0.5 sm:mt-1">
              99% Rating
            </span>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="mx-auto flex flex-col items-center gap-1.5 text-zinc-400 hover:text-orange-600 transition-colors cursor-pointer pt-8 z-10"
        onClick={() => scrollToSection("services")}
      >
        <span className="text-[10px] font-mono font-semibold tracking-widest uppercase">EXPLORE FREELANCE SERVICES</span>
        <ChevronDown className="w-4 h-4 text-orange-500 animate-bounce" />
      </motion.div>
    </section>
  );
}
