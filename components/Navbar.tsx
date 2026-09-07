"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Volume2, VolumeX, Cpu, ArrowUpRight, Briefcase } from "lucide-react";
import { sound } from "@/lib/audio";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const homeNavLinks = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" }
];

const servicesPageNavLinks = [
  { name: "Home", href: "/" },
  { name: "Catalog", href: "#catalog" },
  { name: "Tools", href: "#tools" },
  { name: "Estimator", href: "#estimator" },
  { name: "Workflow", href: "#process" },
  { name: "FAQs", href: "#faqs" },
  { name: "Contact", href: "#contact" }
];

const hirePageNavLinks = [
  { name: "Portfolio", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Resume", href: "#resume" },
  { name: "GitHub", href: "#github" },
  { name: "LinkedIn", href: "#linkedin" },
  { name: "Inquire", href: "#contact" }
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isServicesPage = pathname === "/services";
  const isHirePage = pathname === "/hire";

  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(
    isHirePage ? "resume" : isServicesPage ? "catalog" : "home"
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.isMuted);

  const currentNavLinks = isHirePage
    ? hirePageNavLinks
    : isServicesPage
    ? servicesPageNavLinks
    : homeNavLinks;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const linksWithHashes = currentNavLinks.filter((l) => l.href.startsWith("#"));
      const sections = linksWithHashes.map((l) => l.href.substring(1));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentNavLinks]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleSoundToggle = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playClick();
  };

  const handleLinkClick = (href: string) => {
    sound.playClick();
    setMobileMenuOpen(false);

    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(href);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-2 sm:pt-4 px-2 sm:px-6 pointer-events-none">
      <nav
        className={`pointer-events-auto w-full max-w-6xl flex items-center justify-between px-3 sm:px-5 py-2 sm:py-3 rounded-full transition-all duration-300 ${
          scrolled
            ? "glass-panel bg-white/95 shadow-[0_8px_25px_rgba(249,115,22,0.1)] border border-orange-500/20"
            : "bg-white/80 backdrop-blur-md border border-zinc-200/80 shadow-sm"
        }`}
      >
        {/* Brand Logo */}
        <Link
          href="/"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              handleLinkClick("#home");
            } else {
              sound.playClick();
            }
          }}
          className="flex items-center gap-1.5 sm:gap-2 group cursor-pointer"
          onMouseEnter={() => sound.playHover()}
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-orange-500/15 to-amber-500/15 border border-orange-500/30 flex items-center justify-center group-hover:border-orange-500 transition-colors shadow-xs">
            <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xs sm:text-sm tracking-wider font-extrabold text-zinc-900 group-hover:text-orange-600 transition-colors flex items-center gap-1">
              SAMRIDH
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            </span>
            <span className="text-[8px] sm:text-[9px] font-mono text-zinc-400 tracking-wider hidden xs:block">AI/ML × DEV</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-zinc-100/80 p-1.5 rounded-full border border-zinc-200/70">
          {currentNavLinks.map((link) => {
            const isHash = link.href.startsWith("#");
            const isActive = isHash && activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`relative px-3 py-1.5 text-xs font-semibold tracking-wide transition-colors rounded-full cursor-pointer ${
                  isActive
                    ? "text-orange-600"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 rounded-full bg-white shadow-sm border border-orange-500/20"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}

          {!isServicesPage && !isHirePage && (
            <Link
              href="/services"
              onClick={() => sound.playClick()}
              className="relative px-3 py-1.5 text-xs font-bold tracking-wide transition-all rounded-full bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200/70 flex items-center gap-1 cursor-pointer"
            >
              <span>Services</span>
              <ArrowUpRight className="w-3 h-3 text-orange-600" />
            </Link>
          )}

          {isServicesPage && (
            <Link
              href="/hire"
              onClick={() => sound.playClick()}
              className="relative px-3 py-1.5 text-xs font-bold tracking-wide transition-all rounded-full bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200/70 flex items-center gap-1 cursor-pointer"
            >
              <span>Resume & Hire</span>
              <ArrowUpRight className="w-3 h-3 text-orange-600" />
            </Link>
          )}

          {isHirePage && (
            <Link
              href="/"
              onClick={() => sound.playClick()}
              className="relative px-3 py-1.5 text-xs font-bold tracking-wide transition-all rounded-full bg-zinc-200/80 hover:bg-zinc-300 text-zinc-800 cursor-pointer"
            >
              <span>Back To Main</span>
            </Link>
          )}
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <button
            onClick={handleSoundToggle}
            title={isMuted ? "Unmute sound effects" : "Mute sound effects"}
            className="p-1.5 sm:p-2 rounded-full text-zinc-500 hover:text-orange-600 hover:bg-orange-50 border border-transparent hover:border-orange-200 transition-all cursor-pointer"
            aria-label="Toggle Sound Effects"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-orange-500" />}
          </button>

          <Link
            href="/hire"
            onClick={() => sound.playClick()}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold text-white bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 transition-all cursor-pointer shadow-[0_2px_10px_rgba(249,115,22,0.3)] hover:scale-105"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            <span>Hire Me</span>
          </Link>

          {/* Mobile Navigation Toggle Button */}
          <button
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-1.5 sm:p-2 rounded-xl text-zinc-700 hover:text-zinc-900 border border-zinc-200 hover:border-orange-300 bg-white shadow-xs transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-orange-600" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto fixed top-16 left-3 right-3 p-4 sm:p-5 rounded-3xl bg-white/98 backdrop-blur-2xl border border-orange-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col gap-1.5 md:hidden z-50 max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-2 mb-1 border-b border-zinc-100">
              <span className="text-[10px] font-mono text-orange-600 font-bold uppercase tracking-widest">
                NAVIGATION MENU
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-full text-zinc-400 hover:text-zinc-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {currentNavLinks.map((link) => {
              const isHash = link.href.startsWith("#");
              const isActive = isHash && activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                    isActive
                      ? "text-orange-600 bg-orange-50 border border-orange-200 font-bold shadow-xs"
                      : "text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50"
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-orange-500" />}
                </a>
              );
            })}

            <div className="pt-3 mt-1 border-t border-zinc-100 space-y-2">
              <Link
                href="/hire"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md"
              >
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>Hire Me / Resume & Profile</span>
                </div>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              {!isServicesPage && (
                <Link
                  href="/services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold bg-orange-50 text-orange-700 border border-orange-200"
                >
                  <span>Explore Full Services Page</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
