"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Award, CheckCircle2, ArrowUpRight, ShieldCheck, FileBadge } from "lucide-react";
import { profileData } from "@/data/profile";
import { certificatesData } from "@/data/certificates";
import { sound } from "@/lib/audio";

export default function About() {
  const [selectedCertCategory, setSelectedCertCategory] = useState<string>("All");

  const filteredCertificates = certificatesData.filter((cert) => {
    if (selectedCertCategory === "All") return true;
    return cert.category === selectedCertCategory;
  });

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
              Industry-standard certified proficiencies across Deep Learning, Full-Stack Software Engineering, Cloud Architecture, and MLOps.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 self-start sm:self-end">
            {["All", "AI / ML", "Full Stack", "Cloud & DevOps"].map((cat) => {
              const isActive = selectedCertCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    sound.playClick();
                    setSelectedCertCategory(cat);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-orange-500 text-white shadow-xs"
                      : "bg-zinc-100 text-zinc-600 hover:text-zinc-900 hover:bg-orange-50"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCertificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              onMouseEnter={() => sound.playHover()}
              className="group p-6 rounded-2xl bg-zinc-50/70 hover:bg-white border border-zinc-200/90 hover:border-orange-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header: Issuer + Year Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider bg-white border border-zinc-200 text-zinc-700 shadow-2xs group-hover:border-orange-200">
                    {cert.issuer}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400 font-semibold">
                    {cert.issueDate}
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-base font-bold text-zinc-900 group-hover:text-orange-600 transition-colors leading-snug mb-2">
                  {cert.title}
                </h4>

                {/* Credential ID / Verification Status */}
                <div className="flex items-center gap-2 mb-3 font-mono text-[10px]">
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>VERIFIED</span>
                  </span>
                  {cert.credentialId && (
                    <span className="text-zinc-400 truncate">
                      ID: {cert.credentialId}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-zinc-600 leading-relaxed mb-4 font-normal">
                  {cert.description}
                </p>

                {/* Skills Chips */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {cert.skills?.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md bg-white border border-zinc-200/80 text-[10.5px] font-mono text-zinc-700 group-hover:border-orange-200 shadow-2xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-3 border-t border-zinc-200/60 flex items-center justify-between">
                <span className="text-[10px] font-mono font-semibold text-orange-600">
                  {cert.badge}
                </span>

                {cert.verifyUrl && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => sound.playClick()}
                    className="inline-flex items-center gap-1 text-xs font-mono font-bold text-zinc-600 hover:text-orange-600 transition-colors cursor-pointer"
                  >
                    <span>View Credential</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
