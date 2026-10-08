import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Sparkles,
  ExternalLink,
  Github,
  CheckCircle2,
  Cpu,
  Layers,
  ArrowRight,
  Share2,
} from "lucide-react";
import {
  Project,
  PROJECTS,
  getProjectSubgroup,
} from "../../data/projectsData";

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject?: (project: Project) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onSelectProject,
}) => {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (project) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const subgroup = getProjectSubgroup(project);
  const companionProject = project.companionId
    ? PROJECTS.find((p) => p.id === project.companionId)
    : null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className={`relative z-10 w-full max-w-3xl my-auto rounded-3xl overflow-hidden flex flex-col bg-[#0e0e11] border ${
            project.featured
              ? "border-[#d4a22f]/50 shadow-[0_0_50px_rgba(212,162,47,0.22)] ring-1 ring-[#d4a22f]/20"
              : "border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.9)]"
          } max-h-[90vh]`}
        >
          {/* Top Decorative Iron Man Accent Bar */}
          <div
            className={`h-1.5 w-full ${
              project.featured
                ? "bg-gradient-to-r from-transparent via-[#d4a22f] to-transparent"
                : "bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
            }`}
          />

          {/* Header */}
          <div className="px-5 sm:px-8 pt-5 sm:pt-6 pb-4 border-b border-white/10 shrink-0">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5 min-w-0">
                {/* Badges Row */}
                <div className="flex items-center gap-2 flex-wrap">
                  {project.featured && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#d4a22f] text-black font-mono text-[11px] font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(212,162,47,0.5)]">
                      <Sparkles size={11} className="fill-black" />
                      Major Project
                    </span>
                  )}
                  {project.role && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono text-[11px] font-medium">
                      {project.role}
                    </span>
                  )}
                  {project.stats && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono text-[11px] font-semibold">
                      <CheckCircle2 size={11} />
                      {project.stats}
                    </span>
                  )}
                  <span className="px-2.5 py-0.5 rounded-full bg-white/[0.06] text-zinc-300 border border-white/10 font-mono text-[11px] uppercase tracking-wide">
                    {project.categoryLabel}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] text-zinc-400 border border-white/10">
                    {project.language}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug pt-1">
                  {project.title}
                </h3>

                {/* Tagline */}
                {project.tagline && (
                  <p className="text-sm sm:text-base text-zinc-300 font-medium leading-relaxed">
                    {project.tagline}
                  </p>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors shrink-0"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Scrollable Content Body */}
          <div className="px-5 sm:px-8 py-5 sm:py-6 overflow-y-auto space-y-6 flex-1 text-sm">
            {/* Companion App Box (e.g. Reclaim Web <-> Reclaim Mobile) */}
            {companionProject && (
              <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-cyan-500/5 to-transparent border border-cyan-500/30 flex items-center justify-between gap-3 flex-wrap">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                    <Share2 size={13} />
                    <span>Cross-Platform Ecosystem</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-200">
                    Companion Application:{" "}
                    <span className="font-semibold text-white">
                      {project.companionName || companionProject.title}
                    </span>
                  </p>
                </div>
                {onSelectProject && (
                  <button
                    onClick={() => onSelectProject(companionProject)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500 text-black hover:bg-cyan-400 font-mono text-xs font-bold transition-colors"
                  >
                    <span>View Companion</span>
                    <ArrowRight size={13} />
                  </button>
                )}
              </div>
            )}

            {/* Action Buttons Row */}
            <div className="flex items-center gap-3 flex-wrap">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#d4a22f] hover:bg-[#e2af35] text-black font-mono font-bold text-xs uppercase tracking-wider shadow-[0_4px_20px_rgba(212,162,47,0.35)] transition-all duration-200"
                >
                  <ExternalLink size={14} />
                  <span>Launch Live App</span>
                </a>
              )}

              {project.secondaryUrl && (
                <a
                  href={project.secondaryUrl.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/20 font-mono font-medium text-xs transition-all duration-200"
                >
                  <ExternalLink size={13} />
                  <span>{project.secondaryUrl.label}</span>
                </a>
              )}

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-[#d4a22f] text-zinc-300 hover:text-black border border-white/10 hover:border-transparent font-mono font-medium text-xs transition-all duration-200"
              >
                <Github size={14} />
                <span>View Source Code</span>
              </a>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
                <Layers size={13} className="text-[#d4a22f]" />
                <span>Overview &amp; Context</span>
              </h4>
              <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
                {project.description}
              </p>
            </div>

            {/* Key Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="space-y-2.5">
                <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-[#d4a22f]" />
                  <span>Key Engineering Highlights</span>
                </h4>
                <ul className="grid grid-cols-1 gap-2 pt-1">
                  {project.highlights.map((highlight, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 p-2.5 rounded-xl bg-white/[0.02] border border-white/5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d4a22f] mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Architecture Details */}
            {project.architecture && (
              <div className="space-y-2 p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                <h4 className="font-mono text-xs uppercase tracking-widest text-[#d4a22f] flex items-center gap-1.5 font-bold">
                  <Cpu size={13} />
                  <span>Technical Architecture</span>
                </h4>
                <p className="font-mono text-xs text-zinc-300 leading-relaxed">
                  {project.architecture}
                </p>
              </div>
            )}

            {/* Tech Stack Tags Cloud */}
            {project.tags && project.tags.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                  Tech Stack &amp; Protocols
                </h4>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono text-zinc-300 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-5 sm:px-8 py-3.5 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-500 shrink-0 bg-white/[0.01]">
            <span className="truncate">
              ID: {project.id} // {subgroup.toUpperCase()}
            </span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

