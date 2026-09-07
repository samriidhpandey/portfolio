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
    // Silky smooth 60 FPS progress counter increment
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 28);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      sound.playSuccess();
      const timer = setTimeout(() => {
        setIsFinished(true);
        setTimeout(onComplete, 400);
      }, 500);
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
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#FAFAFB] text-zinc-900 select-none overflow-hidden px-6 py-10 transform-gpu"
        >
          {/* 1. Vertical Speed Lines & Starfield */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden transform-gpu">
            <div className="absolute left-[15%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-orange-500/20 to-transparent animate-pulse" />
            <div className="absolute left-[35%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-amber-400/15 to-transparent animate-pulse [animation-delay:0.5s]" />
            <div className="absolute right-[35%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-orange-500/20 to-transparent animate-pulse [animation-delay:1s]" />
            <div className="absolute right-[15%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-amber-400/15 to-transparent animate-pulse [animation-delay:1.5s]" />
            
            {/* Ambient Background Glowing Orb */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-orange-500/12 via-amber-400/8 to-transparent rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* 2. Top Status Badge */}
          <div className="relative z-10 w-full max-w-md flex items-center justify-between font-mono text-xs text-zinc-500 pt-2">
            <span className="flex items-center gap-2 font-bold text-zinc-800">
              <Sparkles className="w-4 h-4 text-orange-500" />
              SAMRIDH.OS // ROCKET LAUNCH
            </span>
            <span className="px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-600 font-bold tracking-wider">
              {progress < 100 ? "ASCENDING" : "ORBIT READY"}
            </span>
          </div>

          {/* 3. CENTERPIECE: 3D Orange Rocket Shooting Upwards (60 FPS Smooth GPU Animation) */}
          <div className="relative z-10 flex flex-col items-center justify-center my-auto w-full max-w-lg">
            
            <motion.div
              animate={{
                y: progress >= 100 ? -800 : -((progress / 100) * 160),
              }}
              transition={
                progress >= 100
                  ? { duration: 0.5, ease: "easeIn" }
                  : { duration: 0.1, ease: "linear" }
              }
              className="relative flex flex-col items-center transform-gpu will-change-transform"
            >
              {/* 3D Rocket SVG Body */}
              <div className="relative w-28 h-36 sm:w-36 sm:h-44 filter drop-shadow-lg">
                <svg viewBox="0 0 200 260" fill="none" className="w-full h-full">
                  <defs>
                    <linearGradient id="rocketBody" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="60%" stopColor="#F4F4F6" />
                      <stop offset="100%" stopColor="#E2E8F0" />
                    </linearGradient>

                    <linearGradient id="rocketOrange" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF6B00" />
                      <stop offset="50%" stopColor="#F97316" />
                      <stop offset="100%" stopColor="#EA580C" />
                    </linearGradient>

                    <linearGradient id="windowGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#64748B" />
                      <stop offset="100%" stopColor="#1E293B" />
                    </linearGradient>
                  </defs>

                  {/* Left Fin */}
                  <path d="M 60 140 Q 20 180 15 220 C 35 220 55 200 65 170 Z" fill="url(#rocketOrange)" />

                  {/* Right Fin */}
                  <path d="M 140 140 Q 180 180 185 220 C 165 220 145 200 135 170 Z" fill="url(#rocketOrange)" />

                  {/* Center Body Capsule */}
                  <path d="M 100 20 C 145 70 145 150 140 210 L 60 210 C 55 150 55 70 100 20 Z" fill="url(#rocketBody)" />

                  {/* Top Nose Cone */}
                  <path d="M 100 20 C 122 45 132 80 134 100 L 66 100 C 68 80 78 45 100 20 Z" fill="url(#rocketOrange)" />

                  {/* Metallic Bottom Rim */}
                  <path d="M 70 210 L 130 210 L 125 225 L 75 225 Z" fill="#94A3B8" />

                  {/* Porthole Window */}
                  <circle cx="100" cy="135" r="24" fill="url(#rocketOrange)" />
                  <circle cx="100" cy="135" r="18" fill="white" />
                  <circle cx="100" cy="135" r="14" fill="url(#windowGlass)" />
                  <circle cx="95" cy="130" r="4" fill="white" opacity="0.8" />
                </svg>

                {/* Fiery Thruster Exhaust Flame (GPU Accelerated) */}
                <motion.div
                  animate={{
                    scaleY: [1, 1.2, 0.95, 1.1],
                    opacity: [0.9, 1, 0.85],
                  }}
                  transition={{ duration: 0.12, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-10 h-16 origin-top pointer-events-none transform-gpu"
                >
                  <div className="w-full h-full bg-gradient-to-b from-amber-300 via-orange-500 to-transparent rounded-b-full shadow-[0_8px_20px_rgba(255,107,0,0.6)]" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-10 bg-white rounded-b-full opacity-90" />
                </motion.div>
              </div>

              {/* Smoke Cloud Fumes */}
              <div className="absolute -bottom-20 flex items-center justify-center gap-2 pointer-events-none opacity-75">
                <div className="w-10 h-10 rounded-full bg-orange-200/50 blur-xs animate-pulse" />
                <div className="w-14 h-14 rounded-full bg-amber-300/50 blur-xs -mt-3 animate-pulse" />
                <div className="w-10 h-10 rounded-full bg-orange-200/50 blur-xs animate-pulse" />
              </div>
            </motion.div>

            {/* Percentage Counter Display */}
            <div className="mt-14 text-center space-y-2">
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
          <div className="relative z-10 w-full max-w-md pb-2">
            <div className="w-full bg-zinc-200/80 rounded-full h-2 overflow-hidden p-0.5 border border-zinc-300/60 shadow-inner">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 shadow-[0_0_10px_rgba(249,115,22,0.5)]"
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.05, ease: "linear" }}
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
