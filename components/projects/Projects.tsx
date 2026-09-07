"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData, projectCategories, ProjectItem } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import CaseStudyModal from "./CaseStudyModal";
import { sound } from "@/lib/audio";

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);
  const [allProjects, setAllProjects] = useState<ProjectItem[]>(projectsData);

  const loadProjects = () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("admin_projects");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const merged = parsed.map((item: ProjectItem) => {
              const def = projectsData.find((d) => d.id === item.id);
              return {
                ...item,
                image: item.image || (def ? def.image : undefined)
              };
            });
            setAllProjects(merged);
            return;
          }
        } catch (e) {}
      }
      setAllProjects(projectsData);
    }
  };

  useEffect(() => {
    loadProjects();

    const handleUpdate = () => {
      loadProjects();
    };

    window.addEventListener("admin-projects-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("admin-projects-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const filteredProjects = allProjects.filter((p) => {
    if (selectedCategory === "All") return true;
    return p.category === selectedCategory;
  });

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="flex flex-col items-start mb-12">
        <div className="flex items-center gap-2 font-mono text-xs text-orange-600 font-bold tracking-widest uppercase mb-3">
          <span className="w-6 h-px bg-orange-500" />
          <span>03 // PORTFOLIO SHOWCASE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight">
          Selected Work
        </h2>
        <p className="text-zinc-600 mt-2 text-sm sm:text-base max-w-2xl font-normal">
          Systems & products I’ve designed, built, and launched.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-12 pb-2 border-b border-zinc-200/80">
        {projectCategories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                setSelectedCategory(cat);
              }}
              onMouseEnter={() => sound.playHover()}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-all cursor-pointer ${
                isActive
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20"
                  : "bg-white text-zinc-600 hover:text-zinc-900 hover:bg-orange-50/40 border border-zinc-200 shadow-xs"
              }`}
            >
              {cat.toUpperCase()}
            </button>
          );
        })}
      </div>

      {/* Project Cards Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenCaseStudy={(proj) => setActiveModalProject(proj)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Case Study Dossier Modal */}
      <CaseStudyModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}
