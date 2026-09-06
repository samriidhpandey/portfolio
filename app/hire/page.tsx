"use client";

import { useState, useEffect } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import AmbientBackground from "@/components/AmbientBackground";
import ResumeViewer from "@/components/hire/ResumeViewer";
import GitHubOutlet from "@/components/hire/GitHubOutlet";
import LinkedInOutlet from "@/components/hire/LinkedInOutlet";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/footer/Footer";
import { Briefcase, FileText, CheckCircle2, Clock, Phone, Mail, ArrowRight, Sparkles, ShieldCheck, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { sound } from "@/lib/audio";

export default function HirePage() {
  const [activeTab, setActiveTab] = useState<"all" | "resume" | "github" | "linkedin">("all");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTabChange = (tab: "all" | "resume" | "github" | "linkedin") => {
    sound.playClick();
    setActiveTab(tab);
  };

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#FAFAFB] text-zinc-900 selection:bg-orange-500/20 selection:text-orange-700">
        
        {/* Dynamic Animated Ambient Glows & Particles */}
        <AmbientBackground />

        {/* Ambient Grid Overlay */}
        <div className="fixed inset-0 friendly-grid opacity-25 pointer-events-none -z-20" />

        {/* Smart Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
          
          {/* Hire Hero Header */}
          <section className="text-center pt-8 pb-6 space-y-5">
            
            {/* Real-time Status Beacon */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-orange-500/35 bg-white/95 backdrop-blur-md shadow-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-mono font-bold text-zinc-800 uppercase tracking-wide">
                AVAILABLE FOR FULL-TIME HIRE & FREELANCE CONTRACTS
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-zinc-900 leading-[1.1]">
              Hire <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500">Samridh Pandey</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed font-normal">
              Direct live outlet: View my official curriculum vitae, verify my GitHub code repositories, connect on LinkedIn, or start a project immediately.
            </p>

            {/* Real-Time Telemetry Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto p-4 rounded-3xl bg-white border border-zinc-200/90 shadow-sm text-left font-mono text-xs">
              <div className="p-3 border-r border-zinc-100 last:border-0">
                <span className="text-[10px] text-zinc-400 font-bold uppercase block flex items-center gap-1">
                  <Clock className="w-3 h-3 text-orange-500" /> LOCAL TIME
                </span>
                <span className="text-sm font-black text-zinc-900 mt-1 block">
                  {currentTime || "Loading..."}
                </span>
                <span className="text-[10px] text-orange-600">IST / UTC+5:30</span>
              </div>

              <div className="p-3 border-r border-zinc-100 last:border-0">
                <span className="text-[10px] text-zinc-400 font-bold uppercase block flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> RESPONSE TIME
                </span>
                <span className="text-sm font-black text-zinc-900 mt-1 block">
                  &lt; 2 Hours
                </span>
                <span className="text-[10px] text-emerald-600">Fast Communication</span>
              </div>

              <div className="p-3 border-r border-zinc-100 last:border-0">
                <span className="text-[10px] text-zinc-400 font-bold uppercase block flex items-center gap-1">
                  <Briefcase className="w-3 h-3 text-orange-500" /> PREFERRED ROLES
                </span>
                <span className="text-sm font-black text-zinc-900 mt-1 block">
                  Full-Stack / AI
                </span>
                <span className="text-[10px] text-zinc-500">Contract & Full-Time</span>
              </div>

              <div className="p-3">
                <span className="text-[10px] text-zinc-400 font-bold uppercase block flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-500" /> LOCATION
                </span>
                <span className="text-sm font-black text-zinc-900 mt-1 block">
                  India • Global Remote
                </span>
                <span className="text-[10px] text-zinc-500">Async-Ready</span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href="https://wa.me/919369904727"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-emerald-600/25 flex items-center gap-2 hover:scale-105 transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp Instant Chat</span>
              </a>

              <a
                href="mailto:samridhpandey727@gmail.com"
                onClick={() => sound.playClick()}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-orange-500/25 flex items-center gap-2 hover:scale-105 transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Email: samridhpandey727@gmail.com</span>
              </a>
            </div>

            {/* Section Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
              <button
                onClick={() => handleTabChange("all")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "all"
                    ? "bg-orange-500 text-white shadow-sm"
                    : "bg-white text-zinc-700 border border-zinc-200 hover:bg-orange-50"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>View Complete Profile Outlet</span>
              </button>

              <button
                onClick={() => handleTabChange("resume")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "resume"
                    ? "bg-orange-500 text-white shadow-sm"
                    : "bg-white text-zinc-700 border border-zinc-200 hover:bg-orange-50"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Official Resume (CV)</span>
              </button>

              <button
                onClick={() => handleTabChange("github")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "github"
                    ? "bg-orange-500 text-white shadow-sm"
                    : "bg-white text-zinc-700 border border-zinc-200 hover:bg-orange-50"
                }`}
              >
                <GithubIcon className="w-3.5 h-3.5 fill-current" />
                <span>GitHub Outlet (@samriidhpandey)</span>
              </button>

              <button
                onClick={() => handleTabChange("linkedin")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "linkedin"
                    ? "bg-orange-500 text-white shadow-sm"
                    : "bg-white text-zinc-700 border border-zinc-200 hover:bg-orange-50"
                }`}
              >
                <LinkedinIcon className="w-3.5 h-3.5 fill-current" />
                <span>LinkedIn Profile Outlet</span>
              </button>
            </div>
          </section>

          {/* Tab Content Display */}
          {(activeTab === "all" || activeTab === "resume") && (
            <section id="resume">
              <ResumeViewer />
            </section>
          )}

          {(activeTab === "all" || activeTab === "github") && (
            <section id="github">
              <GitHubOutlet />
            </section>
          )}

          {(activeTab === "all" || activeTab === "linkedin") && (
            <section id="linkedin">
              <LinkedInOutlet />
            </section>
          )}

          {/* Direct Project Inquiry Form */}
          <section id="contact">
            <Contact />
          </section>

        </main>

        {/* Global Footer */}
        <Footer />

      </div>
    </SmoothScroll>
  );
}
