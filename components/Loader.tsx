"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sound } from "@/lib/audio";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [step, setStep] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const sequence = [
    { text: "INITIALIZING SAMRIDH.SYSTEM", status: "PENDING" },
    { text: "AI CORE", status: "READY" },
    { text: "WEB ENGINE", status: "READY" },
    { text: "INTERFACE", status: "READY" },
    { text: "WELCOME.", status: "ACTIVE" }
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setStep(1);
      sound.playKey();
    }, 450);

    const timer2 = setTimeout(() => {
      setStep(2);
      sound.playKey();
    }, 850);

    const timer3 = setTimeout(() => {
      setStep(3);
      sound.playKey();
    }, 1250);

    const timer4 = setTimeout(() => {
      setStep(4);
      sound.playSuccess();
    }, 1650);

    const timer5 = setTimeout(() => {
      setIsFinished(true);
      setTimeout(onComplete, 500);
    }, 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAFAFB]/95 backdrop-blur-xl text-zinc-900 select-none px-6"
        >
          {/* Subtle warm scanline effect */}
          <div className="scanline-effect" />
          
          <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl border border-orange-500/25 bg-white/90 shadow-[0_20px_50px_rgba(249,115,22,0.12)] relative overflow-hidden">
            {/* Ambient subtle warm glow inside loader */}
            <div className="absolute -top-16 -right-16 w-36 h-36 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header / Brand */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-100 text-xs font-mono text-zinc-500">
              <span className="flex items-center gap-2 font-medium">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                SAMRIDH.OS // v4.2
              </span>
              <span className="text-orange-600 font-semibold px-2 py-0.5 rounded bg-orange-50 border border-orange-200">
                SYS.BOOT
              </span>
            </div>

            {/* Terminal sequence log */}
            <div className="space-y-3 font-mono text-xs sm:text-sm">
              {sequence.slice(0, step + 1).map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-between"
                >
                  <span className={`${index === 0 ? "text-orange-600 font-semibold" : index === 4 ? "text-zinc-900 font-bold tracking-widest text-sm" : "text-zinc-700"}`}>
                    {index === 0 ? "> " : "  "}
                    {item.text}
                    {index > 0 && index < 4 && (
                      <span className="text-zinc-300"> ................</span>
                    )}
                  </span>
                  {index > 0 && index < 4 && (
                    <span className="text-orange-600 font-semibold px-2 py-0.5 rounded bg-orange-50 border border-orange-200 text-[10px]">
                      {item.status}
                    </span>
                  )}
                  {index === 4 && (
                    <span className="text-orange-500 font-bold tracking-wider animate-pulse flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500" /> ONLINE
                    </span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Progress line */}
            <div className="mt-6 pt-4 border-t border-zinc-100">
              <div className="w-full bg-zinc-100 rounded-full h-1.5 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((step + 1) / sequence.length) * 100}%` }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
