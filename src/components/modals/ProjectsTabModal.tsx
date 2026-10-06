import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Search,
  Github,
  ExternalLink,
  Sparkles,
  Layers,
  LayoutGrid,
  List,
  Maximize2,
  Minimize2,
  ArrowUpDown,
  ChevronDown,
  Check,
  Laptop,
  Compass,
  Bot,
  ShieldCheck,
  Smartphone,
  Gamepad2,
  Cpu,
  Globe,
  Radio,
  Star,
  Box,
  Wifi,
  GraduationCap,
  Archive,
} from "lucide-react";
import {
  PROJECTS,
  Project,
  ProjectSubgroup,
  getProjectTab,
  getProjectSubgroup,
} from "../../data/projectsData";

interface ProjectsTabModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type MainTab = "main" | "exploring";

interface SubcategoryFilter {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

const MAIN_SUBCATEGORIES: SubcategoryFilter[] = [
  { id: "all", label: "All Main" },
  { id: "web", label: "Full-Stack Web" },
  { id: "mobile", label: "Mobile Apps" },
  { id: "ai", label: "AI & Agents" },
  { id: "cloud", label: "Cloud & DevOps" },
  { id: "networking", label: "Networking & IAM" },
];

const EXPLORING_SUBCATEGORIES: SubcategoryFilter[] = [
  { id: "all", label: "All Exploring" },
  { id: "games", label: "Games" },
  { id: "3d", label: "3D" },
  { id: "iot", label: "IoT" },
  { id: "hardware", label: "Hardware" },
  { id: "academic", label: "Academic" },
  { id: "archives", label: "Archives" },
];

export type ProjectSortOption =
  | "name-asc"
  | "name-desc"
  | "featured"
  | "language-asc"
  | "stars-desc";

const SORT_OPTIONS: { id: ProjectSortOption; label: string; shortLabel: string }[] = [
  { id: "name-asc", label: "Name (A → Z)", shortLabel: "Name (A-Z)" },
  { id: "name-desc", label: "Name (Z → A)", shortLabel: "Name (Z-A)" },
  { id: "featured", label: "Featured First", shortLabel: "Featured" },
  { id: "language-asc", label: "Language (A → Z)", shortLabel: "Language" },
  { id: "stars-desc", label: "Stars (Most first)", shortLabel: "Stars" },
];

export const ProjectsTabModal: React.FC<ProjectsTabModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<MainTab>("main");
  const [selectedSubcat, setSelectedSubcat] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sortBy, setSortBy] = useState<ProjectSortOption>("name-asc");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const sortMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sortMenuRef.current &&
        !sortMenuRef.current.contains(event.target as Node)
      ) {
        setShowSortMenu(false);
      }
    };
    if (showSortMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSortMenu]);

  // Reset subcategory filter when switching tabs
  const handleTabChange = (tab: MainTab) => {
    setActiveTab(tab);
    setSelectedSubcat("all");
  };

  if (!isOpen) return null;

  // Split projects into Main vs Exploring based on getProjectTab
  const mainList = PROJECTS.filter((p) => getProjectTab(p) === "main");
  const exploringList = PROJECTS.filter((p) => getProjectTab(p) === "exploring");

  const currentDataset = activeTab === "main" ? mainList : exploringList;
  const currentSubcategories =
    activeTab === "main" ? MAIN_SUBCATEGORIES : EXPLORING_SUBCATEGORIES;

  // Check if a project matches a subcategory filter
  const isProjectInSubcat = (project: Project, subcatId: string) => {
    if (subcatId === "all") return true;
    const subgroup = getProjectSubgroup(project);
    if (subgroup === subcatId) return true;
    if (activeTab === "exploring") {
      if (subcatId === "iot" && project.tags.some((t) => t.toLowerCase() === "iot")) return true;
      if (subcatId === "hardware" && project.tags.some((t) => t.toLowerCase() === "hardware")) return true;
    }
    return false;
  };

  // Filter dataset by subcategory and search query
  const filtered = currentDataset.filter((p) => {
    const matchesSubcat = isProjectInSubcat(p, selectedSubcat);

    const matchesSearch =
      search.trim() === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tagline.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.language.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
      (p.highlights &&
        p.highlights.some((h) =>
          h.toLowerCase().includes(search.toLowerCase())
        ));

    return matchesSubcat && matchesSearch;
  });

  // Sort dataset based on active sort option (default: name-asc)
  const displayedProjects = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "name-asc":
        return a.title.localeCompare(b.title);
      case "name-desc":
        return b.title.localeCompare(a.title);
      case "featured": {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.title.localeCompare(b.title);
      }
      case "language-asc": {
        const langDiff = a.language.localeCompare(b.language);
        return langDiff !== 0 ? langDiff : a.title.localeCompare(b.title);
      }
      case "stars-desc": {
        const starDiff = (b.stars || 0) - (a.stars || 0);
        return starDiff !== 0 ? starDiff : a.title.localeCompare(b.title);
      }
      default:
        return a.title.localeCompare(b.title);
    }
  });

  const getSubgroupBadge = (subgroup: ProjectSubgroup) => {
    switch (subgroup) {
      case "web":
        return {
          label: "Full-Stack Web",
          style: "bg-sky-500/10 text-sky-400 border-sky-500/30",
          icon: <Globe size={11} />,
        };
      case "mobile":
        return {
          label: "Mobile & Flutter",
          style: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
          icon: <Smartphone size={11} />,
        };
      case "ai":
        return {
          label: "AI & Agents",
          style: "bg-purple-500/10 text-purple-400 border-purple-500/30",
          icon: <Bot size={11} />,
        };
      case "cloud":
        return {
          label: "Cloud & DevOps",
          style: "bg-rose-500/10 text-rose-400 border-rose-500/30",
          icon: <Radio size={11} />,
        };
      case "networking":
        return {
          label: "Networking & IAM",
          style: "bg-blue-500/10 text-blue-400 border-blue-500/30",
          icon: <ShieldCheck size={11} />,
        };
      case "games":
        return {
          label: "Games",
          style: "bg-amber-500/10 text-amber-400 border-amber-500/30",
          icon: <Gamepad2 size={11} />,
        };
      case "3d":
        return {
          label: "3D",
          style: "bg-orange-500/10 text-orange-400 border-orange-500/30",
          icon: <Box size={11} />,
        };
      case "iot":
        return {
          label: "IoT",
          style: "bg-teal-500/10 text-teal-400 border-teal-500/30",
          icon: <Wifi size={11} />,
        };
      case "hardware":
        return {
          label: "Hardware",
          style: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
          icon: <Cpu size={11} />,
        };
      case "academic":
        return {
          label: "Academic",
          style: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
          icon: <GraduationCap size={11} />,
        };
      case "archives":
        return {
          label: "Archives",
          style: "bg-zinc-500/10 text-zinc-400 border-zinc-500/25",
          icon: <Archive size={11} />,
        };
      case "games3d":
        return {
          label: "Games",
          style: "bg-amber-500/10 text-amber-400 border-amber-500/30",
          icon: <Gamepad2 size={11} />,
        };
      case "other":
        return {
          label: "Academic",
          style: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
          icon: <GraduationCap size={11} />,
        };
      default:
        return {
          label: "Specialized",
          style: "bg-zinc-500/10 text-zinc-300 border-zinc-500/30",
          icon: <Layers size={11} />,
        };
    }
  };

  return (
    <AnimatePresence>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center ${
          isFullscreen ? "p-0" : "p-2.5 sm:p-6"
        } overflow-y-auto`}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.2 }}
          className={`relative w-full ${
            isFullscreen
              ? "h-screen w-screen max-w-none max-h-none rounded-none border-0 p-4 sm:p-8"
              : "max-w-5xl max-h-[92vh] rounded-2xl sm:rounded-3xl border border-white/10 p-3.5 sm:p-7 shadow-[0_25px_70px_rgba(0,0,0,0.95)]"
          } bg-[#101013] z-10 flex flex-col overflow-hidden will-change-transform`}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/10 shrink-0 gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="p-2 sm:p-2.5 rounded-xl bg-[#d4a22f]/10 border border-[#d4a22f]/25 text-[#d4a22f] shrink-0">
                <Layers size={20} className="sm:w-[22px] sm:h-[22px]" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base sm:text-xl font-bold text-white flex items-center gap-1.5 sm:gap-2 truncate">
                  <span>Projects Archive</span>
                  <span className="text-[10px] sm:text-xs font-mono font-normal text-zinc-400">
                    ({PROJECTS.length})
                  </span>
                </h3>
                <p className="text-[10px] sm:text-xs font-mono text-zinc-400 truncate">
                  Full Stack, AI, Cloud, Mobile, Games &amp; IoT
                </p>
              </div>
            </div>

            {/* Action Buttons: Grid/List + Fullscreen + Close */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Grid / List View Toggle */}
              <div className="flex items-center bg-white/[0.04] p-0.5 sm:p-1 rounded-xl border border-white/10">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === "grid"
                      ? "bg-[#d4a22f] text-black shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                  title="Grid View"
                  aria-label="Grid View"
                >
                  <LayoutGrid size={14} className="sm:w-[15px] sm:h-[15px]" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === "list"
                      ? "bg-[#d4a22f] text-black shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                  title="List View"
                  aria-label="List View"
                >
                  <List size={14} className="sm:w-[15px] sm:h-[15px]" />
                </button>
              </div>

              {/* Fullscreen Expand Button */}
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1.5 sm:p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-zinc-400 hover:text-white transition-colors"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen View"}
                aria-label="Toggle Fullscreen"
              >
                {isFullscreen ? (
                  <Minimize2 size={15} className="sm:w-4 sm:h-4" />
                ) : (
                  <Maximize2 size={15} className="sm:w-4 sm:h-4" />
                )}
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-zinc-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X size={17} className="sm:w-[18px] sm:h-[18px]" />
              </button>
            </div>
          </div>

          {/* Main 2-Tab Navigation: Main Projects vs Exploring */}
          <div className="pt-3 sm:pt-4 pb-2 flex items-center justify-between gap-2 border-b border-white/5 shrink-0">
            <div className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
              <button
                onClick={() => handleTabChange("main")}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                  activeTab === "main"
                    ? "bg-[#d4a22f] text-black shadow-[0_0_20px_rgba(212,162,47,0.35)]"
                    : "bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/10"
                }`}
              >
                <Laptop size={14} className="shrink-0" />
                <span className="truncate">Main Projects ({mainList.length})</span>
              </button>

              <button
                onClick={() => handleTabChange("exploring")}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                  activeTab === "exploring"
                    ? "bg-[#d4a22f] text-black shadow-[0_0_20px_rgba(212,162,47,0.35)]"
                    : "bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/10"
                }`}
              >
                <Compass size={14} className="shrink-0" />
                <span className="truncate">Exploring ({exploringList.length})</span>
              </button>
            </div>

            {/* Quick Context Summary Tag */}
            <div className="font-mono text-[11px] text-zinc-400 hidden sm:block">
              {activeTab === "main" ? (
                <span className="text-[#d4a22f]">
                  Core Production Platforms &bull; Web, Mobile, AI, Cloud &amp; Networking
                </span>
              ) : (
                <span>Interactive R&amp;D &bull; Games, 3D, IoT, Hardware, Academic, Archives</span>
              )}
            </div>
          </div>

          {/* Search Bar & Subcategory Pills */}
          <div className="py-2.5 sm:py-3.5 space-y-2.5 sm:space-y-3 shrink-0">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={
                    activeTab === "main"
                      ? "Search main projects by title, tech stack, tag..."
                      : "Search exploring projects (Games, 3D, IoT, Hardware...)..."
                  }
                  className="w-full pl-9 pr-3 py-2 rounded-full bg-white/[0.04] border border-white/10 text-white placeholder-zinc-500 text-xs font-mono focus:outline-none focus:border-[#d4a22f]/60"
                />
              </div>

              {/* Sort Button with Dropdown Menu */}
              <div className="relative shrink-0" ref={sortMenuRef}>
                <button
                  type="button"
                  onClick={() => setShowSortMenu(!showSortMenu)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 rounded-full border text-xs font-mono transition-all duration-200 shadow-sm ${
                    showSortMenu
                      ? "bg-white/[0.08] border-[#d4a22f]/60 text-white shadow-[0_0_15px_rgba(212,162,47,0.2)]"
                      : "bg-white/[0.04] hover:bg-white/[0.08] border-white/10 hover:border-white/20 text-zinc-300 hover:text-white"
                  }`}
                  title="Sort projects"
                  aria-label="Sort projects"
                >
                  <ArrowUpDown size={13} className="text-[#d4a22f] shrink-0" />
                  <span className="hidden sm:inline text-zinc-400">Sort:</span>
                  <span className="font-semibold text-white truncate max-w-[85px] sm:max-w-none">
                    {SORT_OPTIONS.find((o) => o.id === sortBy)?.shortLabel}
                  </span>
                  <ChevronDown
                    size={12}
                    className={`text-zinc-400 transition-transform duration-200 shrink-0 ${
                      showSortMenu ? "rotate-180 text-[#d4a22f]" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {showSortMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-52 rounded-2xl bg-[#141418] border border-white/15 shadow-[0_15px_45px_rgba(0,0,0,0.95)] p-1.5 z-50 backdrop-blur-xl"
                    >
                      <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-zinc-500 border-b border-white/5 mb-1">
                        Sort Options
                      </div>
                      {SORT_OPTIONS.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            setSortBy(opt.id);
                            setShowSortMenu(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono transition-colors text-left ${
                            sortBy === opt.id
                              ? "bg-[#d4a22f] text-black font-semibold shadow-sm"
                              : "text-zinc-300 hover:text-white hover:bg-white/[0.06]"
                          }`}
                        >
                          <span>{opt.label}</span>
                          {sortBy === opt.id && (
                            <Check size={13} className="shrink-0" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Subcategory Filter Pills */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none flex-nowrap -mx-1 px-1">
              {currentSubcategories.map((sub) => {
                const subCount =
                  sub.id === "all"
                    ? currentDataset.length
                    : currentDataset.filter((p) => isProjectInSubcat(p, sub.id)).length;

                return (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubcat(sub.id)}
                    className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-mono whitespace-nowrap transition-all duration-200 shrink-0 ${
                      selectedSubcat === sub.id
                        ? "bg-white/20 text-white font-semibold border border-white/30"
                        : "bg-white/[0.03] border border-white/10 text-zinc-400 hover:text-white hover:bg-white/[0.07]"
                    }`}
                  >
                    {sub.label} ({subCount})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Projects Display Area (Grid or List View) */}
          <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
            {displayedProjects.length === 0 ? (
              <div className="py-20 text-center text-zinc-500 font-mono text-xs">
                No projects found matching your search.
              </div>
            ) : viewMode === "grid" ? (
              /* GRID VIEW */
              <div
                className={`grid grid-cols-1 ${
                  isFullscreen ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"
                } gap-3.5 pb-2`}
              >
                {displayedProjects.map((project) => {
                  const subgroup = getProjectSubgroup(project);
                  const badge = getSubgroupBadge(subgroup);

                  return (
                    <div
                      key={project.id}
                      className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-[#d4a22f]/40 transition-all duration-200 group flex flex-col justify-between"
                    >
                      <div className="space-y-2.5">
                        {/* Title & Featured / Stars row */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-[#d4a22f] transition-colors leading-snug">
                              {project.title}
                            </h4>
                            {project.tagline && (
                              <p className="text-xs text-zinc-300 font-medium line-clamp-1 mt-0.5">
                                {project.tagline}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                            {project.stars !== undefined && project.stars > 0 && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-400/80 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
                                <Star size={10} className="fill-amber-400 text-amber-400" />
                                {project.stars}
                              </span>
                            )}
                            {project.featured && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#d4a22f]/10 border border-[#d4a22f]/30 text-[#d4a22f]">
                                <Sparkles size={10} />
                                Featured
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Pills tag below the name */}
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono border ${badge.style}`}
                          >
                            {badge.icon}
                            <span>{badge.label}</span>
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-zinc-400 border border-white/10">
                            {project.language}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Tags */}
                        {project.tags && project.tags.length > 0 && (
                          <div className="flex items-center gap-1.5 flex-wrap pt-1">
                            {project.tags.slice(0, 4).map((t) => (
                              <span
                                key={t}
                                className="text-[10px] font-mono text-zinc-400 bg-white/[0.03] px-2 py-0.5 rounded border border-white/5"
                              >
                                {t}
                              </span>
                            ))}
                            {project.tags.length > 4 && (
                              <span className="text-[10px] font-mono text-zinc-500">
                                +{project.tags.length - 4}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center justify-end gap-2 pt-3 mt-2 border-t border-white/5">
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#d4a22f]/10 hover:bg-[#d4a22f] text-[#d4a22f] hover:text-black border border-[#d4a22f]/30 hover:border-transparent text-xs font-mono font-medium transition-all duration-200"
                            title="Live Demo"
                          >
                            <ExternalLink size={12} />
                            <span>Demo</span>
                          </a>
                        )}
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-[#d4a22f] text-white hover:text-black text-xs font-mono font-medium transition-all duration-200"
                          title="View Repository"
                        >
                          <Github size={13} />
                          <span>Code</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* LIST VIEW */
              <div className="divide-y divide-white/5 border border-white/5 rounded-2xl overflow-hidden bg-white/[0.01]">
                {displayedProjects.map((project) => {
                  const subgroup = getProjectSubgroup(project);
                  const badge = getSubgroupBadge(subgroup);

                  return (
                    <div
                      key={project.id}
                      className="p-3 sm:p-4 hover:bg-white/[0.04] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3 group"
                    >
                      <div className="space-y-1.5 flex-1 min-w-0">
                        {/* Title & Featured / Stars row */}
                        <div className="flex items-start justify-between gap-2 flex-wrap">
                          <h4 className="text-sm font-semibold text-white group-hover:text-[#d4a22f] transition-colors truncate">
                            {project.title}
                          </h4>
                          <div className="flex items-center gap-1.5 shrink-0">
                            {project.stars !== undefined && project.stars > 0 && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-400/80">
                                <Star size={10} className="fill-amber-400 text-amber-400" />
                                {project.stars}
                              </span>
                            )}
                            {project.featured && (
                              <span className="inline-flex items-center gap-1 text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-[#d4a22f]/10 text-[#d4a22f] border border-[#d4a22f]/30">
                                <Sparkles size={9} />
                                Featured
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Pills tag below the name */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono border ${badge.style}`}
                          >
                            {badge.icon}
                            <span>{badge.label}</span>
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-zinc-400 border border-white/10">
                            {project.language}
                          </span>
                          {project.tagline && (
                            <span className="text-xs text-zinc-400 line-clamp-1 hidden sm:inline">
                              &bull; {project.tagline}
                            </span>
                          )}
                        </div>

                        {project.tags && project.tags.length > 0 && (
                          <div className="flex items-center gap-1 flex-wrap pt-0.5">
                            {project.tags.slice(0, 4).map((t) => (
                              <span
                                key={t}
                                className="text-[10px] font-mono text-zinc-500 bg-white/[0.03] px-1.5 py-0.5 rounded"
                              >
                                {t}
                              </span>
                            ))}
                            {project.tags.length > 4 && (
                              <span className="text-[10px] font-mono text-zinc-600">
                                +{project.tags.length - 4} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="shrink-0 flex items-center gap-2 pt-1 md:pt-0">
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-[#d4a22f]/10 hover:bg-[#d4a22f] text-[#d4a22f] hover:text-black border border-[#d4a22f]/30 hover:border-transparent transition-all duration-200"
                          >
                            <ExternalLink size={11} />
                            <span>Demo</span>
                          </a>
                        )}
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-white/[0.05] hover:bg-[#d4a22f] text-zinc-300 hover:text-black border border-white/10 hover:border-transparent transition-all duration-200"
                        >
                          <Github size={12} />
                          <span>Code</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="pt-2.5 sm:pt-3 mt-2 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-zinc-500 shrink-0 gap-2">
            <span className="truncate">
              SHOWING {displayedProjects.length} OF {currentDataset.length} REPOSITORIES IN{" "}
              {activeTab === "main" ? "MAIN PROJECTS" : "EXPLORING"}
            </span>
            <span className="text-[#d4a22f] flex items-center gap-1.5 shrink-0">
              <Github size={12} />
              <span className="hidden sm:inline">OPEN SOURCE ON GITHUB</span>
              <span className="sm:hidden">GITHUB</span>
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
