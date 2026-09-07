"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sound } from "@/lib/audio";
import { Sparkles, Zap, Rocket, ShieldCheck } from "lucide-react";

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
      }, 550);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  // Telemetry status updates
  const getStatusText = () => {
    if (progress < 25) return "IGNITION & THRUST PREPARATION...";
    if (progress < 60) return "ASCENDING THROUGH STRATOSPHERE...";
    if (progress < 90) return "BREAKING ATMOSPHERE // INITIALIZING DEEP SPACE...";
    return "SUCCESSFUL ORBIT! WELCOME ABOARD 🚀";
  };

  // Generate 45 twinkling space star coordinates
  const stars = Array.from({ length: 45 }, (_, i) => ({
    id: i,
    top: `${(i * 19 + 7) % 94}%`,
    left: `${(i * 23 + 11) % 96}%`,
    size: (i % 3) + 1.5,
    delay: (i % 5) * 0.4,
    duration: 1.5 + (i % 4) * 0.5,
    color: i % 4 === 0 ? "#FF6B00" : i % 3 === 0 ? "#F59E0B" : "#FFFFFF",
  }));

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-gradient-to-b from-[#080B14] via-[#0F172A] to-[#1E1B4B] text-white select-none overflow-hidden px-4 sm:px-6 py-8 sm:py-12 transform-gpu"
        >
          {/* ========================================================================= */}
          {/* 1. PHOTOREALISTIC TWINKLING SPACE STARFIELD & NEBULA ATMOSPHERE          */}
          {/* ========================================================================= */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Glowing Star Nodes */}
            {stars.map((star) => (
              <motion.div
                key={star.id}
                animate={{
                  opacity: [0.2, 0.95, 0.2],
                  scale: [0.8, 1.3, 0.8],
                }}
                transition={{
                  duration: star.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: star.delay,
                }}
                style={{
                  top: star.top,
                  left: star.left,
                  width: star.size,
                  height: star.size,
                  backgroundColor: star.color,
                  boxShadow: `0 0 ${star.size * 3}px ${star.color}`,
                }}
                className="absolute rounded-full"
              />
            ))}

            {/* Vertical Velocity Speed Lines */}
            <div className="absolute left-[12%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-orange-500/25 to-transparent animate-pulse" />
            <div className="absolute left-[32%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-amber-400/20 to-transparent animate-pulse [animation-delay:0.4s]" />
            <div className="absolute right-[32%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-orange-500/25 to-transparent animate-pulse [animation-delay:0.8s]" />
            <div className="absolute right-[12%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-amber-400/20 to-transparent animate-pulse [animation-delay:1.2s]" />

            {/* Glowing Cosmic Nebula Clouds */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-orange-600/20 via-amber-500/15 to-purple-600/10 rounded-full blur-3xl" />
          </div>

          {/* 2. Top Telemetry Header */}
          <div className="relative z-10 w-full max-w-md flex items-center justify-between font-mono text-xs text-zinc-300 pt-2 border-b border-white/10 pb-3">
            <span className="flex items-center gap-2 font-bold text-white">
              <Rocket className="w-4 h-4 text-orange-500 animate-bounce" />
              SAMRIDH.OS // SPACE LAUNCH
            </span>
            <span className="px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 font-bold tracking-wider">
              {progress < 100 ? "ASCENDING" : "ORBIT READY"}
            </span>
          </div>

          {/* 3. CENTERPIECE: Real 3D Metallic Rocket Shooting Into Space */}
          <div className="relative z-10 flex flex-col items-center justify-center my-auto w-full max-w-lg">
            
            {/* Rocket Trajectory Motion */}
            <motion.div
              animate={{
                y: progress >= 100 ? -850 : -((progress / 100) * 170),
              }}
              transition={
                progress >= 100
                  ? { duration: 0.55, ease: "easeIn" }
                  : { duration: 0.1, ease: "linear" }
              }
              className="relative flex flex-col items-center transform-gpu will-change-transform"
            >
              {/* Realistic 3D Rocket Body Render */}
              <div className="relative w-32 h-44 sm:w-40 sm:h-52 drop-shadow-[0_25px_50px_rgba(249,115,22,0.45)]">
                <svg viewBox="0 0 200 260" fill="none" className="w-full h-full">
                  <defs>
                    {/* Metallic Silver Body Gradient */}
                    <linearGradient id="rocketBodySilver" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="35%" stopColor="#F8FAFC" />
                      <stop offset="70%" stopColor="#CBD5E1" />
                      <stop offset="100%" stopColor="#94A3B8" />
                    </linearGradient>

                    {/* Glossy Metallic Orange Fins Gradient */}
                    <linearGradient id="rocketGlossyOrange" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF7A00" />
                      <stop offset="50%" stopColor="#FF5500" />
                      <stop offset="100%" stopColor="#CC3300" />
                    </linearGradient>

                    {/* Window Metallic Bezel */}
                    <linearGradient id="portholeBezel" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F1F5F9" />
                      <stop offset="100%" stopColor="#475569" />
                    </linearGradient>

                    {/* Dark Glass Window */}
                    <linearGradient id="portholeGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38BDF8" />
                      <stop offset="50%" stopColor="#0284C7" />
                      <stop offset="100%" stopColor="#090D16" />
                    </linearGradient>
                  </defs>

                  {/* Outer Thruster Flame Glow Behind Fins */}
                  <circle cx="100" cy="225" r="35" fill="rgba(249, 115, 22, 0.4)" filter="blur(10px)" />

                  {/* Left Metallic Orange Fin */}
                  <path d="M 58 135 Q 15 175 10 218 C 32 218 52 198 62 165 Z" fill="url(#rocketGlossyOrange)" />
                  <path d="M 58 135 Q 35 170 30 215 C 40 215 52 198 62 165 Z" fill="rgba(255,255,255,0.25)" />

                  {/* Right Metallic Orange Fin */}
                  <path d="M 142 135 Q 185 175 190 218 C 168 218 148 198 138 165 Z" fill="url(#rocketGlossyOrange)" />
                  <path d="M 142 135 Q 165 170 170 215 C 160 215 148 198 138 165 Z" fill="rgba(0,0,0,0.15)" />

                  {/* Main Capsule Body */}
                  <path d="M 100 18 C 148 68 148 148 142 208 L 58 208 C 52 148 52 68 100 18 Z" fill="url(#rocketBodySilver)" />

                  {/* Top Glossy Orange Nose Cone */}
                  <path d="M 100 18 C 124 42 134 78 136 98 L 64 98 C 66 78 76 42 100 18 Z" fill="url(#rocketGlossyOrange)" />
                  <path d="M 100 18 C 115 35 124 65 125 98 L 100 98 Z" fill="rgba(255,255,255,0.2)" />

                  {/* Metallic Nozzle Bottom Rim */}
                  <path d="M 68 208 L 132 208 L 126 226 L 74 226 Z" fill="#475569" />
                  <path d="M 74 226 L 126 226 L 122 232 L 78 232 Z" fill="#1E293B" />

                  {/* Metallic Porthole Window */}
                  <circle cx="100" cy="132" r="26" fill="url(#portholeBezel)" />
                  <circle cx="100" cy="132" r="21" fill="url(#portholeGlass)" />
                  <circle cx="93" cy="125" r="6" fill="white" opacity="0.8" />
                  <circle cx="104" cy="138" r="3" fill="white" opacity="0.5" />
                </svg>

                {/* Fiery Plasma Thruster Stream */}
                <motion.div
                  animate={{
                    scaleY: [1, 1.25, 0.9, 1.15],
                    scaleX: [1, 0.9, 1.1, 1],
                    opacity: [0.9, 1, 0.85],
                  }}
                  transition={{ duration: 0.1, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-12 h-20 origin-top pointer-events-none transform-gpu"
                >
                  <div className="w-full h-full bg-gradient-to-b from-yellow-300 via-orange-500 to-transparent rounded-b-full shadow-[0_12px_30px_rgba(255,107,0,0.9)]" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-12 bg-white rounded-b-full opacity-95 blur-2xs" />
                </motion.div>
              </div>

              {/* Billowing Smoke Clouds */}
              <div className="absolute -bottom-24 flex items-center justify-center gap-2 pointer-events-none opacity-80">
                <div className="w-12 h-12 rounded-full bg-orange-500/40 blur-md animate-pulse" />
                <div className="w-16 h-16 rounded-full bg-amber-400/50 blur-md -mt-3 animate-pulse" />
                <div className="w-12 h-12 rounded-full bg-orange-500/40 blur-md animate-pulse" />
              </div>
            </motion.div>

            {/* Digital Percentage Display Card */}
            <div className="mt-16 text-center space-y-3">
              <div className="inline-flex items-center gap-2.5 px-6 py-2 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
                <Zap className="w-5 h-5 text-orange-400 animate-bounce" />
                <span className="font-mono text-4xl sm:text-6xl font-black text-white tracking-tight">
                  {Math.min(progress, 100)}
                  <span className="text-orange-500">%</span>
                </span>
              </div>

              {/* Real-time Status Message */}
              <p className="text-xs sm:text-sm font-mono font-bold text-orange-400 tracking-wider h-6">
                {getStatusText()}
              </p>
            </div>

          </div>

          {/* 4. Bottom Launch Telemetry & Progress Gauge */}
          <div className="relative z-10 w-full max-w-md pb-2 space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 font-bold uppercase">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" /> ALTITUDE: {Math.floor(progress * 3.8)} KM
              </span>
              <span className="text-orange-400">VELOCITY: {Math.floor(progress * 42)} KM/H</span>
            </div>

            <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden p-0.5 border border-white/15 shadow-inner">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.8)]"
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.05, ease: "linear" }}
              />
            </div>

            <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500 font-semibold uppercase">
              <span>LAUNCH CONTROL // IST</span>
              <span>ORBITAL VERIFICATION</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
