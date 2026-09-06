"use client";

import { motion } from "framer-motion";
import { Globe, TrendingUp, Bot, CheckCircle2, ArrowRight, Sparkles, Zap, ShieldCheck } from "lucide-react";
import { freelanceServicesData, freelanceGuarantees } from "@/data/services";
import { sound } from "@/lib/audio";
import Link from "next/link";

export default function Services() {
  const handleSelectService = (serviceTitle: string) => {
    sound.playClick();
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
      // Dispatch custom event to select project objective
      window.dispatchEvent(new CustomEvent("select-service-objective", { detail: serviceTitle }));
    }
  };

  const getIcon = (name: string) => {
    switch (name) {
      case "Globe":
        return <Globe className="w-6 h-6 text-orange-600" />;
      case "TrendingUp":
        return <TrendingUp className="w-6 h-6 text-orange-600" />;
      case "Bot":
        return <Bot className="w-6 h-6 text-orange-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-orange-600" />;
    }
  };

  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[350px] bg-orange-500/6 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-orange-600 font-bold tracking-widest uppercase mb-4 px-4 py-1 rounded-full bg-orange-50 border border-orange-200">
          <Sparkles className="w-3.5 h-3.5 text-orange-500" />
          <span>WHAT I OFFER // FREELANCE SERVICES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 tracking-tight max-w-3xl">
          Web Development & Digital Marketing <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500">
            Engineered For Real Business Growth
          </span>
        </h2>
        <p className="text-zinc-600 mt-3 text-sm sm:text-base max-w-2xl font-normal">
          From custom high-speed websites to ROI-driven marketing campaigns and AI automation, I partner with founders and businesses to drive measurable results.
        </p>
      </div>

      {/* Full-Width Business Growth Transformation Banner */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative w-full rounded-3xl overflow-hidden border border-orange-500/25 shadow-2xl mb-16 group bg-white"
      >
        {/* Full-Width & High-Resolution 3D Rocket Growth Graphic */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[16/8.8] overflow-hidden bg-zinc-50">
          <img
            src="/rocket-business-growth.jpg"
            alt="How We Grow Your Business - 3D Rocket and Growth Stages Roadmap"
            className="w-full h-full object-cover object-center group-hover:scale-[1.01] transition-transform duration-700 ease-out"
          />

          {/* Interactive Clickable Hotspot directly on the image's 'Let's Grow Your Business' button */}
          <Link
            href="/services"
            onClick={() => sound.playClick()}
            onMouseEnter={() => sound.playHover()}
            className="absolute left-[5.5%] bottom-[12.5%] sm:bottom-[13%] w-[31%] h-[8%] sm:h-[9%] min-h-[38px] max-w-[320px] rounded-2xl bg-transparent hover:bg-orange-500/20 border-2 border-orange-500/0 hover:border-orange-500 transition-all cursor-pointer flex items-center justify-center group/btn shadow-lg z-20"
            title="Let's Grow Your Business - View Full Services Page"
          >
            <span className="sr-only">Let's Grow Your Business - View Full Services Page</span>
            <span className="absolute inset-0 rounded-2xl ring-2 ring-orange-500/50 animate-pulse pointer-events-none" />
          </Link>

          {/* Top Right Dedicated Services Portal Badge */}
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

      {/* Main 3 Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
        {freelanceServicesData.map((service, idx) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15, duration: 0.5 }}
            className="glass-card p-8 rounded-3xl bg-white border border-zinc-200/80 hover:border-orange-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Category & Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                  {getIcon(service.iconName)}
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider bg-orange-50/80 text-orange-700 border border-orange-200/60">
                  {service.category}
                </span>
              </div>

              {/* Title & Short Desc */}
              <h3 className="text-2xl font-bold text-zinc-900 mb-3 group-hover:text-orange-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-zinc-600 text-sm leading-relaxed mb-6 font-normal">
                {service.fullDesc}
              </p>

              {/* Deliverables Checklist */}
              <div className="space-y-2.5 mb-6">
                <span className="text-[11px] font-mono text-zinc-400 font-bold uppercase tracking-wider block">
                  WHAT YOU GET:
                </span>
                {service.deliverables.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs font-medium text-zinc-700">
                    <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom: Metrics & Book CTA */}
            <div className="pt-6 border-t border-zinc-100">
              <div className="p-3 rounded-xl bg-orange-50/60 border border-orange-200/70 text-xs font-mono font-bold text-orange-800 mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-orange-500 shrink-0" />
                <span>{service.metrics}</span>
              </div>

              <button
                onClick={() => handleSelectService(service.title)}
                onMouseEnter={() => sound.playHover()}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs sm:text-sm tracking-wide shadow-sm shadow-orange-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer group-hover:shadow-md"
              >
                <span>Hire For This Service</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Prominent Deep Dive Services Page CTA Banner */}
      <div className="mb-20 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/5 border border-orange-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-orange-700 border border-orange-200 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>FULL PRODUCTION BREAKDOWN</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-zinc-900">
            Want complete details on our tools, workflows & instant project estimator?
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-2xl font-normal">
            Explore our dedicated Services Page detailing our 20+ tool stack (Next.js, Python, Ahrefs, OpenAI, Meta Ads), 5-phase execution workflows, and interactive scope calculator.
          </p>
        </div>

        <Link
          href="/services"
          onClick={() => sound.playClick()}
          className="shrink-0 px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm tracking-wide shadow-md shadow-orange-500/25 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Explore All Services & Tools (/services)</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Why Work With Me As A Freelancer Guarantees */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl bg-white border border-orange-500/20 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-100">
          <div>
            <span className="text-[10px] font-mono text-orange-600 font-bold uppercase tracking-widest block mb-1">
              THE FREELANCE ADVANTAGE
            </span>
            <h3 className="text-2xl font-extrabold text-zinc-900">
              Why Work Directly With Me?
            </h3>
          </div>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              sound.playClick();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 font-bold text-xs font-mono border border-orange-200 transition-colors cursor-pointer shadow-xs self-start sm:self-auto"
          >
            <span>Book A Free Discovery Call</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {freelanceGuarantees.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-orange-600 font-mono font-bold text-xs block mb-1">0{idx + 1} //</span>
                <h4 className="text-base font-bold text-zinc-900 mb-2">{item.title}</h4>
                <p className="text-xs text-zinc-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
