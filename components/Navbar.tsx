"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Volume2, VolumeX, Cpu, ArrowUpRight, Briefcase } from "lucide-react";
import { sound } from "@/lib/audio";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

interface NavLinkItem {
  name: string;
  href: string;
}

const homeNavLinks: NavLinkItem[] = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" }
];

const servicesPageNavLinks: NavLinkItem[] = [
  { name: "Home", href: "/" },
  { name: "Catalog", href: "#catalog" },
  { name: "Tools", href: "#tools" },
  { name: "Estimator", href: "#estimator" },
  { name: "Workflow", href: "#process" },
  { name: "FAQs", href: "#faqs" },
  { name: "Contact", href: "#contact" }
];

const hirePageNavLinks: NavLinkItem[] = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Resume", href: "#resume" },
  { name: "GitHub", href: "#github" },
  { name: "LinkedIn", href: "#linkedin" },
  { name: "Contact", href: "#contact" }
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

  // Scroll to element with fixed navbar offset and Lenis coordination
  const scrollToElement = useCallback((targetSelector: string) => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: string | Element, opts: { offset: number; duration: number }) => void } }).__lenis;
    const el = document.querySelector(targetSelector);
    if (!el) return;

    if (lenis) {
      lenis.scrollTo(el, { offset: -80, duration: 1.1 });
    } else {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }, []);

  // Update active section and scroll state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const linksWithHashes = currentNavLinks.filter((l) => l.href.startsWith("#"));
      if (linksWithHashes.length === 0) return;

      const sections = linksWithHashes.map((l) => l.href.substring(1));

      // Check if user is near the bottom of the page
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 70;
      if (isAtBottom) {
        const lastSection = sections[sections.length - 1];
        if (lastSection) {
          setActiveSection(lastSection);
          return;
        }
      }

      // Detect active section based on position
      const scrollThreshold = window.scrollY + 180;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          if (elementTop <= scrollThreshold) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
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

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
        scrollToElement(href);
      } else {
        // If element is not on current page (e.g. user on /services clicking a home section)
        router.push("/" + href);
      }
    } else {
      router.push(href);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-2.5 sm:pt-4 px-3 sm:px-6 pointer-events-none">
      <nav
        aria-label="Main Navigation"
        className={`pointer-events-auto w-full max-w-6xl flex items-center justify-between px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-300 ${
          scrolled
            ? "glass-panel bg-white/95 shadow-[0_10px_30px_rgba(249,115,22,0.12)] border border-orange-500/20"
            : "bg-white/85 backdrop-blur-md border border-zinc-200/80 shadow-xs"
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
          className="flex items-center gap-2 group cursor-pointer"
          onMouseEnter={() => sound.playHover()}
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-orange-500/15 to-amber-500/15 border border-orange-500/30 flex items-center justify-center group-hover:border-orange-500 group-hover:shadow-[0_0_12px_rgba(249,115,22,0.3)] transition-all shadow-xs">
            <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xs sm:text-sm tracking-wider font-extrabold text-zinc-900 group-hover:text-orange-600 transition-colors flex items-center gap-1">
              SAMRIDH
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            </span>
            <span className="text-[8px] sm:text-[9px] font-mono text-zinc-400 tracking-wider hidden sm:block">AI/ML × DEV</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-0.5 bg-zinc-100/80 p-1 rounded-full border border-zinc-200/70 shadow-inner">
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
                className={`relative px-3 py-1.5 text-xs font-semibold tracking-wide transition-colors rounded-full cursor-pointer select-none ${
                  isActive
                    ? "text-orange-600"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 rounded-full bg-white shadow-xs border border-orange-500/20"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Sound FX Toggle */}
          <button
            onClick={handleSoundToggle}
            title={isMuted ? "Unmute sound effects" : "Mute sound effects"}
            className="p-1.5 sm:p-2 rounded-full text-zinc-500 hover:text-orange-600 hover:bg-orange-50/80 border border-transparent hover:border-orange-200 transition-all cursor-pointer"
            aria-label="Toggle Sound Effects"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-orange-500" />}
          </button>

          {/* Hire Me CTA (hidden on mobile header to avoid clutter, available in mobile drawer) */}
          <Link
            href="/hire"
            onClick={() => sound.playClick()}
            onMouseEnter={() => sound.playHover()}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 transition-all cursor-pointer shadow-[0_2px_10px_rgba(249,115,22,0.3)] hover:scale-105 active:scale-95"
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
            className={`md:hidden p-1.5 sm:p-2 rounded-xl border transition-all cursor-pointer ${
              mobileMenuOpen
                ? "text-orange-600 bg-orange-50 border-orange-300 shadow-xs"
                : "text-zinc-700 hover:text-zinc-900 border-zinc-200 hover:border-orange-300 bg-white shadow-xs"
            }`}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-orange-600" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="pointer-events-auto fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden"
              aria-hidden="true"
            />

            {/* Slide & Fade Mobile Drawer Card */}
            <motion.div
              key="mobile-drawer"
              initial={{ opacity: 0, y: -16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.95 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto fixed top-16 left-3 right-3 sm:left-6 sm:right-6 p-4 sm:p-5 rounded-3xl bg-white/98 backdrop-blur-2xl border border-orange-500/25 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] flex flex-col gap-1.5 md:hidden z-50 max-h-[85vh] overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-2.5 mb-1 border-b border-zinc-100">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-[11px] font-mono text-zinc-900 font-bold uppercase tracking-wider">
                    NAVIGATION MENU
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[10px] font-mono font-semibold text-zinc-400 hover:text-orange-600 px-2 py-0.5 rounded-md hover:bg-orange-50 transition-colors"
                >
                  CLOSE
                </button>
              </div>

              {/* Links List */}
              <div className="flex flex-col gap-1 py-1">
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
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        isActive
                          ? "text-orange-600 bg-orange-50/80 border border-orange-200/80 font-bold shadow-xs"
                          : "text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50"
                      }`}
                    >
                      <span>{link.name}</span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
                      )}
                    </a>
                  );
                })}
              </div>

              {/* Bottom Quick-Action CTAs */}
              <div className="pt-3 mt-1 border-t border-zinc-100 space-y-2">
                <Link
                  href="/hire"
                  onClick={() => {
                    sound.playClick();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 text-white shadow-md hover:opacity-95 transition-opacity"
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
                    onClick={() => {
                      sound.playClick();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 transition-colors"
                  >
                    <span>Explore Full Services Page</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
