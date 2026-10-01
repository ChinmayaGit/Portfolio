import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, CheckCircle2, Cpu, Layers, Sparkles } from 'lucide-react';
import { Project } from '../data/projectsData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }}
          className="relative w-full max-w-2xl bg-[#14171c] border border-white/[0.12] rounded-3xl shadow-[0_0_50px_rgba(255,79,54,0.15)] p-6 sm:p-8 z-10 overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Top Decorative Ambient Glows */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff4f36]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#3687ff]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#101214] hover:bg-[#1f242c] text-slate-400 hover:text-white border border-white/[0.1] transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="pr-8">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-0.5 rounded-full text-xs font-mono font-bold bg-[#ff4f36]/15 text-[#ff4f36] border border-[#ff4f36]/30">
                {project.categoryLabel}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-[#101214] text-slate-300 border border-white/[0.08]">
                {project.language}
              </span>
              {project.stats && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-[#3687ff]/15 text-[#3687ff] border border-[#3687ff]/30 font-semibold">
                  {project.stats}
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <span>{project.title}</span>
              {project.featured && <Sparkles className="w-5 h-5 text-[#ff4f36]" />}
            </h2>
            <p className="text-[#3687ff] font-mono text-xs sm:text-sm mt-1">{project.tagline}</p>
          </div>

          {/* Modal Scrollable Body */}
          <div className="mt-6 space-y-6 overflow-y-auto pr-1">
            {/* Description */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#ff4f36]" />
                <span>Project Overview</span>
              </h4>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">{project.description}</p>
            </div>

            {/* Architecture / Engineering details if present */}
            {project.architecture && (
              <div className="p-4 rounded-2xl bg-[#101214] border border-white/[0.08]">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#3687ff] mb-2 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Architecture & System Design</span>
                </h4>
                <p className="text-slate-300 text-xs sm:text-sm font-mono leading-relaxed">
                  {project.architecture}
                </p>
              </div>
            )}

            {/* Key Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Key Technical Capabilities
                </h4>
                <ul className="space-y-2">
                  {project.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-[#ff4f36] shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies Used */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Tech Stack & Libraries
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full bg-[#101214] border border-white/[0.08] text-slate-300 text-xs font-mono hover:border-[#ff4f36]/40 hover:text-white transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="mt-6 pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs font-mono text-slate-400">
              Repository: <span className="text-white font-semibold">{project.title}</span>
            </div>

            <div className="flex items-center gap-3">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#181b22] hover:bg-[#222733] border border-[#3687ff]/40 text-[#3687ff] text-xs font-bold transition-all hover:shadow-[0_0_15px_rgba(54,135,255,0.25)]"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live App</span>
                </a>
              )}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#ff4f36] hover:bg-[#ff6852] text-[#101214] font-black text-xs shadow-[0_0_20px_rgba(255,79,54,0.35)] transition-all hover:scale-105 active:scale-95"
              >
                <Github className="w-4 h-4" />
                <span>Open in GitHub</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

