"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { sound } from "@/lib/audio";
import Link from "next/link";

export default function Services() {
  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[350px] bg-orange-500/6 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Section Header Container */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-orange-600 font-bold tracking-widest uppercase mb-4 px-4 py-1 rounded-full bg-orange-50 border border-orange-200">
          <Sparkles className="w-3.5 h-3.5 text-orange-500" />
          <span>WHAT I OFFER // FREELANCE & BUSINESS SERVICES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 tracking-tight max-w-3xl">
          Web Development & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500">Digital Marketing</span>
        </h2>
        <p className="text-zinc-600 mt-3 text-sm sm:text-base max-w-2xl font-normal">
          From custom high-speed websites to ROI-driven digital marketing and smart AI automation, explore how we scale businesses end-to-end.
        </p>
      </div>

      {/* Business Growth Transformation Banner (Rounded Card Container without Logo) */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative w-full rounded-3xl overflow-hidden border border-orange-500/25 shadow-2xl group bg-white"
      >
        {/* High-Resolution Graphic without Logo */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[16/8.8] overflow-hidden bg-zinc-50">
          <img
            src="/growth-banner-no-logo.jpg"
            alt="Business Growth Banner - 3D Rocket and Bar Chart Roadmap"
            className="w-full h-full object-cover object-center group-hover:scale-[1.01] transition-transform duration-700 ease-out"
          />

          {/* Interactive Hotspot directly on the 'Let's Grow Your Business' button */}
          <Link
            href="/services"
            onClick={() => sound.playClick()}
            onMouseEnter={() => sound.playHover()}
            className="absolute left-[6%] bottom-[33%] sm:bottom-[34%] w-[38%] sm:w-[32%] h-[15%] sm:h-[16%] max-w-[420px] rounded-2xl bg-transparent hover:bg-orange-500/20 border-2 border-orange-500/0 hover:border-orange-500 transition-all cursor-pointer flex items-center justify-center group/btn shadow-lg z-20"
            title="Let's Grow Your Business - View Full Services Page"
          >
            <span className="sr-only">Let's Grow Your Business - View Full Services Page</span>
            <span className="absolute inset-0 rounded-2xl ring-2 ring-orange-500/50 animate-pulse pointer-events-none" />
          </Link>

          {/* Top Right Services Portal Badge */}
          <div className="absolute top-4 sm:top-6 right-4 sm:right-6 flex items-center gap-2 z-20">
            <Link
              href="/services"
              onClick={() => sound.playClick()}
              onMouseEnter={() => sound.playHover()}
              className="px-4 py-2 rounded-xl bg-white/95 hover:bg-orange-50 backdrop-blur-md border border-orange-500/30 text-zinc-900 hover:text-orange-600 font-bold text-xs font-mono shadow-md transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105"
            >
              <span>Explore Services Page</span>
              <ArrowRight className="w-3.5 h-3.5 text-orange-500" />
            </Link>
          </div>
        </div>

        {/* Bottom Quick-Action Bar */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-orange-50 via-white to-amber-50 border-t border-orange-200/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
            <span className="font-bold text-zinc-900">PROVEN 5-STAGE BUSINESS ROADMAP:</span>
            <span className="text-zinc-600 hidden md:inline">Plan → Build → Optimize → Scale → Grow</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/services"
              onClick={() => sound.playClick()}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-orange-500/25 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Go to Full Services Page (/services)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
