"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink, ShieldCheck, CheckCircle2, Calendar, Building2, Sparkles, ArrowUpRight } from "lucide-react";
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

export default function Certificates() {
  const [certificates, setCertificates] = useState<CertificateItem[]>(certificatesData);
  const [loading, setLoading] = useState(true);

  // Load certificates from API and fallback to localStorage / static data
  const loadCertificates = async () => {
    try {
      const res = await fetch("/api/certificates");
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.certificates) && json.certificates.length > 0) {
          setCertificates(json.certificates);
          return;
        }
      }
    } catch (err) {
      console.warn("Could not load certificates from API:", err);
    }

    // Fallback: check localStorage
    const saved = localStorage.getItem("admin_certificates");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCertificates(parsed);
          return;
        }
      } catch (e) {}
    }

    setCertificates(certificatesData);
  };

  useEffect(() => {
    loadCertificates().finally(() => setLoading(false));

    // Listen for real-time updates when modified via Admin
    const handleUpdate = () => {
      loadCertificates();
    };

    window.addEventListener("admin-certificates-updated", handleUpdate);
    return () => {
      window.removeEventListener("admin-certificates-updated", handleUpdate);
    };
  }, []);

  return (
    <section id="certificates" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-zinc-50/50 border-t border-zinc-200/60 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-orange-400/5 via-amber-400/5 to-sky-400/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/20 bg-white/90 backdrop-blur-md mb-4 shadow-xs"
          >
            <Award className="w-3.5 h-3.5 text-orange-600" />
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-wider text-orange-800 uppercase">
              CREDENTIALS & HONORS //
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-zinc-900"
          >
            Licenses &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500">
              Certifications
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3.5 text-sm sm:text-base text-zinc-600 max-w-2xl font-normal leading-relaxed"
          >
            Verified technical accreditations, enterprise engineering specializations, and professional achievements. Click any certificate to view the complete verification post on LinkedIn.
          </motion.p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {certificates.map((cert, index) => {
            const targetUrl = cert.linkedinUrl || (cert.linkedinPostId ? `https://www.linkedin.com/feed/update/urn:li:activity:${cert.linkedinPostId}` : "https://www.linkedin.com");

            return (
              <motion.div
                key={cert.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative"
              >
                <a
                  href={targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  onMouseEnter={() => sound.playHover()}
                  className="block h-full rounded-3xl bg-white border border-zinc-200/80 hover:border-orange-500/40 shadow-sm hover:shadow-[0_12px_35px_rgba(249,115,22,0.12)] transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
                >
                  {/* Certificate Image or Rich Preview */}
                  <div className="relative w-full aspect-[16/10] bg-gradient-to-br from-zinc-100 to-zinc-200/80 overflow-hidden border-b border-zinc-100 flex items-center justify-center">
                    {cert.image ? (
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                    ) : (
                      /* Placeholder Visual if no direct image was uploaded */
                      <div className="w-full h-full p-6 flex flex-col items-center justify-center text-center bg-gradient-to-br from-orange-50/60 via-white to-amber-50/40 relative">
                        <div className="w-14 h-14 rounded-2xl bg-white border border-orange-200/80 shadow-xs flex items-center justify-center text-orange-600 mb-3 group-hover:scale-110 transition-transform">
                          <Award className="w-7 h-7" />
                        </div>
                        <span className="text-xs font-mono font-bold text-zinc-800 tracking-wide uppercase">
                          {cert.issuer}
                        </span>
                        <span className="text-[11px] text-zinc-500 mt-1 font-mono">
                          Verified Credential
                        </span>
                      </div>
                    )}

                    {/* LinkedIn Pill Badge Top-Right */}
                    <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-zinc-200/80 text-[#0A66C2] shadow-xs group-hover:bg-[#0A66C2] group-hover:text-white group-hover:border-[#0A66C2] transition-colors">
                      <LinkedInIcon className="w-3.5 h-3.5 shrink-0" />
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
                        LinkedIn
                      </span>
                    </div>

                    {/* Category or Badge Top-Left */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-zinc-900/80 text-white backdrop-blur-md shadow-xs">
                        <ShieldCheck className="w-3 h-3 text-amber-400" />
                        <span>{cert.badge || "Verified"}</span>
                      </span>
                    </div>

                    {/* Hover Overlay Button Prompt */}
                    <div className="absolute inset-0 bg-zinc-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A66C2] text-white font-mono text-xs font-bold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <LinkedInIcon className="w-3.5 h-3.5" />
                        <span>Open on LinkedIn</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Certificate Details */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Issuer & Year */}
                      <div className="flex items-center justify-between gap-2 text-xs font-mono text-zinc-500 mb-2.5">
                        <span className="flex items-center gap-1.5 truncate font-semibold text-orange-700">
                          <Building2 className="w-3.5 h-3.5 shrink-0 text-orange-500" />
                          <span className="truncate">{cert.issuer}</span>
                        </span>
                        {cert.issueDate && (
                          <span className="flex items-center gap-1 shrink-0 px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 text-[10px] font-bold">
                            <Calendar className="w-2.5 h-2.5" />
                            {cert.issueDate}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-base sm:text-lg font-bold text-zinc-900 group-hover:text-orange-600 transition-colors leading-snug line-clamp-2">
                        {cert.title}
                      </h3>

                      {/* Description */}
                      {cert.description && (
                        <p className="mt-2 text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                          {cert.description}
                        </p>
                      )}
                    </div>

                    {/* Footer Action Button */}
                    <div className="mt-5 pt-3.5 border-t border-zinc-100 flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-500 group-hover:text-zinc-700 flex items-center gap-1 text-[11px]">
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

        {/* Bottom prompt for LinkedIn Profile */}
        <div className="mt-12 sm:mt-16 text-center">
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            onMouseEnter={() => sound.playHover()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white hover:bg-orange-50 border border-zinc-200 hover:border-orange-300 text-xs sm:text-sm font-semibold text-zinc-800 transition-all shadow-xs"
          >
            <LinkedInIcon className="w-4 h-4 text-[#0A66C2]" />
            <span>Connect & View All Endorsements on LinkedIn</span>
            <ArrowUpRight className="w-4 h-4 text-zinc-400" />
          </a>
        </div>

      </div>
    </section>
  );
}
