"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { detailedServicesList, DetailedService } from "@/data/detailedServices";
import { Globe, TrendingUp, Bot, Palette, CheckCircle2, ArrowRight, Zap, Clock, ShieldCheck, Layers, Workflow, Wrench, Sparkles } from "lucide-react";
import { sound } from "@/lib/audio";

export default function ServiceDeepDive() {
  const [selectedServiceId, setSelectedServiceId] = useState("web-development");

  const activeService = detailedServicesList.find((s) => s.id === selectedServiceId) || detailedServicesList[0];

  const handleTabChange = (id: string) => {
    sound.playClick();
    setSelectedServiceId(id);
  };

  const handleBookService = (serviceTitle: string) => {
    sound.playClick();
    const estimatorEl = document.getElementById("estimator");
    if (estimatorEl) {
      estimatorEl.scrollIntoView({ behavior: "smooth" });
      window.dispatchEvent(new CustomEvent("select-estimator-service", { detail: serviceTitle }));
    }
  };

  const getServiceIcon = (id: string) => {
    switch (id) {
      case "web-development":
        return <Globe className="w-5 h-5" />;
      case "digital-marketing":
        return <TrendingUp className="w-5 h-5" />;
      case "ai-automation":
        return <Bot className="w-5 h-5" />;
      case "uiux-design":
        return <Palette className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="catalog" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-orange-600 font-bold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200">
          <Layers className="w-3.5 h-3.5 text-orange-500" />
          <span>IN-DEPTH SERVICE BREAKDOWN // STEP-BY-STEP</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 tracking-tight max-w-3xl">
          Hum Kya, Kaise Aur Kis Tool Se Karte Hain? <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500">
            Deep Capabilities & Execution Roadmap
          </span>
        </h2>
        <p className="text-zinc-600 mt-3 text-sm sm:text-base max-w-2xl font-normal">
          Select any service below to explore everything: what we deliver, which tools we use, how our 5-stage development process works, and our client ROI guarantees.
        </p>
      </div>

      {/* Interactive Service Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
        {detailedServicesList.map((service) => {
          const isSelected = service.id === selectedServiceId;
          return (
            <button
              key={service.id}
              onClick={() => handleTabChange(service.id)}
              onMouseEnter={() => sound.playHover()}
              className={`flex flex-col items-start p-4 sm:p-5 rounded-2xl transition-all cursor-pointer text-left border ${
                isSelected
                  ? "bg-white border-orange-500 shadow-lg shadow-orange-500/10 ring-2 ring-orange-500/20"
                  : "bg-zinc-50/80 hover:bg-white border-zinc-200/80 hover:border-orange-300"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                  isSelected
                    ? "bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-sm"
                    : "bg-white text-zinc-600 border border-zinc-200"
                }`}
              >
                {getServiceIcon(service.id)}
              </div>
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-zinc-600 block mb-1">
                {service.badge}
              </span>
              <span className={`text-sm sm:text-base font-bold transition-colors ${
                isSelected ? "text-orange-600" : "text-zinc-800"
              }`}>
                {service.category}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Service Detailed View */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeService.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="space-y-10"
        >
          {/* Main Card Header & Overview */}
          <div className="glass-panel p-8 sm:p-12 rounded-3xl bg-white border border-orange-500/25 shadow-md">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-zinc-100">
              <div className="space-y-2 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-orange-50 text-orange-700 border border-orange-200">
                  <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                  <span>{activeService.badge}</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
                  {activeService.title}
                </h3>
                <p className="text-base text-orange-600 font-mono font-medium">
                  {activeService.tagline}
                </p>
                <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal pt-2">
                  {activeService.summary}
                </p>
              </div>

              {/* Fast Stats & CTA */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0 lg:min-w-[280px]">
                <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200/80 font-mono space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-zinc-500 uppercase font-semibold">
                    <Clock className="w-4 h-4 text-orange-600" />
                    Turnaround Timeline
                  </div>
                  <div className="text-base font-black text-zinc-900">
                    {activeService.turnaround}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 font-mono space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-zinc-500 uppercase font-semibold">
                    <Zap className="w-4 h-4 text-amber-600" />
                    Target ROI / Result
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-orange-700">
                    {activeService.roiMetric}
                  </div>
                </div>

                <button
                  onClick={() => handleBookService(activeService.category)}
                  onMouseEnter={() => sound.playHover()}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm tracking-wide shadow-md shadow-orange-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.02]"
                >
                  <span>Inquire For This Service</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Grid 1: Kon Kon Si Services Provide Karwayenge (Deliverables) */}
            <div className="py-8 border-b border-zinc-100">
              <div className="flex items-center gap-2 mb-6">
                <CheckCircle2 className="w-5 h-5 text-orange-600" />
                <h4 className="text-xl font-bold text-zinc-900">
                  Kon Kon Si Services Provide Karwayenge? (Complete Deliverables)
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeService.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-zinc-50/80 border border-zinc-200/80 hover:border-orange-300 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-orange-100 border border-orange-200 text-orange-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold">
                        {idx + 1}
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-zinc-900 mb-1">
                          {item.title}
                        </h5>
                        <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Grid 2: Kispe Konsa Tool Use Karte Hain (Tools Used) */}
            <div className="py-8 border-b border-zinc-100">
              <div className="flex items-center gap-2 mb-6">
                <Wrench className="w-5 h-5 text-orange-600" />
                <h4 className="text-xl font-bold text-zinc-900">
                  Kispe Konsa Tool Use Karte Hain? (Tech Stack & Tooling)
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeService.toolsUsed.map((tool, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-zinc-200/80 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-zinc-900">
                          {tool.name}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-orange-50 text-orange-700 border border-orange-200">
                          {tool.role}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                        {tool.whyWeUseIt}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Grid 3: Kaise Karte Hain (Step-by-Step Workflow) */}
            <div className="pt-8">
              <div className="flex items-center gap-2 mb-6">
                <Workflow className="w-5 h-5 text-orange-600" />
                <h4 className="text-xl font-bold text-zinc-900">
                  Kaise Karte Hain? (Our 5-Stage Execution Pipeline)
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {activeService.workflow.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2 font-mono">
                        <span className="text-sm font-black text-orange-600">
                          STAGE {step.step}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-200/70 text-zinc-600">
                          {step.timeline}
                        </span>
                      </div>
                      <h5 className="text-sm font-bold text-zinc-900 mb-2">
                        {step.title}
                      </h5>
                      <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Concrete Guarantees Ribbon */}
            <div className="mt-8 pt-6 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
              <div className="flex items-center gap-2 text-zinc-500 font-bold uppercase">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                Included Guarantees:
              </div>
              <div className="flex flex-wrap gap-2">
                {activeService.guarantees.map((g, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-orange-50 text-orange-800 border border-orange-200 font-semibold text-[11px]"
                  >
                    ✓ {g}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
