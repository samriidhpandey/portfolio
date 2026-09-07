"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, FileText, Send, CheckCircle, Copy, ArrowUpRight, Sparkles, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import confetti from "canvas-confetti";
import { sound } from "@/lib/audio";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Custom Website Development (Next.js / React)",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useState(() => {
    if (typeof window !== "undefined") {
      const handleSelect = (e: CustomEvent) => {
        if (e.detail) {
          setFormData((prev) => ({
            ...prev,
            projectType: e.detail
          }));
        }
      };
      window.addEventListener("select-service-objective" as any, handleSelect as any);
      return () => window.removeEventListener("select-service-objective" as any, handleSelect as any);
    }
  });

  const handleCopy = (text: string, field: string) => {
    sound.playClick();
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    sound.playClick();
    setIsSubmitting(true);

    // Save to Admin Panel Messages Store
    try {
      const newMsg = {
        id: `msg-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        projectType: formData.projectType,
        message: formData.message,
        date: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) + ", Today",
        unread: true
      };

      const existing = localStorage.getItem("admin_contact_messages");
      let list = [];
      if (existing) {
        try { list = JSON.parse(existing); } catch (err) {}
      }
      list.unshift(newMsg);
      localStorage.setItem("admin_contact_messages", JSON.stringify(list));
    } catch (err) {}

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      sound.playSuccess();
      try {
        confetti({
          particleCount: 65,
          spread: 70,
          origin: { y: 0.85 },
          colors: ["#FF6B00", "#F97316", "#F59E0B", "#EA580C"]
        });
      } catch {}
    }, 900);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      {/* Ambient background warm glow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-t from-orange-500/10 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Headline & Subtitle */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-orange-600 font-bold tracking-widest uppercase mb-4 px-4 py-1 rounded-full bg-orange-50 border border-orange-200">
          <Sparkles className="w-3.5 h-3.5 text-orange-500" />
          <span>START A PROJECT // HIRE AS FREELANCER</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-black text-zinc-900 tracking-tight mb-4">
          Let’s Build Something <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500">
            Profitable & Intelligent.
          </span>
        </h2>
        <p className="text-zinc-600 text-base sm:text-lg font-normal max-w-xl mx-auto">
          Need a modern high-converting website, marketing campaigns that bring paying clients, or custom AI automation? Send a brief message below.
        </p>
      </div>

      {/* Main Grid: Left Direct Channels & Right Transmission Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
        {/* Left Column: Direct Connect Cards (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="glass-card p-6 rounded-3xl bg-white border border-zinc-200 shadow-sm space-y-4">
            <h3 className="text-xs font-mono text-orange-600 font-bold uppercase tracking-wider">
              DIRECT CLIENT CHANNELS
            </h3>

            {/* Email Button / Copy */}
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-orange-300 transition-all flex items-center justify-between group shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 shadow-xs">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase block">EMAIL FOR QUOTES</span>
                  <span className="text-xs sm:text-sm font-mono font-semibold text-zinc-800">samridh.pandey@example.com</span>
                </div>
              </div>
              <button
                onClick={() => handleCopy("samridh.pandey@example.com", "email")}
                className="p-2.5 rounded-xl text-zinc-500 hover:text-orange-600 bg-white hover:bg-orange-50 border border-zinc-200 transition-colors cursor-pointer shadow-xs"
                title="Copy Email"
              >
                {copiedField === "email" ? (
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => sound.playHover()}
              className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-orange-300 transition-all flex items-center justify-between group cursor-pointer shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-xs">
                  <LinkedinIcon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase block">LINKEDIN PROFILE</span>
                  <span className="text-xs sm:text-sm font-semibold text-zinc-800 group-hover:text-orange-600 transition-colors">
                    in/samridh-pandey
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-orange-500 transition-colors" />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => sound.playHover()}
              className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-orange-300 transition-all flex items-center justify-between group cursor-pointer shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 shadow-xs">
                  <GithubIcon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase block">GITHUB REPOSITORIES</span>
                  <span className="text-xs sm:text-sm font-semibold text-zinc-800 group-hover:text-orange-600 transition-colors">
                    @samridhpandey
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-orange-500 transition-colors" />
            </a>

            {/* Resume CV */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleCopy("CV requested: samridh.pandey@example.com", "resume");
                sound.playClick();
              }}
              onMouseEnter={() => sound.playHover()}
              className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-orange-300 transition-all flex items-center justify-between group cursor-pointer shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-xs">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase block">FREELANCE PORTFOLIO & CV</span>
                  <span className="text-xs sm:text-sm font-semibold text-zinc-800 group-hover:text-orange-600 transition-colors">
                    Download Client Deck (PDF)
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-orange-500 transition-colors" />
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 text-xs font-mono font-medium text-orange-800 flex items-center gap-2 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse shrink-0" />
            <span>Response latency: typically within 6-12 hours.</span>
          </div>
        </div>

        {/* Right Column: Transmission Form (7 cols) */}
        <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-zinc-100 text-xs font-mono font-semibold">
              <span className="text-zinc-500">PROJECT INQUIRY FORM</span>
              <span className="text-orange-600">FREE CONSULTATION</span>
            </div>

            {isSent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-14 h-14 rounded-full bg-orange-50 border border-orange-300 text-orange-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-zinc-900">Project Brief Received!</h4>
                <p className="text-sm text-zinc-600 max-w-sm mx-auto font-normal">
                  Thank you, {formData.name}. I will review your requirements and send a customized proposal or schedule a call shortly.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="mt-4 px-5 py-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-xs font-mono font-bold text-orange-700 border border-orange-200 cursor-pointer shadow-xs"
                >
                  Send Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block mb-1 font-bold">
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Turner"
                      className="w-full bg-zinc-50 focus:bg-white border border-zinc-200 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-zinc-900 outline-none transition-all shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block mb-1 font-bold">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full bg-zinc-50 focus:bg-white border border-zinc-200 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-zinc-900 outline-none transition-all shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block mb-1 font-bold">
                    SERVICE NEEDED / PROJECT TYPE
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-zinc-50 focus:bg-white border border-zinc-200 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-zinc-900 outline-none transition-all shadow-xs cursor-pointer"
                  >
                    <option value="High-Converting Websites & Web Apps">Custom Website Development & Redesign (Next.js)</option>
                    <option value="Digital Marketing & Performance Growth">Digital Marketing & SEO Campaign (Google / Meta Ads)</option>
                    <option value="AI Chatbots & Intelligent Automation">AI Chatbot & Intelligent Automation Pipeline</option>
                    <option value="Full-Stack Web Product / Architecture">Full-Stack SaaS / Web Application</option>
                    <option value="Other Freelance Project">Other Freelance Project / Consulting</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block mb-1 font-bold">
                    PROJECT GOAL & TIMELINE
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your business, what you want to achieve, timeline, or current website URL..."
                    className="w-full bg-zinc-50 focus:bg-white border border-zinc-200 focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-zinc-900 outline-none transition-all resize-none shadow-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  onMouseEnter={() => sound.playHover()}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 text-white font-bold text-xs sm:text-sm font-mono tracking-wider shadow-[0_4px_20px_rgba(249,115,22,0.35)] hover:shadow-[0_6px_25px_rgba(249,115,22,0.45)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 hover:scale-[1.01]"
                >
                  {isSubmitting ? (
                    <span>PROCESSING INQUIRY...</span>
                  ) : (
                    <>
                      <span>GET FREE PROPOSAL & ESTIMATE</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Google Location Map Widget */}
      <div className="mt-12 glass-card p-4 sm:p-6 rounded-3xl bg-white border border-zinc-200 shadow-sm max-w-5xl mx-auto space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-orange-600" />
            <span className="font-bold text-zinc-900 uppercase">OFFICE & GLOBAL REMOTE LOCATION</span>
          </div>
          <span className="text-zinc-500 text-[11px] sm:text-xs">India • Global Remote (IST / UTC+5:30)</span>
        </div>

        <div className="w-full h-[260px] sm:h-[320px] rounded-2xl overflow-hidden border border-zinc-200 relative shadow-inner">
          <iframe
            title="Office Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.8773449339396!2d80.946166!3d26.846708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd991f32b16b%3A0x93ccba8909978be7!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full filter saturate-[0.9] contrast-[1.02]"
          />
        </div>
      </div>
    </section>
  );
}
