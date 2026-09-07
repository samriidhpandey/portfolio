"use client";

import React from "react";
import Link from "next/link";

interface LogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "icon" | "full" | "symbol";
  className?: string;
  withLink?: boolean;
  animated?: boolean;
}

const sizeMap = {
  xs: { box: "w-6 h-6", text: "text-xs", sub: "text-[7px]" },
  sm: { box: "w-8 h-8", text: "text-sm", sub: "text-[9px]" },
  md: { box: "w-10 h-10", text: "text-base", sub: "text-[10px]" },
  lg: { box: "w-12 h-12", text: "text-lg", sub: "text-xs" },
  xl: { box: "w-16 h-16", text: "text-2xl", sub: "text-sm" },
};

export default function Logo({
  size = "sm",
  variant = "full",
  className = "",
  withLink = false,
  animated = true,
}: LogoProps) {
  const currentSize = sizeMap[size] || sizeMap.sm;

  const LogoIcon = (
    <div
      className={`relative ${currentSize.box} flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_16px_rgba(249,115,22,0.5)] ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md select-none"
      >
        <defs>
          {/* Deep Obsidian Metallic Chassis Gradient */}
          <linearGradient id="compHexBg" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#080A10" />
            <stop offset="50%" stopColor="#121622" />
            <stop offset="100%" stopColor="#1A1F30" />
          </linearGradient>

          {/* Outer Bevel Glow Gradient */}
          <linearGradient id="compHexBorder" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF5500" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#FF9500" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FF5500" stopOpacity="0.9" />
          </linearGradient>

          {/* Primary Solar Flame (S & P ribbons) */}
          <linearGradient id="compRibbonGrad" x1="20" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF3700" />
            <stop offset="30%" stopColor="#FF6B00" />
            <stop offset="70%" stopColor="#FF9E00" />
            <stop offset="100%" stopColor="#FCD34D" />
          </linearGradient>

          {/* P-Loop Shimmer Accent Gradient */}
          <linearGradient id="compPLoopGrad" x1="50" y1="20" x2="80" y2="52" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFA800" />
            <stop offset="50%" stopColor="#FF6B00" />
            <stop offset="100%" stopColor="#FF3B00" />
          </linearGradient>

          {/* Central Singularity Radial Glow */}
          <radialGradient id="compNexusGlow" cx="50" cy="50" r="35" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#FF9500" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#FF5500" stopOpacity="0" />
          </radialGradient>

          {/* High-Definition Drop Shadow / Neon Bloom */}
          <filter id="compNeonBloom" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Faceted Hexagon Chassis */}
        <path
          d="M 50 6 L 86 26.8 A 5 5 0 0 1 88.5 31.1 L 88.5 68.9 A 5 5 0 0 1 86 73.2 L 50 94 A 5 5 0 0 1 47.5 94 L 14 73.2 A 5 5 0 0 1 11.5 68.9 L 11.5 31.1 A 5 5 0 0 1 14 26.8 Z"
          fill="url(#compHexBg)"
          stroke="url(#compHexBorder)"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />

        {/* Ambient Core Radiation */}
        <circle cx="50" cy="50" r="32" fill="url(#compNexusGlow)" />

        {/* Circuit Traces */}
        <path d="M 50 6 L 50 18" stroke="#FF7A00" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.5" />
        <path d="M 50 94 L 50 82" stroke="#FF7A00" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.5" />
        <path d="M 12 50 L 22 50" stroke="#FF7A00" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.4" />
        <path d="M 88 50 L 78 50" stroke="#FF7A00" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.4" />

        {/* Diagonal Corner Accents */}
        <path d="M 23 31 L 28 36" stroke="#FFA800" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4" />
        <path d="M 77 31 L 72 36" stroke="#FFA800" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4" />
        <path d="M 23 69 L 28 64" stroke="#FFA800" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4" />
        <path d="M 77 69 L 72 64" stroke="#FFA800" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4" />

        {/* Unique Monogram "S" & "P" Geometric Nexus */}
        <g filter="url(#compNeonBloom)" opacity="0.95">
          <path
            d="M 45 25 L 30 25 A 6 6 0 0 0 24 31 L 24 37 A 6 6 0 0 0 30 43 L 44 47 A 6 6 0 0 1 50 53 L 50 59 A 6 6 0 0 1 44 65 L 28 65"
            stroke="url(#compRibbonGrad)"
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M 52 25 L 70 25 A 9 9 0 0 1 79 34 L 79 36 A 9 9 0 0 1 70 45 L 52 45 M 52 25 L 52 75"
            stroke="url(#compPLoopGrad)"
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Crisp White Specular Highlights */}
        <path
          d="M 45 25 L 30 25 A 6 6 0 0 0 24 31 L 24 37 A 6 6 0 0 0 30 43 L 44 47 A 6 6 0 0 1 50 53 L 50 59 A 6 6 0 0 1 44 65 L 28 65"
          stroke="#FFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.75"
        />

        <path
          d="M 52 25 L 70 25 A 9 9 0 0 1 79 34 L 79 36 A 9 9 0 0 1 70 45 L 52 45 M 52 25 L 52 75"
          stroke="#FFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.75"
        />

        {/* Synapse Nodes */}
        <circle cx="45" cy="25" r="3.2" fill="#FDE047" />
        <circle cx="45" cy="25" r="1.4" fill="#FFFFFF" />

        <circle cx="79" cy="35" r="3.2" fill="#FDE047" />
        <circle cx="79" cy="35" r="1.4" fill="#FFFFFF" />

        {/* Center Quantum Singularity */}
        <polygon points="52,41 57,46 52,51 47,46" fill="#FFFFFF" stroke="#FF5500" strokeWidth="1.8" />
        <circle cx="52" cy="46" r="1.2" fill="#FF5500" />

        <circle cx="28" cy="65" r="3.2" fill="#FF6B00" />
        <circle cx="28" cy="65" r="1.4" fill="#FFFFFF" />

        <circle cx="52" cy="75" r="3.2" fill="#FFA800" />
        <circle cx="52" cy="75" r="1.4" fill="#FFFFFF" />
      </svg>

      {/* Pulse Beacon */}
      {animated && (
        <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500 shadow-[0_0_6px_rgba(249,115,22,0.9)]" />
        </span>
      )}
    </div>
  );

  if (variant === "icon") {
    if (withLink) {
      return (
        <Link href="/" className="inline-flex items-center group cursor-pointer" aria-label="Samridh Pandey Home">
          {LogoIcon}
        </Link>
      );
    }
    return LogoIcon;
  }

  const Content = (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 group cursor-pointer ${className}`}>
      {LogoIcon}
      <div className="flex flex-col text-left">
        <span
          className={`font-mono ${currentSize.text} tracking-wider font-black text-zinc-900 group-hover:text-orange-600 transition-colors flex items-center gap-1.5 leading-none`}
        >
          SAMRIDH
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
        </span>
        <span
          className={`font-mono ${currentSize.sub} text-zinc-400 tracking-wider font-bold group-hover:text-zinc-600 transition-colors mt-0.5`}
        >
          AI/ML × BUSINESS SYSTEMS
        </span>
      </div>
    </div>
  );

  if (withLink) {
    return (
      <Link href="/" className="no-underline" aria-label="Samridh Pandey Home">
        {Content}
      </Link>
    );
  }

  return Content;
}
