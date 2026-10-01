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
      className="group relative flex flex-col justify-between rounded-2xl bg-[#14171c] hover:bg-[#181b22] border border-white/[0.08] hover:border-[#ff4f36] p-5 sm:p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,79,54,0.25)] hover:-translate-y-1.5 overflow-hidden"
    >
      {/* Top Ambient Glow on Card Hover (StringTune Red & Blue Pop) */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-[#ff4f36]/0 via-[#3687ff]/0 to-transparent rounded-full blur-2xl group-hover:from-[#ff4f36]/20 group-hover:via-[#3687ff]/10 transition-all pointer-events-none" />

      <div>
        {/* Card Header: Category & Language Chips */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`px-3 py-0.5 rounded-full text-[11px] font-mono font-bold border ${catColor.bg} ${catColor.text} ${catColor.border}`}
          >
            {project.categoryLabel}
          </span>

          <div className="flex items-center gap-2">
            {project.stars > 0 && (
              <span className="flex items-center gap-1 text-xs font-mono text-[#ff4f36] font-bold">
                <Star className="w-3 h-3 fill-[#ff4f36]" />
                {project.stars}
              </span>
            )}
            {project.fork && (
              <span
                className="flex items-center gap-0.5 text-[10px] font-mono text-slate-400 bg-[#101214] px-2 py-0.5 rounded-full border border-white/[0.06]"
                title="Forked / Enhanced Architecture"
              >
                <GitFork className="w-3 h-3" /> Fork
              </span>
            )}
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold border ${langBadge}`}>
              {project.language}
            </span>
          </div>
        </div>

        {/* Project Title */}
        <div className="flex items-start justify-between gap-2">
          <h3
            onClick={() => onSelect(project)}
            className="text-lg sm:text-xl font-bold text-white group-hover:text-[#ff4f36] transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>{project.title}</span>
            {project.featured && (
              <span title="Featured Project">
                <Sparkles className="w-3.5 h-3.5 text-[#ff4f36] shrink-0" />
              </span>
            )}
          </h3>
        </div>

        {/* Tagline */}
        <p className="text-xs font-semibold text-[#3687ff] mt-1 font-mono">{project.tagline}</p>

        {/* Description snippet */}
        <p className="text-slate-300 text-xs sm:text-sm mt-3 line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        {/* Stats Pill if available (e.g. Play Store downloads) */}
        {project.stats && (
          <div className="mt-3 px-3 py-1 rounded-full bg-[#ff4f36]/15 border border-[#ff4f36]/30 text-[#ff4f36] text-xs font-mono font-bold inline-block shadow-[0_0_12px_rgba(255,79,54,0.2)]">
            ✓ {project.stats}
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full bg-[#101214] border border-white/[0.07] text-slate-300 text-[11px] font-mono group-hover:border-white/[0.15] transition-colors"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-2 py-0.5 text-[10px] font-mono text-slate-500 rounded-full bg-[#101214]">
              +{project.tags.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Card Footer: Action Links */}
      <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between gap-2">
        <button
          onClick={() => onSelect(project)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ff4f36] hover:text-[#ff6854] transition-colors"
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
              className="p-1.5 rounded-lg bg-[#181b20] hover:bg-[#3687ff] text-slate-300 hover:text-white transition-all hover:shadow-[0_0_12px_rgba(54,135,255,0.4)]"
              title="View Live Demo"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg bg-[#181b20] hover:bg-[#ff4f36] text-slate-300 hover:text-[#101214] font-bold transition-all flex items-center gap-1 text-xs font-mono hover:shadow-[0_0_12px_rgba(255,79,54,0.4)]"
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
