"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface LogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "icon" | "full" | "symbol";
  className?: string;
  withLink?: boolean;
  animated?: boolean;
  companyName?: string;
  tagline?: string;
}

const sizeMap = {
  xs: { box: "w-8 h-8", text: "text-xs", sub: "text-[7.5px]" },
  sm: { box: "w-10 h-10 sm:w-11 sm:h-11", text: "text-sm sm:text-base", sub: "text-[9px] sm:text-[10px]" },
  md: { box: "w-14 h-14", text: "text-lg", sub: "text-xs" },
  lg: { box: "w-20 h-20", text: "text-2xl", sub: "text-sm" },
  xl: { box: "w-28 h-28", text: "text-3xl", sub: "text-base" },
};

export default function Logo({
  size = "sm",
  variant = "full",
  className = "",
  withLink = false,
  animated = true,
  companyName = "SAMRIDH",
  tagline = "AI/ML × FULL-STACK",
}: LogoProps) {
  const currentSize = sizeMap[size] || sizeMap.sm;

  const BullBadge = (
    <motion.div
      whileHover={animated ? { scale: 1.08, y: -1 } : undefined}
      whileTap={animated ? { scale: 0.95 } : undefined}
      className={`relative ${currentSize.box} rounded-2xl bg-[#090C14] border border-orange-500/40 shadow-[0_4px_18px_rgba(255,107,0,0.25)] flex items-center justify-center p-0.5 overflow-hidden transition-all duration-300 group-hover:border-orange-400 group-hover:shadow-[0_0_22px_rgba(255,107,0,0.55)] ${className}`}
    >
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-radial from-orange-500/20 via-transparent to-transparent opacity-80 pointer-events-none" />

      {/* Stock Market Bull Orange & White Graphic */}
      <img
        src="/bull-logo-orange-animated.gif"
        alt="Samridh Bull Logo"
        className="w-full h-full object-cover rounded-[14px] select-none transform-gpu drop-shadow-[0_2px_8px_rgba(255,107,0,0.4)] group-hover:scale-105 transition-transform"
      />

      {/* Live Market Orange Pulse Beacon */}
      {animated && (
        <span className="absolute top-1 right-1 flex h-2 w-2 pointer-events-none">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500 shadow-[0_0_6px_rgba(255,107,0,0.9)]" />
        </span>
      )}
    </motion.div>
  );

  if (variant === "icon") {
    if (withLink) {
      return (
        <Link href="/" className="inline-flex items-center group cursor-pointer" aria-label={`${companyName} Home`}>
          {BullBadge}
        </Link>
      );
    }
    return BullBadge;
  }

  const Content = (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 group cursor-pointer ${className}`}>
      {BullBadge}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-mono ${currentSize.text} tracking-wider font-black text-zinc-900 group-hover:text-orange-600 transition-colors flex items-center gap-1`}
          >
            {companyName}
          </span>
          <span className="px-1.5 py-0.5 rounded-md bg-orange-50 text-orange-700 font-mono text-[8px] sm:text-[9px] font-black border border-orange-300/80 shadow-xs flex items-center gap-0.5">
            <span className="text-[10px] leading-none text-orange-600 font-bold">▲</span>
            <span>BULL</span>
          </span>
        </div>
        <span
          className={`font-mono ${currentSize.sub} text-zinc-400 tracking-wider font-bold group-hover:text-orange-600 transition-colors mt-0.5 flex items-center gap-1`}
        >
          <span>{tagline}</span>
        </span>
      </div>
    </div>
  );

  if (withLink) {
    return (
      <Link href="/" className="no-underline" aria-label={`${companyName} Home`}>
        {Content}
      </Link>
    );
  }

  return Content;
}
