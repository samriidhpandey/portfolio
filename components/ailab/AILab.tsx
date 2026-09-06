"use client";

import { Terminal as TerminalIcon } from "lucide-react";
import Terminal from "./Terminal";

export default function AILab() {
  return (
    <section id="ailab" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-500/6 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="flex items-center gap-2 font-mono text-xs text-orange-600 font-bold tracking-widest uppercase mb-3">
          <span className="w-6 h-px bg-orange-500" />
          <span>04 // EXPERIMENTAL WORKSPACE</span>
          <span className="w-6 h-px bg-orange-500" />
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight">
          AI Lab & Interactive Console
        </h2>
        <p className="text-zinc-600 mt-2 text-sm sm:text-base max-w-2xl font-normal">
          An interactive digital workspace. Type commands or click the action chips below to inspect models, architectures, and system details.
        </p>
      </div>

      {/* Centered Clean Terminal Console */}
      <div className="max-w-4xl mx-auto w-full flex flex-col">
        <div className="flex items-center justify-between mb-3 text-xs font-mono text-zinc-500 font-semibold px-1">
          <span className="flex items-center gap-2">
            <TerminalIcon className="w-4 h-4 text-orange-500" />
            INTERACTIVE CLI SHELL
          </span>
          <span className="text-[11px] text-orange-600 font-bold">STATUS: READY</span>
        </div>
        <Terminal />
      </div>
    </section>
  );
}
