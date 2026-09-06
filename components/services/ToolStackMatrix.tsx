"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { allToolsCatalog, ToolItem } from "@/data/detailedServices";
import { Wrench, CheckCircle2, Sparkles, Filter, Code2, Database, TrendingUp, Bot, Palette, Cloud } from "lucide-react";
import { sound } from "@/lib/audio";

const categories = [
  { id: "all", label: "All Tools (20+)", icon: Wrench },
  { id: "frontend", label: "Frontend", icon: Code2 },
  { id: "backend", label: "Backend & DB", icon: Database },
  { id: "marketing", label: "Marketing & SEO", icon: TrendingUp },
  { id: "ai", label: "AI & Automation", icon: Bot },
  { id: "design", label: "UI/UX Design", icon: Palette },
  { id: "cloud", label: "Cloud & DevOps", icon: Cloud },
];

export default function ToolStackMatrix() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredTools = activeCategory === "all"
    ? allToolsCatalog
    : allToolsCatalog.filter((t) => t.category === activeCategory);

  const handleCategoryChange = (catId: string) => {
    sound.playClick();
    setActiveCategory(catId);
  };

  return (
    <section id="tools" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-orange-600 font-bold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200">
          <Wrench className="w-3.5 h-3.5 text-orange-500" />
          <span>TOOL STACK & ECOSYSTEM // BATTLE-TESTED</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 tracking-tight max-w-3xl">
          Kispe Konsa Tool Use Karte Hain? <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500">
            Our Complete Production Tool Stack
          </span>
        </h2>
        <p className="text-zinc-600 mt-3 text-sm sm:text-base max-w-2xl font-normal">
          We use only industry-standard, high-performance tools and frameworks. Here is the exact technology stack powering every website, marketing campaign, and AI agent we build.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              onMouseEnter={() => sound.playHover()}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20 scale-105"
                  : "bg-white hover:bg-orange-50 text-zinc-700 hover:text-orange-600 border border-zinc-200/80 shadow-xs"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-orange-500"}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tool Cards Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredTools.map((tool) => (
          <motion.div
            layout
            key={tool.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="glass-card p-6 rounded-2xl bg-white border border-zinc-200/80 hover:border-orange-400 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Badge & Category */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider bg-orange-50 text-orange-700 border border-orange-200">
                  {tool.categoryLabel}
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 border border-zinc-200">
                  {tool.proficiency}
                </span>
              </div>

              {/* Tool Name & Role */}
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: tool.accent }}
                />
                <h3 className="text-xl font-bold text-zinc-900 group-hover:text-orange-600 transition-colors">
                  {tool.name}
                </h3>
              </div>
              <span className="text-xs font-mono font-medium text-orange-600 block mb-3">
                {tool.role}
              </span>

              {/* Description */}
              <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                {tool.description}
              </p>
            </div>

            {/* Bottom Meta */}
            <div className="pt-4 mt-5 border-t border-zinc-100 flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-zinc-600 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-500" />
                Production Ready
              </span>
              <span className="font-bold text-orange-600">{tool.badge}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
