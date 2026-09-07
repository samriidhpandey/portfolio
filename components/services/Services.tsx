"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Code2, RefreshCw, CheckCircle2 } from "lucide-react";
import { sound } from "@/lib/audio";
import Link from "next/link";

export default function Services() {
  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[350px] bg-orange-500/6 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Section Header Container */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-orange-600 font-bold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-orange-500" />
          <span>WHAT I OFFER // WEBSITE WALE SERVICES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 tracking-tight max-w-3xl">
          Our Services
        </h2>
        <p className="text-zinc-600 mt-3 text-sm sm:text-base max-w-2xl font-normal">
          High-performance modern web design, scalable full-stack development, and 24/7 ongoing website management designed to scale your business.
        </p>
      </div>

      {/* 2 Distinct Service Showcase Cards (White & Orange Theme) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
        
        {/* Card 1: Web Design & Development */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -6 }}
          className="group relative rounded-3xl bg-white border border-zinc-200/90 hover:border-orange-400 p-8 sm:p-10 shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(249,115,22,0.12)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
        >
          {/* Subtle Orange Glow in Corner */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-orange-400/10 via-amber-300/5 to-transparent rounded-bl-full pointer-events-none" />

          <div>
            {/* 3D Geometric Crystal Diamond Icon */}
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-orange-50/70 border border-orange-200/80 p-2 mb-6 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <img
                src="/services/web-dev-icon.jpg"
                alt="Web Design & Development Icon"
                className="w-full h-full object-contain rounded-xl select-none"
              />
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 mb-3 group-hover:text-orange-600 transition-colors">
              Web Design & Development
            </h3>

            {/* Tagline / Subtitle */}
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              Great choice if you want reliable design & speedy development regularly.
            </p>

            {/* Key Deliverables Bullet Points */}
            <ul className="space-y-2.5 mb-8 text-xs sm:text-sm font-mono text-zinc-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Custom High-Converting UX/UI Design</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Lightning-Fast Next.js & React Frontend</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                <span>SEO Optimized & 100/100 Lighthouse Performance</span>
              </li>
            </ul>
          </div>

          {/* Learn More Button */}
          <Link
            href="/services"
            onClick={() => sound.playClick()}
            onMouseEnter={() => sound.playHover()}
            className="inline-flex items-center justify-center gap-2 w-fit px-6 py-3 rounded-xl bg-zinc-900 group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:via-orange-600 group-hover:to-amber-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-sm group-hover:shadow-[0_6px_20px_rgba(249,115,22,0.35)] transition-all duration-300 cursor-pointer"
          >
            <span>Learn More</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Card 2: Website Management */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          whileHover={{ y: -6 }}
          className="group relative rounded-3xl bg-white border border-zinc-200/90 hover:border-orange-400 p-8 sm:p-10 shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(249,115,22,0.12)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
        >
          {/* Subtle Orange Glow in Corner */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-amber-400/10 via-orange-300/5 to-transparent rounded-bl-full pointer-events-none" />

          <div>
            {/* 3D Geometric Crystal Prism Wireframe Icon */}
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-orange-50/70 border border-orange-200/80 p-2 mb-6 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <img
                src="/services/web-mgmt-icon.jpg"
                alt="Website Management Icon"
                className="w-full h-full object-contain rounded-xl select-none"
              />
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 mb-3 group-hover:text-orange-600 transition-colors">
              Website Management
            </h3>

            {/* Tagline / Subtitle */}
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              Great Choice if you own a site but face challenges with growth and care.
            </p>

            {/* Key Deliverables Bullet Points */}
            <ul className="space-y-2.5 mb-8 text-xs sm:text-sm font-mono text-zinc-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                <span>24/7 Uptime & Security Monitoring</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Regular Content, Feature & Bug Updates</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Cloud Hosting, Backups & Domain Maintenance</span>
              </li>
            </ul>
          </div>

          {/* Learn More Button */}
          <Link
            href="/services"
            onClick={() => sound.playClick()}
            onMouseEnter={() => sound.playHover()}
            className="inline-flex items-center justify-center gap-2 w-fit px-6 py-3 rounded-xl bg-zinc-900 group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:via-orange-600 group-hover:to-amber-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-sm group-hover:shadow-[0_6px_20px_rgba(249,115,22,0.35)] transition-all duration-300 cursor-pointer"
          >
            <span>Learn More</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>

      {/* Business Growth Transformation Banner (Clean Clickable Card) */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative w-full rounded-3xl overflow-hidden border border-orange-500/25 shadow-xl group bg-white"
      >
        <Link
          href="/services"
          onClick={() => sound.playClick()}
          onMouseEnter={() => sound.playHover()}
          className="relative block w-full aspect-[16/9] sm:aspect-[16/8.8] overflow-hidden bg-zinc-50 cursor-pointer"
        >
          <img
            src="/growth-banner-no-logo.jpg"
            alt="Business Growth Banner - 3D Rocket and Bar Chart Roadmap"
            className="w-full h-full object-cover object-center group-hover:scale-[1.01] transition-transform duration-700 ease-out"
          />

          <div className="absolute top-4 sm:top-6 right-4 sm:right-6 flex items-center gap-2 z-20">
            <span className="px-4 py-2 rounded-xl bg-white/95 group-hover:bg-orange-50 backdrop-blur-md border border-orange-500/30 text-zinc-900 group-hover:text-orange-600 font-bold text-xs font-mono shadow-md transition-all flex items-center gap-1.5 cursor-pointer">
              <span>Explore Services Page</span>
              <ArrowRight className="w-3.5 h-3.5 text-orange-500 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </Link>

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
