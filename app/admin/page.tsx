"use client";

import { useState, useEffect, useRef } from "react";
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
  MapPin,
  UploadCloud,
  Download,
  Award,
  ExternalLink,
  Image as ImageIcon
} from "lucide-react";
import Link from "next/link";
import SmoothScroll from "@/components/SmoothScroll";
import { projectsData, ProjectItem } from "@/data/projects";
import { profileData, ProfileData } from "@/data/profile";
import { CertificateItem, certificatesData, formatLinkedInUrl, DEFAULT_FEATURED_LINKEDIN_EMBED, extractIframeSrc } from "@/data/certificates";
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
  const [activeTab, setActiveTab] = useState<"overview" | "messages" | "projects" | "certificates" | "profile">("overview");

  // Data state
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [profile, setProfile] = useState<ProfileData>(profileData);

  // Certificates State
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [showCertModal, setShowCertModal] = useState(false);
  const [editingCert, setEditingCert] = useState<CertificateItem | null>(null);
  const [isCertSaving, setIsCertSaving] = useState(false);
  const [certError, setCertError] = useState<string | null>(null);
  const [certSuccessMsg, setCertSuccessMsg] = useState(false);
  const [certFile, setCertFile] = useState<File | null>(null);
  const [certPreviewUrl, setCertPreviewUrl] = useState<string | null>(null);
  const [isCertDragging, setIsCertDragging] = useState(false);
  const certFileInputRef = useRef<HTMLInputElement>(null);

  const [certForm, setCertForm] = useState({
    title: "",
    image: "",
    linkedinPostId: ""
  });

  // Featured LinkedIn Embed State
  const [featuredEmbedInput, setFeaturedEmbedInput] = useState<string>(DEFAULT_FEATURED_LINKEDIN_EMBED);
  const [featuredEmbedSaved, setFeaturedEmbedSaved] = useState(false);

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
  const [isFetchingMetadata, setIsFetchingMetadata] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [fetchSuccess, setFetchSuccess] = useState(false);
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

  // Resume File Upload State
  const [resumeFile, setResumeFile] = useState<{
    name: string;
    size: number;
    type: string;
    dataUrl: string;
    uploadedAt: string;
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState(false);
  const resumeInputRef = useRef<HTMLInputElement>(null);

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
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.projects)) {
            setProjects(json.projects);
            localStorage.setItem("admin_projects", JSON.stringify(json.projects));
            return;
          }
        }
      } catch (e) {}

      const savedProjects = localStorage.getItem("admin_projects");
      if (savedProjects) {
        try {
          const parsed = JSON.parse(savedProjects);
          if (Array.isArray(parsed)) {
            setProjects(parsed);
            return;
          }
        } catch (e) {}
      }
      setProjects(projectsData);
    };
    fetchProjects();

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

    // Load uploaded resume file
    const savedResume = localStorage.getItem("admin_resume_file");
    if (savedResume) {
      try {
        setResumeFile(JSON.parse(savedResume));
      } catch (e) {}
    }

    // Load certificates
    const fetchCertificates = async () => {
      try {
        const res = await fetch("/api/certificates");
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.certificates)) {
            setCertificates(json.certificates);
            localStorage.setItem("admin_certificates", JSON.stringify(json.certificates));
            return;
          }
        }
      } catch (e) {}

      const savedCerts = localStorage.getItem("admin_certificates");
      if (savedCerts) {
        try {
          setCertificates(JSON.parse(savedCerts));
          return;
        } catch (e) {}
      }
      setCertificates(certificatesData);
    };
    fetchCertificates();

    // Load featured LinkedIn embed
    const savedEmbed = localStorage.getItem("admin_featured_linkedin_embed");
    if (savedEmbed) {
      setFeaturedEmbedInput(savedEmbed);
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
    setFetchError(null);
    setFetchSuccess(false);
    setIsFetchingMetadata(false);

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
        githubUrl: "",
        demoUrl: "",
        image: "",
        technologies: ""
      });
    }
    setShowProjectModal(true);
  };

  const handleAutoFetchMetadata = async () => {
    sound.playClick();
    setFetchError(null);
    setFetchSuccess(false);

    const gh = projectForm.githubUrl.trim();
    const demo = projectForm.demoUrl.trim();

    if (!gh && !demo) {
      setFetchError("Please enter a GitHub URL or Project Link / Demo URL first.");
      return;
    }

    setIsFetchingMetadata(true);

    try {
      const res = await fetch("/api/fetch-project-metadata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ githubUrl: gh, demoUrl: demo })
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to fetch metadata.");
      }

      const data = json.data;
      setProjectForm((prev) => ({
        ...prev,
        title: data.title || prev.title,
        subtitle: data.subtitle || prev.subtitle,
        category: data.category || prev.category,
        description: data.description || prev.description,
        technologies:
          data.technologies && data.technologies.length > 0
            ? data.technologies.join(", ")
            : prev.technologies,
        image: data.image || prev.image,
        githubUrl: data.githubUrl || prev.githubUrl,
        demoUrl: data.demoUrl || prev.demoUrl
      }));

      setFetchSuccess(true);
      sound.playSuccess();
      setTimeout(() => setFetchSuccess(false), 5000);
    } catch (err: any) {
      console.error(err);
      setFetchError(err.message || "Failed to fetch details. Please verify your link.");
    } finally {
      setIsFetchingMetadata(false);
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();

    const techArray = projectForm.technologies.split(",").map((t) => t.trim()).filter(Boolean);

    let projToSave: ProjectItem;
    let updatedList: ProjectItem[];
    if (editingProject) {
      projToSave = {
        ...editingProject,
        title: projectForm.title,
        subtitle: projectForm.subtitle,
        category: projectForm.category as any,
        description: projectForm.description,
        githubUrl: projectForm.githubUrl,
        demoUrl: projectForm.demoUrl,
        image: projectForm.image || undefined,
        technologies: techArray
      };
      updatedList = projects.map((p) => (p.id === editingProject.id ? projToSave : p));
    } else {
      projToSave = {
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
        metrics: [],
        architecture: {
          overview: "Production web architecture with Next.js & TypeScript.",
          challenge: "Scaling high concurrency and speed.",
          solution: "Server-side rendering & edge caching.",
          highlights: ["Sub-second page load", "Full SEO optimization"]
        }
      };
      updatedList = [projToSave, ...projects];
    }

    setProjects(updatedList);
    localStorage.setItem("admin_projects", JSON.stringify(updatedList));
    window.dispatchEvent(new Event("admin-projects-updated"));
    setShowProjectModal(false);
    sound.playSuccess();

    try {
      await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projToSave)
      });
    } catch (err) {
      console.error("Failed to save project on server:", err);
    }
  };

  const handleDeleteProject = async (id: string) => {
    sound.playClick();
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    localStorage.setItem("admin_projects", JSON.stringify(updated));
    window.dispatchEvent(new Event("admin-projects-updated"));

    try {
      await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
    } catch (e) {
      console.error("Failed to delete project on server:", e);
    }
  };

  // Resume File Handlers
  const handleFileProcess = (file: File) => {
    setFileError(null);
    const validExts = [".pdf", ".doc", ".docx"];
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    const isDoc =
      validExts.includes(ext) ||
      file.type === "application/pdf" ||
      file.type === "application/msword" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

    if (!isDoc) {
      setFileError("Please upload a PDF or Word document (.pdf, .doc, .docx)");
      sound.playClick();
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setFileError("File size exceeds 15MB limit. Please upload a smaller file.");
      sound.playClick();
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const meta = {
        name: file.name,
        size: file.size,
        type: file.type || "application/pdf",
        dataUrl,
        uploadedAt: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric"
        })
      };
      setResumeFile(meta);
      try {
        localStorage.setItem("admin_resume_file", JSON.stringify(meta));
        window.dispatchEvent(new Event("admin-resume-updated"));
      } catch (err) {
        console.warn("Could not save to localStorage", err);
      }
      setUploadSuccessMsg(true);
      sound.playSuccess();
      setTimeout(() => setUploadSuccessMsg(false), 3500);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileProcess(e.target.files[0]);
    }
  };

  const handleRemoveResume = () => {
    sound.playClick();
    setResumeFile(null);
    localStorage.removeItem("admin_resume_file");
    window.dispatchEvent(new Event("admin-resume-updated"));
    if (resumeInputRef.current) {
      resumeInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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

  // Certificate Handlers
  const handleOpenAddCertModal = () => {
    sound.playClick();
    setEditingCert(null);
    setCertFile(null);
    setCertPreviewUrl(null);
    setCertError(null);
    setCertForm({
      title: "",
      image: "",
      linkedinPostId: ""
    });
    setShowCertModal(true);
  };

  const handleOpenEditCertModal = (cert: CertificateItem) => {
    sound.playClick();
    setEditingCert(cert);
    setCertFile(null);
    setCertPreviewUrl(cert.image || null);
    setCertError(null);
    setCertForm({
      title: cert.title || "",
      image: cert.image || "",
      linkedinPostId: cert.linkedinPostId || cert.linkedinUrl || ""
    });
    setShowCertModal(true);
  };

  const handleCertImageSelect = (file: File) => {
    setCertError(null);
    if (!file.type.startsWith("image/")) {
      setCertError("Please upload an image file (PNG, JPG, WEBP, SVG)");
      sound.playClick();
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setCertError("Image size exceeds 25MB. Please choose a smaller image.");
      sound.playClick();
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setCertPreviewUrl(dataUrl);
      setCertForm((prev) => ({ ...prev, image: dataUrl }));
      sound.playHover();
    };
    reader.readAsDataURL(file);
  };

  const handleSaveCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();

    if (!certForm.title.trim()) {
      setCertError("Please enter a certificate title.");
      return;
    }

    setIsCertSaving(true);
    const newId = editingCert ? editingCert.id : `cert-${Date.now()}`;
    const cleanPostId = (certForm.linkedinPostId || "").trim();
    const cleanUrl = formatLinkedInUrl(cleanPostId);

    const savedItem: CertificateItem = {
      id: newId,
      title: certForm.title.trim(),
      image: certForm.image || certPreviewUrl || "",
      linkedinPostId: cleanPostId,
      linkedinUrl: cleanUrl,
      issuer: "LinkedIn Verified",
      badge: "Verified"
    };

    let updated: CertificateItem[];
    if (editingCert) {
      updated = certificates.map((c) => (c.id === editingCert.id ? savedItem : c));
    } else {
      updated = [savedItem, ...certificates];
    }

    // Instantly update UI and localStorage
    setCertificates(updated);
    localStorage.setItem("admin_certificates", JSON.stringify(updated));
    window.dispatchEvent(new Event("admin-certificates-updated"));
    setShowCertModal(false);
    setIsCertSaving(false);
    sound.playSuccess();

    // Call API in background
    try {
      await fetch("/api/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(savedItem)
      });
    } catch (err) {
      console.warn("Saved locally, server API warning:", err);
    }
  };

  const handleDeleteCertificate = async (id: string) => {
    sound.playClick();
    // Instantly update state and localStorage
    const updated = certificates.filter((c) => c.id !== id);
    setCertificates(updated);
    localStorage.setItem("admin_certificates", JSON.stringify(updated));
    window.dispatchEvent(new Event("admin-certificates-updated"));
    sound.playSuccess();

    // Call delete API in background
    try {
      await fetch(`/api/certificates?id=${id}`, {
        method: "DELETE"
      });
    } catch (err) {
      console.warn("Deleted locally, server API warning:", err);
    }
  };

  const handleSaveFeaturedEmbed = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanSrc = extractIframeSrc(featuredEmbedInput);
    setFeaturedEmbedInput(cleanSrc);
    localStorage.setItem("admin_featured_linkedin_embed", cleanSrc);
    window.dispatchEvent(new Event("admin-certificates-updated"));
    setFeaturedEmbedSaved(true);
    setTimeout(() => setFeaturedEmbedSaved(false), 3000);
    sound.playSuccess();
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
                  setActiveTab("certificates");
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "certificates"
                    ? "bg-orange-500 text-white shadow-sm"
                    : "bg-white text-zinc-700 border border-zinc-200 hover:bg-orange-50"
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Certificates & LinkedIn ({certificates.length})</span>
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
            {/* TAB: CERTIFICATES & LINKEDIN CREDENTIALS                                */}
            {/* ========================================================================= */}
            {activeTab === "certificates" && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-gradient-to-r from-orange-50/80 via-white to-amber-50/60 border border-orange-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/70 text-orange-800 text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
                      <Award className="w-3.5 h-3.5 text-orange-600" />
                      <span>DIRECT IMAGE UPLOAD & LINKEDIN REDIRECT</span>
                    </div>
                    <h2 className="text-xl font-black text-zinc-900">
                      Licenses & Certifications ({certificates.length})
                    </h2>
                    <p className="text-xs text-zinc-600 max-w-xl mt-1">
                      Directly upload your certificate images and attach LinkedIn post IDs or URLs. Visitors clicking on any certificate card on the main website will automatically be redirected to your LinkedIn post.
                    </p>
                  </div>

                  <button
                    onClick={handleOpenAddCertModal}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 text-white font-mono font-bold text-xs shadow-sm hover:shadow-md hover:scale-[1.02] transition-all flex items-center gap-2 cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Upload Certificate</span>
                  </button>
                </div>

                {/* FEATURED LINKEDIN POST (EMBED) SETTINGS */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white border border-zinc-200/90 shadow-sm space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-zinc-100">
                    <div>
                      <span className="text-[10px] font-mono text-orange-600 font-bold uppercase tracking-wider block mb-0.5">
                        TOP SHOWCASE // CERTIFICATE SECTION
                      </span>
                      <h3 className="font-bold text-zinc-900 text-sm sm:text-base">
                        Featured LinkedIn Post (Embed)
                      </h3>
                      <p className="text-xs text-zinc-500">
                        Ye post frontend par <b>Certificates section ke just upar</b> live embed hoti hai. Aap direct URL ya poora <code>&lt;iframe&gt;</code> code paste kar sakte hain.
                      </p>
                    </div>

                    {featuredEmbedSaved && (
                      <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono font-bold flex items-center gap-1.5 animate-fadeIn">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Featured Post Saved!</span>
                      </span>
                    )}
                  </div>

                  <form onSubmit={handleSaveFeaturedEmbed} className="space-y-3">
                    <div>
                      <label className="font-mono text-[10px] text-zinc-500 uppercase font-bold block mb-1">
                        LINKEDIN EMBED SRC OR IFRAME CODE
                      </label>
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                        <input
                          type="text"
                          value={featuredEmbedInput}
                          onChange={(e) => setFeaturedEmbedInput(e.target.value)}
                          placeholder="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:..."
                          className="flex-1 bg-zinc-50/80 border border-zinc-200 focus:border-orange-500 focus:bg-white rounded-xl px-3 py-2 text-xs outline-none transition-colors font-mono"
                        />
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-mono font-bold text-xs shadow-sm active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Update Featured Post</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                {/* Certificates Grid in Admin */}
                {certificates.length === 0 ? (
                  <div className="p-12 text-center rounded-3xl bg-white border border-dashed border-zinc-300">
                    <Award className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
                    <h3 className="text-base font-bold text-zinc-800">No Certificates Added Yet</h3>
                    <p className="text-xs text-zinc-500 mt-1 max-w-md mx-auto">
                      Click "Upload Certificate" above to add your first certificate image and LinkedIn post link.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {certificates.map((cert) => {
                      const linkedInTarget = cert.linkedinUrl || (cert.linkedinPostId ? `https://www.linkedin.com/feed/update/urn:li:activity:${cert.linkedinPostId}` : "https://www.linkedin.com");

                      return (
                        <div
                          key={cert.id}
                          className="rounded-3xl bg-white border border-zinc-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
                        >
                          {/* Top Image Preview */}
                          <div className="relative w-full aspect-[16/10] bg-zinc-100 overflow-hidden border-b border-zinc-100">
                            {cert.image ? (
                              <img
                                src={cert.image}
                                alt={cert.title}
                                className="w-full h-full object-cover object-center"
                              />
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400 bg-zinc-50">
                                <Award className="w-8 h-8 mb-1 text-orange-400" />
                                <span className="text-[10px] font-mono uppercase font-bold">No Image Uploaded</span>
                              </div>
                            )}

                            {/* Badge */}
                            <div className="absolute top-2.5 left-2.5">
                              <span className="px-2 py-0.5 rounded-full bg-zinc-900/80 text-white font-mono text-[9px] font-bold backdrop-blur-xs">
                                {cert.category || "Full Stack"}
                              </span>
                            </div>

                            {/* Quick Actions */}
                            <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-20">
                              <button
                                onClick={() => handleOpenEditCertModal(cert)}
                                className="p-2 rounded-xl bg-white/95 text-zinc-700 hover:text-orange-600 shadow-sm backdrop-blur-xs transition-colors cursor-pointer"
                                title="Edit Certificate"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteCertificate(cert.id)}
                                className="p-2 rounded-xl bg-red-600 text-white hover:bg-red-700 shadow-sm transition-colors cursor-pointer"
                                title="Delete Certificate"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Info Body */}
                          <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                            <div>
                              <h3 className="font-bold text-zinc-900 text-sm sm:text-base leading-snug">
                                {cert.title}
                              </h3>
                            </div>

                            {/* LinkedIn Link Preview in Admin */}
                            <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
                              <span className="text-[11px] font-mono text-zinc-500 truncate max-w-[170px]">
                                {cert.linkedinPostId ? `Post ID: ${cert.linkedinPostId}` : "LinkedIn Post"}
                              </span>

                              <a
                                href={linkedInTarget}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#0A66C2] hover:underline"
                              >
                                <span>Open Post</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 4: RESUME & PROFILE INFO SETTINGS                                   */}
            {/* ========================================================================= */}
            {activeTab === "profile" && (
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm max-w-3xl space-y-8">
                <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                  <div>
                    <h2 className="text-lg font-bold text-zinc-900">Profile & Resume Details</h2>
                    <p className="text-xs text-zinc-500 font-mono">Update information & resume documents visible on portfolio</p>
                  </div>
                  {saveSuccess && (
                    <span className="text-xs font-mono font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" /> Saved Successfully!
                    </span>
                  )}
                </div>

                {/* Resume File Upload: Drag & Drop + File Select */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-mono text-zinc-800 uppercase font-bold text-xs flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-orange-500" />
                      <span>OFFICIAL RESUME / CV DOCUMENT</span>
                    </label>
                    <span className="text-[11px] font-mono text-zinc-400">PDF, DOC, DOCX (up to 15MB)</span>
                  </div>

                  {/* Hidden Native File Input */}
                  <input
                    ref={resumeInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />

                  {/* Drag & Drop Zone */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => resumeInputRef.current?.click()}
                    className={`relative rounded-2xl border-2 border-dashed transition-all cursor-pointer p-6 sm:p-8 text-center flex flex-col items-center justify-center gap-3 ${
                      isDragging
                        ? "border-orange-500 bg-orange-50/60 ring-4 ring-orange-500/10 scale-[1.01]"
                        : "border-zinc-300 hover:border-orange-500 bg-zinc-50/70 hover:bg-orange-50/20"
                    }`}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shadow-inner">
                      <UploadCloud className="w-7 h-7" />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-zinc-800">
                        {isDragging ? "Drop your resume file here!" : "Drag & drop your Resume file here, or"}
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          resumeInputRef.current?.click();
                        }}
                        className="mt-1.5 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-mono font-bold text-xs shadow-sm transition-all cursor-pointer inline-flex items-center gap-1.5 hover:scale-105"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Select File from Computer</span>
                      </button>
                    </div>

                    <span className="text-[10px] font-mono text-zinc-400">
                      Supports PDF, DOC, DOCX • File automatically updates the Download CV link
                    </span>
                  </div>

                  {/* Error Notification */}
                  {fileError && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-mono flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <span>{fileError}</span>
                    </div>
                  )}

                  {/* Upload Success Alert */}
                  {uploadSuccessMsg && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 shrink-0" />
                      <span>Resume uploaded and saved to portfolio successfully!</span>
                    </div>
                  )}

                  {/* Uploaded Active Resume Card */}
                  {resumeFile && (
                    <div className="p-4 rounded-2xl bg-white border border-orange-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center shrink-0 shadow-2xs">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-zinc-900 text-xs sm:text-sm truncate max-w-[220px] sm:max-w-[320px]">
                              {resumeFile.name}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[9px] font-mono font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              ACTIVE CV
                            </span>
                          </div>
                          <span className="text-[11px] font-mono text-zinc-400">
                            {formatFileSize(resumeFile.size)} • Uploaded on {resumeFile.uploadedAt}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={resumeFile.dataUrl}
                          download={resumeFile.name}
                          onClick={(e) => e.stopPropagation()}
                          className="px-3 py-1.5 rounded-xl bg-zinc-100 hover:bg-orange-50 text-zinc-700 hover:text-orange-600 border border-zinc-200 text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download</span>
                        </a>

                        <button
                          type="button"
                          onClick={handleRemoveResume}
                          className="p-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors cursor-pointer"
                          title="Remove Resume"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile Text Details Form */}
                <div className="pt-6 border-t border-zinc-100">
                  <div className="mb-4">
                    <h3 className="font-mono text-zinc-800 uppercase font-bold text-xs">
                      PERSONAL & PROFESSIONAL BIO DETAILS
                    </h3>
                    <p className="text-[11px] font-mono text-zinc-400">Edit your name, headline, and bio visible across the site</p>
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
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="w-full max-w-xl max-h-[90vh] overflow-y-auto terminal-scroll p-4 sm:p-6 rounded-3xl bg-white border border-zinc-200 shadow-2xl space-y-4 my-auto"
              >
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-zinc-900 text-sm sm:text-base">
                        {editingProject ? "Edit Project Details" : "Add New Project"}
                      </h3>
                      <p className="text-[10px] font-mono text-zinc-500">
                        Auto-fetch details from URL or enter manually
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowProjectModal(false)}
                    className="p-1 rounded-full text-zinc-400 hover:text-zinc-600 cursor-pointer"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>

                {/* Quick Auto-Fetch Box */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-orange-50/80 via-white to-amber-50/60 border border-orange-300/80 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-orange-800 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                      AUTO-FETCH DETAILS FROM LINKS
                    </span>
                    <span className="text-[9px] font-mono text-zinc-400 font-semibold">
                      GitHub & Live Website
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-600 leading-snug">
                    Bss apna <b>Project / Live Website Link</b> ya <b>GitHub Repo URL</b> daal kar button dabayein — Title, Subtitle, Description, Tech Stack, Category aur Image khud fetch ho jayegi!
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="font-mono text-[10px] text-zinc-500 uppercase font-bold block mb-1">
                        PROJECT LINK / LIVE DEMO
                      </label>
                      <input
                        type="text"
                        value={projectForm.demoUrl}
                        onChange={(e) => setProjectForm({ ...projectForm, demoUrl: e.target.value })}
                        placeholder="https://eduroadmap.vercel.app"
                        className="w-full bg-white border border-zinc-200 focus:border-orange-500 rounded-xl px-3 py-1.5 text-xs outline-none transition-colors shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-[10px] text-zinc-500 uppercase font-bold block mb-1">
                        GITHUB REPO URL
                      </label>
                      <input
                        type="text"
                        value={projectForm.githubUrl}
                        onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                        placeholder="https://github.com/owner/repo"
                        className="w-full bg-white border border-zinc-200 focus:border-orange-500 rounded-xl px-3 py-1.5 text-xs outline-none transition-colors shadow-2xs"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <button
                      type="button"
                      onClick={handleAutoFetchMetadata}
                      disabled={isFetchingMetadata}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 text-white font-mono font-bold text-xs shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      {isFetchingMetadata ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>FETCHING DETAILS...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>⚡ AUTO-FETCH DETAILS</span>
                        </>
                      )}
                    </button>

                    {fetchSuccess && (
                      <span className="text-[11px] font-mono text-emerald-600 font-bold flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Details fetched successfully!
                      </span>
                    )}
                  </div>

                  {fetchError && (
                    <div className="p-2 rounded-lg bg-red-50 border border-red-200 text-[11px] font-mono text-red-600 flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                      <span>{fetchError}</span>
                    </div>
                  )}
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
                      placeholder="e.g. Edu Roadmap"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-mono text-zinc-500 uppercase font-bold block mb-1">
                        SUBTITLE
                      </label>
                      <input
                        type="text"
                        required
                        value={projectForm.subtitle}
                        onChange={(e) => setProjectForm({ ...projectForm, subtitle: e.target.value })}
                        placeholder="e.g. Interactive Learning Roadmaps"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-zinc-500 uppercase font-bold block mb-1">
                        CATEGORY
                      </label>
                      <select
                        value={projectForm.category}
                        onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value as any })}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm outline-none focus:border-orange-500 cursor-pointer"
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
                      placeholder="Tell what the project does, key highlights or features..."
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm outline-none focus:border-orange-500 resize-none"
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
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm outline-none focus:border-orange-500"
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
                      placeholder="e.g. https://image-url.png or /projects/preview.jpg"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs outline-none focus:border-orange-500"
                    />
                    {projectForm.image && (
                      <div className="relative w-full h-24 rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100 mt-2">
                        <img
                          src={projectForm.image}
                          alt="Project Preview"
                          className="w-full h-full object-cover object-top"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                        <span className="absolute bottom-1 right-2 text-[9px] font-mono bg-black/70 text-white px-2 py-0.5 rounded backdrop-blur-xs">
                          Preview Image Detected
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-zinc-100 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowProjectModal(false)}
                      className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-mono text-xs cursor-pointer transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-mono font-bold text-xs shadow-sm hover:shadow transition-all cursor-pointer"
                    >
                      Save Project
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Certificate Add / Edit Modal */}
        <AnimatePresence>
          {showCertModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="w-full max-w-xl max-h-[90vh] overflow-y-auto terminal-scroll p-4 sm:p-6 rounded-3xl bg-white border border-zinc-200 shadow-2xl space-y-4 my-auto"
              >
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-zinc-900 text-sm sm:text-base">
                        {editingCert ? "Edit Certificate" : "Upload New Certificate"}
                      </h3>
                      <p className="text-[10px] font-mono text-zinc-500">
                        Upload certificate image & attach your LinkedIn post ID
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowCertModal(false)}
                    className="p-1 rounded-full text-zinc-400 hover:text-zinc-600 cursor-pointer"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveCertificate} className="space-y-4 text-xs">
                  {/* DIRECT IMAGE UPLOAD ZONE */}
                  <div>
                    <label className="font-mono text-zinc-600 uppercase font-bold block mb-1">
                      CERTIFICATE IMAGE (DIRECT UPLOAD)
                    </label>

                    <input
                      ref={certFileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleCertImageSelect(e.target.files[0]);
                        }
                      }}
                    />

                    {certPreviewUrl ? (
                      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-900/5 group">
                        <img
                          src={certPreviewUrl}
                          alt="Certificate Preview"
                          className="w-full h-full object-contain bg-zinc-900/10"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => certFileInputRef.current?.click()}
                            className="px-3 py-1.5 rounded-xl bg-white text-zinc-800 font-mono text-xs font-bold shadow hover:bg-orange-50 cursor-pointer"
                          >
                            Change Image
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setCertFile(null);
                              setCertPreviewUrl(null);
                              setCertForm((p) => ({ ...p, image: "" }));
                            }}
                            className="px-3 py-1.5 rounded-xl bg-red-600 text-white font-mono text-xs font-bold shadow hover:bg-red-700 cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                        <span className="absolute bottom-2 left-2 text-[10px] font-mono bg-black/70 text-white px-2 py-0.5 rounded backdrop-blur-xs">
                          {certFile ? certFile.name : "Image Attached"}
                        </span>
                      </div>
                    ) : (
                      <div
                        onClick={() => certFileInputRef.current?.click()}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setIsCertDragging(true);
                        }}
                        onDragLeave={() => setIsCertDragging(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setIsCertDragging(false);
                          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                            handleCertImageSelect(e.dataTransfer.files[0]);
                          }
                        }}
                        className={`w-full py-8 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors ${
                          isCertDragging
                            ? "border-orange-500 bg-orange-50/50"
                            : "border-zinc-300 hover:border-orange-400 bg-zinc-50/60 hover:bg-orange-50/30"
                        }`}
                      >
                        <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center mb-2 shadow-2xs">
                          <UploadCloud className="w-6 h-6" />
                        </div>
                        <span className="font-bold text-zinc-800 text-xs sm:text-sm">
                          Click to upload or drag & drop certificate image
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400 mt-1">
                          PNG, JPG, WEBP, SVG • High resolution recommended
                        </span>
                      </div>
                    )}
                  </div>

                  {/* TITLE INPUT */}
                  <div>
                    <label className="font-mono text-zinc-600 uppercase font-bold block mb-1">
                      CERTIFICATE TITLE
                    </label>
                    <input
                      type="text"
                      required
                      value={certForm.title}
                      onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                      placeholder="e.g. Meta Full-Stack Engineer / Google Cloud / AWS Certified"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm outline-none focus:border-orange-500"
                    />
                  </div>

                  {/* LINKEDIN POST ID OR URL */}
                  <div className="p-3.5 rounded-2xl bg-[#0A66C2]/5 border border-[#0A66C2]/20 space-y-2">
                    <label className="font-mono text-zinc-700 uppercase font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#0A66C2]" />
                      LINKEDIN POST ID YA LINK (CLICK PAR KHULEGA)
                    </label>
                    <input
                      type="text"
                      value={certForm.linkedinPostId}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCertForm({
                          ...certForm,
                          linkedinPostId: val
                        });
                      }}
                      placeholder="e.g. 7234567890123456789 ya full LinkedIn URL"
                      className="w-full bg-white border border-zinc-200 focus:border-[#0A66C2] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm outline-none transition-colors shadow-2xs"
                    />
                    <div className="flex flex-wrap items-center justify-between gap-1 text-[10px] font-mono text-zinc-500 pt-0.5">
                      <span className="truncate">
                        Redirect URL:{" "}
                        <span className="text-[#0A66C2] font-semibold">
                          {formatLinkedInUrl(certForm.linkedinPostId || "")}
                        </span>
                      </span>
                      {certForm.linkedinPostId && (
                        <a
                          href={formatLinkedInUrl(certForm.linkedinPostId)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0A66C2] font-bold hover:underline inline-flex items-center gap-0.5"
                        >
                          <span>Test Link ↗</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {certError && (
                    <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 font-mono text-[11px] flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <span>{certError}</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-zinc-100 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowCertModal(false)}
                      className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-mono text-xs cursor-pointer transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isCertSaving}
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-mono font-bold text-xs shadow-sm hover:shadow transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                    >
                      {isCertSaving ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>SAVING...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-3.5 h-3.5" />
                          <span>SAVE & PUBLISH</span>
                        </>
                      )}
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
