"use client";

import { motion } from "framer-motion";

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating Aurora Glow 1 - Top Right Warm Amber */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.15, 0.95, 1],
          opacity: [0.65, 0.85, 0.65],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-32 -right-32 w-[650px] h-[650px] rounded-full bg-gradient-to-bl from-orange-400/25 via-amber-300/18 to-transparent blur-3xl pointer-events-none"
      />

      {/* Floating Aurora Glow 2 - Mid Left Orange */}
      <motion.div
        animate={{
          x: [0, -40, 50, 0],
          y: [0, 60, -40, 0],
          scale: [1, 0.9, 1.1, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-[35%] -left-32 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-orange-500/22 via-amber-400/15 to-transparent blur-3xl pointer-events-none"
      />

      {/* Floating Aurora Glow 3 - Bottom Right Sunset */}
      <motion.div
        animate={{
          x: [0, 30, -40, 0],
          y: [0, -40, 50, 0],
          scale: [1, 1.2, 1, 1],
          opacity: [0.55, 0.75, 0.55],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute bottom-10 right-[5%] w-[600px] h-[600px] rounded-full bg-gradient-to-t from-orange-600/18 via-amber-500/15 to-transparent blur-3xl pointer-events-none"
      />

      {/* Ambient Pulsing Glowing Particles / Stars with Infinite Looping */}
      <motion.div
        animate={{ opacity: [0.3, 0.85, 0.3], scale: [0.9, 1.3, 0.9] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[18%] left-[25%] w-2.5 h-2.5 rounded-full bg-orange-500/60 shadow-[0_0_10px_#FF6B00] pointer-events-none"
      />
      <motion.div
        animate={{ opacity: [0.25, 0.8, 0.25], scale: [0.9, 1.35, 0.9] }}
        transition={{ duration: 4.1, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[45%] right-[20%] w-3 h-3 rounded-full bg-amber-500/60 shadow-[0_0_12px_#F59E0B] pointer-events-none"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.75, 0.3], scale: [0.85, 1.25, 0.85] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[75%] left-[18%] w-2.5 h-2.5 rounded-full bg-orange-400/55 shadow-[0_0_10px_#FB923C] pointer-events-none"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.9, 1.3, 0.9] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-[88%] right-[35%] w-2.5 h-2.5 rounded-full bg-amber-400/60 shadow-[0_0_10px_#FBBF24] pointer-events-none"
      />
    </div>
  );
}
