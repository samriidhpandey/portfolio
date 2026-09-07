"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -2000, y: -2000, targetX: -2000, targetY: -2000, radius: 220, isHovered: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isRunning = true;

    const updateDimensions = () => {
      if (!canvas) return;
      const w = window.innerWidth || 1440;
      const h = window.innerHeight || 900;
      if (canvas.width !== w) canvas.width = w;
      if (canvas.height !== h) canvas.height = h;
    };

    updateDimensions();

    const handleResize = () => {
      updateDimensions();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isHovered = false;
      mouseRef.current.targetX = -2000;
      mouseRef.current.targetY = -2000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Optimized Particle Constellation (35 lightweight nodes, 60 FPS)
    const particleCount = 35;
    const colors = ["#FF5722", "#FF6B00", "#F97316", "#F59E0B", "#FB923C"];

    const particles: {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      pulseSpeed: number;
      pulsePhase: number;
    }[] = [];

    const initW = window.innerWidth || 1440;
    const initH = window.innerHeight || 900;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * initW,
        y: Math.random() * initH,
        radius: 2 + Math.random() * 2.5,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        alpha: 0.3 + Math.random() * 0.4,
        color: colors[i % colors.length],
        pulseSpeed: 0.02 + Math.random() * 0.02,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    // Floating tech symbols
    const techGlyphs = [
      { text: "< />", x: initW * 0.08, y: initH * 0.22, vx: 0.08, vy: 0.04 },
      { text: "✦ AI", x: initW * 0.88, y: initH * 0.16, vx: -0.06, vy: 0.08 },
      { text: "{ }", x: initW * 0.16, y: initH * 0.76, vx: 0.08, vy: -0.04 },
      { text: "⚡ FAST", x: initW * 0.84, y: initH * 0.82, vx: -0.08, vy: -0.04 }
    ];

    let step = 0;

    const render = () => {
      if (!isRunning) return;

      try {
        const w = canvas.width || window.innerWidth || 1440;
        const h = canvas.height || window.innerHeight || 900;

        ctx.clearRect(0, 0, w, h);
        step += 0.014;

        // Smooth Mouse Easing
        if (mouseRef.current.isHovered) {
          mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.12;
          mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.12;
        } else {
          mouseRef.current.x = -2000;
          mouseRef.current.y = -2000;
        }

        // 1. Lightweight Interactive Cursor Glow (No heavy shadowBlur)
        if (mouseRef.current.x > -500 && mouseRef.current.y > -500 && mouseRef.current.isHovered) {
          const radGrad = ctx.createRadialGradient(
            mouseRef.current.x,
            mouseRef.current.y,
            0,
            mouseRef.current.x,
            mouseRef.current.y,
            mouseRef.current.radius
          );
          radGrad.addColorStop(0, "rgba(255, 107, 0, 0.12)");
          radGrad.addColorStop(0.6, "rgba(245, 158, 11, 0.04)");
          radGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

          ctx.save();
          ctx.fillStyle = radGrad;
          ctx.fillRect(0, 0, w, h);
          ctx.restore();
        }

        // 2. High-Performance Sinusoidal Waves
        ctx.save();
        for (let waveIdx = 0; waveIdx < 2; waveIdx++) {
          ctx.beginPath();
          const baseWaveY = h * (0.3 + waveIdx * 0.3);

          const grad = ctx.createLinearGradient(0, baseWaveY - 30, w, baseWaveY + 30);
          grad.addColorStop(0, "rgba(255, 107, 0, 0)");
          grad.addColorStop(0.5, "rgba(249, 115, 22, 0.14)");
          grad.addColorStop(1, "rgba(255, 107, 0, 0)");

          ctx.strokeStyle = grad;
          ctx.lineWidth = 2;

          for (let x = 0; x <= w; x += 16) {
            let mouseElevation = 0;
            if (mouseRef.current.isHovered && mouseRef.current.x > -500) {
              const mDx = x - mouseRef.current.x;
              const mDy = baseWaveY - mouseRef.current.y;
              const mDist = Math.sqrt(mDx * mDx + mDy * mDy);
              if (mDist < 200) {
                mouseElevation = Math.cos((mDist / 200) * Math.PI * 0.5) * 20;
              }
            }

            const y =
              baseWaveY +
              Math.sin(x * 0.0025 + step * (1 + waveIdx * 0.2) + waveIdx) * 22 +
              mouseElevation;

            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
        ctx.restore();

        // 3. Lightweight Proximity Lines
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
              const strokeAlpha = Math.max(0.02, 0.22 * (1 - dist / 120));
              ctx.beginPath();
              ctx.strokeStyle = `rgba(249, 115, 22, ${strokeAlpha})`;
              ctx.lineWidth = 1;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }

        // 4. Update & Render Nodes (NO heavy shadowBlur for 60 FPS speed)
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          p.x += p.vx;
          p.y += p.vy;

          if (mouseRef.current.isHovered && mouseRef.current.x > -500) {
            const dx = mouseRef.current.x - p.x;
            const dy = mouseRef.current.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouseRef.current.radius && dist > 0) {
              const force = (mouseRef.current.radius - dist) / mouseRef.current.radius;
              const angle = Math.atan2(dy, dx);
              p.x -= Math.cos(angle) * force * 3;
              p.y -= Math.sin(angle) * force * 3;
            }
          }

          if (isNaN(p.x) || isNaN(p.y)) {
            p.x = Math.random() * w;
            p.y = Math.random() * h;
          }
          if (p.x < -10) p.x = w + 10;
          else if (p.x > w + 10) p.x = -10;

          if (p.y < -10) p.y = h + 10;
          else if (p.y > h + 10) p.y = -10;

          const currentRadius = Math.max(1.8, p.radius + Math.sin(step * 2 + p.pulsePhase) * 0.6);

          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(p.x, p.y, currentRadius + 2.5, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
          ctx.lineWidth = 0.8;
          ctx.stroke();
          ctx.restore();
        }

        // 5. Tech Glyphs
        ctx.save();
        ctx.font = "bold 11px monospace";
        ctx.fillStyle = "rgba(249, 115, 22, 0.35)";
        for (let i = 0; i < techGlyphs.length; i++) {
          const g = techGlyphs[i];
          g.x += g.vx;
          g.y += g.vy;

          if (g.x < -20) g.x = w + 20;
          else if (g.x > w + 20) g.x = -20;

          if (g.y < -20) g.y = h + 20;
          else if (g.y > h + 20) g.y = -20;

          ctx.fillText(g.text, g.x, g.y);
        }
        ctx.restore();

      } catch (err) {
        console.error("Global background canvas render tick error:", err);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transform-gpu">
      
      {/* ========================================================================= */}
      {/* HARDWARE-ACCELERATED ULTRA-SMOOTH (60 FPS) GLASS SHAPES                  */}
      {/* ========================================================================= */}

      {/* Subtle Ambient Radial Glowing Lights (No box borders, clean and spacious) */}
      <div className="fixed -top-[10%] -right-[5vw] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-orange-400/10 via-amber-300/5 to-transparent blur-3xl pointer-events-none z-0 transform-gpu" />
      <div className="fixed top-[30%] -left-[5vw] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-orange-300/10 via-amber-200/5 to-transparent blur-3xl pointer-events-none z-0 transform-gpu" />
      <div className="fixed bottom-[10%] right-[10vw] w-[450px] h-[450px] rounded-full bg-gradient-to-tl from-amber-400/10 via-orange-300/5 to-transparent blur-3xl pointer-events-none z-0 transform-gpu" />

      {/* 5. Concentric Tech Orbital Rings (CSS GPU Accelerated) */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-orange-500/10 animate-spin [animation-duration:80s] opacity-35 pointer-events-none z-0 transform-gpu" />

      {/* 6. Ambient Dot Grid Overlay */}
      <div className="fixed inset-0 friendly-grid opacity-20 pointer-events-none z-0" />

      {/* 7. Lightweight HTML5 Canvas (60 FPS) */}
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full opacity-90 pointer-events-none z-0 transform-gpu" />

    </div>
  );
}
