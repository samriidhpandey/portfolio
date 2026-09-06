"use client";

import { useEffect, useRef } from "react";

export default function CreativeGlowBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, radius: 220, isHovered: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
      mouseRef.current.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isHovered = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Particle nodes configuration
    const particleCount = 85;
    const particles: {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
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

    const colorPalette = [
      { fill: "#FF5722", glow: "rgba(255, 87, 34, 0.6)" },
      { fill: "#FF6B00", glow: "rgba(255, 107, 0, 0.7)" },
      { fill: "#F97316", glow: "rgba(249, 115, 22, 0.65)" },
      { fill: "#F59E0B", glow: "rgba(245, 158, 11, 0.55)" },
      { fill: "#FB923C", glow: "rgba(251, 146, 60, 0.6)" }
    ];

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const pColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        radius: 2 + Math.random() * 3.5,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        alpha: 0.35 + Math.random() * 0.45,
        color: pColor.fill,
        glowColor: pColor.glow,
        sizeGlow: 10 + Math.random() * 16,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    // Floating tech symbols & glyphs in background
    const techGlyphs = [
      { text: "< />", x: width * 0.12, y: height * 0.25, vx: 0.2, vy: 0.15, size: 14, rot: 0 },
      { text: "✦ AI", x: width * 0.85, y: height * 0.22, vx: -0.15, vy: 0.2, size: 13, rot: 0 },
      { text: "{ }", x: width * 0.2, y: height * 0.75, vx: 0.18, vy: -0.15, size: 15, rot: 0 },
      { text: "⚡ FAST", x: width * 0.78, y: height * 0.78, vx: -0.2, vy: -0.1, size: 12, rot: 0 },
      { text: "SEO ↑", x: width * 0.08, y: height * 0.55, vx: 0.1, vy: -0.2, size: 13, rot: 0 },
      { text: "99.9%", x: width * 0.9, y: height * 0.48, vx: -0.12, vy: 0.18, size: 12, rot: 0 }
    ];

    let step = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      step += 0.025;

      // Smooth mouse position damping
      if (mouseRef.current.isHovered) {
        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.1;
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.1;
      } else {
        mouseRef.current.x = -1000;
        mouseRef.current.y = -1000;
      }

      // 1. Dynamic Interactive Cursor Radial Glow Spotlight
      if (mouseRef.current.x > 0 && mouseRef.current.y > 0) {
        const radGrad = ctx.createRadialGradient(
          mouseRef.current.x,
          mouseRef.current.y,
          0,
          mouseRef.current.x,
          mouseRef.current.y,
          mouseRef.current.radius
        );
        radGrad.addColorStop(0, "rgba(255, 107, 0, 0.14)");
        radGrad.addColorStop(0.5, "rgba(245, 158, 11, 0.07)");
        radGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.save();
        ctx.fillStyle = radGrad;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      }

      // 2. Flowing Multi-Layer Dynamic Sinusoidal Waves with Glowing Gradients
      ctx.save();
      for (let w = 0; w < 4; w++) {
        ctx.beginPath();
        const baseWaveY = height * (0.28 + w * 0.18);
        const waveGradient = ctx.createLinearGradient(0, baseWaveY - 40, width, baseWaveY + 40);
        
        if (w % 2 === 0) {
          waveGradient.addColorStop(0, "rgba(255, 107, 0, 0)");
          waveGradient.addColorStop(0.3, "rgba(255, 107, 0, 0.18)");
          waveGradient.addColorStop(0.7, "rgba(245, 158, 11, 0.18)");
          waveGradient.addColorStop(1, "rgba(255, 107, 0, 0)");
        } else {
          waveGradient.addColorStop(0, "rgba(249, 115, 22, 0)");
          waveGradient.addColorStop(0.35, "rgba(249, 115, 22, 0.15)");
          waveGradient.addColorStop(0.65, "rgba(255, 87, 34, 0.15)");
          waveGradient.addColorStop(1, "rgba(249, 115, 22, 0)");
        }

        ctx.strokeStyle = waveGradient;
        ctx.lineWidth = 2 + (w % 2);

        for (let x = 0; x <= width; x += 8) {
          // Dynamic mouse elevation ripple
          let mouseDistEffect = 0;
          if (mouseRef.current.x > 0) {
            const mDx = x - mouseRef.current.x;
            const mDy = baseWaveY - mouseRef.current.y;
            const mDist = Math.sqrt(mDx * mDx + mDy * mDy);
            if (mDist < 250) {
              mouseDistEffect = Math.cos((mDist / 250) * Math.PI * 0.5) * 35;
            }
          }

          const y =
            baseWaveY +
            Math.sin(x * 0.0035 + step * (1 + w * 0.2) + w) * (30 + w * 6) +
            Math.cos(x * 0.002 - step * 0.6) * 18 +
            mouseDistEffect;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();

      // 3. Connect particles with dynamic proximity lines & orange glow
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.beginPath();
            const strokeOpacity = 0.35 * (1 - dist / 140);
            ctx.strokeStyle = `rgba(249, 115, 22, ${strokeOpacity})`;
            ctx.lineWidth = 1.3;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // 4. Update & render particles with pulsing halos and mouse repulsion
      particles.forEach((p) => {
        // Natural drift
        p.x += p.vx;
        p.y += p.vy;

        // Mouse interactive force
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseRef.current.radius && dist > 0) {
          const force = (mouseRef.current.radius - dist) / mouseRef.current.radius;
          const angle = Math.atan2(dy, dx);
          // Swirl and gently push away
          p.x -= Math.cos(angle) * force * 5;
          p.y -= Math.sin(angle) * force * 5;
        }

        // Screen boundary wrapping
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Pulsing radius effect
        const currentRadius = p.radius + Math.sin(step * 2 + p.pulsePhase) * 0.8;

        // Render glowing particle node
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1.5, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.glowColor;
        ctx.shadowBlur = p.sizeGlow;
        ctx.fill();
        ctx.restore();
      });

      // 5. Floating Tech Glyphs & Badges in Background
      ctx.save();
      ctx.font = "bold 11px monospace";
      ctx.fillStyle = "rgba(249, 115, 22, 0.4)";
      techGlyphs.forEach((g) => {
        g.x += g.vx;
        g.y += g.vy;
        if (g.x < 0) g.x = width;
        if (g.x > width) g.x = 0;
        if (g.y < 0) g.y = height;
        if (g.y > height) g.y = 0;

        ctx.fillText(g.text, g.x, g.y);
      });
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Dynamic Animated Aurora Beams & Glowing Orbs with Smooth Floating Physics */}
      <div className="absolute top-[5%] left-[15%] w-[580px] h-[580px] rounded-full bg-gradient-to-tr from-orange-500/28 via-amber-400/22 to-transparent blur-3xl animate-pulse-slow" />
      <div className="absolute top-[28%] right-[10%] w-[620px] h-[620px] rounded-full bg-gradient-to-bl from-orange-600/24 via-amber-500/18 to-transparent blur-3xl animate-pulse-slow [animation-delay:2.5s]" />
      <div className="absolute bottom-[10%] left-[30%] w-[680px] h-[500px] rounded-full bg-gradient-to-t from-amber-500/22 via-orange-400/18 to-transparent blur-3xl animate-pulse-slow [animation-delay:5s]" />

      {/* Floating Animated Radiant Beacon Waves */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-orange-500/15 animate-ping [animation-duration:8s] opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[950px] rounded-full border border-amber-500/10 animate-ping [animation-duration:12s] [animation-delay:4s] opacity-30" />

      {/* Interactive HTML5 Canvas Wave & Particle Flowfield */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-95" />
    </div>
  );
}
