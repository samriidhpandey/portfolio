"use client";

import { useState, useRef, useEffect } from "react";
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

  const [imgError, setImgError] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const screenRef = useRef<HTMLDivElement>(null);
  const [screenWidth, setScreenWidth] = useState<number>(440);
  const [screenHeight, setScreenHeight] = useState<number>(400);

  useEffect(() => {
    const el = screenRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0) setScreenWidth(rect.width);
      if (rect.height > 0) setScreenHeight(rect.height);
    };

    measure();

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setScreenWidth(entry.contentRect.width);
        }
        if (entry.contentRect.height > 0) {
          setScreenHeight(entry.contentRect.height);
        }
      }
    });

    observer.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const VIRTUAL_WIDTH = 1024;
  const iframeScale = screenWidth > 0 ? screenWidth / VIRTUAL_WIDTH : 0.43;
  const IFRAME_PAGE_HEIGHT = 4800;
  const scaledIframeHeight = IFRAME_PAGE_HEIGHT * iframeScale;
  const iframeMaxScroll = Math.max(0, scaledIframeHeight - screenHeight);

  const isValidImage =
    Boolean(project.image) &&
    (project.image!.startsWith("http://") ||
      project.image!.startsWith("https://") ||
      project.image!.startsWith("/"));

  const liveScreenshotUrl = project.demoUrl
    ? `https://api.microlink.io?url=${encodeURIComponent(formatExternalUrl(project.demoUrl))}&screenshot=true&meta=false&embed=screenshot.url`
    : null;

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
      {/* Real Website Browser Frame (Full Width Edge-to-Edge) */}
      <div
        onClick={(e) => {
          if (project.demoUrl) {
            sound.playClick();
            window.open(formatExternalUrl(project.demoUrl), "_blank", "noopener,noreferrer");
          }
        }}
        className="relative w-full h-[380px] sm:h-[440px] overflow-hidden bg-white flex flex-col cursor-pointer group/preview"
      >
        {/* Browser Header Bar (Light Theme) */}
        <div className="h-8.5 w-full bg-zinc-100/90 backdrop-blur-md border-b border-zinc-200 px-3.5 flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
          </div>

          {/* Address Bar */}
          <div className="flex-1 max-w-[200px] sm:max-w-[280px] mx-2 h-5.5 rounded-md bg-white border border-zinc-200 flex items-center px-2.5 text-[9.5px] font-mono text-zinc-600 truncate shadow-2xs hover:border-orange-400 transition-colors">
            <span className="text-emerald-600 mr-1.5 font-bold">🔒</span>
            <span className="truncate font-medium">
              {project.demoUrl
                ? project.demoUrl.replace(/^https?:\/\//, "")
                : `${project.title.toLowerCase().replace(/[^a-z0-9]/g, "")}.vercel.app`}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="hidden sm:inline text-[8px] font-mono text-emerald-700 font-bold">LIVE</span>
          </div>
        </div>

        {/* Browser Screen Body (Real Live Project Preview covering 100% Full Width Edge-to-Edge) */}
        <div
          ref={screenRef}
          className="relative w-full flex-1 overflow-hidden bg-white flex items-start justify-center select-none"
        >
          {/* 1. Valid Image Provided */}
          {isValidImage && !imgError ? (
            <div className="w-full h-full overflow-hidden relative bg-white">
              <img
                src={project.image}
                alt={project.title}
                onError={() => setImgError(true)}
                className="w-full h-auto min-h-full object-cover object-top select-none will-change-transform pointer-events-none"
                style={{
                  transform: isHovered ? `translateY(calc(-100% + ${screenHeight}px))` : "translateY(0px)",
                  transition: isHovered ? "transform 7500ms ease-in-out" : "transform 2000ms ease-out"
                }}
              />
            </div>
          ) : project.demoUrl ? (
            /* 2. Real Project Live View on Screen (Auto-scrolling full length scaled iframe covering 100% width) */
            <div className="relative w-full h-full overflow-hidden bg-white">
              <div
                className="w-full relative origin-top-left"
                style={{
                  width: "100%",
                  height: `${scaledIframeHeight}px`,
                  transform: isHovered ? `translateY(-${iframeMaxScroll}px)` : "translateY(0px)",
                  transition: isHovered ? "transform 7500ms ease-in-out" : "transform 2000ms ease-out",
                  willChange: "transform"
                }}
              >
                <iframe
                  src={formatExternalUrl(project.demoUrl)}
                  title={project.title}
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                  onLoad={() => setIframeLoaded(true)}
                  className="border-0 pointer-events-none origin-top-left absolute top-0 left-0"
                  style={{
                    width: `${VIRTUAL_WIDTH}px`,
                    height: `${IFRAME_PAGE_HEIGHT}px`,
                    transform: `scale(${iframeScale})`,
                    transformOrigin: "top left",
                    opacity: iframeLoaded ? 1 : 0.95
                  }}
                />

                {/* Fallback image */}
                {liveScreenshotUrl && (
                  <img
                    src={liveScreenshotUrl}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none -z-10"
                  />
                )}
              </div>
            </div>
          ) : (
            /* 3. Clean light website header mockup fallback */
            <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-br from-orange-50/40 via-white to-orange-50/20 relative">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-lg border flex items-center justify-center bg-white shadow-xs"
                    style={{ borderColor: `${project.accentColor || "#FF6B00"}60` }}
                  >
                    <Cpu className="w-3.5 h-3.5" style={{ color: project.accentColor || "#FF6B00" }} />
                  </div>
                  <span className="text-xs font-black text-zinc-800 tracking-wide">{project.title}</span>
                </div>
                <span className="text-[9px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  ● ONLINE
                </span>
              </div>

              <div className="my-2 space-y-2">
                <p className="text-[10px] font-medium text-zinc-600 line-clamp-2">
                  {project.subtitle}
                </p>
                <div className="grid grid-cols-3 gap-1.5">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-2 rounded-lg bg-white border border-zinc-200/80 shadow-2xs">
                      <div className="w-8 h-1.5 bg-orange-400/80 rounded mb-1" />
                      <div className="w-12 h-2 bg-zinc-200 rounded" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-100 text-[9px] font-mono text-zinc-400">
                <span>DEPLOYED ON VERCEL</span>
                <span className="text-orange-600 font-bold">READY TO VIEW</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card Action Footer: Case Study, GitHub, Live Demo */}
      <div className="px-4 py-3.5 sm:px-5 sm:py-4 bg-white border-t border-zinc-100 flex items-center justify-between gap-2 relative z-20">
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
              onMouseEnter={() => sound.playHover()}
              className="p-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-600 border border-orange-200 transition-colors cursor-pointer pointer-events-auto shadow-xs"
            >
              <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
