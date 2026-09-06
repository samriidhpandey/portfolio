"use client";

import { motion } from "framer-motion";

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Floating Aurora Glow 1 - Top Right Warm Amber */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-32 -right-32 w-[650px] h-[650px] rounded-full bg-gradient-to-bl from-orange-400/20 via-amber-300/15 to-transparent blur-3xl opacity-80"
      />

      {/* Floating Aurora Glow 2 - Mid Left Orange */}
      <motion.div
        animate={{
          x: [0, -40, 50, 0],
          y: [0, 60, -40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-[35%] -left-32 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-orange-500/18 via-amber-400/12 to-transparent blur-3xl opacity-75"
      />

      {/* Floating Aurora Glow 3 - Bottom Right Sunset */}
      <motion.div
        animate={{
          x: [0, 30, -40, 0],
          y: [0, -40, 50, 0],
          scale: [1, 1.2, 1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute bottom-10 right-[5%] w-[600px] h-[600px] rounded-full bg-gradient-to-t from-orange-600/15 via-amber-500/12 to-transparent blur-3xl opacity-70"
      />

      {/* Ambient Micro Pulsing Particles / Stars */}
      <div className="absolute top-[18%] left-[25%] w-2 h-2 rounded-full bg-orange-500/40 animate-ping [animation-duration:3s]" />
      <div className="absolute top-[45%] right-[20%] w-2.5 h-2.5 rounded-full bg-amber-500/40 animate-ping [animation-duration:4s] [animation-delay:1.5s]" />
      <div className="absolute top-[75%] left-[18%] w-2 h-2 rounded-full bg-orange-400/35 animate-ping [animation-duration:5s] [animation-delay:2.5s]" />
      <div className="absolute top-[88%] right-[35%] w-2 h-2 rounded-full bg-amber-400/40 animate-ping [animation-duration:3.5s] [animation-delay:0.8s]" />
    </div>
  );
}
