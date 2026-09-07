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
      {/* Top Banner / Graphic representation */}
      <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-gradient-to-b from-orange-50/50 to-white border-b border-zinc-100 flex items-center justify-center">
        {/* Subtle background grid */}
        <div className="absolute inset-0 friendly-grid opacity-40 group-hover:opacity-80 transition-opacity" />

        {/* Ambient Project Glow */}
        <div
          className="absolute w-44 h-44 rounded-full blur-3xl opacity-25 group-hover:opacity-40 transition-opacity pointer-events-none"
          style={{ backgroundColor: project.accentColor || "#FF6B00" }}
        />

        {/* Dynamic Architectural Visual Hologram */}
        <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
          <div
            className="w-14 h-14 rounded-2xl border flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform duration-300 bg-white"
            style={{
              borderColor: `${project.accentColor || "#FF6B00"}50`
            }}
          >
            <Cpu className="w-7 h-7" style={{ color: project.accentColor || "#FF6B00" }} />
          </div>

          <span className="text-xs font-mono font-bold tracking-widest text-zinc-500 uppercase">
            {project.subtitle}
          </span>
        </div>

        {/* Category Pill */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider font-bold bg-white/90 backdrop-blur-md border border-zinc-200 text-zinc-800 shadow-xs">
            {project.category}
          </span>
        </div>

        {/* Key metric badge */}
        {primaryMetric && (
          <div className="absolute top-4 right-4 z-10">
            <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider font-semibold bg-orange-50/90 backdrop-blur-md border border-orange-200 text-orange-700 flex items-center gap-1.5 shadow-xs">
              <Activity className="w-3 h-3 text-orange-500" />
              {primaryMetric.label}: {primaryMetric.value}
            </span>
          </div>
        )}
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
