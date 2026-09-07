"use client";

import { useEffect, useRef } from "react";

export default function CreativeGlowBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -2000, y: -2000, targetX: -2000, targetY: -2000, radius: 180, isHovered: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isRunning = false;
    let isVisible = true;

    // Dimensions
    const updateDimensions = () => {
      if (!canvas || !container) return;
      const w = container.clientWidth || window.innerWidth || 1440;
      const h = container.clientHeight || window.innerHeight || 800;
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

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    // Optimized Particle Constellation (32 particles, 0 shadowBlur for instant 60-120 FPS)
    const particleCount = 32;
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

    const initW = canvas.width || 1440;
    const initH = canvas.height || 900;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * initW,
        y: Math.random() * initH,
        radius: 2 + Math.random() * 2.5,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        alpha: 0.4 + Math.random() * 0.4,
        color: colors[i % colors.length],
        pulseSpeed: 0.02 + Math.random() * 0.02,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    // Floating tech symbols
    const techGlyphs = [
      { text: "< />", x: initW * 0.12, y: initH * 0.25, vx: 0.1, vy: 0.06 },
      { text: "✦ AI", x: initW * 0.85, y: initH * 0.22, vx: -0.08, vy: 0.1 },
      { text: "{ }", x: initW * 0.2, y: initH * 0.75, vx: 0.1, vy: -0.08 },
      { text: "⚡ FAST", x: initW * 0.78, y: initH * 0.78, vx: -0.1, vy: -0.05 }
    ];

    let step = 0;

    const render = () => {
      if (!isRunning) return;

      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);
      step += 0.016;

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
        radGrad.addColorStop(0, "rgba(255, 107, 0, 0.12)");
        radGrad.addColorStop(0.5, "rgba(245, 158, 11, 0.04)");
        radGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = radGrad;
        ctx.fillRect(0, 0, w, h);
      }

      // 2. High-Performance Sinusoidal Waves (Only 2 waves, step increment 16px)
      for (let waveIdx = 0; waveIdx < 2; waveIdx++) {
        ctx.beginPath();
        const baseWaveY = h * (0.32 + waveIdx * 0.25);

        const grad = ctx.createLinearGradient(0, baseWaveY - 30, w, baseWaveY + 30);
        grad.addColorStop(0, "rgba(255, 107, 0, 0)");
        grad.addColorStop(0.5, "rgba(249, 115, 22, 0.15)");
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
              mouseElevation = Math.cos((mDist / 200) * Math.PI * 0.5) * 22;
            }
          }

          const y =
            baseWaveY +
            Math.sin(x * 0.003 + step * (1 + waveIdx * 0.2) + waveIdx) * 22 +
            mouseElevation;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // 3. Proximity Lines between Particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const strokeAlpha = Math.max(0.02, 0.22 * (1 - dist / 110));
            ctx.beginPath();
            ctx.strokeStyle = `rgba(249, 115, 22, ${strokeAlpha})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // 4. Update & Render Particles (Hardware accelerated, ZERO shadowBlur)
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

        if (p.x < -10) p.x = w + 10;
        else if (p.x > w + 10) p.x = -10;

        if (p.y < -10) p.y = h + 10;
        else if (p.y > h + 10) p.y = -10;

        const currentRadius = Math.max(1.8, p.radius + Math.sin(step * 2 + p.pulsePhase) * 0.6);

        // Crisp inner circle
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Subtle outer glow ring (Zero CPU blur overhead!)
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius + 2.5, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 107, 0, 0.35)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 5. Tech Glyphs
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

      if (isRunning) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // IntersectionObserver: PAUSE loop when off-screen to give 100% FPS to page scrolling!
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = entry.isIntersecting;
        if (isVisible && !isRunning) {
          isRunning = true;
          animationFrameId = requestAnimationFrame(render);
        } else if (!isVisible && isRunning) {
          isRunning = false;
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(container);

    // Initial start
    isRunning = true;
    animationFrameId = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0 transform-gpu">
      {/* Permanent Ambient Glowing Orbs */}
      <div className="absolute top-[5%] left-[15%] w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-orange-500/18 via-amber-400/12 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-[28%] right-[10%] w-[480px] h-[480px] rounded-full bg-gradient-to-bl from-orange-600/15 via-amber-500/10 to-transparent blur-3xl pointer-events-none" />

      {/* Rotating Orbital Tech Ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-orange-500/15 animate-spin [animation-duration:60s] opacity-50 pointer-events-none" />

      {/* Lightweight 60-120 FPS Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-90 pointer-events-none" />
    </div>
  );
}
