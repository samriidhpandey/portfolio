"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Code2, Network, BrainCircuit, Bot, Rocket, ArrowRight, CheckCircle2 } from "lucide-react";
import { profileData } from "@/data/profile";
import { sound } from "@/lib/audio";

const progressionSteps = [
  {
    id: "prog",
    title: "Programming",
    subtitle: "Foundations & Algorithmic Rigor",
    icon: Code2,
    color: "#EA580C",
    description: "Deep computational intuition through C++, data structures, memory models, and deterministic algorithm optimization.",
    skills: ["C++", "Algorithms", "Data Structures", "Memory Management"]
  },
  {
    id: "web",
    title: "Web Development",
    subtitle: "Reactive Full-Stack Architecture",
    icon: Cpu,
    color: "#F97316",
    description: "Building responsive, sub-second web applications, SSR pipelines, and resilient distributed microservices.",
    skills: ["TypeScript", "Next.js", "React 19", "Node.js", "Tailwind CSS"]
  },
  {
    id: "ml",
    title: "Machine Learning",
    subtitle: "Statistical Inference & Feature Design",
    icon: Network,
    color: "#F59E0B",
    description: "Classical modeling, gradient boosting, dimension reduction, and rigorous validation on high-dimensional datasets.",
    skills: ["Python", "Scikit-Learn", "NumPy & Pandas", "XGBoost"]
  },
  {
    id: "dl",
    title: "Deep Learning",
    subtitle: "Neural Graphs & Representations",
    icon: BrainCircuit,
    color: "#EA580C",
    description: "Designing convolutional and transformer architectures in PyTorch, loss function tuning, and model quantization.",
    skills: ["PyTorch", "TensorRT", "YOLOv8", "Transformers", "CUDA"]
  },
  {
    id: "aie",
    title: "AI Engineering",
    subtitle: "Orchestration & Vector Workflows",
    icon: Bot,
    color: "#F97316",
    description: "Building production RAG pipelines, semantic cache clusters, and multi-agent cyclic graph execution engines.",
    skills: ["LangChain", "Qdrant", "FastAPI", "Prompt Optimization"]
  },
  {
    id: "prod",
    title: "AI Products",
    subtitle: "Autonomous Real-World Systems",
    icon: Rocket,
    color: "#FB923C",
    description: "Deploying end-to-end intelligent products combining intuitive UI, deterministic safeguards, and high-throughput inference.",
    skills: ["Agentic SaaS", "Production Monitoring", "Edge Inference"]
  }
];

export default function About() {
  const [selectedStep, setSelectedStep] = useState(0);

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="flex flex-col items-start mb-16">
        <div className="flex items-center gap-2 font-mono text-xs text-orange-600 font-bold tracking-widest uppercase mb-3">
          <span className="w-6 h-px bg-orange-500" />
          <span>01 // BEYOND THE CODE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight">
          Bridging Rigorous AI Systems <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500">
            With Production Engineering
          </span>
        </h2>
      </div>

      {/* Professional Bio & Core Engineering Philosophy */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-stretch">
        <div className="lg:col-span-7 glass-card p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden bg-white/95 border-zinc-200/90 shadow-sm">
          <div className="space-y-4 text-zinc-700 text-sm sm:text-base leading-relaxed font-normal">
            {profileData.bio.map((para, idx) => (
              <p key={idx} className="relative z-10">
                {para}
              </p>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-100 flex flex-wrap gap-3 text-xs font-mono">
            <span className="flex items-center gap-1.5 bg-orange-50 text-orange-700 px-3.5 py-1.5 rounded-xl border border-orange-200 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-orange-600" /> Production Determinism
            </span>
            <span className="flex items-center gap-1.5 bg-amber-50 text-amber-800 px-3.5 py-1.5 rounded-xl border border-amber-200 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-amber-600" /> High-Performance Serving
            </span>
            <span className="flex items-center gap-1.5 bg-orange-50/70 text-orange-800 px-3.5 py-1.5 rounded-xl border border-orange-200/70 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-orange-600" /> Microsecond Responsiveness
            </span>
          </div>
        </div>

        {/* Live Stat Cards */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          {profileData.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onMouseEnter={() => sound.playHover()}
              className="glass-card p-5 rounded-2xl flex flex-col justify-between bg-white border-zinc-200/80 hover:border-orange-400 group transition-all duration-300 shadow-sm hover:shadow-md cursor-default"
            >
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider font-semibold">
                {stat.label}
              </span>
              <div className="my-2">
                <span className="text-3xl sm:text-4xl font-black text-zinc-900 group-hover:text-orange-600 transition-colors">
                  {stat.value}
                </span>
                <span className="text-xl font-bold text-orange-500">{stat.suffix}</span>
              </div>
              <p className="text-xs text-zinc-500 leading-snug">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Progression Pipeline */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl bg-white border-orange-500/20 shadow-md">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-100">
          <div>
            <span className="text-[10px] font-mono text-orange-600 font-bold uppercase tracking-widest block mb-1">
              ENGINEERING EVOLUTION
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-zinc-900">
              The Architecture Progression
            </h3>
          </div>
          <span className="text-xs font-mono font-semibold text-zinc-500 hidden sm:block">
            STEP 0{selectedStep + 1} OF 06
          </span>
        </div>

        {/* Step Buttons Pipeline */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {progressionSteps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = selectedStep === idx;
            return (
              <button
                key={step.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedStep(idx);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`flex flex-col items-start p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "bg-orange-50 border-orange-500 shadow-sm"
                    : "bg-zinc-50/70 border-zinc-200/80 hover:border-orange-300 hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shadow-xs"
                    style={{ backgroundColor: `${step.color}18` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: step.color }} />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400 font-medium">0{idx + 1}</span>
                </div>
                <span className={`text-xs font-bold ${isSelected ? "text-orange-700" : "text-zinc-700"}`}>
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Progression Details Card */}
        <div className="p-6 rounded-xl bg-gradient-to-br from-orange-50/60 to-white border border-orange-200/80 grid grid-cols-1 md:grid-cols-12 gap-6 items-center shadow-xs">
          <div className="md:col-span-8">
            <div className="flex items-center gap-2 mb-2 font-mono text-xs" style={{ color: progressionSteps[selectedStep].color }}>
              <span className="font-bold">PHASE 0{selectedStep + 1} //</span>
              <span className="text-zinc-900 font-bold">{progressionSteps[selectedStep].subtitle}</span>
            </div>
            <p className="text-zinc-700 text-sm sm:text-base leading-relaxed">
              {progressionSteps[selectedStep].description}
            </p>
          </div>

          <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-orange-200/60 pt-4 md:pt-0 md:pl-6">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-2 font-semibold">
              CORE TECHNOLOGIES
            </span>
            <div className="flex flex-wrap gap-2">
              {progressionSteps[selectedStep].skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-lg bg-white border border-orange-200 text-xs font-mono font-medium text-orange-800 shadow-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
