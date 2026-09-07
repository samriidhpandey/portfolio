"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sound } from "@/lib/audio";
import { Rocket, Sparkles, ArrowRight } from "lucide-react";
import Logo from "@/components/Logo";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Instant skip button handler
  const handleFinish = () => {
    setIsFinished(true);
    onComplete();
  };

  useEffect(() => {
    // Exactly 1.0 second (1000ms) total sequence:
    // 0ms -> 780ms: High-precision linear/eased progression from 0% to 100%
    // 780ms -> 1000ms (220ms): Rocket blast-off lift into orbit & transition
    const startTime = performance.now();
    const duration = 780; // ms to reach 100%

    let frameId: number;
    let completed = false;

    const tick = (now: number) => {
      if (completed) return;
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 100) {
        frameId = requestAnimationFrame(tick);
      } else {
        completed = true;
        sound.playSuccess();
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(onComplete, 180);
        }, 220); // 780ms + 220ms = 1000ms (1.0 second)
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [onComplete]);

  // Telemetry status text
  const getStatusText = () => {
    if (progress < 30) return "CALIBRATING NEURAL ENGINES...";
    if (progress < 70) return "POWERING UP COMPONENT MATRIX...";
    if (progress < 100) return "FINALIZING HIGH-SPEED INTERFACE...";
    return "SYSTEM ONLINE // WELCOME";
  };

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-[#FAFAFB] text-zinc-900 select-none overflow-hidden px-4 sm:px-6 py-8 sm:py-12 transform-gpu"
        >
          {/* Subtle Ambient Bright Glow Orbs (NO dark background) */}
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-orange-400/15 via-amber-300/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 left-[20%] w-[400px] h-[300px] bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute inset-0 friendly-grid opacity-15 pointer-events-none" />

          {/* Top Telemetry Header */}
          <div className="relative z-10 w-full max-w-lg flex items-center justify-between font-mono text-xs text-zinc-600 pt-2 border-b border-zinc-200/80 pb-3">
            <div className="flex items-center gap-2 font-black text-zinc-900">
              <Logo size="xs" variant="icon" animated={false} />
              <span className="tracking-wider">SAMRIDH PANDEY</span>
              <span className="text-zinc-400 font-normal hidden sm:inline">// SYSTEM BOOT</span>
            </div>

            <button
              onClick={handleFinish}
              className="flex items-center gap-1 text-[11px] font-mono font-bold text-orange-600 hover:text-orange-700 px-3 py-1 rounded-full bg-orange-50 hover:bg-orange-100 border border-orange-200/80 transition-colors cursor-pointer"
            >
              <span>SKIP</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Centerpiece: Fast Ascending Sleek Rocket + High-Tech Speed Glow */}
          <div className="relative z-10 flex flex-col items-center justify-center my-auto w-full max-w-md">
            
            {/* Rocket Motion Container */}
            <motion.div
              animate={{
                y: progress >= 100 ? -480 : -((progress / 100) * 80),
                scale: progress >= 100 ? 1.08 : 1,
              }}
              transition={
                progress >= 100
                  ? { duration: 0.22, ease: "easeIn" }
                  : { duration: 0.05, ease: "linear" }
              }
              className="relative flex flex-col items-center transform-gpu will-change-transform mb-6"
            >
              {/* Rocket Body */}
              <div className="relative w-28 h-36 sm:w-32 sm:h-40 drop-shadow-[0_15px_35px_rgba(249,115,22,0.3)]">
                <svg viewBox="0 0 200 260" fill="none" className="w-full h-full">
                  <defs>
                    <linearGradient id="rocketBodyGrad" x1="50" y1="20" x2="150" y2="200" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="50%" stopColor="#F4F4F5" />
                      <stop offset="100%" stopColor="#E4E4E7" />
                    </linearGradient>

                    <linearGradient id="rocketFinGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#FF6B00" />
                      <stop offset="100%" stopColor="#EA580C" />
                    </linearGradient>

                    <linearGradient id="rocketWindowGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#0284C7" />
                      <stop offset="100%" stopColor="#0369A1" />
                    </linearGradient>

                    <linearGradient id="flameGrad" x1="100" y1="190" x2="100" y2="260" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="25%" stopColor="#FDE047" />
                      <stop offset="60%" stopColor="#FF6B00" />
                      <stop offset="100%" stopColor="#EA580C" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Rocket Left & Right Fins */}
                  <path d="M 60 140 C 40 160 25 190 20 205 C 40 205 60 195 70 185 Z" fill="url(#rocketFinGrad)" />
                  <path d="M 140 140 C 160 160 175 190 180 205 C 160 205 140 195 130 185 Z" fill="url(#rocketFinGrad)" />

                  {/* Fuselage Main Hull */}
                  <path
                    d="M 100 20 C 70 60 60 120 62 190 C 75 198 125 198 138 190 C 140 120 130 60 100 20 Z"
                    fill="url(#rocketBodyGrad)"
                    stroke="#D4D4D8"
                    strokeWidth="2.5"
                  />

                  {/* Nose Cone Tip in Accent Orange */}
                  <path
                    d="M 100 20 C 88 38 82 56 80 75 C 93 78 107 78 120 75 C 118 56 112 38 100 20 Z"
                    fill="url(#rocketFinGrad)"
                  />

                  {/* Porthole Window with High-Tech Glow */}
                  <circle cx="100" cy="115" r="22" fill="#E4E4E7" stroke="#FF6B00" strokeWidth="3" />
                  <circle cx="100" cy="115" r="16" fill="url(#rocketWindowGrad)" />
                  <circle cx="95" cy="110" r="4.5" fill="#FFFFFF" opacity="0.8" />

                  {/* Rocket Engine Nozzle */}
                  <path d="M 80 190 L 120 190 L 128 206 L 72 206 Z" fill="#27272A" />

                  {/* Energetic High-Speed Thruster Flame */}
                  <motion.path
                    animate={{
                      scaleY: [1, 1.25, 0.95, 1.2],
                      scaleX: [1, 0.9, 1.1, 0.95],
                    }}
                    transition={{
                      duration: 0.18,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{ originX: "100px", originY: "206px" }}
                    d="M 78 206 C 78 235 90 255 100 260 C 110 255 122 235 122 206 Z"
                    fill="url(#flameGrad)"
                  />
                </svg>
              </div>

              {/* Spark particles beneath rocket */}
              <div className="flex gap-2 -mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-ping [animation-delay:0.1s]" />
              </div>
            </motion.div>

            {/* Clean Modern Progress Bar */}
            <div className="w-full space-y-2">
              <div className="flex items-center justify-between text-xs font-mono font-bold">
                <span className="text-zinc-600 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                  {getStatusText()}
                </span>
                <span className="text-orange-600 text-sm font-black tracking-wider">
                  {progress}%
                </span>
              </div>

              {/* Outer bar track */}
              <div className="h-2.5 w-full bg-zinc-200/80 rounded-full overflow-hidden p-0.5 border border-zinc-300/60 shadow-inner">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 shadow-[0_0_12px_rgba(249,115,22,0.5)]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.1 }}
                />
              </div>
            </div>
          </div>

          {/* Bottom Footer Info */}
          <div className="relative z-10 w-full max-w-lg flex items-center justify-between font-mono text-[10px] text-zinc-400 border-t border-zinc-200/80 pt-3">
            <span>TECH STACK: NEXT.JS 16 • THREE.JS • TAILWIND</span>
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              SYSTEM ACTIVE
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
