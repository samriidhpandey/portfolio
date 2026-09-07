"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sound } from "@/lib/audio";
import { Sparkles, Zap } from "lucide-react";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Smooth progress counter from 0% to 100%
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 4;
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      sound.playSuccess();
      const timer = setTimeout(() => {
        setIsFinished(true);
        setTimeout(onComplete, 500);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  // Launch Status Message
  const getStatusMessage = () => {
    if (progress < 25) return "SYSTEM IGNITION & THRUSTER PREPARATION...";
    if (progress < 60) return "LIFT-OFF & ASCENDING AT FULL VELOCITY...";
    if (progress < 90) return "BREAKING ATMOSPHERE // SYSTEM INITIALIZING...";
    return "TARGET REACHED! WELCOME TO DIGITAL PLATFORM 🚀";
  };

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#FAFAFB] text-zinc-900 select-none overflow-hidden px-6 py-12"
        >
          {/* 1. Vertical Speed Lines & Starfield (Simulating High Velocity Ascent) */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Speed Streak Lines */}
            <div className="absolute left-[15%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-orange-500/25 to-transparent animate-pulse" />
            <div className="absolute left-[35%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-amber-400/20 to-transparent animate-pulse [animation-delay:0.5s]" />
            <div className="absolute right-[35%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-orange-500/25 to-transparent animate-pulse [animation-delay:1s]" />
            <div className="absolute right-[15%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-amber-400/20 to-transparent animate-pulse [animation-delay:1.5s]" />
            
            {/* Ambient Background Glowing Orbs */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-orange-500/15 via-amber-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* 2. Top Status Badge */}
          <div className="relative z-10 w-full max-w-md flex items-center justify-between font-mono text-xs text-zinc-500 pt-4">
            <span className="flex items-center gap-2 font-bold text-zinc-800">
              <Sparkles className="w-4 h-4 text-orange-500" />
              SAMRIDH.OS // ROCKET LAUNCH
            </span>
            <span className="px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-600 font-bold tracking-wider">
              {progress < 100 ? "ASCENDING" : "ORBIT READY"}
            </span>
          </div>

          {/* 3. CENTERPIECE: 3D Orange Rocket Shooting Upwards */}
          <div className="relative z-10 flex flex-col items-center justify-center my-auto w-full max-w-lg">
            
            {/* 3D Rocket Container with Dynamic Flight Trajectory (Shoots Up as % increases) */}
            <motion.div
              style={{
                bottom: `${Math.min(progress, 100) * 0.45}%`,
              }}
              animate={{
                y: progress >= 100 ? -700 : [0, -6, 0],
                x: [0, 2, -2, 0],
              }}
              transition={
                progress >= 100
                  ? { duration: 0.6, ease: "easeIn" }
                  : { duration: 0.4, repeat: Infinity, ease: "easeInOut" }
              }
              className="relative flex flex-col items-center"
            >
              {/* 3D Rocket SVG Body (Exact styling as in the banner image) */}
              <div className="relative w-28 h-36 sm:w-36 sm:h-44 drop-shadow-[0_20px_40px_rgba(249,115,22,0.35)]">
                <svg viewBox="0 0 200 260" fill="none" className="w-full h-full">
                  <defs>
                    {/* Rocket Body Gradient */}
                    <linearGradient id="rocketBody" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="60%" stopColor="#F4F4F6" />
                      <stop offset="100%" stopColor="#E2E8F0" />
                    </linearGradient>

                    {/* Orange Nose & Fin Gradient */}
                    <linearGradient id="rocketOrange" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF6B00" />
                      <stop offset="50%" stopColor="#F97316" />
                      <stop offset="100%" stopColor="#EA580C" />
                    </linearGradient>

                    {/* Glass Window Highlight */}
                    <linearGradient id="windowGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#64748B" />
                      <stop offset="100%" stopColor="#1E293B" />
                    </linearGradient>

                    {/* Fire Thrust Gradient */}
                    <linearGradient id="fireThrust" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FFC107" />
                      <stop offset="40%" stopColor="#FF6B00" />
                      <stop offset="100%" stopColor="rgba(239, 68, 68, 0)" />
                    </linearGradient>
                  </defs>

                  {/* Left Orange Fin */}
                  <path d="M 60 140 Q 20 180 15 220 C 35 220 55 200 65 170 Z" fill="url(#rocketOrange)" />

                  {/* Right Orange Fin */}
                  <path d="M 140 140 Q 180 180 185 220 C 165 220 145 200 135 170 Z" fill="url(#rocketOrange)" />

                  {/* Center Rocket Body Capsule */}
                  <path d="M 100 20 C 145 70 145 150 140 210 L 60 210 C 55 150 55 70 100 20 Z" fill="url(#rocketBody)" />

                  {/* Orange Top Nose Cone */}
                  <path d="M 100 20 C 122 45 132 80 134 100 L 66 100 C 68 80 78 45 100 20 Z" fill="url(#rocketOrange)" />

                  {/* Metallic Nozzle Bottom Rim */}
                  <path d="M 70 210 L 130 210 L 125 225 L 75 225 Z" fill="#94A3B8" />

                  {/* Porole Window Ring */}
                  <circle cx="100" cy="135" r="24" fill="url(#rocketOrange)" />
                  <circle cx="100" cy="135" r="18" fill="white" />
                  <circle cx="100" cy="135" r="14" fill="url(#windowGlass)" />
                  <circle cx="95" cy="130" r="4" fill="white" opacity="0.8" />
                </svg>

                {/* Dynamic Fiery Thruster Exhaust Flame */}
                <motion.div
                  animate={{
                    scaleY: [1, 1.25, 0.9, 1.15],
                    scaleX: [1, 0.9, 1.1, 1],
                    opacity: [0.85, 1, 0.8],
                  }}
                  transition={{ duration: 0.15, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-12 h-20 origin-top pointer-events-none"
                >
                  <div className="w-full h-full bg-gradient-to-b from-yellow-300 via-orange-500 to-transparent rounded-b-full blur-xs shadow-[0_10px_25px_rgba(255,107,0,0.8)]" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-12 bg-white rounded-b-full blur-2xs" />
                </motion.div>
              </div>

              {/* Smoke Cloud Fumes Trail */}
              <div className="absolute -bottom-24 flex items-center justify-center gap-2 pointer-events-none opacity-80">
                <motion.div
                  animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                  className="w-12 h-12 rounded-full bg-orange-200/50 blur-md"
                />
                <motion.div
                  animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0.9, 0.5] }}
                  transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                  className="w-16 h-16 rounded-full bg-amber-300/60 blur-lg -mt-4"
                />
                <motion.div
                  animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                  className="w-12 h-12 rounded-full bg-orange-200/50 blur-md"
                />
              </div>
            </motion.div>

            {/* Percentage Progress Display */}
            <div className="mt-16 text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-orange-500/30 shadow-md">
                <Zap className="w-4 h-4 text-orange-600 animate-bounce" />
                <span className="font-mono text-3xl sm:text-5xl font-black text-zinc-900 tracking-tight">
                  {Math.min(progress, 100)}
                  <span className="text-orange-600">%</span>
                </span>
              </div>

              <p className="text-xs sm:text-sm font-mono font-bold text-orange-700 tracking-wider h-6">
                {getStatusMessage()}
              </p>
            </div>

          </div>

          {/* 4. Bottom Progress Bar */}
          <div className="relative z-10 w-full max-w-md pb-4">
            <div className="w-full bg-zinc-200/80 rounded-full h-2 overflow-hidden p-0.5 border border-zinc-300/60 shadow-inner">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 shadow-[0_0_12px_rgba(249,115,22,0.6)]"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
            <div className="flex justify-between items-center mt-2 text-[10px] font-mono text-zinc-400 font-bold uppercase">
              <span>00 // IGNITION</span>
              <span>100 // ORBIT</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
