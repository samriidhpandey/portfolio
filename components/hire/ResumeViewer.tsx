"use client";

import { useState } from "react";
import { Download, Printer, Copy, Check, FileText, ExternalLink, Mail, Phone, MapPin, Briefcase, GraduationCap, Award, Code2 } from "lucide-react";
import { sound } from "@/lib/audio";

export default function ResumeViewer() {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  const handleCopyLink = () => {
    sound.playClick();
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl border border-zinc-200/90 shadow-xl overflow-hidden print:border-none print:shadow-none">
      
      {/* Resume Action Bar (Hidden in Print) */}
      <div className="p-4 sm:p-6 bg-zinc-50/80 border-b border-zinc-200/80 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-2 font-mono text-xs text-orange-600 font-bold uppercase tracking-wider">
          <FileText className="w-4 h-4 text-orange-500" />
          <span>OFFICIAL CURRICULUM VITAE // SAMRIDH PANDEY</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-orange-50 text-zinc-700 hover:text-orange-600 border border-zinc-200 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Link Copied!" : "Share Link"}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold shadow-sm hover:scale-105 transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Actual Printable Resume Document Sheet */}
      <div className="p-6 sm:p-12 space-y-10 text-zinc-800">
        
        {/* Header Block */}
        <div className="border-b border-zinc-200 pb-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900">
                SAMRIDH PANDEY
              </h1>
              <p className="text-base sm:text-lg font-mono font-bold text-orange-600 mt-1">
                AI/ML Engineer × Full-Stack Web Developer × Growth Strategist
              </p>
            </div>
            <div className="text-left sm:text-right font-mono text-xs text-zinc-500 space-y-1">
              <p className="flex items-center sm:justify-end gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-orange-500" />
                <span>India (Available Globally Remote / Relocation)</span>
              </p>
              <p className="flex items-center sm:justify-end gap-1.5">
                <Mail className="w-3.5 h-3.5 text-orange-500" />
                <a href="mailto:samridhpandey727@gmail.com" className="hover:text-orange-600 font-semibold">
                  samridhpandey727@gmail.com
                </a>
              </p>
              <p className="flex items-center sm:justify-end gap-1.5">
                <Phone className="w-3.5 h-3.5 text-orange-500" />
                <a href="tel:+919369904727" className="hover:text-orange-600 font-semibold">
                  +91 9369904727
                </a>
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-4xl">
            Passionate and performance-focused AI/ML and Full-Stack Engineer with 28+ delivered web products, enterprise AI automation pipelines, and high-converting marketing setups. Specialized in building distributed full-stack systems with Next.js 15, TypeScript, Node.js, Python, and deploying autonomous LLM agents with deterministic guardrails.
          </p>
        </div>

        {/* Technical Competencies */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono font-bold text-orange-600 uppercase tracking-widest flex items-center gap-2">
            <Code2 className="w-4 h-4 text-orange-500" />
            Core Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80">
              <span className="font-bold text-zinc-900 block mb-1">Frontend & Architecture:</span>
              <span className="text-zinc-600">Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion, HTML5, CSS3 Modules, Three.js, WebGL</span>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80">
              <span className="font-bold text-zinc-900 block mb-1">Backend, Database & Cloud:</span>
              <span className="text-zinc-600">Node.js, Express, Python FastAPI, PostgreSQL, Supabase, Prisma ORM, Redis, Vercel Edge, AWS (S3, EC2), Docker</span>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80">
              <span className="font-bold text-zinc-900 block mb-1">AI/ML & Intelligent Systems:</span>
              <span className="text-zinc-600">PyTorch, LangChain, LlamaIndex, OpenAI GPT-4o, Anthropic Claude 3.5, Pinecone, Qdrant, RAG Architecture, HuggingFace</span>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80">
              <span className="font-bold text-zinc-900 block mb-1">Growth & Digital Marketing:</span>
              <span className="text-zinc-600">Technical SEO, Google Search Console, GA4, Google Tag Manager (GTM), Meta Ads Manager, Ahrefs, SEMrush, CRO</span>
            </div>
          </div>
        </div>

        {/* Professional Experience & Client Delivery */}
        <div className="space-y-6">
          <h2 className="text-xs font-mono font-bold text-orange-600 uppercase tracking-widest flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-orange-500" />
            Professional Experience & Client Work
          </h2>

          <div className="space-y-6">
            {/* Experience Item 1 */}
            <div className="border-l-2 border-orange-500 pl-4 space-y-1.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <h3 className="text-base font-bold text-zinc-900">
                  Lead Full-Stack Developer & AI Solutions Architect
                </h3>
                <span className="text-xs font-mono font-semibold text-orange-600">
                  2024 – Present // Freelance & Consulting
                </span>
              </div>
              <p className="text-xs font-mono text-zinc-500">Global Clients • Remote</p>
              <ul className="list-disc list-inside text-xs text-zinc-600 space-y-1 pt-1 leading-relaxed">
                <li>Architected 28+ custom web applications and business landing pages with Next.js 15, achieving 98+ Google PageSpeed scores and sub-second load times.</li>
                <li>Engineered autonomous customer support bots and RAG document search pipelines using LangChain and Pinecone, reducing client manual ticket resolution times by 70%.</li>
                <li>Managed performance marketing funnels across Meta & Google Ads, achieving an average client ROAS of 350% to 600%.</li>
                <li>Implemented secure payment gateways (Stripe, Razorpay) and webhook automations across disparate CRMs.</li>
              </ul>
            </div>

            {/* Experience Item 2 */}
            <div className="border-l-2 border-zinc-300 pl-4 space-y-1.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <h3 className="text-base font-bold text-zinc-900">
                  AI/ML Engineer & Systems Research
                </h3>
                <span className="text-xs font-mono font-semibold text-zinc-500">
                  2023 – 2024
                </span>
              </div>
              <p className="text-xs font-mono text-zinc-500">Independent Research & Open-Source</p>
              <ul className="list-disc list-inside text-xs text-zinc-600 space-y-1 pt-1 leading-relaxed">
                <li>Developed computer vision and neural segmentation pipelines in PyTorch and OpenCV.</li>
                <li>Built real-time web telemetry emulators and interactive 3D WebGL interfaces.</li>
                <li>Published open-source full-stack and AI repositories on GitHub with high code maintainability.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Notable Featured Projects */}
        <div className="space-y-4">
          <h2 className="text-xs font-mono font-bold text-orange-600 uppercase tracking-widest flex items-center gap-2">
            <Award className="w-4 h-4 text-orange-500" />
            Key Projects & Case Studies
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-1.5">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-zinc-900 text-sm">NeuroPulse AI Medical Platform</h3>
                <span className="font-mono text-[10px] text-orange-600 font-bold">Next.js + PyTorch</span>
              </div>
              <p className="text-zinc-600 text-[11px] leading-relaxed">
                High-throughput clinical EEG diagnostic platform with 99.4% precision and real-time WebSocket waveform streaming.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-1.5">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-zinc-900 text-sm">OmniScale Autonomous Support Agent</h3>
                <span className="font-mono text-[10px] text-orange-600 font-bold">RAG + Pinecone</span>
              </div>
              <p className="text-zinc-600 text-[11px] leading-relaxed">
                Enterprise support assistant ingesting 5,000+ company documents with sub-200ms latency and zero hallucination guardrails.
              </p>
            </div>
          </div>
        </div>

        {/* Education & Certifications */}
        <div className="border-t border-zinc-200 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xs font-mono font-bold text-orange-600 uppercase tracking-widest flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-orange-500" />
              Education & Background
            </h2>
            <p className="text-sm font-bold text-zinc-900">Bachelor of Technology (Computer Science / Engineering)</p>
            <p className="text-xs text-zinc-500 font-mono">Focus on Artificial Intelligence, Distributed Systems & Modern Web Architecture</p>
          </div>

          <div className="text-left sm:text-right font-mono text-xs text-zinc-500">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
              ✓ Verified Credentials
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
