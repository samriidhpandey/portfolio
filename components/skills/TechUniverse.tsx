"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Terminal, Network, Shield, Layers, Sparkles } from "lucide-react";
import { skillsData, skillCategories, SkillNode } from "@/data/skills";
import { sound } from "@/lib/audio";

export default function TechUniverse() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [hoveredNode, setHoveredNode] = useState<SkillNode | null>(skillsData[0]);

  const filteredSkills = skillsData.filter(
    (skill) => activeCategory === "All" || skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="flex flex-col items-start mb-14">
        <div className="flex items-center gap-2 font-mono text-xs text-orange-600 font-bold tracking-widest uppercase mb-3">
          <span className="w-6 h-px bg-orange-500" />
          <span>02 // TECH UNIVERSE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight">
          Tools, Frameworks & <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500">
            Computational Systems
          </span>
        </h2>
        <p className="text-zinc-600 mt-3 text-sm sm:text-base max-w-2xl font-normal">
          A deeply interconnected constellation of languages, neural model frameworks, and high-concurrency web systems.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-10 pb-2 border-b border-zinc-200/80">
        {skillCategories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => {
                sound.playClick();
                setActiveCategory(category);
              }}
              onMouseEnter={() => sound.playHover()}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-all cursor-pointer ${
                isActive
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20"
                  : "bg-white text-zinc-600 hover:text-zinc-900 hover:bg-orange-50/50 border border-zinc-200/80 shadow-xs"
              }`}
            >
              {category.toUpperCase()}
            </button>
          );
        })}
      </div>

      {/* Main Grid: Left Node Constellation & Right Dynamic Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Node Grid (7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {filteredSkills.map((skill) => {
            const isHovered = hoveredNode?.id === skill.id;
            const isConnected = hoveredNode?.connectedTo.includes(skill.id);

            return (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => {
                  sound.playHover();
                  setHoveredNode(skill);
                }}
                className={`relative p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                  isHovered
                    ? "bg-orange-50/80 border-orange-500 shadow-md shadow-orange-500/10 scale-[1.03] z-20"
                    : isConnected
                    ? "bg-amber-50/50 border-orange-300"
                    : "bg-white border-zinc-200/80 hover:border-orange-300 hover:bg-orange-50/30 shadow-xs"
                }`}
              >
                {/* Node Status Dot */}
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-mono text-zinc-400 font-semibold tracking-wider">
                    {skill.category}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isHovered
                        ? "bg-orange-500 shadow-[0_0_8px_#F97316]"
                        : isConnected
                        ? "bg-amber-500"
                        : "bg-zinc-300"
                    }`}
                  />
                </div>

                <h4 className="text-sm sm:text-base font-bold text-zinc-900 mb-2">
                  {skill.name}
                </h4>

                {/* Level Indicator Bar */}
                <div className="w-full bg-zinc-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      isHovered
                        ? "bg-gradient-to-r from-orange-500 to-amber-500"
                        : isConnected
                        ? "bg-orange-400/80"
                        : "bg-zinc-300"
                    }`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right: Focused Node Inspector Panel (5 cols) */}
        <div className="lg:col-span-5 sticky top-28">
          {hoveredNode ? (
            <motion.div
              key={hoveredNode.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="glass-card p-6 sm:p-8 rounded-2xl bg-white border border-orange-500/30 shadow-lg relative overflow-hidden"
            >
              {/* Corner Ambient Glow */}
              <div className="absolute -top-12 -right-12 w-36 h-36 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-4 pb-4 border-b border-zinc-100">
                <div>
                  <span className="text-[10px] font-mono text-orange-600 font-bold uppercase tracking-widest block mb-1">
                    NODE INSPECTOR // {hoveredNode.category}
                  </span>
                  <h3 className="text-2xl font-black text-zinc-900">
                    {hoveredNode.name}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-zinc-400 block font-medium">PROFICIENCY</span>
                  <span className="text-2xl font-black text-orange-600 font-mono">
                    {hoveredNode.level}%
                  </span>
                </div>
              </div>

              {/* Architectural Role */}
              <div className="mb-5">
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block mb-1 font-semibold">
                  ARCHITECTURAL ROLE
                </span>
                <p className="text-sm font-semibold text-zinc-800">
                  {hoveredNode.role}
                </p>
              </div>

              {/* Technical Highlight */}
              <div className="mb-6 p-4 rounded-xl bg-orange-50/70 border border-orange-200">
                <span className="text-[10px] font-mono text-orange-700 font-bold uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-orange-600" /> TECHNICAL HIGHLIGHT
                </span>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-normal">
                  {hoveredNode.highlight}
                </p>
              </div>

              {/* Connected Mesh Nodes */}
              <div>
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block mb-2 flex items-center gap-1.5 font-semibold">
                  <Network className="w-3.5 h-3.5 text-orange-600" /> CONNECTED STACK
                </span>
                <div className="flex flex-wrap gap-2">
                  {hoveredNode.connectedTo.map((connId) => {
                    const matched = skillsData.find((s) => s.id === connId);
                    return (
                      <span
                        key={connId}
                        className="px-3 py-1 rounded-lg bg-zinc-100 border border-zinc-200 text-xs font-mono font-medium text-zinc-700 shadow-xs"
                      >
                        {matched?.name || connId}
                      </span>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="glass-panel p-8 rounded-2xl text-center text-zinc-400 font-mono text-sm bg-white">
              HOVER A NODE TO INSPECT ARCHITECTURE
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
