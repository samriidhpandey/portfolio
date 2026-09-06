"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Layers, Cpu, ShieldCheck, Zap } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { ProjectItem } from "@/data/projects";
import { sound } from "@/lib/audio";

interface CaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-zinc-900/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-white border border-orange-500/25 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.2)] overflow-hidden my-8"
        >
          {/* Top header bar */}
          <div className="flex items-center justify-between p-6 border-b border-zinc-100 bg-orange-50/40">
            <div>
              <span className="text-[10px] font-mono text-orange-600 font-bold uppercase tracking-widest block mb-1">
                SYSTEM ARCHITECTURE DOSSIER // {project.category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 flex items-center gap-3">
                {project.title}
                <span className="text-xs font-mono font-bold text-orange-700 px-3 py-1 rounded-lg bg-orange-100/70 border border-orange-200">
                  {project.subtitle}
                </span>
              </h3>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 bg-white hover:bg-zinc-100 border border-zinc-200 transition-colors cursor-pointer shadow-xs"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-8 max-h-[75vh] overflow-y-auto terminal-scroll">
            {/* Executive Summary */}
            <div>
              <h4 className="text-xs font-mono uppercase text-zinc-500 tracking-wider mb-2 font-bold">
                EXECUTIVE ARCHITECTURE SUMMARY
              </h4>
              <p className="text-zinc-700 text-sm sm:text-base leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            {/* Metrics Ribbon */}
            <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-orange-50/70 border border-orange-200">
              {project.metrics.map((metric, i) => (
                <div key={i} className="text-center">
                  <span className="text-xl sm:text-2xl font-black text-orange-600 block font-mono">
                    {metric.value}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono text-zinc-600 uppercase font-semibold">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Architecture: Challenge vs Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200">
                <span className="text-xs font-mono text-amber-800 uppercase tracking-wider block mb-2 flex items-center gap-1.5 font-bold">
                  <Cpu className="w-4 h-4 text-amber-600" /> THE ENGINEERING CHALLENGE
                </span>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                  {project.architecture.challenge}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-orange-50/70 border border-orange-200">
                <span className="text-xs font-mono text-orange-800 uppercase tracking-wider block mb-2 flex items-center gap-1.5 font-bold">
                  <ShieldCheck className="w-4 h-4 text-orange-600" /> THE ARCHITECTURAL SOLUTION
                </span>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                  {project.architecture.solution}
                </p>
              </div>
            </div>

            {/* Highlights List */}
            <div>
              <h4 className="text-xs font-mono uppercase text-zinc-500 tracking-wider mb-3 flex items-center gap-2 font-bold">
                <Zap className="w-4 h-4 text-orange-500" /> KEY SYSTEM HIGHLIGHTS
              </h4>
              <div className="space-y-2">
                {project.architecture.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 bg-zinc-50 p-3 rounded-xl border border-zinc-200"
                  >
                    <span className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div>
              <h4 className="text-xs font-mono uppercase text-zinc-500 tracking-wider mb-2 font-bold">
                DEPLOYED TECH STACK
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg bg-orange-50 border border-orange-200 text-xs font-mono font-medium text-orange-800 shadow-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-between p-6 border-t border-zinc-100 bg-zinc-50/50">
            <span className="text-xs font-mono text-zinc-400 font-medium">
              SAMRIDH.SYSTEM // ARCHITECTURE RECORD
            </span>
            <div className="flex items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sound.playHover()}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-zinc-100 text-zinc-800 text-xs font-mono font-semibold border border-zinc-200 transition-colors shadow-xs"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Source Code</span>
              </a>
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => sound.playHover()}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 text-white font-semibold text-xs font-mono hover:bg-orange-600 transition-colors shadow-sm shadow-orange-500/20"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch Live System</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
