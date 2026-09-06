"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { GitCommit, GitPullRequest, GitFork, Flame, Calendar, Code2 } from "lucide-react";
import { generateContributionMatrix, githubActivityData, ActivityDay } from "@/data/activity";
import { sound } from "@/lib/audio";

export default function GitHubActivity() {
  const matrix = useMemo(() => generateContributionMatrix(), []);
  const [hoveredDay, setHoveredDay] = useState<ActivityDay | null>(null);

  // Split the 365 days into 52 weeks (columns of 7 rows)
  const weeks = useMemo(() => {
    const res: ActivityDay[][] = [];
    for (let i = 0; i < matrix.length; i += 7) {
      res.push(matrix.slice(i, i + 7));
    }
    return res;
  }, [matrix]);

  const levelColor = (level: number) => {
    switch (level) {
      case 4: return "bg-orange-600 shadow-[0_0_6px_#EA580C]";
      case 3: return "bg-orange-500";
      case 2: return "bg-orange-300";
      case 1: return "bg-orange-100 border border-orange-200";
      default: return "bg-zinc-100";
    }
  };

  return (
    <section id="activity" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="flex flex-col items-start mb-14">
        <div className="flex items-center gap-2 font-mono text-xs text-orange-600 font-bold tracking-widest uppercase mb-3">
          <span className="w-6 h-px bg-orange-500" />
          <span>06 // CODEBASE DYNAMICS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight">
          Developer Activity & Velocity
        </h2>
        <p className="text-zinc-600 mt-2 text-sm sm:text-base max-w-2xl font-normal">
          Consistent commit volume, architectural refactors, and active open-source contribution patterns.
        </p>
      </div>

      {/* Stats Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
        <div className="glass-card p-4 rounded-2xl bg-white border border-zinc-200/80 shadow-xs">
          <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase">CONTRIBUTIONS</span>
          <div className="text-2xl font-black text-zinc-900 font-mono mt-1">
            {githubActivityData.totalContributions}
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl bg-white border border-zinc-200/80 shadow-xs">
          <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-orange-500" /> CURRENT STREAK
          </span>
          <div className="text-2xl font-black text-orange-600 font-mono mt-1">
            {githubActivityData.currentStreak} <span className="text-xs font-normal text-zinc-400">days</span>
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl bg-white border border-zinc-200/80 shadow-xs">
          <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase">LONGEST STREAK</span>
          <div className="text-2xl font-black text-amber-600 font-mono mt-1">
            {githubActivityData.longestStreak} <span className="text-xs font-normal text-zinc-400">days</span>
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl bg-white border border-zinc-200/80 shadow-xs">
          <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase">REPOSITORIES</span>
          <div className="text-2xl font-black text-zinc-900 font-mono mt-1">
            {githubActivityData.repositoriesCount}
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl bg-white border border-zinc-200/80 shadow-xs">
          <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase">PROJECTS</span>
          <div className="text-2xl font-black text-zinc-900 font-mono mt-1">
            {githubActivityData.projectsCount}
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl bg-white border border-zinc-200/80 shadow-xs">
          <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase">TECHNOLOGIES</span>
          <div className="text-2xl font-black text-orange-600 font-mono mt-1">
            {githubActivityData.technologiesCount}
          </div>
        </div>
      </div>

      {/* Main Container: Contribution Matrix & Language Distribution */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200 mb-8 overflow-hidden shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-100">
          <div className="flex items-center gap-2">
            <GitCommit className="w-5 h-5 text-orange-500" />
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 font-mono">
              CONTRIBUTION MATRIX // 52 WEEKS
            </h3>
          </div>

          {/* Tooltip on active hover */}
          <div className="text-xs font-mono text-zinc-500 font-medium h-5">
            {hoveredDay ? (
              <span className="text-orange-600 font-bold">
                {hoveredDay.count} contributions on {hoveredDay.date}
              </span>
            ) : (
              <span>Hover cell to inspect timestamp</span>
            )}
          </div>
        </div>

        {/* Matrix Grid Scroll Area */}
        <div className="overflow-x-auto terminal-scroll pb-2">
          <div className="inline-flex gap-1 min-w-[720px]">
            {weeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-1">
                {week.map((day, dIdx) => (
                  <div
                    key={dIdx}
                    onMouseEnter={() => {
                      sound.playHover();
                      setHoveredDay(day);
                    }}
                    onMouseLeave={() => setHoveredDay(null)}
                    className={`w-3 h-3 rounded-[3px] transition-all duration-200 cursor-pointer hover:scale-125 hover:z-10 ${levelColor(
                      day.level
                    )}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-2 text-[10px] font-mono text-zinc-400 mt-4 font-semibold">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded-[2px] bg-zinc-100" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-orange-100 border border-orange-200" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-orange-300" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-orange-500" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-orange-600" />
          <span>More</span>
        </div>
      </div>

      {/* Language Breakdown & Recent Commits Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Language Distribution (5 cols) */}
        <div className="lg:col-span-5 glass-card p-6 rounded-3xl bg-white border border-zinc-200 shadow-sm">
          <h4 className="text-xs font-mono uppercase text-zinc-500 tracking-wider mb-4 flex items-center gap-2 font-bold">
            <Code2 className="w-4 h-4 text-orange-500" /> LANGUAGE DISTRIBUTION
          </h4>

          {/* Multi-segment progress bar */}
          <div className="w-full h-2.5 rounded-full overflow-hidden flex mb-6 bg-zinc-100 shadow-inner">
            {githubActivityData.languages.map((lang) => (
              <div
                key={lang.name}
                style={{
                  width: `${lang.percentage}%`,
                  backgroundColor: lang.color
                }}
                title={`${lang.name}: ${lang.percentage}%`}
              />
            ))}
          </div>

          {/* Language legend list */}
          <div className="space-y-2.5">
            {githubActivityData.languages.map((lang) => (
              <div key={lang.name} className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lang.color }} />
                  <span className="text-zinc-700 font-medium">{lang.name}</span>
                </div>
                <span className="text-zinc-500 font-bold">{lang.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Recent Commit Activity Feed (7 cols) */}
        <div className="lg:col-span-7 glass-card p-6 rounded-3xl bg-white border border-zinc-200 shadow-sm">
          <h4 className="text-xs font-mono uppercase text-zinc-500 tracking-wider mb-4 flex items-center gap-2 font-bold">
            <GitCommit className="w-4 h-4 text-orange-500" /> RECENT COMMITS & PULL REQUESTS
          </h4>

          <div className="space-y-3">
            {githubActivityData.recentCommits.map((commit, i) => (
              <div
                key={i}
                className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-orange-300 transition-colors flex items-start justify-between gap-4 font-mono text-xs shadow-xs"
              >
                <div className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-orange-600 font-bold">{commit.repo}</span>
                      <span className="text-[10px] text-zinc-500 bg-white px-2 py-0.5 rounded border border-zinc-200 font-semibold">
                        {commit.branch}
                      </span>
                    </div>
                    <p className="text-zinc-700 font-sans text-xs">
                      {commit.message}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] text-orange-600 font-bold block">{commit.hash}</span>
                  <span className="text-[10px] text-zinc-400">{commit.timeAgo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
