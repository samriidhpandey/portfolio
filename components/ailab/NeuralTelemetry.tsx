"use client";

import { useEffect, useRef, useState } from "react";
import { Activity, Cpu, ShieldCheck, Database, Zap } from "lucide-react";

export default function NeuralTelemetry() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dynamicMetrics, setDynamicMetrics] = useState({
    latency: 18,
    vram: 18.4,
    gpuUtil: 92,
    tps: 2450
  });

  // Simulated live telemetry jitter
  useEffect(() => {
    const interval = setInterval(() => {
      setDynamicMetrics({
        latency: Math.floor(16 + Math.random() * 6),
        vram: parseFloat((18.2 + Math.random() * 0.5).toFixed(1)),
        gpuUtil: Math.floor(88 + Math.random() * 8),
        tps: Math.floor(2380 + Math.random() * 140)
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Neural Frequency Wave on HTML5 Canvas in Warm Orange & Amber
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let step = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      // Draw subtle horizontal grid lines
      ctx.strokeStyle = "rgba(249, 115, 22, 0.1)";
      ctx.lineWidth = 1;
      for (let y = 10; y < height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw primary vibrant orange wave
      ctx.beginPath();
      ctx.strokeStyle = "rgba(249, 115, 22, 0.95)";
      ctx.lineWidth = 2.5;
      for (let x = 0; x < width; x++) {
        const y = centerY + Math.sin((x * 0.04) + step) * 20 * Math.sin((x * 0.01) + step * 0.5);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw secondary warm amber harmonic wave
      ctx.beginPath();
      ctx.strokeStyle = "rgba(245, 158, 11, 0.75)";
      ctx.lineWidth = 1.8;
      for (let x = 0; x < width; x++) {
        const y = centerY + Math.cos((x * 0.03) - step * 0.8) * 14;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      step += 0.04;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="glass-card rounded-2xl p-6 bg-white border border-orange-500/20 shadow-md flex flex-col justify-between h-full">
      {/* Top Telemetry Header */}
      <div>
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-100 text-xs font-mono">
          <span className="flex items-center gap-2 text-orange-600 font-bold">
            <Cpu className="w-4 h-4 text-orange-500" />
            AI ENGINE // TELEMETRY HUB
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 font-bold text-[10px] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
            LIVE STREAM
          </span>
        </div>

        {/* System Status Block */}
        <div className="space-y-2.5 mb-6 font-mono text-xs bg-orange-50/40 p-4 rounded-xl border border-orange-200/70">
          <div className="flex items-center justify-between">
            <span className="text-zinc-600 font-medium">AI CORE</span>
            <span className="text-zinc-300">.......................</span>
            <span className="text-orange-600 font-bold">ONLINE</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-600 font-medium">MODEL ENGINE</span>
            <span className="text-zinc-300">...................</span>
            <span className="text-orange-600 font-bold">ACTIVE</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-600 font-medium">WEB SYSTEM</span>
            <span className="text-zinc-300">....................</span>
            <span className="text-amber-600 font-bold">ONLINE</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-600 font-medium">AUTOMATION</span>
            <span className="text-zinc-300">....................</span>
            <span className="text-orange-700 font-bold">READY</span>
          </div>
        </div>

        {/* Live Frequency Wave Graph */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mb-2 font-semibold">
            <span>SYNAPSE INFERENCE HARMONICS</span>
            <span className="text-orange-600 font-bold">{dynamicMetrics.tps} TPS</span>
          </div>
          <div className="rounded-xl overflow-hidden bg-gradient-to-b from-orange-50/30 to-white border border-orange-200 p-2 shadow-inner">
            <canvas
              ref={canvasRef}
              width={380}
              height={100}
              className="w-full h-[90px] block"
            />
          </div>
        </div>

        {/* Live Resource Utilization Gauges */}
        <div className="grid grid-cols-2 gap-3 font-mono text-xs">
          <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80 shadow-xs">
            <span className="text-zinc-400 text-[10px] block mb-1 font-semibold">INFERENCE LATENCY</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-zinc-900">{dynamicMetrics.latency}</span>
              <span className="text-[10px] text-orange-600 font-bold">ms (P95)</span>
            </div>
            <div className="w-full bg-zinc-200 rounded-full h-1.5 mt-2">
              <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: "24%" }} />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80 shadow-xs">
            <span className="text-zinc-400 text-[10px] block mb-1 font-semibold">GPU ACCELERATION</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-zinc-900">{dynamicMetrics.gpuUtil}%</span>
              <span className="text-[10px] text-amber-600 font-bold">CUDA</span>
            </div>
            <div className="w-full bg-zinc-200 rounded-full h-1.5 mt-2">
              <div
                className="bg-amber-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${dynamicMetrics.gpuUtil}%` }}
              />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80 shadow-xs">
            <span className="text-zinc-400 text-[10px] block mb-1 font-semibold">VRAM ALLOCATION</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-zinc-900">{dynamicMetrics.vram}</span>
              <span className="text-[10px] text-zinc-500 font-medium">/ 24 GB</span>
            </div>
            <div className="w-full bg-zinc-200 rounded-full h-1.5 mt-2">
              <div className="bg-orange-600 h-1.5 rounded-full" style={{ width: "76%" }} />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80 shadow-xs">
            <span className="text-zinc-400 text-[10px] block mb-1 font-semibold">ACTIVE VECTOR SHARDS</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-zinc-900">2.5M</span>
              <span className="text-[10px] text-orange-600 font-bold">QDRANT</span>
            </div>
            <div className="w-full bg-zinc-200 rounded-full h-1.5 mt-2">
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-1.5 rounded-full" style={{ width: "85%" }} />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-zinc-100 flex items-center justify-between text-[10px] font-mono text-zinc-400 font-semibold">
        <span>CLUSTER: PROD-US-EAST-01</span>
        <span className="text-orange-600">v4.2.1-RELEASE</span>
      </div>
    </div>
  );
}
