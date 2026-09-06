"use client";

import { useState, useRef, useEffect } from "react";
import { sound } from "@/lib/audio";
import { profileData } from "@/data/profile";
import { projectsData } from "@/data/projects";

interface CommandLog {
  command?: string;
  output: string | React.ReactNode;
  isError?: boolean;
}

export default function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandLog[]>([
    {
      output: (
        <div className="space-y-1 text-xs font-mono">
          <p className="text-orange-400 font-bold">SAMRIDH INTERACTIVE TERMINAL [v4.2.0-STABLE]</p>
          <p className="text-zinc-400">Type <span className="text-white font-semibold underline">help</span> or click the buttons above to test system instructions.</p>
        </div>
      )
    }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    sound.playClick();
    setCommandHistory((prev) => [...prev, rawCmd]);
    setHistoryIndex(-1);

    let outputNode: React.ReactNode = null;
    let isError = false;

    switch (cmd) {
      case "help":
        outputNode = (
          <div className="space-y-1.5 text-xs font-mono text-zinc-300">
            <p className="text-orange-400 font-bold mb-1">AVAILABLE COMMANDS:</p>
            <p><span className="text-orange-400 w-24 inline-block font-bold">about</span> View engineer identity, philosophy & focus areas</p>
            <p><span className="text-orange-400 w-24 inline-block font-bold">skills</span> Inspect high-proficiency engineering technologies</p>
            <p><span className="text-orange-400 w-24 inline-block font-bold">projects</span> List deployed production systems and AI tools</p>
            <p><span className="text-orange-400 w-24 inline-block font-bold">stack</span> Print full architectural foundation stack</p>
            <p><span className="text-orange-400 w-24 inline-block font-bold">eval</span> Run a simulated transformer benchmark test</p>
            <p><span className="text-orange-400 w-24 inline-block font-bold">contact</span> Retrieve transmission channels & socials</p>
            <p><span className="text-orange-400 w-24 inline-block font-bold">clear</span> Clear terminal buffer</p>
          </div>
        );
        break;

      case "about":
        outputNode = (
          <div className="space-y-1.5 text-xs font-mono text-zinc-300">
            <p className="text-orange-400 font-bold">PROFILE // SAMRIDH PANDEY</p>
            <p className="text-white font-semibold">{profileData.title}</p>
            <p className="text-zinc-400">{profileData.tagline}</p>
            <p className="text-amber-400 mt-1 font-medium">● {profileData.availability}</p>
          </div>
        );
        break;

      case "skills":
        outputNode = (
          <div className="space-y-1.5 text-xs font-mono text-zinc-300">
            <p className="text-orange-400 font-bold">CORE CAPABILITIES // HIGHEST TIER</p>
            <p><span className="text-white font-bold">AI / ML:</span> PyTorch, TensorFlow, Scikit-learn, HuggingFace, YOLOv8</p>
            <p><span className="text-white font-bold">Languages:</span> Python, TypeScript, C++, JavaScript (ESNext)</p>
            <p><span className="text-white font-bold">Web & Full-Stack:</span> Next.js, React 19, Node.js, FastAPI, Tailwind CSS</p>
            <p><span className="text-white font-bold">Infra & Vector:</span> Docker, Qdrant, MongoDB, Redis, Git CI/CD</p>
          </div>
        );
        break;

      case "projects":
        outputNode = (
          <div className="space-y-2 text-xs font-mono text-zinc-300">
            <p className="text-orange-400 font-bold">SELECTED DEPLOYED SYSTEMS:</p>
            {projectsData.slice(0, 4).map((p) => (
              <div key={p.id} className="border-l-2 border-orange-500 pl-2">
                <span className="text-white font-bold">{p.title}</span> —{" "}
                <span className="text-zinc-400">{p.subtitle}</span>
                <p className="text-[11px] text-orange-300">{p.category} | {p.technologies.slice(0, 3).join(", ")}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "stack":
        outputNode = (
          <div className="space-y-1 text-xs font-mono text-zinc-300">
            <p className="text-orange-400 font-bold">PORTFOLIO WORKSPACE STACK:</p>
            <p>• Framework: Next.js (App Router, Turbopack, TypeScript)</p>
            <p>• 3D Engine: Three.js + React Three Fiber</p>
            <p>• Motion: Framer Motion + Lenis Smooth Momentum Scroll</p>
            <p>• Sound Engine: Procedural Web Audio API</p>
          </div>
        );
        break;

      case "eval":
        outputNode = (
          <div className="space-y-1 text-xs font-mono">
            <p className="text-amber-400 font-bold">RUNNING NEURAL MODEL EVALUATION...</p>
            <p className="text-zinc-400">[1/3] Loading quantized weights: INT8 TensorRT engine... OK</p>
            <p className="text-zinc-400">[2/3] Fusing cross-attention layers... OK (14.2ms)</p>
            <p className="text-zinc-400">[3/3] Running cosine similarity across 10,000 queries... OK</p>
            <p className="text-orange-300 font-bold mt-1">EVAL RESULT: Mean Reciprocal Rank: 0.962 | P99 Latency: 18ms</p>
          </div>
        );
        break;

      case "contact":
        outputNode = (
          <div className="space-y-1 text-xs font-mono text-zinc-300">
            <p className="text-orange-400 font-bold">COMMUNICATION CHANNELS:</p>
            <p>• Email: <a href="mailto:samridh.pandey@example.com" className="text-white underline font-medium">samridh.pandey@example.com</a></p>
            <p>• LinkedIn: <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-white underline font-medium">linkedin.com/in/samridh-pandey</a></p>
            <p>• GitHub: <a href="https://github.com" target="_blank" rel="noreferrer" className="text-white underline font-medium">github.com/samridhpandey</a></p>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        isError = true;
        outputNode = (
          <span className="text-rose-400 text-xs font-mono">
            Command not recognized: &quot;{rawCmd}&quot;. Type <span className="underline font-bold text-white">help</span> for supported commands.
          </span>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        command: rawCmd,
        output: outputNode,
        isError
      }
    ]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    sound.playKey();
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex + 1 < commandHistory.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[commandHistory.length - 1 - nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[commandHistory.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="glass-card rounded-2xl border border-orange-500/25 bg-[#18181B] text-white flex flex-col h-[420px] font-mono text-xs overflow-hidden cursor-text shadow-xl relative"
    >
      {/* Terminal Titlebar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-[#121215] border-b border-white/10 gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="text-zinc-400 text-[11px] ml-2">bash // samridh@cluster-ai</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto terminal-scroll">
          {["help", "about", "eval", "skills", "projects", "clear"].map((cmdChip) => (
            <button
              key={cmdChip}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleCommand(cmdChip);
              }}
              onMouseEnter={() => sound.playHover()}
              className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-orange-500/20 hover:bg-orange-500 text-orange-300 hover:text-white border border-orange-500/40 transition-all cursor-pointer"
            >
              {cmdChip}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Output Log Area */}
      <div
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto space-y-3 terminal-scroll"
      >
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            {item.command && (
              <div className="flex items-center gap-2 text-orange-400">
                <span className="text-amber-400 font-bold">samridh@core:~$</span>
                <span className="text-white font-semibold">{item.command}</span>
              </div>
            )}
            <div>{item.output}</div>
          </div>
        ))}
      </div>

      {/* Terminal Interactive Input Prompt */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#121215] border-t border-white/5">
        <span className="text-orange-500 shrink-0 font-bold">samridh@core:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type 'help', 'eval', 'projects'..."
          className="w-full bg-transparent border-none outline-none text-white text-xs font-mono placeholder:text-zinc-600 font-medium"
          autoFocus
          spellCheck={false}
        />
      </div>
    </div>
  );
}
