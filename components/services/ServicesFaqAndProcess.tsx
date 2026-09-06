"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clientFaqs } from "@/data/detailedServices";
import { ChevronDown, HelpCircle, Workflow, CheckCircle2, ArrowRight } from "lucide-react";
import { sound } from "@/lib/audio";

const collaborationSteps = [
  {
    step: "01",
    title: "Discovery & Architecture Blueprint",
    time: "Day 1 – 2",
    desc: "We align on your business goals, target audience, technical requirements, and choose the optimal tech stack. You receive a fixed-scope milestone agreement with zero ambiguity."
  },
  {
    step: "02",
    title: "UX Wireframing & Clickable Design",
    time: "Day 3 – 6",
    desc: "We design clean, responsive Figma layouts and user flows. You get to click through and approve the exact look, feel, and typography before we write the code."
  },
  {
    step: "03",
    title: "Agile Build & Live Private Staging Link",
    time: "Week 2 – 3",
    desc: "We build your application or campaign in rapid agile sprints. You receive a live password-protected staging URL updated daily so you can watch real-time progress."
  },
  {
    step: "04",
    title: "Stress Testing, Launch & 30-Day Support",
    time: "Week 3 – 4",
    desc: "We run 99+ Lighthouse speed checks, mobile stress tests, and security audits. Once launched, you receive 100% source code ownership and 30 days of free bug-fixing support."
  }
];

export default function ServicesFaqAndProcess() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    sound.playClick();
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
      
      {/* 1. Collaboration Process Section */}
      <section id="process">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-orange-600 font-bold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200">
            <Workflow className="w-3.5 h-3.5 text-orange-500" />
            <span>HOW WE WORK TOGETHER // TRANSPARENT EXECUTION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 tracking-tight max-w-3xl">
            Our 4-Phase Client Collaboration Process
          </h2>
          <p className="text-zinc-600 mt-3 text-sm sm:text-base max-w-2xl font-normal">
            No endless meetings or radio silence. You get direct 1-on-1 communication, daily staging links, and transparent milestone updates from start to finish.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collaborationSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-zinc-200/80 shadow-xs hover:border-orange-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4 font-mono">
                  <span className="text-2xl font-black text-orange-500 group-hover:scale-110 transition-transform">
                    {step.step}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-200">
                    {step.time}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-zinc-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-zinc-100 flex items-center gap-1 text-[11px] font-mono text-orange-600 font-semibold">
                <span>Phase {idx + 1} Milestone</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Client FAQs Section */}
      <section id="faqs" className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-orange-600 font-bold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200">
            <HelpCircle className="w-3.5 h-3.5 text-orange-500" />
            <span>FREQUENTLY ASKED QUESTIONS // CLEAR ANSWERS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
            Everything You Need To Know Before Starting
          </h2>
          <p className="text-zinc-600 mt-2 text-sm sm:text-base max-w-xl font-normal">
            Common questions from founders and business owners regarding contracts, revisions, source code rights, and ongoing support.
          </p>
        </div>

        <div className="space-y-4">
          {clientFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-zinc-200/80 bg-white shadow-xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-orange-50/40 transition-colors"
                >
                  <span className="text-base sm:text-lg font-bold text-zinc-900">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 bg-orange-500 text-white border-orange-500" : "bg-zinc-50 text-zinc-500"
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 pb-6 sm:px-6 text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 pt-4 font-normal">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. High-Impact Call to Action Banner */}
      <section className="glass-panel p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-white via-orange-50/40 to-amber-50/50 border border-orange-500/25 shadow-xl text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <span className="px-4 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-mono font-bold tracking-widest uppercase">
            LET'S BUILD SOMETHING EXTRAORDINARY
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 tracking-tight">
            Ready to Build Your Website, Rank On Google, Or Automate Your Business?
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base max-w-xl mx-auto font-normal">
            Whether you have a detailed specification or just an early idea, let’s talk. I offer a free 20-minute discovery consultation with zero sales pressure.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                sound.playClick();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-orange-500/25 hover:shadow-xl hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Start Your Project Now</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="mailto:samridhpandey727@gmail.com"
              className="px-7 py-4 rounded-xl bg-white hover:bg-orange-50 text-zinc-800 border border-zinc-200 hover:border-orange-300 font-bold text-sm tracking-wide transition-all shadow-sm cursor-pointer"
            >
              <span>Email: samridhpandey727@gmail.com</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
