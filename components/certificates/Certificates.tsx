"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Award, CheckCircle2, ArrowUpRight } from "lucide-react";
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
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load certificates from API or localStorage
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
      console.warn("Could not load certificates from API:", err);
    }

    // Fallback: check localStorage
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
    loadCertificates().finally(() => setLoading(false));

    // Listen for real-time updates when modified via Admin
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

  // If no certificates added yet, don't show empty block on main page
  if (!loading && certificates.length === 0) {
    return null;
  }

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
            Verified technical accreditations and professional certificates. Click any certificate to view and verify the post on LinkedIn.
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
                  {/* Certificate Image */}
                  <div className="relative w-full aspect-[16/10] bg-zinc-100 overflow-hidden border-b border-zinc-100 flex items-center justify-center">
                    {cert.image ? (
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full p-6 flex flex-col items-center justify-center text-center bg-zinc-50">
                        <Award className="w-12 h-12 text-orange-500 mb-2" />
                        <span className="text-xs font-mono font-bold text-zinc-700 uppercase">
                          {cert.title}
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

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-zinc-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A66C2] text-white font-mono text-xs font-bold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <LinkedInIcon className="w-3.5 h-3.5" />
                        <span>Open on LinkedIn</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Certificate Title & Footer */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <h3 className="text-base font-bold text-zinc-900 group-hover:text-orange-600 transition-colors leading-snug">
                      {cert.title}
                    </h3>

                    <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-400 text-[11px] flex items-center gap-1">
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

      </div>
    </section>
  );
}
