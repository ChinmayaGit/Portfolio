import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Star, GitFork, ArrowUpRight, Sparkles } from 'lucide-react';
import { Project } from '../data/projectsData';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

const LANGUAGE_COLORS: Record<string, string> = {
  Dart: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  TypeScript: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
  JavaScript: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  'C++': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  Java: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  Kotlin: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  Python: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  Swift: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  HTML: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  Shell: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
};

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  mobile: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  ai: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
  games3d: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
  fullstack: { bg: 'bg-sky-500/10', text: 'text-sky-400', border: 'border-sky-500/20' },
  cloud: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20' },
  systems: { bg: 'bg-teal-500/10', text: 'text-teal-400', border: 'border-teal-500/20' },
};

export const ProjectCard: React.FC<ProjectCardProps> = memo(({ project, onSelect }) => {
  const catColor = CATEGORY_COLORS[project.category] || CATEGORY_COLORS.fullstack;
  const langBadge = LANGUAGE_COLORS[project.language] || 'bg-slate-700/50 text-slate-300 border-slate-600';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25 }}
      className="group relative flex flex-col justify-between rounded-2xl bg-[#0c101a]/95 hover:bg-[#101524] border border-slate-800/90 hover:border-cyan-500/40 p-5 sm:p-6 transition-all duration-200 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1 overflow-hidden"
    >
      {/* Top Ambient Glow on Card Hover */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/5 to-purple-500/0 rounded-full blur-2xl group-hover:from-cyan-500/15 transition-all pointer-events-none" />

      <div>
        {/* Card Header: Category & Language Chips */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium border ${catColor.bg} ${catColor.text} ${catColor.border}`}
          >
            {project.categoryLabel}
          </span>

          <div className="flex items-center gap-2">
            {project.stars > 0 && (
              <span className="flex items-center gap-1 text-xs font-mono text-amber-400">
                <Star className="w-3 h-3 fill-amber-400" />
                {project.stars}
              </span>
            )}
            {project.fork && (
              <span
                className="flex items-center gap-0.5 text-[10px] font-mono text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded"
                title="Forked / Enhanced Architecture"
              >
                <GitFork className="w-3 h-3" /> Fork
              </span>
            )}
            <span className={`px-2 py-0.5 rounded text-[11px] font-mono border ${langBadge}`}>
              {project.language}
            </span>
          </div>
        </div>

        {/* Project Title */}
        <div className="flex items-start justify-between gap-2">
          <h3
            onClick={() => onSelect(project)}
            className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>{project.title}</span>
            {project.featured && (
              <span title="Featured Project">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              </span>
            )}
          </h3>
        </div>

        {/* Tagline */}
        <p className="text-xs font-medium text-cyan-400/90 mt-1 font-mono">{project.tagline}</p>

        {/* Description snippet */}
        <p className="text-slate-300 text-xs sm:text-sm mt-3 line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        {/* Stats Pill if available (e.g. Play Store downloads) */}
        {project.stats && (
          <div className="mt-3 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono inline-block">
            ✓ {project.stats}
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md bg-slate-900/80 border border-slate-800 text-slate-400 text-[11px] font-mono"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-1.5 py-0.5 text-[10px] font-mono text-slate-500">
              +{project.tags.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Card Footer: Action Links */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <button
          onClick={() => onSelect(project)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <span>Deep Dive</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-2">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 transition-colors"
              title="View Live Demo"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-xs font-mono"
            title="View on GitHub"
          >
            <Github className="w-3.5 h-3.5" />
            <span>Code</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';
