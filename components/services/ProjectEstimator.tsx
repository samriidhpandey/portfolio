"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, CheckCircle2, Clock, Sparkles, Send, ArrowRight, ShieldCheck } from "lucide-react";
import { sound } from "@/lib/audio";

interface AddOn {
  id: string;
  name: string;
  desc: string;
  timelineDays: number;
}

const serviceOptions = [
  { id: "web", name: "High-Speed Web Development", baseDays: 10, baseScope: "Custom Next.js 15 Web App / Site" },
  { id: "marketing", name: "Digital Marketing & SEO", baseDays: 14, baseScope: "Technical SEO & Paid Ad Funnel Setup" },
  { id: "ai", name: "AI Automation & Chatbots", baseDays: 8, baseScope: "Custom 24/7 AI Agent with RAG & CRM Sync" },
  { id: "full", name: "Full Digital Growth Bundle", baseDays: 21, baseScope: "Website + SEO/Ads + Custom AI Bot" },
];

const scopeTiers = [
  { id: "landing", name: "High-Converting Landing Page", multiplier: 1, desc: "Single-page conversion funnel with speed optimization" },
  { id: "multipage", name: "Full Business Website (4-7 Pages)", multiplier: 1.5, desc: "Complete brand architecture, case studies, and lead capture" },
  { id: "custom_app", name: "Custom SaaS / Web App MVP", multiplier: 2.2, desc: "Auth, database, role-based dashboard, API integrations" },
  { id: "ecommerce", name: "E-Commerce / Storefront", multiplier: 2, desc: "Product catalog, Stripe/Razorpay payments, automated orders" },
];

const availableAddOns: AddOn[] = [
  { id: "seo_audit", name: "Comprehensive SEO & Schema Markup", desc: "Targeted keywords, Core Web Vitals, JSON-LD", timelineDays: 3 },
  { id: "ai_bot", name: "Website AI Assistant Integration", desc: "Trained on company docs with lead capture", timelineDays: 4 },
  { id: "whatsapp_api", name: "WhatsApp Business Automated Bot", desc: "Connects incoming WhatsApp chats directly to CRM", timelineDays: 4 },
  { id: "copywriting", name: "Conversion Sales Copywriting", desc: "Persuasive headline & section copy engineered to sell", timelineDays: 2 },
  { id: "analytics_dashboard", name: "Custom GA4 & Event Tracking Hub", desc: "Button tracking, UTM parameters, Looker dashboard", timelineDays: 2 },
];

export default function ProjectEstimator() {
  const [selectedService, setSelectedService] = useState("web");
  const [selectedTier, setSelectedTier] = useState("landing");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(["seo_audit"]);
  const [urgency, setUrgency] = useState<"standard" | "express">("standard");

  useEffect(() => {
    const handleSelectEvent = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const title = customEvent.detail?.toLowerCase() || "";
      if (title.includes("web")) setSelectedService("web");
      else if (title.includes("marketing") || title.includes("seo")) setSelectedService("marketing");
      else if (title.includes("ai") || title.includes("bot")) setSelectedService("ai");
      else if (title.includes("design")) setSelectedService("web");
    };

    window.addEventListener("select-estimator-service", handleSelectEvent);
    return () => window.removeEventListener("select-estimator-service", handleSelectEvent);
  }, []);

  const toggleAddOn = (id: string) => {
    sound.playClick();
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const currentServiceObj = serviceOptions.find((s) => s.id === selectedService) || serviceOptions[0];
  const currentTierObj = scopeTiers.find((t) => t.id === selectedTier) || scopeTiers[0];

  const baseDays = currentServiceObj.baseDays * currentTierObj.multiplier;
  const addOnsDays = selectedAddOns.reduce((acc, currId) => {
    const found = availableAddOns.find((a) => a.id === currId);
    return acc + (found?.timelineDays || 0);
  }, 0);

  const totalCalculatedDays = Math.ceil((baseDays + addOnsDays) * (urgency === "express" ? 0.65 : 1));

  const handleInquireNow = () => {
    sound.playClick();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      const summaryText = `[Project Scope Estimate]: Service: ${currentServiceObj.name}, Tier: ${currentTierObj.name}, Urgency: ${urgency.toUpperCase()}, Estimated Delivery: ~${totalCalculatedDays} Days. Add-ons: ${selectedAddOns.join(", ")}`;
      window.dispatchEvent(new CustomEvent("prefill-project-inquiry", { detail: summaryText }));
    }
  };

  return (
    <section id="estimator" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-orange-600 font-bold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200">
          <Calculator className="w-3.5 h-3.5 text-orange-500" />
          <span>INSTANT SCOPE & TIMELINE ESTIMATOR</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 tracking-tight max-w-3xl">
          Estimate Your Project & Deliverables <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500">
            Interactive Scope Configurator
          </span>
        </h2>
        <p className="text-zinc-600 mt-3 text-sm sm:text-base max-w-2xl font-normal">
          Customize your required service, scope size, and add-ons to calculate estimated turnaround timeline and recommended architecture approach.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Configurator Column */}
        <div className="lg:col-span-7 space-y-8 bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200/80 shadow-sm">
          
          {/* 1. Select Service Type */}
          <div>
            <label className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider block mb-3">
              STEP 1: SELECT PRIMARY SERVICE
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {serviceOptions.map((s) => {
                const isSelected = selectedService === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedService(s.id);
                    }}
                    className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-orange-50/80 border-orange-500 text-orange-800 shadow-xs ring-1 ring-orange-500/30"
                        : "bg-zinc-50 border-zinc-200/70 hover:bg-white text-zinc-700"
                    }`}
                  >
                    <span className="text-sm font-bold block mb-1">{s.name}</span>
                    <span className="text-[11px] text-zinc-500 block">{s.baseScope}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Select Project Scope / Scale */}
          <div>
            <label className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider block mb-3">
              STEP 2: SELECT PROJECT SCALE & COMPLEXITY
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {scopeTiers.map((tier) => {
                const isSelected = selectedTier === tier.id;
                return (
                  <button
                    key={tier.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedTier(tier.id);
                    }}
                    className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-orange-50/80 border-orange-500 text-orange-800 shadow-xs ring-1 ring-orange-500/30"
                        : "bg-zinc-50 border-zinc-200/70 hover:bg-white text-zinc-700"
                    }`}
                  >
                    <span className="text-sm font-bold block mb-1">{tier.name}</span>
                    <span className="text-[11px] text-zinc-500 block">{tier.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Optional High-Impact Add-ons */}
          <div>
            <label className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider block mb-3">
              STEP 3: OPTIONAL ADD-ONS & INTEGRATIONS
            </label>
            <div className="space-y-2.5">
              {availableAddOns.map((addon) => {
                const isSelected = selectedAddOns.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddOn(addon.id)}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? "bg-orange-50/60 border-orange-400 text-zinc-900"
                        : "bg-zinc-50/60 border-zinc-200/70 hover:bg-white text-zinc-700"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? "bg-orange-600 border-orange-600 text-white" : "border-zinc-300 bg-white"
                      }`}>
                        {isSelected && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                      <div>
                        <span className="text-xs sm:text-sm font-bold block">{addon.name}</span>
                        <span className="text-[11px] text-zinc-500 block">{addon.desc}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-1 rounded bg-orange-100 text-orange-700 whitespace-nowrap ml-2">
                      +{addon.timelineDays} Days
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Priority Speed */}
          <div>
            <label className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider block mb-3">
              STEP 4: DELIVERY PRIORITY
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  sound.playClick();
                  setUrgency("standard");
                }}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  urgency === "standard"
                    ? "bg-orange-50 border-orange-500 text-orange-800 font-bold"
                    : "bg-zinc-50 border-zinc-200 text-zinc-600"
                }`}
              >
                <span className="text-xs sm:text-sm block">Standard Cadence</span>
                <span className="text-[10px] text-zinc-500 font-normal">Normal Milestone Sprints</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setUrgency("express");
                }}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  urgency === "express"
                    ? "bg-orange-50 border-orange-500 text-orange-800 font-bold"
                    : "bg-zinc-50 border-zinc-200 text-zinc-600"
                }`}
              >
                <span className="text-xs sm:text-sm block">⚡ Fast Track Sprint</span>
                <span className="text-[10px] text-zinc-500 font-normal">Priority Expedited Delivery</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Summary & Action Card */}
        <div className="lg:col-span-5 sticky top-28 space-y-6">
          <div className="glass-panel p-8 rounded-3xl bg-white border border-orange-500/25 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100 font-mono">
              <span className="text-xs text-orange-600 font-bold uppercase tracking-wider">
                ESTIMATED SCOPE SUMMARY
              </span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700 font-bold">
                READY TO BUILD
              </span>
            </div>

            {/* Selected Spec List */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-zinc-100">
                <span className="text-zinc-500">Service:</span>
                <span className="font-bold text-zinc-900 text-right">{currentServiceObj.name}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-zinc-100">
                <span className="text-zinc-500">Scale:</span>
                <span className="font-bold text-zinc-900 text-right">{currentTierObj.name}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-zinc-100">
                <span className="text-zinc-500">Cadence:</span>
                <span className="font-bold text-orange-600 text-right uppercase">
                  {urgency === "express" ? "Fast Track (Priority)" : "Standard Sprint"}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-zinc-100">
                <span className="text-zinc-500">Add-ons:</span>
                <span className="font-bold text-zinc-900 text-right">{selectedAddOns.length} Included</span>
              </div>
            </div>

            {/* Calculated Timeline Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200/80">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase block">
                    ESTIMATED TURNAROUND
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-orange-600 font-mono">
                    ~{totalCalculatedDays} Business Days
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-sm">
                  <Clock className="w-5 h-5" />
                </div>
              </div>
              <p className="text-[11px] text-zinc-500 mt-2">
                Includes architecture wireframes, staging review link, QA testing & 30-day post-launch warranty.
              </p>
            </div>

            {/* Guarantees list */}
            <div className="space-y-1.5 text-xs text-zinc-600 font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-orange-600 shrink-0" />
                <span>100% Source Code & Account Ownership</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-orange-600 shrink-0" />
                <span>No Long-Term Contracts or Hidden Lock-ins</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-orange-600 shrink-0" />
                <span>Sub-Second PageSpeed & Core Web Vitals Guarantee</span>
              </div>
            </div>

            {/* Inquire CTA Button */}
            <button
              onClick={handleInquireNow}
              onMouseEnter={() => sound.playHover()}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm tracking-wide shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.02]"
            >
              <Send className="w-4 h-4" />
              <span>Send This Estimate To Samridh</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
