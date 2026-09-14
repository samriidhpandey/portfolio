"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Award,
  CheckCircle2,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Globe,
  Zap,
  Activity,
  Share2,
  Compass,
  BarChart2
} from "lucide-react";
import { profileData } from "@/data/profile";
import { CertificateItem, certificatesData, DEFAULT_FEATURED_LINKEDIN_EMBED, extractIframeSrc } from "@/data/certificates";
import { sound } from "@/lib/audio";

// Official LinkedIn Icon component
function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.225 0z" />
    </svg>
  );
}

export default function About() {
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [featuredLinkedInUrl, setFeaturedLinkedInUrl] = useState<string>(DEFAULT_FEATURED_LINKEDIN_EMBED);

  // Load certificates dynamically from API and localStorage
  const loadCertificates = async () => {
    // Check saved featured LinkedIn embed URL
    if (typeof window !== "undefined") {
      const savedEmbed = localStorage.getItem("admin_featured_linkedin_embed");
      if (savedEmbed) {
        setFeaturedLinkedInUrl(extractIframeSrc(savedEmbed));
      }
    }

    try {
      const res = await fetch("/api/certificates");
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.certificates)) {
          setCertificates(json.certificates);
          return;
        }
      }
    } catch (err) {
      console.warn("Could not fetch certificates from API:", err);
    }

    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("admin_certificates");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setCertificates(parsed);
            return;
          }
        } catch (e) {}
      }
    }

    setCertificates(certificatesData);
  };

  useEffect(() => {
    loadCertificates();

    const handleUpdate = () => {
      loadCertificates();
    };

    window.addEventListener("admin-certificates-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("admin-certificates-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="flex flex-col items-start mb-16">
        <div className="flex items-center gap-2 font-mono text-xs text-orange-600 font-bold tracking-widest uppercase mb-3">
          <span className="w-6 h-px bg-orange-500" />
          <span>01 // BEYOND THE CODE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight">
          Bridging Rigorous AI Systems <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500">
            With Production Engineering
          </span>
        </h2>
      </div>

      {/* Professional Bio & Core Engineering Philosophy */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-stretch">
        <div className="lg:col-span-7 glass-card p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden bg-white/95 border-zinc-200/90 shadow-sm">
          <div className="space-y-4 text-zinc-700 text-sm sm:text-base leading-relaxed font-normal">
            {profileData.bio.map((para, idx) => (
              <p key={idx} className="relative z-10">
                {para}
              </p>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-100 flex flex-wrap gap-3 text-xs font-mono">
            <span className="flex items-center gap-1.5 bg-orange-50 text-orange-700 px-3.5 py-1.5 rounded-xl border border-orange-200 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-orange-600" /> Production Determinism
            </span>
            <span className="flex items-center gap-1.5 bg-amber-50 text-amber-800 px-3.5 py-1.5 rounded-xl border border-amber-200 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-amber-600" /> High-Performance Serving
            </span>
            <span className="flex items-center gap-1.5 bg-orange-50/70 text-orange-800 px-3.5 py-1.5 rounded-xl border border-orange-200/70 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-orange-600" /> Microsecond Responsiveness
            </span>
          </div>
        </div>

        {/* Live Stat Cards */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          {profileData.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onMouseEnter={() => sound.playHover()}
              className="glass-card p-5 rounded-2xl flex flex-col justify-between bg-white border-zinc-200/80 hover:border-orange-400 group transition-all duration-300 shadow-sm hover:shadow-md cursor-default"
            >
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider font-semibold">
                {stat.label}
              </span>
              <div className="my-2">
                <span className="text-3xl sm:text-4xl font-black text-zinc-900 group-hover:text-orange-600 transition-colors">
                  {stat.value}
                </span>
                <span className="text-xl font-bold text-orange-500">{stat.suffix}</span>
              </div>
              <p className="text-xs text-zinc-500 leading-snug">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Target Anchor for #certificates navigation */}
      <div id="certificates" className="scroll-mt-28" />

      {/* ========================================================================= */}
      {/* CREATIVE LINKEDIN & EXPONENTIAL GROWTH SHOWCASE                         */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full rounded-3xl p-4 sm:p-8 lg:p-10 border border-orange-500/20 bg-gradient-to-b from-white/95 via-orange-50/20 to-white/90 shadow-2xl shadow-orange-500/5 overflow-hidden my-10"
      >
        {/* --- ANTIQUE CELESTIAL & NETWORK GROWTH SVG BACKGROUND --- */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {/* Ambient Glowing Auras (LinkedIn Sapphire + Sunset Brand Amber) */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-[#0A66C2]/15 via-sky-500/10 to-transparent blur-3xl rounded-full" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-tl from-orange-500/15 via-amber-500/10 to-transparent blur-3xl rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-radial from-orange-500/5 via-sky-500/5 to-transparent blur-3xl rounded-full" />

          {/* Antique Astrolabe / Navigational Coordinate Orbit Circles */}
          <svg
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] opacity-[0.08] stroke-zinc-900"
            viewBox="0 0 800 800"
            fill="none"
          >
            <circle cx="400" cy="400" r="180" strokeDasharray="6 6" strokeWidth="1" />
            <circle cx="400" cy="400" r="280" strokeDasharray="3 9" strokeWidth="1.5" />
            <circle cx="400" cy="400" r="380" strokeWidth="0.8" />
            <line x1="400" y1="20" x2="400" y2="780" strokeDasharray="4 8" strokeWidth="0.8" />
            <line x1="20" y1="400" x2="780" y2="400" strokeDasharray="4 8" strokeWidth="0.8" />
            {/* Diagonal Telemetry Rays */}
            <line x1="130" y1="130" x2="670" y2="670" strokeDasharray="2 6" strokeWidth="0.6" />
            <line x1="130" y1="670" x2="670" y2="130" strokeDasharray="2 6" strokeWidth="0.6" />
          </svg>

          {/* Network Constellation Mesh & Glowing Growth Nodes */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.18]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="growthLineGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0A66C2" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#EA580C" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#F97316" stopOpacity="0.8" />
              </linearGradient>
              <pattern id="dotGrid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#EA580C" fillOpacity="0.15" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dotGrid)" />

            {/* Rising Exponential Growth Vector Line */}
            <path
              d="M 50 700 C 300 680, 500 500, 750 350 C 950 220, 1200 120, 1400 60"
              fill="none"
              stroke="url(#growthLineGrad)"
              strokeWidth="2.5"
              strokeDasharray="6 4"
            />
          </svg>

          {/* Antique Telemetry Watermarks */}
          <div className="absolute top-4 left-6 font-mono text-[9px] text-zinc-400/80 tracking-widest uppercase">
            [SYS // LINKEDIN_OPEN_GRAPH v3.8] • COORD: 28°36'N / 77°12'E
          </div>
          <div className="absolute top-4 right-6 font-mono text-[9px] text-orange-600/70 font-semibold tracking-widest uppercase">
            GROWTH VELOCITY: +340% QoQ • BROADCAST: LIVE
          </div>
          <div className="absolute bottom-4 left-6 font-mono text-[9px] text-zinc-400/80 tracking-widest uppercase">
            GRAPH_TOPOLOGY: MULTI-REGION // PEER_SENTIMENT: 99.4%
          </div>
          <div className="absolute bottom-4 right-6 font-mono text-[9px] text-zinc-400/80 tracking-widest uppercase">
            NODE_ID: LI-771835317 // AUTHOR: SAMRIDH PANDEY
          </div>
        </div>

        {/* Section Top Header & Mission Badge */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-5 border-b border-zinc-200/70">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/25 bg-orange-50/90 shadow-2xs mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <LinkedInIcon className="w-3.5 h-3.5 text-[#0A66C2]" />
              <span className="text-[11px] font-mono font-bold tracking-wider text-orange-950 uppercase">
                PROFESSIONAL NETWORK & CAREER ACCELERATION //
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight flex items-center gap-2.5">
              <span>LinkedIn Spotlight & Growth Orbit</span>
              <span className="text-xs font-mono font-bold text-orange-600 px-2.5 py-0.5 rounded-full bg-orange-100/70 border border-orange-200 hidden sm:inline-block">
                LIVE BROADCAST
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-2xl font-normal leading-relaxed">
              Real-time technical perspectives, AI/ML engineering milestones, and live milestones shared directly with the global technology network.
            </p>
          </div>

          <a
            href="https://www.linkedin.com/in/samridh-pandey-771835317/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            onMouseEnter={() => sound.playHover()}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#0A66C2] to-sky-700 text-white font-mono font-bold text-xs shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all group shrink-0"
          >
            <LinkedInIcon className="w-4 h-4 text-white" />
            <span>Connect on LinkedIn</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* --- MAIN 3-COLUMN SHOWCASE LAYOUT --- */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* LEFT WING: GROWTH & REACH TELEMETRY (Desktop Left Column) */}
          <div className="lg:col-span-3 flex flex-col gap-4 order-2 lg:order-1">
            
            {/* Card 1: Growth Velocity & Impression Trajectory */}
            <motion.div
              whileHover={{ y: -3 }}
              className="p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-zinc-200/90 hover:border-orange-400 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-bold flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  REACH & IMPRESSIONS
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  +340% YoY
                </span>
              </div>

              {/* Exponential Spline Trend SVG */}
              <div className="my-2.5 h-16 w-full rounded-xl bg-gradient-to-b from-orange-50/60 to-zinc-50/40 p-2 flex items-end justify-between border border-orange-100/60">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F97316" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#F97316" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 35 Q 25 30, 45 22 T 80 12 T 100 2 L 100 40 L 0 40 Z"
                    fill="url(#chartGrad)"
                  />
                  <path
                    d="M 0 35 Q 25 30, 45 22 T 80 12 T 100 2"
                    fill="none"
                    stroke="#EA580C"
                    strokeWidth="2.5"
                  />
                  <circle cx="100" cy="2" r="3" fill="#EA580C" className="animate-pulse" />
                </svg>
              </div>

              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-zinc-900 group-hover:text-orange-600 transition-colors">
                  48,500+
                </span>
                <span className="text-xs font-bold text-orange-500">Impressions</span>
              </div>
              <p className="text-[11px] text-zinc-500 mt-1 leading-snug">
                Deep technical writeups reaching engineering leaders, AI researchers, and founders globally.
              </p>
            </motion.div>

            {/* Card 2: Global Professional Graph */}
            <motion.div
              whileHover={{ y: -3 }}
              className="p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-zinc-200/90 hover:border-[#0A66C2] shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-bold flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#0A66C2]" />
                  PROFESSIONAL GRAPH
                </span>
                <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                  <Globe className="w-2.5 h-2.5" /> Worldwide
                </span>
              </div>

              <div className="my-1.5">
                <span className="text-2xl font-black text-zinc-900 group-hover:text-[#0A66C2] transition-colors">
                  1,200+
                </span>
                <span className="text-xs font-bold text-sky-600 ml-1.5">Connections</span>
              </div>

              {/* Network Pill Tags */}
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                <span className="text-[10px] font-mono bg-zinc-100/90 text-zinc-700 px-2 py-0.5 rounded-md font-semibold">
                  #MachineLearning
                </span>
                <span className="text-[10px] font-mono bg-orange-50 text-orange-800 px-2 py-0.5 rounded-md font-semibold">
                  #FullStack
                </span>
                <span className="text-[10px] font-mono bg-sky-50 text-sky-800 px-2 py-0.5 rounded-md font-semibold">
                  #NextJS
                </span>
              </div>
            </motion.div>

          </div>

          {/* CENTER: THE FEATURED LINKEDIN EMBED (Enhanced with Antique Cyber Brackets) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-2">
            <div className="w-full max-w-[530px] relative">
              
              {/* Antique Cyber Corner Reticles */}
              <div className="absolute -top-2.5 -left-2.5 w-6 h-6 border-t-2 border-l-2 border-orange-500/70 pointer-events-none z-20 rounded-tl" />
              <div className="absolute -top-2.5 -right-2.5 w-6 h-6 border-t-2 border-r-2 border-orange-500/70 pointer-events-none z-20 rounded-tr" />
              <div className="absolute -bottom-2.5 -left-2.5 w-6 h-6 border-b-2 border-l-2 border-orange-500/70 pointer-events-none z-20 rounded-bl" />
              <div className="absolute -bottom-2.5 -right-2.5 w-6 h-6 border-b-2 border-r-2 border-orange-500/70 pointer-events-none z-20 rounded-br" />

              {/* Telemetry Status Ribbon directly above iframe */}
              <div className="w-full bg-zinc-900 text-white rounded-t-2xl px-4 py-2.5 flex items-center justify-between text-xs font-mono border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-zinc-300 font-bold uppercase tracking-wider">
                    SIGNAL // VERIFIED POST FEED
                  </span>
                </div>
                <a
                  href="https://www.linkedin.com/feed/update/urn:li:ugcPost:7472653645004857344"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1 font-bold"
                >
                  <span>Open Post</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>

              {/* Main Iframe Wrapper with Subtle Glass Shadow */}
              <div className="w-full bg-white rounded-b-2xl p-2 sm:p-3 border border-zinc-200/90 shadow-2xl overflow-hidden flex justify-center">
                <iframe
                  src={featuredLinkedInUrl}
                  height="876"
                  width="504"
                  frameBorder="0"
                  allowFullScreen
                  title="Embedded post"
                  className="w-full max-w-[504px] rounded-xl border-0 shadow-2xs block"
                  style={{ minHeight: "600px", height: "876px" }}
                />
              </div>
            </div>
          </div>

          {/* RIGHT WING: AUTHORITY & COLLABORATIONS (Desktop Right Column) */}
          <div className="lg:col-span-3 flex flex-col gap-4 order-3">
            
            {/* Card 1: Thought Leadership & Technical Voice */}
            <motion.div
              whileHover={{ y: -3 }}
              className="p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-zinc-200/90 hover:border-amber-400 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-bold flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  TECHNICAL AUTHORITY
                </span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  VERIFIED
                </span>
              </div>

              <div className="space-y-2 mt-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                  <span>Production AI Architecture</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                  <span>High-Scale Full Stack Apps</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                  <span>Open Ecosystem Contributor</span>
                </div>
              </div>

              <div className="mt-3.5 pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>PEER SENTIMENT</span>
                <span className="font-bold text-emerald-600">99.4% POSITIVE</span>
              </div>
            </motion.div>

            {/* Card 2: Collaboration & Inquiries */}
            <motion.div
              whileHover={{ y: -3 }}
              className="p-5 rounded-2xl bg-gradient-to-br from-orange-50/70 via-white to-amber-50/50 border border-orange-300/80 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono text-orange-800 uppercase tracking-wider font-bold flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5 text-orange-600" />
                  DIRECT INQUIRIES
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <h4 className="text-sm font-black text-zinc-900 mt-1">
                Open for Engineering & Client Contracts
              </h4>
              <p className="text-[11px] text-zinc-500 mt-1 leading-snug">
                Connect directly on LinkedIn for high-performance software builds, AI automations, and consulting.
              </p>

              <a
                href="https://www.linkedin.com/in/samridh-pandey-771835317/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
                className="mt-3.5 w-full py-2.5 px-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-mono font-bold text-xs shadow-xs hover:shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <LinkedInIcon className="w-3.5 h-3.5 text-white" />
                <span>Message on LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </motion.div>

          </div>

        </div>
      </motion.div>

      {/* Verified Certificates & Accreditations Section */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl bg-white border border-orange-500/20 shadow-lg space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-zinc-100">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-orange-600 font-bold uppercase tracking-widest mb-1.5">
              <Award className="w-4 h-4 text-orange-500" />
              <span>ACCREDITED EXPERTISE // VERIFIED CREDENTIALS</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
              Certifications & Professional Honors
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-xl font-normal">
              Click any certificate card below to view and verify the post directly on LinkedIn.
            </p>
          </div>

          <span className="text-xs font-mono font-bold text-orange-600 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 self-start sm:self-auto">
            {certificates.length} Verified Certificate{certificates.length === 1 ? "" : "s"}
          </span>
        </div>

        {/* Certificate Cards Grid */}
        {certificates.length === 0 ? (
          <div className="py-14 px-6 text-center rounded-2xl bg-zinc-50/80 border border-dashed border-zinc-300 flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-3">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-zinc-800">No Certificates Uploaded Yet</h4>
            <p className="text-xs text-zinc-500 mt-1 max-w-md">
              Aap apne Admin Panel (<code>/admin</code>) ke <b>Certificates & LinkedIn</b> tab se certificate image, title aur LinkedIn post ID upload kar sakte hain. Wo yahan turant dikhenge!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => {
              const targetUrl = cert.linkedinUrl || (cert.linkedinPostId ? `https://www.linkedin.com/feed/update/urn:li:activity:${cert.linkedinPostId}` : "https://www.linkedin.com");

              return (
                <motion.div
                  key={cert.id || index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  className="group relative"
                >
                  <a
                    href={targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    onMouseEnter={() => sound.playHover()}
                    className="block h-full rounded-2xl bg-white border border-zinc-200/90 hover:border-orange-400 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer"
                  >
                    {/* Certificate Image Box */}
                    <div className="relative w-full aspect-[16/10] bg-zinc-100 overflow-hidden border-b border-zinc-100 flex items-center justify-center">
                      {cert.image ? (
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-center p-4 bg-orange-50/40">
                          <Award className="w-10 h-10 text-orange-500 mb-2 group-hover:scale-110 transition-transform" />
                          <span className="text-xs font-mono font-bold text-zinc-800">
                            {cert.title}
                          </span>
                        </div>
                      )}

                      {/* LinkedIn Pill Badge Top-Right */}
                      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-zinc-200 text-[#0A66C2] shadow-xs group-hover:bg-[#0A66C2] group-hover:text-white group-hover:border-[#0A66C2] transition-colors">
                        <LinkedInIcon className="w-3.5 h-3.5 shrink-0" />
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
                          LinkedIn
                        </span>
                      </div>

                      {/* Hover Overlay Prompt */}
                      <div className="absolute inset-0 bg-zinc-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#0A66C2] text-white font-mono text-xs font-bold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <LinkedInIcon className="w-3.5 h-3.5" />
                          <span>Open on LinkedIn</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>

                    {/* Certificate Title & Footer */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <h4 className="text-base font-bold text-zinc-900 group-hover:text-orange-600 transition-colors leading-snug">
                        {cert.title}
                      </h4>

                      <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-mono">
                        <span className="text-zinc-500 flex items-center gap-1 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Verified Credential</span>
                        </span>

                        <span className="inline-flex items-center gap-1 font-bold text-[#0A66C2] group-hover:translate-x-0.5 transition-transform">
                          <span>View Post</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
