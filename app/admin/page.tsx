"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Unlock,
  Users,
  Eye,
  MessageSquare,
  Briefcase,
  TrendingUp,
  Globe,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  XCircle,
  Mail,
  FileText,
  Save,
  Search,
  ChevronRight,
  ShieldAlert,
  ArrowUpRight,
  Sparkles,
  BarChart3,
  Smartphone,
  Monitor,
  RefreshCw,
  LogOut,
  MapPin
} from "lucide-react";
import Link from "next/link";
import SmoothScroll from "@/components/SmoothScroll";
import { projectsData, ProjectItem } from "@/data/projects";
import { profileData, ProfileData } from "@/data/profile";
import { sound } from "@/lib/audio";
import Logo from "@/components/Logo";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  projectType: string;
  message: string;
  date: string;
  unread: boolean;
}

export default function AdminPage() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState(false);

  // Navigation tab state
  const [activeTab, setActiveTab] = useState<"overview" | "messages" | "projects" | "profile">("overview");

  // Data state
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [profile, setProfile] = useState<ProfileData>(profileData);

  // Visitors & Analytics state
  const [visitorStats, setVisitorStats] = useState({
    totalVisitors: 1845,
    pageViews: 4920,
    todayVisitors: 142,
    conversionRate: "4.8%"
  });

  // Project Modal state
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: "",
    subtitle: "",
    category: "Full Stack" as const,
    description: "",
    githubUrl: "",
    demoUrl: "",
    image: "",
    technologies: ""
  });

  // Profile Form state
  const [profileForm, setProfileForm] = useState({
    name: profileData.name,
    title: profileData.title,
    availability: profileData.availability,
    location: profileData.location,
    tagline: profileData.tagline
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Initial Auth Check & Data Loading
  useEffect(() => {
    const savedAuth = sessionStorage.getItem("admin_authenticated");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }

    // Load or seed contact messages
    const savedMessages = localStorage.getItem("admin_contact_messages");
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        seedDefaultMessages();
      }
    } else {
      seedDefaultMessages();
    }

    // Load or seed projects
    const savedProjects = localStorage.getItem("admin_projects");
    if (savedProjects) {
      try {
        setProjects(JSON.parse(savedProjects));
      } catch (e) {
        setProjects(projectsData);
      }
    } else {
      setProjects(projectsData);
    }

    // Load profile
    const savedProfile = localStorage.getItem("admin_profile");
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        setProfile(parsed);
        setProfileForm({
          name: parsed.name,
          title: parsed.title,
          availability: parsed.availability,
          location: parsed.location,
          tagline: parsed.tagline
        });
      } catch (e) {}
    }

    // Load visitor count
    const savedViews = localStorage.getItem("admin_page_views");
    if (savedViews) {
      const views = parseInt(savedViews, 10);
      setVisitorStats((prev) => ({
        ...prev,
        pageViews: prev.pageViews + views,
        totalVisitors: prev.totalVisitors + Math.floor(views * 0.4)
      }));
    }
  }, []);

  const seedDefaultMessages = () => {
    const defaultMsgs: ContactMessage[] = [
      {
        id: "msg-1",
        name: "Rahul Sharma (TechScale India)",
        email: "rahul@techscale.io",
        projectType: "Custom Website Development (Next.js / React)",
        message: "Hi Samridh, we need a high-speed Next.js web portal for our B2B SaaS product with clean animations and lead forms. What is your current availability?",
        date: "Today, 10:15 AM",
        unread: true
      },
      {
        id: "msg-2",
        name: "Sarah Jenkins (Apex Marketing)",
        email: "s.jenkins@apexmarketing.com",
        projectType: "Digital Marketing & Performance Growth",
        message: "Looking for an expert to manage $10k/month Meta & Google Ads campaigns and optimize conversion landing pages for e-commerce.",
        date: "Yesterday, 4:30 PM",
        unread: false
      },
      {
        id: "msg-3",
        name: "Amit Patel (AutomateAI)",
        email: "patel@automateai.in",
        projectType: "AI Chatbots & Intelligent Automation",
        message: "Need a custom RAG AI chatbot trained on internal documentation for customer support automation.",
        date: "Sep 5, 2026",
        unread: false
      }
    ];
    setMessages(defaultMsgs);
    localStorage.setItem("admin_contact_messages", JSON.stringify(defaultMsgs));
  };

  // Auth Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    if (passcode === "7270" || passcode.toLowerCase() === "admin") {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_authenticated", "true");
      setAuthError(false);
      sound.playSuccess();
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    sound.playClick();
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_authenticated");
  };

  // Message Operations
  const toggleMessageUnread = (id: string) => {
    sound.playClick();
    const updated = messages.map((m) => (m.id === id ? { ...m, unread: !m.unread } : m));
    setMessages(updated);
    localStorage.setItem("admin_contact_messages", JSON.stringify(updated));
  };

  const deleteMessage = (id: string) => {
    sound.playClick();
    const updated = messages.filter((m) => m.id !== id);
    setMessages(updated);
    localStorage.setItem("admin_contact_messages", JSON.stringify(updated));
  };

  // Project Operations
  const handleOpenProjectModal = (proj?: ProjectItem) => {
    sound.playClick();
    if (proj) {
      setEditingProject(proj);
      setProjectForm({
        title: proj.title,
        subtitle: proj.subtitle,
        category: proj.category as any,
        description: proj.description,
        githubUrl: proj.githubUrl,
        demoUrl: proj.demoUrl || "",
        image: proj.image || "",
        technologies: proj.technologies.join(", ")
      });
    } else {
      setEditingProject(null);
      setProjectForm({
        title: "",
        subtitle: "",
        category: "Full Stack",
        description: "",
        githubUrl: "https://github.com/samridhpandey/",
        demoUrl: "",
        image: "",
        technologies: "Next.js, TypeScript, Tailwind CSS"
      });
    }
    setShowProjectModal(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();

    const techArray = projectForm.technologies.split(",").map((t) => t.trim()).filter(Boolean);

    let updatedList: ProjectItem[];
    if (editingProject) {
      updatedList = projects.map((p) =>
        p.id === editingProject.id
          ? {
              ...p,
              title: projectForm.title,
              subtitle: projectForm.subtitle,
              category: projectForm.category as any,
              description: projectForm.description,
              githubUrl: projectForm.githubUrl,
              demoUrl: projectForm.demoUrl,
              image: projectForm.image || undefined,
              technologies: techArray
            }
          : p
      );
    } else {
      const newProj: ProjectItem = {
        id: `proj-${Date.now()}`,
        title: projectForm.title,
        subtitle: projectForm.subtitle,
        description: projectForm.description,
        longDescription: projectForm.description,
        category: projectForm.category as any,
        technologies: techArray,
        githubUrl: projectForm.githubUrl,
        demoUrl: projectForm.demoUrl,
        image: projectForm.image || undefined,
        accentColor: "#FF6B00",
        featured: true,
        metrics: [{ label: "Client Rating", value: "5.0 ★" }],
        architecture: {
          overview: "Production web architecture with Next.js & TypeScript.",
          challenge: "Scaling high concurrency and speed.",
          solution: "Server-side rendering & edge caching.",
          highlights: ["Sub-second page load", "Full SEO optimization"]
        }
      };
      updatedList = [newProj, ...projects];
    }

    setProjects(updatedList);
    localStorage.setItem("admin_projects", JSON.stringify(updatedList));
    window.dispatchEvent(new Event("admin-projects-updated"));
    setShowProjectModal(false);
    sound.playSuccess();
  };

  const handleDeleteProject = (id: string) => {
    sound.playClick();
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    localStorage.setItem("admin_projects", JSON.stringify(updated));
    window.dispatchEvent(new Event("admin-projects-updated"));
  };

  // Profile Save Handler
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    const updated = {
      ...profile,
      name: profileForm.name,
      title: profileForm.title,
      availability: profileForm.availability,
      location: profileForm.location,
      tagline: profileForm.tagline
    };
    setProfile(updated);
    localStorage.setItem("admin_profile", JSON.stringify(updated));
    setSaveSuccess(true);
    sound.playSuccess();
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const unreadCount = messages.filter((m) => m.unread).length;

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#FAFAFB] text-zinc-900 selection:bg-orange-500/20 selection:text-orange-700 relative">
        
        {/* Passcode Lock Screen */}
        {!isAuthenticated ? (
          <div className="min-h-screen flex items-center justify-center px-4 py-12 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-white border border-orange-500/30 shadow-[0_20px_50px_rgba(249,115,22,0.15)] text-center space-y-6"
            >
              <div className="flex flex-col items-center justify-center gap-3">
                <Logo size="lg" variant="icon" />
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-700 font-mono text-[10px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-orange-500" /> ADMIN GATEKEEPER
                </div>
              </div>

              <div>
                <h1 className="text-2xl font-black text-zinc-900 tracking-tight">
                  Portfolio Admin Portal
                </h1>
                <p className="text-xs text-zinc-500 mt-1 font-normal">
                  Enter your Security PIN or Passcode to access live analytics, client messages & projects.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="password"
                    value={passcode}
                    onChange={(e) => {
                      setPasscode(e.target.value);
                      setAuthError(false);
                    }}
                    placeholder="Enter Security PIN (e.g. 7270 or admin)"
                    className={`w-full bg-zinc-50 border ${
                      authError ? "border-red-500 focus:ring-red-200" : "border-zinc-200 focus:border-orange-500"
                    } rounded-xl px-4 py-3 text-center font-mono text-sm tracking-widest outline-none transition-all`}
                    autoFocus
                  />
                  {authError && (
                    <p className="text-xs text-red-600 font-mono mt-2 flex items-center justify-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5" /> Incorrect PIN. Try 7270 or admin.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 text-white font-bold text-xs font-mono tracking-wider shadow-md hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Unlock className="w-4 h-4" />
                  <span>AUTHENTICATE & ENTER DASHBOARD</span>
                </button>
              </form>

              <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <Link href="/" className="hover:text-orange-600 flex items-center gap-1">
                  ← Back to Website
                </Link>
                <span>DEFAULT PIN: 7270</span>
              </div>
            </motion.div>
          </div>
        ) : (
          /* Main Admin Panel Dashboard */
          <div className="pt-6 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 relative z-10">
            
            {/* Top Navigation Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-3xl bg-white border border-zinc-200 shadow-sm">
              <div className="flex items-center gap-3">
                <Logo size="md" variant="icon" />
                <div>
                  <h1 className="text-base sm:text-lg font-black text-zinc-900 tracking-tight flex items-center gap-2">
                    Portfolio Admin Center
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      LIVE ONLINE
                    </span>
                  </h1>
                  <p className="text-xs text-zinc-500 font-mono">
                    Owner Control Panel • {profile.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/"
                  target="_blank"
                  className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-orange-50 text-zinc-700 hover:text-orange-600 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>View Live Site</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics Cards Ribbon */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-3xl bg-white border border-zinc-200 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-zinc-400">
                  <span className="text-[11px] font-mono font-bold uppercase">TOTAL VISITORS</span>
                  <Eye className="w-4 h-4 text-orange-500" />
                </div>
                <div className="mt-3">
                  <span className="text-2xl sm:text-3xl font-black text-zinc-900">
                    {visitorStats.totalVisitors.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-emerald-600 font-bold block mt-1">
                    ↑ +24% this week
                  </span>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-zinc-200 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-zinc-400">
                  <span className="text-[11px] font-mono font-bold uppercase">PAGE VIEWS</span>
                  <BarChart3 className="w-4 h-4 text-amber-500" />
                </div>
                <div className="mt-3">
                  <span className="text-2xl sm:text-3xl font-black text-zinc-900">
                    {visitorStats.pageViews.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-orange-600 font-bold block mt-1">
                    Avg 2.6 views/user
                  </span>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-zinc-200 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-zinc-400">
                  <span className="text-[11px] font-mono font-bold uppercase">CLIENT INQUIRIES</span>
                  <MessageSquare className="w-4 h-4 text-orange-600" />
                </div>
                <div className="mt-3">
                  <span className="text-2xl sm:text-3xl font-black text-zinc-900">
                    {messages.length}
                  </span>
                  {unreadCount > 0 ? (
                    <span className="text-[11px] text-orange-600 font-bold block mt-1">
                      {unreadCount} unread message{unreadCount > 1 ? "s" : ""}
                    </span>
                  ) : (
                    <span className="text-[11px] text-zinc-400 font-bold block mt-1">
                      All messages read
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-zinc-200 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-zinc-400">
                  <span className="text-[11px] font-mono font-bold uppercase">ACTIVE PROJECTS</span>
                  <Briefcase className="w-4 h-4 text-orange-500" />
                </div>
                <div className="mt-3">
                  <span className="text-2xl sm:text-3xl font-black text-zinc-900">
                    {projects.length}
                  </span>
                  <span className="text-[11px] text-emerald-600 font-bold block mt-1">
                    Live on portfolio
                  </span>
                </div>
              </div>
            </div>

            {/* Dashboard Tab Navigation */}
            <div className="flex flex-wrap items-center gap-2 border-b border-zinc-200 pb-4">
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab("overview");
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "overview"
                    ? "bg-orange-500 text-white shadow-sm"
                    : "bg-white text-zinc-700 border border-zinc-200 hover:bg-orange-50"
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Traffic & Analytics</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab("messages");
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer relative ${
                  activeTab === "messages"
                    ? "bg-orange-500 text-white shadow-sm"
                    : "bg-white text-zinc-700 border border-zinc-200 hover:bg-orange-50"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Client Messages ({messages.length})</span>
                {unreadCount > 0 && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                )}
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab("projects");
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "projects"
                    ? "bg-orange-500 text-white shadow-sm"
                    : "bg-white text-zinc-700 border border-zinc-200 hover:bg-orange-50"
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Manage Projects ({projects.length})</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab("profile");
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "profile"
                    ? "bg-orange-500 text-white shadow-sm"
                    : "bg-white text-zinc-700 border border-zinc-200 hover:bg-orange-50"
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Resume & Profile Info</span>
              </button>
            </div>

            {/* ========================================================================= */}
            {/* TAB 1: TRAFFIC & VISITORS ANALYTICS                                      */}
            {/* ========================================================================= */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Traffic Graph Simulation */}
                  <div className="lg:col-span-8 p-6 rounded-3xl bg-white border border-zinc-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-base font-bold text-zinc-900">Website Traffic Growth</h2>
                        <p className="text-xs text-zinc-500">Daily unique visitors & page views</p>
                      </div>
                      <span className="text-xs font-mono font-bold text-orange-600 px-3 py-1 bg-orange-50 rounded-full border border-orange-200">
                        LAST 30 DAYS
                      </span>
                    </div>

                    {/* Chart Bars */}
                    <div className="pt-6 pb-2 flex items-end justify-between gap-2 h-56 border-b border-zinc-100">
                      {[42, 58, 65, 80, 72, 95, 110, 88, 120, 142, 135, 160, 180, 210, 195, 240].map(
                        (val, idx) => (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                            <div
                              style={{ height: `${(val / 240) * 100}%` }}
                              className="w-full bg-gradient-to-t from-orange-500 via-amber-400 to-orange-400 rounded-t-md group-hover:from-orange-600 transition-all cursor-pointer relative"
                            >
                              <span className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] font-mono py-0.5 px-1.5 rounded pointer-events-none whitespace-nowrap z-20">
                                {val} views
                              </span>
                            </div>
                            <span className="text-[9px] font-mono text-zinc-400 hidden sm:block">
                              Day {idx + 1}
                            </span>
                          </div>
                        )
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono text-zinc-500 pt-2">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-orange-500" /> Unique Visitors
                      </span>
                      <span>Peak: 240 views/day</span>
                    </div>
                  </div>

                  {/* Device & Traffic Sources */}
                  <div className="lg:col-span-4 space-y-6">
                    <div className="p-6 rounded-3xl bg-white border border-zinc-200 shadow-sm space-y-4">
                      <h2 className="text-base font-bold text-zinc-900">Device Breakdown</h2>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs font-mono mb-1">
                            <span className="flex items-center gap-1.5 text-zinc-700">
                              <Monitor className="w-3.5 h-3.5 text-orange-600" /> Desktop
                            </span>
                            <span className="font-bold">68%</span>
                          </div>
                          <div className="w-full bg-zinc-100 rounded-full h-2">
                            <div className="bg-orange-500 h-2 rounded-full w-[68%]" />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-mono mb-1">
                            <span className="flex items-center gap-1.5 text-zinc-700">
                              <Smartphone className="w-3.5 h-3.5 text-amber-600" /> Mobile & Tablet
                            </span>
                            <span className="font-bold">32%</span>
                          </div>
                          <div className="w-full bg-zinc-100 rounded-full h-2">
                            <div className="bg-amber-500 h-2 rounded-full w-[32%]" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Geographic Traffic Origins */}
                    <div className="p-6 rounded-3xl bg-white border border-zinc-200 shadow-sm space-y-3 font-mono text-xs">
                      <div className="flex items-center gap-1.5 text-zinc-900 font-bold">
                        <MapPin className="w-4 h-4 text-orange-600" />
                        <span>Visitor Geography</span>
                      </div>
                      <div className="space-y-2 pt-1 text-zinc-600">
                        <div className="flex justify-between py-1 border-b border-zinc-100">
                          <span>🇮🇳 India</span>
                          <span className="font-bold text-zinc-900">54%</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-zinc-100">
                          <span>🇺🇸 United States</span>
                          <span className="font-bold text-zinc-900">22%</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-zinc-100">
                          <span>🇬🇧 United Kingdom</span>
                          <span className="font-bold text-zinc-900">12%</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span>🇦🇪 UAE & Others</span>
                          <span className="font-bold text-zinc-900">12%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 2: CLIENT MESSAGES & INQUIRIES                                       */}
            {/* ========================================================================= */}
            {activeTab === "messages" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-zinc-900">
                    Client Inquiries & Contact Messages ({messages.length})
                  </h2>
                  <button
                    onClick={seedDefaultMessages}
                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-orange-50 border border-zinc-200 text-xs font-mono text-zinc-700 flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-orange-600" />
                    <span>Reset Sample Messages</span>
                  </button>
                </div>

                {messages.length === 0 ? (
                  <div className="p-12 text-center bg-white rounded-3xl border border-zinc-200 text-zinc-500 font-mono text-sm">
                    No client inquiries received yet.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`p-6 rounded-3xl border transition-all ${
                          msg.unread
                            ? "bg-orange-50/60 border-orange-500/40 shadow-sm"
                            : "bg-white border-zinc-200 shadow-xs"
                        }`}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-zinc-900 text-sm sm:text-base">
                                {msg.name}
                              </h3>
                              {msg.unread && (
                                <span className="px-2 py-0.5 rounded-full bg-orange-500 text-white font-mono text-[9px] font-bold">
                                  NEW UNREAD
                                </span>
                              )}
                            </div>
                            <span className="text-xs font-mono text-orange-600 font-medium">
                              {msg.email}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-zinc-400">{msg.date}</span>
                            <button
                              onClick={() => toggleMessageUnread(msg.id)}
                              className="px-3 py-1 rounded-xl bg-white hover:bg-orange-50 border border-zinc-200 text-[11px] font-mono text-zinc-700 cursor-pointer"
                            >
                              {msg.unread ? "Mark Read" : "Mark Unread"}
                            </button>
                            <button
                              onClick={() => deleteMessage(msg.id)}
                              className="p-1.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                              title="Delete Message"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="mb-3 px-3 py-1 rounded-xl bg-white/80 border border-zinc-200/80 inline-block font-mono text-xs font-bold text-zinc-800">
                          Objective: {msg.projectType}
                        </div>

                        <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-normal bg-white/60 p-4 rounded-2xl border border-zinc-200/60">
                          "{msg.message}"
                        </p>

                        <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
                          <a
                            href={`mailto:${msg.email}`}
                            className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Reply via Email</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 3: PROJECTS MANAGEMENT                                               */}
            {/* ========================================================================= */}
            {activeTab === "projects" && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-lg font-bold text-zinc-900">
                    Portfolio Projects ({projects.length})
                  </h2>
                  <button
                    onClick={() => handleOpenProjectModal()}
                    className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs font-mono flex items-center gap-2 shadow-sm transition-all cursor-pointer hover:scale-105"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Project</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-5 rounded-3xl bg-white border border-zinc-200 shadow-xs flex flex-col justify-between space-y-4"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-2.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 font-mono text-[10px] font-bold uppercase">
                            {proj.category}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleOpenProjectModal(proj)}
                              className="p-1.5 rounded-xl bg-zinc-100 hover:bg-orange-50 text-zinc-700 hover:text-orange-600 transition-colors cursor-pointer"
                              title="Edit Project"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(proj.id)}
                              className="p-1.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                              title="Delete Project"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <h3 className="font-bold text-zinc-900 text-base">{proj.title}</h3>
                        <p className="text-xs text-orange-600 font-mono mb-2">{proj.subtitle}</p>
                        <p className="text-xs text-zinc-600 line-clamp-2">{proj.description}</p>

                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {proj.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded bg-zinc-100 font-mono text-[10px] text-zinc-600"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 4: RESUME & PROFILE INFO SETTINGS                                   */}
            {/* ========================================================================= */}
            {activeTab === "profile" && (
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm max-w-3xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                  <div>
                    <h2 className="text-lg font-bold text-zinc-900">Profile & Resume Details</h2>
                    <p className="text-xs text-zinc-500 font-mono">Update information visible on portfolio</p>
                  </div>
                  {saveSuccess && (
                    <span className="text-xs font-mono font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" /> Saved Successfully!
                    </span>
                  )}
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                  <div>
                    <label className="font-mono text-zinc-500 uppercase font-bold block mb-1">
                      FULL NAME
                    </label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-zinc-500 uppercase font-bold block mb-1">
                      PROFESSIONAL TITLE
                    </label>
                    <input
                      type="text"
                      value={profileForm.title}
                      onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-zinc-500 uppercase font-bold block mb-1">
                      AVAILABILITY BADGE TEXT
                    </label>
                    <input
                      type="text"
                      value={profileForm.availability}
                      onChange={(e) => setProfileForm({ ...profileForm, availability: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-zinc-500 uppercase font-bold block mb-1">
                      LOCATION
                    </label>
                    <input
                      type="text"
                      value={profileForm.location}
                      onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-zinc-500 uppercase font-bold block mb-1">
                      TAGLINE / HERO MISSION STATEMENT
                    </label>
                    <textarea
                      rows={3}
                      value={profileForm.tagline}
                      onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-orange-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-mono font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>SAVE PROFILE CHANGES</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* Project Edit / Add Modal */}
        <AnimatePresence>
          {showProjectModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="w-full max-w-xl p-6 rounded-3xl bg-white border border-zinc-200 shadow-2xl space-y-4 my-8"
              >
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                  <h3 className="font-bold text-zinc-900 text-base">
                    {editingProject ? "Edit Project Details" : "Add New Project"}
                  </h3>
                  <button
                    onClick={() => setShowProjectModal(false)}
                    className="p-1 rounded-full text-zinc-400 hover:text-zinc-600"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveProject} className="space-y-3 text-xs">
                  <div>
                    <label className="font-mono text-zinc-500 uppercase font-bold block mb-1">
                      PROJECT TITLE
                    </label>
                    <input
                      type="text"
                      required
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      placeholder="e.g. NeuroFlow AI"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-zinc-500 uppercase font-bold block mb-1">
                      SUBTITLE
                    </label>
                    <input
                      type="text"
                      required
                      value={projectForm.subtitle}
                      onChange={(e) => setProjectForm({ ...projectForm, subtitle: e.target.value })}
                      placeholder="e.g. Autonomous Task Orchestrator"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-zinc-500 uppercase font-bold block mb-1">
                      CATEGORY
                    </label>
                    <select
                      value={projectForm.category}
                      onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value as any })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-orange-500 cursor-pointer"
                    >
                      <option value="AI / ML">AI / ML</option>
                      <option value="AI Agents">AI Agents</option>
                      <option value="Computer Vision">Computer Vision</option>
                      <option value="NLP">NLP</option>
                      <option value="Full Stack">Full Stack</option>
                      <option value="SaaS">SaaS</option>
                      <option value="Automation">Automation</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-mono text-zinc-500 uppercase font-bold block mb-1">
                      SHORT DESCRIPTION
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-orange-500 resize-none"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-zinc-500 uppercase font-bold block mb-1">
                      TECHNOLOGIES (Comma Separated)
                    </label>
                    <input
                      type="text"
                      value={projectForm.technologies}
                      onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                      placeholder="Next.js, TypeScript, Tailwind CSS, Python"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-zinc-500 uppercase font-bold block mb-1">
                      PROJECT PREVIEW IMAGE URL (Optional)
                    </label>
                    <input
                      type="text"
                      value={projectForm.image}
                      onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                      placeholder="e.g. /projects/neuroflow.jpg or https://image-url.png"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2 text-xs outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-mono text-zinc-500 uppercase font-bold block mb-1">
                        GITHUB URL
                      </label>
                      <input
                        type="text"
                        value={projectForm.githubUrl}
                        onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2 text-xs outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-zinc-500 uppercase font-bold block mb-1">
                        DEMO URL (Optional)
                      </label>
                      <input
                        type="text"
                        value={projectForm.demoUrl}
                        onChange={(e) => setProjectForm({ ...projectForm, demoUrl: e.target.value })}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2 text-xs outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-100 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowProjectModal(false)}
                      className="px-4 py-2 rounded-xl bg-zinc-100 text-zinc-700 font-mono text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-mono font-bold text-xs shadow-sm cursor-pointer"
                    >
                      Save Project
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SmoothScroll>
  );
}
