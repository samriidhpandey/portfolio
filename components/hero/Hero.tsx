"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Terminal, Activity, ShieldCheck, ChevronDown, CheckCircle2, TrendingUp, Globe, Briefcase, Zap, Bot, Star } from "lucide-react";
import { profileData } from "@/data/profile";
import { sound } from "@/lib/audio";
import CreativeGlowBackground from "./CreativeGlowBackground";
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
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Creative Dynamic Glowing Background with Floating Particles, Sine Waves & Ambient Orbs */}
      <CreativeGlowBackground />

      {/* Main Centered High-Impact Presentation */}
      <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center my-auto z-10 relative">
        
        {/* Floating Creative Micro-Card 1 (Top Left - Web Development) */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="hidden xl:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-orange-500/30 shadow-[0_10px_30px_rgba(249,115,22,0.12)] absolute -top-4 -left-12 z-20 pointer-events-none hover:scale-105 transition-transform"
        >
          <div className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 shadow-xs">
            <Zap className="w-4 h-4" />
          </div>
          <div className="text-left font-mono">
            <span className="text-[10px] text-zinc-400 block font-bold uppercase">PAGE SPEED</span>
            <span className="text-xs font-black text-zinc-900">100/100 // Next.js</span>
          </div>
        </motion.div>

        {/* Floating Creative Micro-Card 2 (Top Right - Marketing & ROI) */}
        <motion.div
          animate={{ y: [0, 14, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="hidden xl:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-orange-500/30 shadow-[0_10px_30px_rgba(249,115,22,0.12)] absolute -top-4 -right-12 z-20 pointer-events-none hover:scale-105 transition-transform"
        >
          <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-xs">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div className="text-left font-mono">
            <span className="text-[10px] text-zinc-400 block font-bold uppercase">MARKETING ROAS</span>
            <span className="text-xs font-black text-orange-600">+350% Client Growth</span>
          </div>
        </motion.div>

        {/* Floating Creative Micro-Card 3 (Mid Left - AI Automation) */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="hidden lg:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/90 backdrop-blur-md border border-orange-200 shadow-[0_8px_20px_rgba(0,0,0,0.06)] absolute top-1/2 -left-20 z-20 pointer-events-none"
        >
          <div className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
          <span className="text-xs font-mono font-bold text-zinc-800 flex items-center gap-1.5">
            <Bot className="w-3.5 h-3.5 text-orange-600" />
            24/7 AI Smart Bot
          </span>
        </motion.div>

        {/* Floating Creative Micro-Card 4 (Mid Right - Client Trust) */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="hidden lg:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/90 backdrop-blur-md border border-orange-200 shadow-[0_8px_20px_rgba(0,0,0,0.06)] absolute top-1/2 -right-20 z-20 pointer-events-none"
        >
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span className="text-xs font-mono font-bold text-zinc-800">
            28+ Delivered Projects
          </span>
        </motion.div>

        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-orange-500/35 bg-white/95 backdrop-blur-md mb-8 shadow-sm"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500" />
          </span>
          <span className="text-xs font-mono font-bold tracking-wide text-orange-800">
            {profileData.availability}
          </span>
        </motion.div>

        {/* Greeting & Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-3 mb-6"
        >
          <p className="text-sm sm:text-base font-mono font-bold text-orange-600 tracking-wider">
            FREELANCE DIGITAL PARTNER //
          </p>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-zinc-900 leading-[1.1]">
            Hi, I’m <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500">{profileData.name}</span>
          </h1>
        </motion.div>

        {/* Role Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6 flex flex-wrap justify-center gap-2"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-orange-50 border border-orange-200/80 font-mono text-xs sm:text-base text-orange-700 font-bold tracking-wide shadow-xs">
            <Globe className="w-4 h-4 text-orange-600" />
            Website Development
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-amber-50 border border-amber-200/80 font-mono text-xs sm:text-base text-amber-700 font-bold tracking-wide shadow-xs">
            <TrendingUp className="w-4 h-4 text-amber-600" />
            Digital Marketing & SEO
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-orange-50/70 border border-orange-200/70 font-mono text-xs sm:text-base text-orange-800 font-bold tracking-wide shadow-xs">
            <Sparkles className="w-4 h-4 text-orange-600" />
            AI & Automation
          </div>
        </motion.div>

        {/* Mission Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base sm:text-xl text-zinc-600 max-w-2xl leading-relaxed mb-10 font-normal"
        >
          {profileData.tagline}
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14 w-full sm:w-auto"
        >
          <Link
            href="/hire"
            onMouseEnter={() => sound.playHover()}
            className="group flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 text-white font-bold text-sm tracking-wide shadow-[0_4px_20px_rgba(249,115,22,0.35)] hover:shadow-[0_6px_25px_rgba(249,115,22,0.45)] transition-all duration-300 hover:scale-[1.03] cursor-pointer"
          >
            <Briefcase className="w-4 h-4" />
            <span>Hire Me / View Profile & Resume</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <button
            onClick={() => scrollToSection("services")}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-orange-50 text-zinc-800 border border-zinc-200 hover:border-orange-300 font-semibold text-sm tracking-wide transition-all duration-300 shadow-sm cursor-pointer"
          >
            <span>Explore Services</span>
          </button>

          <button
            onClick={() => scrollToSection("projects")}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl text-xs font-mono font-medium text-zinc-600 hover:text-orange-600 bg-white hover:bg-orange-50 border border-zinc-200/80 transition-colors shadow-sm cursor-pointer"
          >
            <span>View Client Work</span>
          </button>
        </motion.div>

        {/* Real-time System / Freelance Telemetry Ribbon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-zinc-200/80 w-full max-w-2xl font-mono"
        >
          <div className="flex flex-col items-center bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-zinc-200/80 shadow-xs">
            <span className="text-[11px] text-zinc-500 uppercase tracking-wider flex items-center gap-1.5 font-semibold">
              <Globe className="w-3.5 h-3.5 text-orange-500" /> Projects Delivered
            </span>
            <span className="text-base sm:text-lg font-black text-zinc-900 mt-1">
              28+ Worldwide
            </span>
          </div>

          <div className="flex flex-col items-center bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-zinc-200/80 shadow-xs">
            <span className="text-[11px] text-zinc-500 uppercase tracking-wider flex items-center gap-1.5 font-semibold">
              <TrendingUp className="w-3.5 h-3.5 text-orange-500" /> Client Surge
            </span>
            <span className="text-sm sm:text-base font-bold text-orange-600 mt-1">
              350% Avg Growth
            </span>
          </div>

          <div className="flex flex-col items-center bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-zinc-200/80 shadow-xs">
            <span className="text-[11px] text-zinc-500 uppercase tracking-wider flex items-center gap-1.5 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" /> Client Rating
            </span>
            <span className="text-base sm:text-lg font-black text-zinc-900 mt-1">
              99% Satisfaction
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
