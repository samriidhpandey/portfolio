"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Calendar, Milestone, ArrowRight } from "lucide-react";
import { timelineData } from "@/data/timeline";
import { sound } from "@/lib/audio";

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative">
      {/* Section Header */}
      <div className="flex flex-col items-start mb-16">
        <div className="flex items-center gap-2 font-mono text-xs text-orange-600 font-bold tracking-widest uppercase mb-3">
          <span className="w-6 h-px bg-orange-500" />
          <span>05 // ENGINEERING CHRONOLOGY</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight">
          Journey & Milestones
        </h2>
        <p className="text-zinc-600 mt-2 text-sm sm:text-base max-w-2xl font-normal">
          A progression of mastering algorithmic rigor, high-scale web engineering, and autonomous AI architectures.
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative border-l-2 border-orange-300/80 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
        {timelineData.map((item, index) => (
          <motion.div
            key={item.year}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseEnter={() => sound.playHover()}
            className="relative group"
          >
            {/* Timeline Glowing Node Dot on Spine */}
            <div className="absolute -left-[33px] sm:-left-[49px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-orange-500 group-hover:border-orange-600 group-hover:scale-125 transition-all shadow-[0_0_10px_#F97316] flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            </div>

            {/* Timeline Content Card */}
            <div className="glass-card p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200/90 group-hover:border-orange-400 transition-all duration-300 shadow-sm hover:shadow-md">
              {/* Year & Phase header */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl sm:text-3xl font-black text-zinc-900 group-hover:text-orange-600 transition-colors font-mono">
                    {item.year}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-widest bg-orange-50 border border-orange-200 text-orange-700">
                    {item.phase}
                  </span>
                </div>
                <span className="text-xs font-mono font-medium text-zinc-400">
                  {item.metrics}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg sm:text-xl font-bold text-zinc-900 mb-2">
                {item.title}
              </h3>
              <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                {item.description}
              </p>

              {/* Key Achievements Checklist */}
              <div className="space-y-2.5 mb-6">
                {item.achievements.map((ach, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700">
                    <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-100">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-zinc-100 border border-zinc-200 text-[11px] font-mono font-medium text-zinc-700 group-hover:border-orange-200 transition-colors shadow-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
