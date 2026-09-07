"use client";

import React from "react";

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Soft Elegant Static Ambient Glows (Zero moving animations, zero lag) */}
      <div className="fixed -top-[10%] -right-[5vw] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-orange-400/10 via-amber-300/5 to-transparent blur-3xl pointer-events-none z-0" />
      <div className="fixed top-[30%] -left-[5vw] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-orange-300/10 via-amber-200/5 to-transparent blur-3xl pointer-events-none z-0" />
      <div className="fixed bottom-[10%] right-[10vw] w-[450px] h-[450px] rounded-full bg-gradient-to-tl from-amber-400/10 via-orange-300/5 to-transparent blur-3xl pointer-events-none z-0" />

      {/* Subtle Static Dot Grid Overlay */}
      <div className="fixed inset-0 friendly-grid opacity-20 pointer-events-none z-0" />
    </div>
  );
}
