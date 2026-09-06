"use client";

import { ExternalLink, CheckCircle2, Award, Users, ShieldCheck, MessageSquare, Briefcase } from "lucide-react";
import { LinkedinIcon } from "@/components/icons";
import { sound } from "@/lib/audio";

export default function LinkedInOutlet() {
  return (
    <div className="bg-white rounded-3xl border border-zinc-200/90 p-6 sm:p-8 shadow-xl space-y-6">
      
      {/* Header & Identity */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-100">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#0A66C2] text-white flex items-center justify-center shadow-md">
            <LinkedinIcon className="w-8 h-8 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-zinc-900">Samridh Pandey</h3>
              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-mono font-bold">
                ● Verified Profile
              </span>
            </div>
            <p className="text-xs text-zinc-600 font-medium">
              AI/ML Engineer & Full-Stack Web Developer • Freelance Digital Partner
            </p>
            <a
              href="https://www.linkedin.com/in/samridh-pandey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono font-semibold text-[#0A66C2] hover:underline flex items-center gap-1 mt-0.5"
            >
              <span>linkedin.com/in/samridh-pandey</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <a
          href="https://www.linkedin.com/in/samridh-pandey"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sound.playClick()}
          className="px-5 py-2.5 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-sm hover:scale-105 self-start sm:self-auto"
        >
          <span>Connect on LinkedIn</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Highlights & Endorsements */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-1">
          <div className="flex items-center gap-1.5 text-zinc-500 font-mono text-[10px] uppercase font-bold">
            <Users className="w-3.5 h-3.5 text-[#0A66C2]" />
            Network Reach
          </div>
          <p className="text-base font-black text-zinc-900">500+ Connections</p>
          <p className="text-[11px] text-zinc-500">Founders, CTOs & Growth Marketers</p>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-1">
          <div className="flex items-center gap-1.5 text-zinc-500 font-mono text-[10px] uppercase font-bold">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            Top Endorsed Skills
          </div>
          <p className="text-base font-black text-zinc-900">Next.js & AI Systems</p>
          <p className="text-[11px] text-orange-600 font-medium">Full-Stack & Machine Learning</p>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-1">
          <div className="flex items-center gap-1.5 text-zinc-500 font-mono text-[10px] uppercase font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Recommendations
          </div>
          <p className="text-base font-black text-zinc-900">100% Recommended</p>
          <p className="text-[11px] text-zinc-500">Client Delivery & Reliability</p>
        </div>
      </div>

      {/* Summary Quote */}
      <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 flex items-start gap-3 text-xs text-zinc-700 leading-relaxed">
        <MessageSquare className="w-5 h-5 text-[#0A66C2] shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-zinc-900 block mb-0.5">Professional Executive Bio:</span>
          "I partner with early-stage founders and growing businesses to design high-converting web apps, build custom autonomous AI agents, and execute data-backed SEO/performance marketing. Direct collaboration, clean architecture, and business ROI."
        </div>
      </div>

    </div>
  );
}
