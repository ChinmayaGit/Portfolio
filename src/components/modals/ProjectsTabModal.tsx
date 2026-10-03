import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Github, ExternalLink, Sparkles, Layers } from "lucide-react";
import { PROJECTS } from "../../data/projectsData";

interface ProjectsTabModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "fullstack", label: "Full Stack" },
  { id: "cloud", label: "Cloud & DevOps" },
  { id: "systems", label: "Systems & IoT" },
  { id: "mobile", label: "Mobile" },
  { id: "ai", label: "AI & Agents" },
  { id: "games3d", label: "3D & Games" },
];

export const ProjectsTabModal: React.FC<ProjectsTabModalProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");

  if (!isOpen) return null;

  const filtered = PROJECTS.filter((p) => {
    const matchesCat = selectedCat === "all" || p.category === selectedCat;
    const matchesSearch =
      search.trim() === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tagline.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-[#101013] border border-white/10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] p-6 sm:p-8 z-10 max-h-[88vh] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#d4a22f]/10 border border-[#d4a22f]/20 text-[#d4a22f]">
                <Layers size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  Projects Archive
                  <span className="text-xs font-mono font-normal text-zinc-400">
                    ({PROJECTS.length} repositories)
                  </span>
                </h3>
                <p className="text-xs font-mono text-zinc-400">
                  Full stack platforms, cloud automation, mobile apps, and systems
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-zinc-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Search & Category Filter */}
          <div className="py-4 space-y-3">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects by name, language, or technology..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/[0.04] border border-white/10 text-white placeholder-zinc-500 text-xs font-mono focus:outline-none focus:border-[#d4a22f]/60"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCat(c.id)}
                  className={`px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition-all ${
                    selectedCat === c.id
                      ? "bg-[#d4a22f] text-black font-semibold shadow-[0_0_15px_rgba(212,162,47,0.35)]"
                      : "bg-white/[0.04] text-zinc-400 hover:text-white border border-white/5"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="overflow-y-auto space-y-3 pr-1 pt-1">
            {filtered.length > 0 ? (
              filtered.map((project) => (
                <div
                  key={project.id}
                  className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#d4a22f]/40 hover:bg-white/[0.04] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm group-hover:text-[#d4a22f] transition-colors truncate">
                        {project.title}
                      </span>
                      {project.featured && (
                        <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#d4a22f]/10 border border-[#d4a22f]/30 text-[#d4a22f]">
                          <Sparkles size={10} />
                          Featured
                        </span>
                      )}
                      <span className="text-[10px] font-mono text-zinc-400 px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/5">
                        {project.language}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-300 line-clamp-2">
                      {project.tagline || project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="text-[9px] font-mono text-zinc-400 px-2 py-0.5 rounded bg-white/[0.03] border border-white/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 hover:text-white transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-[#d4a22f] hover:text-black text-white text-xs font-mono font-medium transition-all"
                    >
                      <Github size={14} />
                      <span>Code</span>
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-xs font-mono text-zinc-500">
                No projects found matching "{search}"
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
