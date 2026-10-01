import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutGrid,
  Smartphone,
  Bot,
  Gamepad2,
  Globe,
  ShieldCheck,
  Cpu,
  Search,
  X,
  ExternalLink,
  Sparkles,
  Filter
} from 'lucide-react';
import { CATEGORIES, PROJECTS, Project, CategoryInfo } from '../data/projectsData';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';

const ICON_MAP: Record<string, React.ReactNode> = {
  LayoutGrid: <LayoutGrid className="w-4 h-4" />,
  Smartphone: <Smartphone className="w-4 h-4" />,
  Bot: <Bot className="w-4 h-4" />,
  Gamepad2: <Gamepad2 className="w-4 h-4" />,
  Globe: <Globe className="w-4 h-4" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4" />,
  Cpu: <Cpu className="w-4 h-4" />,
};

const POPULAR_TAGS = [
  'Flutter',
  'TypeScript',
  'Dart',
  'C++',
  'Java',
  'AWS',
  'Python',
  'Kotlin',
  'Cybersecurity',
  'Canvas API',
  'IoT',
];

interface CategoryExplorerProps {
  externalCategory?: CategoryInfo['id'];
  onCategoryChange?: (categoryId: CategoryInfo['id']) => void;
}

export const CategoryExplorer: React.FC<CategoryExplorerProps> = ({
  externalCategory,
  onCategoryChange,
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryInfo['id']>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (externalCategory) {
      setActiveCategory(externalCategory);
    }
  }, [externalCategory]);

  const handleCategorySelect = (id: CategoryInfo['id']) => {
    setActiveCategory(id);
    setSelectedTag(null);
    if (onCategoryChange) onCategoryChange(id);
  };

  // Compute category project counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: PROJECTS.length };
    PROJECTS.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      // Category filter
      if (activeCategory !== 'all' && project.category !== activeCategory) {
        return false;
      }

      // Tag filter
      if (selectedTag && !project.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase())) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(q);
        const matchesTagline = project.tagline.toLowerCase().includes(q);
        const matchesDesc = project.description.toLowerCase().includes(q);
        const matchesLang = project.language.toLowerCase().includes(q);
        const matchesTags = project.tags.some((t) => t.toLowerCase().includes(q));

        if (!matchesTitle && !matchesTagline && !matchesDesc && !matchesLang && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [activeCategory, selectedTag, searchQuery]);

  const activeCategoryInfo = CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0];

  return (
    <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ff4f36]/15 border border-[#ff4f36]/30 text-[#ff4f36] text-xs font-mono mb-3 shadow-[0_0_12px_rgba(255,79,54,0.2)]">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="font-bold">STRING_TUNE ENGINEERING MATRIX</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Explore by <span className="bg-gradient-to-r from-[#ff4f36] via-[#ffffff] to-[#3687ff] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(255,79,54,0.4)]">Technology Domain</span>
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base">
          Categorized showcase of 70+ public repositories spanning cross-platform apps, AI agents, 3D games, cloud infrastructure, and embedded systems.
        </p>
      </div>

      {/* Interactive Category Tabs with Sliding Layout Animation */}
      <div className="relative mb-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none justify-start md:justify-center">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = categoryCounts[cat.id] || 0;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`group relative flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'text-white shadow-xl'
                    : 'text-slate-400 hover:text-white bg-[#16191d] hover:bg-[#1c2026] border border-white/[0.08]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="categoryActivePill"
                    className="absolute inset-0 bg-gradient-to-r from-[#ff4f36]/30 via-[#222832] to-[#3687ff]/30 border border-[#ff4f36]/60 rounded-full shadow-[0_0_20px_rgba(255,79,54,0.3)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${isActive ? 'text-[#ff4f36]' : 'text-slate-400 group-hover:text-slate-300'}`}>
                  {ICON_MAP[cat.iconName]}
                </span>
                <span className="relative z-10">{cat.label}</span>
                <span
                  className={`relative z-10 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    isActive ? 'bg-[#ff4f36] text-[#101214]' : 'bg-[#101214] text-slate-400 border border-white/5'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Category Description Banner */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategoryInfo.id}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className={`mt-3 p-3 rounded-full bg-[#16191d] border border-white/[0.08] text-center text-xs sm:text-sm text-slate-300 backdrop-blur-sm max-w-2xl mx-auto flex items-center justify-center gap-2 shadow-lg`}
          >
            <span className="text-[#ff4f36]">{ICON_MAP[activeCategoryInfo.iconName]}</span>
            <span>{activeCategoryInfo.description}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Search & Tech Tag Filter Toolbar */}
      <div className="mb-8 space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Live Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by tech or name..."
              className="w-full pl-10 pr-8 py-2.5 rounded-full bg-[#16191d] border border-white/[0.08] focus:border-[#ff4f36] focus:outline-none focus:ring-2 focus:ring-[#ff4f36]/30 text-xs sm:text-sm text-white placeholder-slate-500 font-mono transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filter Tag Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1 shrink-0 mr-1">
              <Filter className="w-3 h-3 text-[#ff4f36]" /> Filter:
            </span>
            {POPULAR_TAGS.map((tag) => {
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(isSelected ? null : tag)}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-[#ff4f36] text-[#101214] shadow-[0_0_15px_rgba(255,79,54,0.4)]'
                      : 'bg-[#16191d] hover:bg-[#1c2026] text-slate-300 hover:text-white border border-white/[0.08] hover:border-[#ff4f36]/40'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
            {(selectedTag || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedTag(null);
                  setSearchQuery('');
                }}
                className="px-3 py-1 rounded-full text-xs font-mono font-bold text-[#ff4f36] hover:bg-[#ff4f36]/15 border border-[#ff4f36]/30 whitespace-nowrap transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Results Counter Bar */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
          <span>
            Showing <span className="text-[#ff4f36] font-bold">{filteredProjects.length}</span> projects
            {activeCategory !== 'all' && ` in ${activeCategoryInfo.label}`}
            {selectedTag && ` tagged with "${selectedTag}"`}
          </span>
          <span>Click any card for architectural deep dive</span>
        </div>
      </div>

      {/* Projects Grid with Framer Motion AnimatePresence */}
      {filteredProjects.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={(p) => setSelectedProject(p)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="py-16 text-center rounded-2xl bg-slate-900/30 border border-slate-800/80">
          <div className="inline-flex p-3 rounded-full bg-slate-800/60 text-slate-400 mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">No projects found</h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-sm mx-auto">
            No projects matched your current filters. Try changing your search query or selecting a different technology.
          </p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSelectedTag(null);
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-mono transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Full GitHub Repositories Hub Banner */}
      <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900/90 via-[#0e1628]/90 to-slate-900/90 border border-cyan-500/30 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-lg font-bold text-white flex items-center gap-2">
            <span>Explore All 71 Repositories on GitHub</span>
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Browse through Chinmaya's complete public commit history, ongoing forks, and open-source contributions.
          </p>
        </div>
        <a
          href="https://github.com/ChinmayaGit?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs tracking-wide shadow-md hover:scale-[1.02] transition-all whitespace-nowrap"
        >
          <span>Open GitHub Repositories</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Project Deep Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

