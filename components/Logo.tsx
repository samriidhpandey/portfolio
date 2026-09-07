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
  xs: { box: "w-6 h-6", svg: 24, text: "text-xs", sub: "text-[7px]" },
  sm: { box: "w-8 h-8", svg: 32, text: "text-sm", sub: "text-[9px]" },
  md: { box: "w-10 h-10", svg: 40, text: "text-base", sub: "text-[10px]" },
  lg: { box: "w-12 h-12", svg: 48, text: "text-lg", sub: "text-xs" },
  xl: { box: "w-16 h-16", svg: 64, text: "text-2xl", sub: "text-sm" },
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
      className={`relative ${currentSize.box} rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md select-none"
      >
        <defs>
          {/* Obsidian Metallic Background */}
          <linearGradient id="spBgGrad" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0B0D13" />
            <stop offset="50%" stopColor="#131722" />
            <stop offset="100%" stopColor="#1B202E" />
          </linearGradient>

          {/* Core Electric Orange -> Amber Flame Gradient */}
          <linearGradient id="spOrangeGrad" x1="15" y1="20" x2="85" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF5500" />
            <stop offset="45%" stopColor="#FF7A00" />
            <stop offset="85%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#FCD34D" />
          </linearGradient>

          {/* Border Glow Gradient */}
          <linearGradient id="spBorderGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FF5500" stopOpacity="0.7" />
          </linearGradient>

          {/* Neural Core Radial Glow */}
          <radialGradient id="spCoreGlow" cx="50" cy="50" r="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#FF6B00" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
          </radialGradient>

          {/* Filter Glow */}
          <filter id="spGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Squircle Chassis */}
        <rect
          x="4"
          y="4"
          width="92"
          height="92"
          rx="24"
          fill="url(#spBgGrad)"
          stroke="url(#spBorderGrad)"
          strokeWidth="2.5"
        />

        {/* Ambient Core Aura */}
        <circle cx="50" cy="50" r="32" fill="url(#spCoreGlow)" />

        {/* Tech Circuit Traces in Corners */}
        <path
          d="M 22 16 L 16 22 L 16 32"
          stroke="#FF7A00"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.4"
        />
        <path
          d="M 78 16 L 84 22 L 84 32"
          stroke="#FF7A00"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.4"
        />
        <path
          d="M 16 68 L 16 78 L 22 84"
          stroke="#FF7A00"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.4"
        />
        <path
          d="M 84 68 L 84 78 L 78 84"
          stroke="#FF7A00"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.4"
        />

        {/* Monogram: The Futuristic Stylized "S" */}
        {/* S-curve path flowing from top right down through center to bottom left */}
        <path
          d="M 46 27 L 33 27 C 27 27 24 30 24 36 C 24 43 28 46 36 48 L 44 50 C 53 52 57 56 57 63 C 57 70 52 73 45 73 L 28 73"
          stroke="url(#spOrangeGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#spGlowFilter)"
        />

        {/* Monogram: The Futuristic Stylized "P" */}
        {/* P spine and loop on the right, interlocking with the neural network */}
        <path
          d="M 53 27 L 66 27 C 73 27 77 31 77 38 C 77 45 73 49 66 49 L 53 49 L 53 73"
          stroke="url(#spOrangeGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#spGlowFilter)"
        />

        {/* Neural Synapse Interconnect Nodes (Glowing Dots) */}
        {/* Node 1: Top S anchor */}
        <circle cx="46" cy="27" r="3.5" fill="#FCD34D" />
        {/* Node 2: P upper loop apex */}
        <circle cx="77" cy="38" r="3.5" fill="#FCD34D" />
        {/* Node 3: Center Neural Nexus Bridge */}
        <circle cx="53" cy="49" r="4" fill="#FFFFFF" stroke="#FF5500" strokeWidth="2" />
        {/* Node 4: Bottom S terminus */}
        <circle cx="28" cy="73" r="3.5" fill="#FF7A00" />
        {/* Node 5: P base anchor */}
        <circle cx="53" cy="73" r="3.5" fill="#F59E0B" />

        {/* Central Quantum Sparkle */}
        <circle cx="53" cy="49" r="1.5" fill="#FFFFFF" />
      </svg>

      {/* Optional micro active pulse beacon */}
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
          className={`font-mono ${currentSize.sub} text-zinc-400 tracking-wider font-medium group-hover:text-zinc-600 transition-colors mt-0.5`}
        >
          AI/ML × FULL-STACK
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
