"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Award, CheckCircle2, ArrowUpRight, ShieldCheck, Sparkles } from "lucide-react";
import { profileData } from "@/data/profile";
import { CertificateItem, certificatesData } from "@/data/certificates";
import { sound } from "@/lib/audio";

// Official LinkedIn Icon component
function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.225 0z" />
    </svg>
  );
}

export default function About() {
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);

  // Load certificates dynamically from API and localStorage
  const loadCertificates = async () => {
    try {
      const res = await fetch("/api/certificates");
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.certificates)) {
          setCertificates(json.certificates);
          return;
        }
      }
    } catch (err) {
      console.warn("Could not fetch certificates from API:", err);
    }

    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("admin_certificates");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setCertificates(parsed);
            return;
          }
        } catch (e) {}
      }
    }

    setCertificates(certificatesData);
  };

  useEffect(() => {
    loadCertificates();

    const handleUpdate = () => {
      loadCertificates();
    };

    window.addEventListener("admin-certificates-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("admin-certificates-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

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

      {/* Verified Certificates & Accreditations Section */}
      <div id="certificates" className="glass-panel p-6 sm:p-10 rounded-3xl bg-white border border-orange-500/20 shadow-lg space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-zinc-100">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-orange-600 font-bold uppercase tracking-widest mb-1.5">
              <Award className="w-4 h-4 text-orange-500" />
              <span>ACCREDITED EXPERTISE // VERIFIED CREDENTIALS</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
              Certifications & Professional Honors
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-xl font-normal">
              Click any certificate card below to view and verify the post directly on LinkedIn.
            </p>
          </div>

          <span className="text-xs font-mono font-bold text-orange-600 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 self-start sm:self-auto">
            {certificates.length} Verified Certificate{certificates.length === 1 ? "" : "s"}
          </span>
        </div>

        {/* Certificate Cards Grid */}
        {certificates.length === 0 ? (
          <div className="py-14 px-6 text-center rounded-2xl bg-zinc-50/80 border border-dashed border-zinc-300 flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-3">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-zinc-800">No Certificates Uploaded Yet</h4>
            <p className="text-xs text-zinc-500 mt-1 max-w-md">
              Aap apne Admin Panel (<code>/admin</code>) ke <b>Certificates & LinkedIn</b> tab se certificate image, title aur LinkedIn post ID upload kar sakte hain. Wo yahan turant dikhenge!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => {
              const targetUrl = cert.linkedinUrl || (cert.linkedinPostId ? `https://www.linkedin.com/feed/update/urn:li:activity:${cert.linkedinPostId}` : "https://www.linkedin.com");

              return (
                <motion.div
                  key={cert.id || index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  className="group relative"
                >
                  <a
                    href={targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    onMouseEnter={() => sound.playHover()}
                    className="block h-full rounded-2xl bg-white border border-zinc-200/90 hover:border-orange-400 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer"
                  >
                    {/* Certificate Image Box */}
                    <div className="relative w-full aspect-[16/10] bg-zinc-100 overflow-hidden border-b border-zinc-100 flex items-center justify-center">
                      {cert.image ? (
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-center p-4 bg-orange-50/40">
                          <Award className="w-10 h-10 text-orange-500 mb-2 group-hover:scale-110 transition-transform" />
                          <span className="text-xs font-mono font-bold text-zinc-800">
                            {cert.title}
                          </span>
                        </div>
                      )}

                      {/* LinkedIn Pill Badge Top-Right */}
                      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-zinc-200 text-[#0A66C2] shadow-xs group-hover:bg-[#0A66C2] group-hover:text-white group-hover:border-[#0A66C2] transition-colors">
                        <LinkedInIcon className="w-3.5 h-3.5 shrink-0" />
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
                          LinkedIn
                        </span>
                      </div>

                      {/* Hover Overlay Prompt */}
                      <div className="absolute inset-0 bg-zinc-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#0A66C2] text-white font-mono text-xs font-bold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <LinkedInIcon className="w-3.5 h-3.5" />
                          <span>Open on LinkedIn</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>

                    {/* Certificate Title & Footer */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <h4 className="text-base font-bold text-zinc-900 group-hover:text-orange-600 transition-colors leading-snug">
                        {cert.title}
                      </h4>

                      <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-mono">
                        <span className="text-zinc-500 flex items-center gap-1 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Verified Credential</span>
                        </span>

                        <span className="inline-flex items-center gap-1 font-bold text-[#0A66C2] group-hover:translate-x-0.5 transition-transform">
                          <span>View Post</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
