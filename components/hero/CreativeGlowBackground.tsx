"use client";

import { useEffect, useRef } from "react";

export default function CreativeGlowBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -2000, y: -2000, targetX: -2000, targetY: -2000, radius: 200, isHovered: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isRunning = true;

    // Guaranteed resolution sync
    const updateDimensions = () => {
      if (!canvas) return;
      const w = window.innerWidth || 1440;
      const h = Math.max(window.innerHeight || 800, canvas.parentElement?.clientHeight || 800);
      if (canvas.width !== w) canvas.width = w;
      if (canvas.height !== h) canvas.height = h;
    };

    updateDimensions();

    const handleResize = () => {
      updateDimensions();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
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

    // Initial Particle Constellation
    const particleCount = 80;
    const colors = ["#FF5722", "#FF6B00", "#F97316", "#F59E0B", "#FB923C"];

    const particles: {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      glowColor: string;
      sizeGlow: number;
      pulseSpeed: number;
      pulsePhase: number;
    }[] = [];

    const initW = window.innerWidth || 1440;
    const initH = window.innerHeight || 900;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * initW,
        y: Math.random() * initH,
        radius: 2.2 + Math.random() * 3,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        alpha: 0.45 + Math.random() * 0.4,
        color: colors[i % colors.length],
        glowColor: "rgba(255, 107, 0, 0.6)",
        sizeGlow: 10 + Math.random() * 14,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    // Floating tech symbols
    const techGlyphs = [
      { text: "< />", x: initW * 0.12, y: initH * 0.25, vx: 0.15, vy: 0.1 },
      { text: "✦ AI", x: initW * 0.85, y: initH * 0.22, vx: -0.12, vy: 0.15 },
      { text: "{ }", x: initW * 0.2, y: initH * 0.75, vx: 0.14, vy: -0.1 },
      { text: "⚡ FAST", x: initW * 0.78, y: initH * 0.78, vx: -0.15, vy: -0.08 },
      { text: "SEO ↑", x: initW * 0.08, y: initH * 0.55, vx: 0.08, vy: -0.15 },
      { text: "99.9%", x: initW * 0.9, y: initH * 0.48, vx: -0.1, vy: 0.12 }
    ];

    let step = 0;

    const render = () => {
      if (!isRunning) return;

      try {
        const w = canvas.width || window.innerWidth || 1440;
        const h = canvas.height || window.innerHeight || 900;

        ctx.clearRect(0, 0, w, h);
        step += 0.02;

        // Mouse smooth easing
        if (mouseRef.current.isHovered) {
          mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.12;
          mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.12;
        } else {
          mouseRef.current.x = -2000;
          mouseRef.current.y = -2000;
        }

        // 1. Dynamic Interactive Cursor Radial Glow
        if (mouseRef.current.x > -500 && mouseRef.current.y > -500 && mouseRef.current.isHovered) {
          const radGrad = ctx.createRadialGradient(
            mouseRef.current.x,
            mouseRef.current.y,
            0,
            mouseRef.current.x,
            mouseRef.current.y,
            mouseRef.current.radius
          );
          radGrad.addColorStop(0, "rgba(255, 107, 0, 0.16)");
          radGrad.addColorStop(0.5, "rgba(245, 158, 11, 0.08)");
          radGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

          ctx.save();
          ctx.fillStyle = radGrad;
          ctx.fillRect(0, 0, w, h);
          ctx.restore();
        }

        // 2. Flowing Multi-Layer Dynamic Sinusoidal Waves
        ctx.save();
        for (let waveIdx = 0; waveIdx < 4; waveIdx++) {
          ctx.beginPath();
          const baseWaveY = h * (0.28 + waveIdx * 0.16);

          const grad = ctx.createLinearGradient(0, baseWaveY - 40, w, baseWaveY + 40);
          if (waveIdx % 2 === 0) {
            grad.addColorStop(0, "rgba(255, 107, 0, 0)");
            grad.addColorStop(0.3, "rgba(255, 107, 0, 0.22)");
            grad.addColorStop(0.7, "rgba(245, 158, 11, 0.22)");
            grad.addColorStop(1, "rgba(255, 107, 0, 0)");
          } else {
            grad.addColorStop(0, "rgba(249, 115, 22, 0)");
            grad.addColorStop(0.35, "rgba(249, 115, 22, 0.18)");
            grad.addColorStop(0.65, "rgba(255, 87, 34, 0.18)");
            grad.addColorStop(1, "rgba(249, 115, 22, 0)");
          }

          ctx.strokeStyle = grad;
          ctx.lineWidth = 2.5;

          for (let x = 0; x <= w; x += 10) {
            let mouseElevation = 0;
            if (mouseRef.current.isHovered && mouseRef.current.x > -500) {
              const mDx = x - mouseRef.current.x;
              const mDy = baseWaveY - mouseRef.current.y;
              const mDist = Math.sqrt(mDx * mDx + mDy * mDy);
              if (mDist < 250) {
                mouseElevation = Math.cos((mDist / 250) * Math.PI * 0.5) * 30;
              }
            }

            const y =
              baseWaveY +
              Math.sin(x * 0.0035 + step * (1 + waveIdx * 0.2) + waveIdx) * (30 + waveIdx * 5) +
              Math.cos(x * 0.002 - step * 0.5) * 16 +
              mouseElevation;

            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
        ctx.restore();

        // 3. Dynamic Proximity Lines between Particles
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 140) {
              const strokeAlpha = Math.max(0.05, 0.38 * (1 - dist / 140));
              ctx.beginPath();
              ctx.strokeStyle = `rgba(249, 115, 22, ${strokeAlpha})`;
              ctx.lineWidth = 1.2;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }

        // 4. Update & Render Particles
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Move
          p.x += p.vx;
          p.y += p.vy;

          // Mouse push
          if (mouseRef.current.isHovered && mouseRef.current.x > -500) {
            const dx = mouseRef.current.x - p.x;
            const dy = mouseRef.current.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouseRef.current.radius && dist > 0) {
              const force = (mouseRef.current.radius - dist) / mouseRef.current.radius;
              const angle = Math.atan2(dy, dx);
              p.x -= Math.cos(angle) * force * 4;
              p.y -= Math.sin(angle) * force * 4;
            }
          }

          // Safe Boundary Wrap (Guaranteed to stay within screen forever)
          if (isNaN(p.x) || isNaN(p.y)) {
            p.x = Math.random() * w;
            p.y = Math.random() * h;
          }
          if (p.x < -10) p.x = w + 10;
          else if (p.x > w + 10) p.x = -10;

          if (p.y < -10) p.y = h + 10;
          else if (p.y > h + 10) p.y = -10;

          // Pulsing radius
          const currentRadius = Math.max(1.8, p.radius + Math.sin(step * 2 + p.pulsePhase) * 0.8);

          // Draw Glowing Node
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.shadowColor = p.glowColor;
          ctx.shadowBlur = p.sizeGlow;
          ctx.fill();
          ctx.restore();
        }

        // 5. Floating Tech Glyphs
        ctx.save();
        ctx.font = "bold 11px monospace";
        ctx.fillStyle = "rgba(249, 115, 22, 0.45)";
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
        // Prevent any animation loop crash
        console.error("Canvas render tick error:", err);
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
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Permanent Ambient Glowing Orbs with Smooth Pulsing */}
      <div className="absolute top-[5%] left-[15%] w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-orange-500/25 via-amber-400/20 to-transparent blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute top-[28%] right-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-orange-600/22 via-amber-500/16 to-transparent blur-3xl animate-pulse-slow [animation-delay:2s] pointer-events-none" />
      <div className="absolute bottom-[8%] left-[28%] w-[650px] h-[480px] rounded-full bg-gradient-to-t from-amber-500/20 via-orange-400/16 to-transparent blur-3xl animate-pulse-slow [animation-delay:4s] pointer-events-none" />

      {/* Permanent Rotating Orbital Tech Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full border border-orange-500/20 animate-spin [animation-duration:50s] opacity-60 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-dashed border-amber-500/15 animate-spin [animation-duration:70s] [animation-direction:reverse] opacity-50 pointer-events-none" />

      {/* Interactive HTML5 Canvas Wave & Particle Flowfield */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-95 pointer-events-none" />
    </div>
  );
}
