"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink, BookOpen, Activity, ArrowUpRight, Cpu } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { ProjectItem } from "@/data/projects";
import { sound } from "@/lib/audio";

interface ProjectCardProps {
  project: ProjectItem;
  onOpenCaseStudy: (project: ProjectItem) => void;
}

const formatExternalUrl = (url?: string) => {
  if (!url) return "#";
  const trimmed = url.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("//")) {
    return trimmed;
  }
  return `https://${trimmed}`;
};

export default function ProjectCard({ project, onOpenCaseStudy }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 6;
    const rotY = ((x - centerX) / centerX) * 6;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const primaryMetric = project.metrics && project.metrics.length > 0 ? project.metrics[0] : null;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        sound.playHover();
      }}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.01 : 1}, ${isHovered ? 1.01 : 1}, 1)`,
        transition: "transform 0.15s ease-out"
      }}
      className="group relative rounded-2xl glass-card bg-white overflow-hidden flex flex-col justify-between border border-zinc-200/80 hover:border-orange-400 shadow-sm hover:shadow-lg transition-all duration-300"
    >
      {/* Top Banner / Graphic representation with Web App Screen Preview */}
      <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 border-b border-zinc-200/80 flex items-center justify-center p-3 sm:p-4 group/preview">
        {/* Subtle background grid */}
        <div className="absolute inset-0 friendly-grid opacity-20 group-hover:opacity-40 transition-opacity" />

        {/* Ambient Project Glow */}
        <div
          className="absolute w-48 h-48 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity pointer-events-none"
          style={{ backgroundColor: project.accentColor || "#FF6B00" }}
        />

        {/* Category Pill */}
        <div className="absolute top-3 left-3 z-20">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider font-bold bg-zinc-900/90 text-white backdrop-blur-md border border-zinc-700/80 shadow-md">
            {project.category}
          </span>
        </div>

        {/* Key metric badge */}
        {primaryMetric && (
          <div className="absolute top-3 right-3 z-20">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider font-semibold bg-orange-500/90 text-white backdrop-blur-md border border-orange-400/50 flex items-center gap-1.5 shadow-md">
              <Activity className="w-3 h-3 text-white" />
              {primaryMetric.label}: {primaryMetric.value}
            </span>
          </div>
        )}

        {/* Miniature Browser / Website Mockup Window */}
        <div className="relative w-full h-full pt-8 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-700/80 shadow-xl flex flex-col transition-transform duration-500 group-hover/preview:scale-[1.02]">
          {/* Browser Header Bar */}
          <div className="absolute top-0 inset-x-0 h-7 bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800 px-3 flex items-center justify-between z-10">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/90 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/90 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90 inline-block" />
            </div>

            {/* Address Bar */}
            <div className="flex-1 max-w-[180px] sm:max-w-[220px] mx-2 h-4 rounded-md bg-zinc-800/80 border border-zinc-700/50 flex items-center px-2 text-[9px] font-mono text-zinc-400 truncate">
              <span className="text-emerald-400 mr-1 font-bold">🔒</span>
              <span className="truncate">
                {project.demoUrl
                  ? project.demoUrl.replace(/^https?:\/\//, "")
                  : `https://${project.title.toLowerCase().replace(/[^a-z0-9]/g, "")}.demo.app`}
              </span>
            </div>

            <div className="w-8 flex justify-end">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            </div>
          </div>

          {/* Browser Screen Body (Image or Interactive Web App UI Mockup) */}
          <div className="relative w-full flex-1 overflow-hidden bg-zinc-900 flex items-center justify-center">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-top group-hover/preview:scale-105 transition-transform duration-500"
              />
            ) : (
              /* High-tech simulated Web App Screen */
              <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 relative">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-lg border flex items-center justify-center bg-zinc-800"
                      style={{ borderColor: `${project.accentColor || "#FF6B00"}80` }}
                    >
                      <Cpu className="w-3.5 h-3.5" style={{ color: project.accentColor || "#FF6B00" }} />
                    </div>
                    <span className="text-xs font-bold text-white tracking-wide">{project.title}</span>
                  </div>
                  <span className="text-[9px] font-mono text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                    LIVE SYSTEM
                  </span>
                </div>

                <div className="my-2 space-y-2">
                  <p className="text-[10px] font-mono text-zinc-400 line-clamp-2">
                    {project.subtitle}
                  </p>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-1.5 rounded bg-zinc-800/60 border border-zinc-700/50">
                        <div className="w-8 h-1 bg-orange-500/70 rounded mb-1" />
                        <div className="w-12 h-2 bg-zinc-600/50 rounded" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-800 text-[9px] font-mono text-zinc-500">
                  <span>API 200 OK</span>
                  <span className="text-orange-400 font-bold">READY TO LAUNCH</span>
                </div>
              </div>
            )}

            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
              <span className="px-3 py-1.5 rounded-xl bg-orange-500 text-white font-mono text-[11px] font-bold shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover/preview:translate-y-0 transition-transform">
                <ArrowUpRight className="w-3.5 h-3.5" /> View Project Website
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-black text-zinc-900 group-hover:text-orange-600 transition-colors">
              {project.title}
            </h3>
            <span className="text-xs font-mono font-medium text-zinc-400">
              SYS-0{((project.id || "").length % 9) || 1}
            </span>
          </div>

          <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {(project.technologies || []).slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg bg-zinc-100 border border-zinc-200 text-[11px] font-mono font-medium text-zinc-700 group-hover:border-orange-200 transition-colors shadow-xs"
              >
                {tech}
              </span>
            ))}
            {(project.technologies || []).length > 5 && (
              <span className="px-2 py-1 rounded-lg bg-zinc-100 text-[10px] font-mono text-zinc-500 font-medium">
                +{(project.technologies || []).length - 5}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons: Case Study, Live Demo, GitHub */}
        <div className="pt-4 border-t border-zinc-100 flex items-center justify-between gap-2 relative z-20">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              sound.playClick();
              onOpenCaseStudy(project);
            }}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs font-mono tracking-wider transition-all cursor-pointer shadow-sm shadow-orange-500/25 hover:scale-105 pointer-events-auto"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Case Study</span>
          </button>

          <div className="flex items-center gap-2 relative z-20">
            {project.githubUrl && (
              <a
                href={formatExternalUrl(project.githubUrl)}
                target="_blank"
                rel="noreferrer"
                title="View Repository"
                onMouseEnter={() => sound.playHover()}
                className="p-2 rounded-xl bg-zinc-100 hover:bg-orange-50 text-zinc-600 hover:text-orange-600 border border-zinc-200 hover:border-orange-200 transition-colors cursor-pointer pointer-events-auto shadow-xs"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}

            {project.demoUrl && (
              <a
                href={formatExternalUrl(project.demoUrl)}
                target="_blank"
                rel="noreferrer"
                title="Launch Live Preview"
                onMouseEnter={() => sound.playHover()}
                className="p-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-600 border border-orange-200 transition-colors cursor-pointer pointer-events-auto shadow-xs"
              >
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
