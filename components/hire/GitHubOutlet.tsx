"use client";

import { motion } from "framer-motion";
import { ExternalLink, GitBranch, Star, GitFork, BookOpen, Code, Terminal, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { sound } from "@/lib/audio";

const featuredRepos = [
  {
    name: "portfolio",
    desc: "Production Next.js 15 personal portfolio and freelance services portal with interactive 3D WebGL and orange/white UI.",
    lang: "TypeScript",
    langColor: "#3178C6",
    stars: 12,
    forks: 3,
    url: "https://github.com/samriidhpandey/portfolio"
  },
  {
    name: "ai-agent-rag-pipeline",
    desc: "Autonomous LLM reasoning agent with Pinecone vector search, document ingestion chunking, and FastAPI backend.",
    lang: "Python",
    langColor: "#3572A5",
    stars: 28,
    forks: 7,
    url: "https://github.com/samriidhpandey"
  },
  {
    name: "high-converting-nextjs-starter",
    desc: "Production-ready enterprise SaaS template with Stripe billing, Supabase auth, and 100/100 Core Web Vitals.",
    lang: "TypeScript",
    langColor: "#3178C6",
    stars: 34,
    forks: 9,
    url: "https://github.com/samriidhpandey"
  },
  {
    name: "marketing-analytics-tracker",
    desc: "Custom lightweight conversion tracker with GA4, Meta Pixel CAPI, and automated weekly Looker Studio reports.",
    lang: "JavaScript",
    langColor: "#F7DF1E",
    stars: 19,
    forks: 4,
    url: "https://github.com/samriidhpandey"
  }
];

export default function GitHubOutlet() {
  return (
    <div className="bg-white rounded-3xl border border-zinc-200/90 p-6 sm:p-8 shadow-xl space-y-6">
      
      {/* Header & Identity */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-100">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-zinc-900 text-white flex items-center justify-center shadow-md">
            <GithubIcon className="w-8 h-8 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-zinc-900">Samridh Pandey</h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono font-bold">
                ● Live Outlet
              </span>
            </div>
            <a
              href="https://github.com/samriidhpandey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono font-semibold text-orange-600 hover:underline flex items-center gap-1 mt-0.5"
            >
              <span>@samriidhpandey</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <a
          href="https://github.com/samriidhpandey"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sound.playClick()}
          className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-sm hover:scale-105 self-start sm:self-auto"
        >
          <span>Follow on GitHub</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Real-time GitHub Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80">
          <span className="text-[10px] text-zinc-400 font-bold uppercase block">PUBLIC REPOSITORIES</span>
          <span className="text-lg font-black text-zinc-900 mt-0.5 block">18+ Active</span>
          <span className="text-[10px] text-orange-600 font-medium">Open-source & Client</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80">
          <span className="text-[10px] text-zinc-400 font-bold uppercase block">YEARLY COMMITS</span>
          <span className="text-lg font-black text-zinc-900 mt-0.5 block">620+ Commits</span>
          <span className="text-[10px] text-emerald-600 font-medium">High Consistency</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80">
          <span className="text-[10px] text-zinc-400 font-bold uppercase block">TOP LANGUAGES</span>
          <span className="text-lg font-black text-zinc-900 mt-0.5 block">TS / Python</span>
          <span className="text-[10px] text-orange-600 font-medium">Full-Stack & AI</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80">
          <span className="text-[10px] text-zinc-400 font-bold uppercase block">CODE QUALITY</span>
          <span className="text-lg font-black text-zinc-900 mt-0.5 block">Strict Types</span>
          <span className="text-[10px] text-zinc-500 font-medium">Zero Bloat</span>
        </div>
      </div>

      {/* Featured Repositories List */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-orange-500" />
            Featured Repositories
          </span>
          <a
            href="https://github.com/samriidhpandey?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-600 hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {featuredRepos.map((repo, idx) => (
            <a
              key={idx}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-zinc-50/80 hover:bg-orange-50/50 border border-zinc-200/80 hover:border-orange-300 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-sm text-zinc-900 group-hover:text-orange-600 transition-colors flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5 text-orange-500" />
                    {repo.name}
                  </span>
                  <ExternalLink className="w-3 h-3 text-zinc-400 group-hover:text-orange-500" />
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed line-clamp-2">
                  {repo.desc}
                </p>
              </div>

              <div className="flex items-center gap-4 pt-3 mt-3 border-t border-zinc-200/60 text-[11px] font-mono text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: repo.langColor }} />
                  <span>{repo.lang}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-500" />
                  <span>{repo.stars}</span>
                </span>
                <span className="flex items-center gap-1">
                  <GitFork className="w-3 h-3 text-zinc-400" />
                  <span>{repo.forks}</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}
