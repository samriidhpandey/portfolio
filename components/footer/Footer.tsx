"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Cpu, ShieldCheck } from "lucide-react";
import { sound } from "@/lib/audio";
import Link from "next/link";

export default function Footer() {
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          timeZone: "UTC",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        }) + " UTC"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-zinc-200/80 bg-white py-12 px-4 sm:px-6 lg:px-8 font-mono text-xs text-zinc-500 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: Brand & Copyright */}
        <div className="flex flex-col items-center sm:items-start gap-1">
          <div className="flex items-center gap-2 text-zinc-900 font-extrabold text-sm">
            <div className="w-6 h-6 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center">
              <Cpu className="w-3.5 h-3.5 text-orange-600" />
            </div>
            <span>SAMRIDH PANDEY</span>
            <span className="text-zinc-400 font-normal">// AI/ML × FULL-STACK</span>
          </div>
          <p className="text-zinc-500">
            © 2026 Samridh Pandey. Built with Next.js + Three.js.
          </p>
        </div>

        {/* Center: Live UTC Clock & Telemetry */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] bg-zinc-50 px-4 py-2 rounded-xl border border-zinc-200">
          <Link
            href="/services"
            onClick={() => sound.playClick()}
            className="text-orange-600 hover:text-orange-700 font-bold hover:underline"
          >
            Services & Tool Stack →
          </Link>
          <span className="text-zinc-300">|</span>
          <Link
            href="/admin"
            onClick={() => sound.playClick()}
            className="text-zinc-700 hover:text-orange-600 font-bold hover:underline flex items-center gap-1"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
            <span>Admin Portal</span>
          </Link>
          <span className="text-zinc-300">|</span>
          <div className="flex items-center gap-1.5 text-zinc-600 font-semibold">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span>STATUS: AVAILABLE</span>
          </div>
          <span className="text-zinc-300">|</span>
          <span className="text-orange-600 font-bold">{timeStr || "00:00:00 UTC"}</span>
        </div>

        {/* Right: Scroll to top */}
        <button
          onClick={scrollToTop}
          onMouseEnter={() => sound.playHover()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-50 hover:bg-orange-50 text-zinc-700 hover:text-orange-600 border border-zinc-200 hover:border-orange-300 transition-all cursor-pointer font-semibold shadow-xs"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-4 h-4 text-orange-500" />
        </button>
      </div>
    </footer>
  );
}
