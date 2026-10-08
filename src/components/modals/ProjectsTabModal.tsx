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
import { ProjectDetailModal } from "./ProjectDetailModal";

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
  { id: "major", label: "Major", icon: <Sparkles size={11} className="fill-[#d4a22f] text-[#d4a22f]" /> },
  { id: "all", label: "ALL" },
  { id: "web-apps", label: "Web & Apps" },
  { id: "ai", label: "AI & Agents" },
  { id: "cloud", label: "Cloud & DevOps" },
  { id: "networking", label: "Networking & IAM" },
];

const EXPLORING_SUBCATEGORIES: SubcategoryFilter[] = [
  { id: "major", label: "Major", icon: <Sparkles size={11} className="fill-[#d4a22f] text-[#d4a22f]" /> },
  { id: "all", label: "ALL" },
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
  | "language-asc";

const SORT_OPTIONS: { id: ProjectSortOption; label: string; shortLabel: string }[] = [
  { id: "name-asc", label: "Name (A → Z)", shortLabel: "Name (A-Z)" },
  { id: "name-desc", label: "Name (Z → A)", shortLabel: "Name (Z-A)" },
  { id: "featured", label: "Major Projects First", shortLabel: "Major First" },
  { id: "language-asc", label: "Language (A → Z)", shortLabel: "Language" },
];

export const ProjectsTabModal: React.FC<ProjectsTabModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<MainTab>("main");
  const [selectedSubcat, setSelectedSubcat] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sortBy, setSortBy] = useState<ProjectSortOption>("name-asc");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
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

  const currentDataset =
    selectedSubcat === "major"
      ? PROJECTS.filter((p) => Boolean(p.featured))
      : activeTab === "main"
      ? mainList
      : exploringList;
  const currentSubcategories =
    activeTab === "main" ? MAIN_SUBCATEGORIES : EXPLORING_SUBCATEGORIES;

  // Check if a project matches a subcategory filter
  const isProjectInSubcat = (project: Project, subcatId: string) => {
    if (subcatId === "major") return Boolean(project.featured);
    if (subcatId === "all") return true;
    if (subcatId === "web-apps") {
      const subgroup = getProjectSubgroup(project);
      return subgroup === "web" || subgroup === "mobile";
    }
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

  const webProjects = displayedProjects.filter(
    (p) => getProjectSubgroup(p) === "web"
  );
  const appProjects = displayedProjects.filter(
    (p) => getProjectSubgroup(p) === "mobile"
  );

  const renderGrid = (projects: Project[]) => (
    <div
      className={`grid grid-cols-1 ${
        isFullscreen ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"
      } gap-3.5 pb-2`}
    >
      {projects.map((project) => {
        const subgroup = getProjectSubgroup(project);
        const badge = getSubgroupBadge(subgroup);

        return (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className={`rounded-2xl transition-all duration-200 group flex flex-col justify-between cursor-pointer ${
              project.featured
                ? "p-4 sm:p-5 bg-gradient-to-b from-[#d4a22f]/15 via-white/[0.03] to-white/[0.01] border-2 border-[#d4a22f]/50 hover:border-[#d4a22f] shadow-[0_8px_30px_rgba(212,162,47,0.18)] hover:shadow-[0_12px_40px_rgba(212,162,47,0.3)] ring-1 ring-[#d4a22f]/20 hover:-translate-y-0.5"
                : "p-4 sm:p-5 bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-[#d4a22f]/40 hover:-translate-y-0.5"
            }`}
          >
            <div className="space-y-2.5">
              {/* Title & Major Project Badge */}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h4
                    className={`font-bold transition-colors leading-snug ${
                      project.featured
                        ? "text-base sm:text-lg text-white group-hover:text-[#d4a22f]"
                        : "text-sm sm:text-base text-white group-hover:text-[#d4a22f]"
                    }`}
                  >
                    {project.title}
                  </h4>
                  {project.tagline && (
                    <p className="text-xs text-zinc-300 font-medium line-clamp-1 mt-0.5">
                      {project.tagline}
                    </p>
                  )}
                </div>

                {project.featured && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#d4a22f] text-black font-bold tracking-wider uppercase shadow-[0_0_12px_rgba(212,162,47,0.5)] shrink-0 pt-0.5">
                    <Sparkles size={10} className="fill-black" />
                    Major Project
                  </span>
                )}
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
                {project.role && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-medium">
                    {project.role}
                  </span>
                )}
                {project.stats && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                    {project.stats}
                  </span>
                )}
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
            <div className="flex items-center justify-between gap-2 pt-3 mt-2 border-t border-white/5">
              <span className="text-[10px] font-mono text-[#d4a22f] opacity-80 group-hover:opacity-100 transition-opacity">
                View Dossier &rarr;
              </span>
              <div className="flex items-center gap-1.5">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#d4a22f]/10 hover:bg-[#d4a22f] text-[#d4a22f] hover:text-black border border-[#d4a22f]/30 hover:border-transparent text-xs font-mono font-medium transition-all duration-200"
                    title="Live Demo"
                  >
                    <ExternalLink size={12} />
                    <span>Live</span>
                  </a>
                )}
                {project.secondaryUrl && (
                  <a
                    href={project.secondaryUrl.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 px-2 py-1.5 rounded-xl bg-white/[0.06] hover:bg-[#d4a22f] text-zinc-300 hover:text-black border border-white/10 hover:border-transparent text-xs font-mono font-medium transition-all duration-200"
                    title={project.secondaryUrl.label}
                  >
                    <ExternalLink size={11} />
                    <span>Itch</span>
                  </a>
                )}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-[#d4a22f] text-white hover:text-black text-xs font-mono font-medium transition-all duration-200"
                  title="View Repository"
                >
                  <Github size={12} />
                  <span>Code</span>
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderList = (projects: Project[]) => (
    <div className="divide-y divide-white/5 border border-white/5 rounded-2xl overflow-hidden bg-white/[0.01]">
      {projects.map((project) => {
        const subgroup = getProjectSubgroup(project);
        const badge = getSubgroupBadge(subgroup);

        return (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className={`transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-3 group cursor-pointer ${
              project.featured
                ? "p-3.5 sm:p-4 bg-gradient-to-r from-[#d4a22f]/[0.12] via-[#d4a22f]/[0.03] to-transparent border-l-4 border-l-[#d4a22f] border-y border-r border-[#d4a22f]/30 hover:border-[#d4a22f]/60 hover:from-[#d4a22f]/[0.18] shadow-[0_4px_25px_rgba(212,162,47,0.14)] my-1.5 rounded-r-xl"
                : "p-3 sm:p-4 hover:bg-white/[0.04]"
            }`}
          >
            <div className="space-y-1.5 flex-1 min-w-0">
              {/* Title & Major Project Badge */}
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap min-w-0">
                  <h4
                    className={`font-semibold transition-colors truncate ${
                      project.featured
                        ? "text-sm sm:text-base font-bold text-white group-hover:text-[#d4a22f]"
                        : "text-sm text-white group-hover:text-[#d4a22f]"
                    }`}
                  >
                    {project.title}
                  </h4>
                  {project.featured && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#d4a22f] text-black font-bold tracking-wider uppercase shadow-[0_0_10px_rgba(212,162,47,0.5)] shrink-0">
                      <Sparkles size={10} className="fill-black" />
                      Major Project
                    </span>
                  )}
                  {project.role && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shrink-0 font-medium">
                      {project.role}
                    </span>
                  )}
                  {project.stats && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0 font-semibold">
                      {project.stats}
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
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-[#d4a22f]/10 hover:bg-[#d4a22f] text-[#d4a22f] hover:text-black border border-[#d4a22f]/30 hover:border-transparent transition-all duration-200"
                >
                  <ExternalLink size={11} />
                  <span>Live</span>
                </a>
              )}
              {project.secondaryUrl && (
                <a
                  href={project.secondaryUrl.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-mono bg-white/[0.05] hover:bg-[#d4a22f] text-zinc-300 hover:text-black border border-white/10 hover:border-transparent transition-all duration-200"
                >
                  <ExternalLink size={11} />
                  <span>Itch.io</span>
                </a>
              )}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
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
  );

  return (
    <AnimatePresence>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center ${
          isFullscreen ? "p-0" : "p-2 sm:p-6"
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
              ? "h-screen w-screen max-w-none max-h-none rounded-none border-0 p-3.5 sm:p-8"
              : "max-w-5xl h-[94dvh] sm:h-[88vh] max-h-[96dvh] rounded-2xl sm:rounded-3xl border border-white/10 p-3 sm:p-6 shadow-[0_25px_70px_rgba(0,0,0,0.95)]"
          } bg-[#101013] z-10 flex flex-col overflow-hidden will-change-transform`}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-2.5 sm:pb-4 border-b border-white/10 shrink-0 gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="p-1.5 sm:p-2.5 rounded-xl bg-[#d4a22f]/10 border border-[#d4a22f]/25 text-[#d4a22f] shrink-0">
                <Layers size={18} className="sm:w-[22px] sm:h-[22px]" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-xl font-bold text-white flex items-center gap-1.5 sm:gap-2 truncate">
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
                  className={`p-1 sm:p-1.5 rounded-lg transition-all ${
                    viewMode === "grid"
                      ? "bg-[#d4a22f] text-black shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                  title="Grid View"
                  aria-label="Grid View"
                >
                  <LayoutGrid size={13} className="sm:w-[15px] sm:h-[15px]" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1 sm:p-1.5 rounded-lg transition-all ${
                    viewMode === "list"
                      ? "bg-[#d4a22f] text-black shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                  title="List View"
                  aria-label="List View"
                >
                  <List size={13} className="sm:w-[15px] sm:h-[15px]" />
                </button>
              </div>

              {/* Fullscreen Expand Button (desktop/tablet) */}
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="hidden sm:inline-flex p-1.5 sm:p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-zinc-400 hover:text-white transition-colors"
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
                <X size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>
            </div>
          </div>

          {/* Main 2-Tab Navigation: Full-Width Expanded */}
          <div className="pt-2.5 sm:pt-4 pb-2 border-b border-white/5 shrink-0">
            <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full">
              <button
                onClick={() => handleTabChange("main")}
                className={`w-full flex items-center justify-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 active:scale-[0.99] ${
                  activeTab === "main"
                    ? "bg-[#d4a22f] text-black shadow-[0_0_22px_rgba(212,162,47,0.4)]"
                    : "bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/10"
                }`}
              >
                <Laptop size={14} className="shrink-0 sm:w-4 sm:h-4" />
                <span className="truncate">Main ({mainList.length})</span>
              </button>

              <button
                onClick={() => handleTabChange("exploring")}
                className={`w-full flex items-center justify-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 active:scale-[0.99] ${
                  activeTab === "exploring"
                    ? "bg-[#d4a22f] text-black shadow-[0_0_22px_rgba(212,162,47,0.4)]"
                    : "bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/10"
                }`}
              >
                <Compass size={14} className="shrink-0 sm:w-4 sm:h-4" />
                <span className="truncate">Side Quests ({exploringList.length})</span>
              </button>
            </div>
          </div>

          {/* Search Bar & Subcategory Pills */}
          <div className="py-2 sm:py-3.5 space-y-2 sm:space-y-3 shrink-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="relative flex-1">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={
                    activeTab === "main"
                      ? "Search main projects by title, stack..."
                      : "Search side quests (Games, 3D, IoT...)..."
                  }
                  className="w-full pl-8 sm:pl-9 pr-3 py-1.5 sm:py-2 rounded-full bg-white/[0.04] border border-white/10 text-white placeholder-zinc-500 text-[11px] sm:text-xs font-mono focus:outline-none focus:border-[#d4a22f]/60"
                />
              </div>

              {/* Sort Button with Dropdown Menu */}
              <div className="relative shrink-0" ref={sortMenuRef}>
                <button
                  type="button"
                  onClick={() => setShowSortMenu(!showSortMenu)}
                  className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3.5 py-1.5 sm:py-2 rounded-full border text-[11px] sm:text-xs font-mono transition-all duration-200 shadow-sm ${
                    showSortMenu
                      ? "bg-white/[0.08] border-[#d4a22f]/60 text-white shadow-[0_0_15px_rgba(212,162,47,0.2)]"
                      : "bg-white/[0.04] hover:bg-white/[0.08] border-white/10 hover:border-white/20 text-zinc-300 hover:text-white"
                  }`}
                  title="Sort projects"
                  aria-label="Sort projects"
                >
                  <ArrowUpDown size={12} className="text-[#d4a22f] shrink-0" />
                  <span className="hidden md:inline text-zinc-400">Sort:</span>
                  <span className="font-semibold text-white truncate max-w-[70px] sm:max-w-none">
                    {SORT_OPTIONS.find((o) => o.id === sortBy)?.shortLabel}
                  </span>
                  <ChevronDown
                    size={11}
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
                  sub.id === "major"
                    ? PROJECTS.filter((p) => Boolean(p.featured)).length
                    : sub.id === "all"
                    ? (activeTab === "main" ? mainList.length : exploringList.length)
                    : (activeTab === "main" ? mainList : exploringList).filter((p) => isProjectInSubcat(p, sub.id)).length;
                const isSelected = selectedSubcat === sub.id;
                const isMajor = sub.id === "major";

                return (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubcat(sub.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-mono whitespace-nowrap transition-all duration-200 shrink-0 ${
                      isMajor
                        ? isSelected
                          ? "bg-[#d4a22f] text-black font-bold border border-[#d4a22f] shadow-[0_0_15px_rgba(212,162,47,0.4)]"
                          : "bg-[#d4a22f]/10 border border-[#d4a22f]/35 text-[#d4a22f] hover:bg-[#d4a22f]/20 font-medium"
                        : isSelected
                        ? "bg-white/20 text-white font-semibold border border-white/30 shadow-sm"
                        : "bg-white/[0.03] border border-white/10 text-zinc-400 hover:text-white hover:bg-white/[0.07]"
                    }`}
                  >
                    {sub.icon && (
                      <span className="shrink-0">
                        {isMajor && isSelected ? (
                          <Sparkles size={11} className="fill-black text-black" />
                        ) : (
                          sub.icon
                        )}
                      </span>
                    )}
                    <span>
                      {sub.label} ({subCount})
                    </span>
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
            ) : selectedSubcat === "web-apps" ? (
              <div className="space-y-8 pb-4">
                {/* Section 1: Web */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded-md bg-sky-500/20 text-sky-400 border border-sky-500/30">
                        <Globe size={14} />
                      </div>
                      <h3 className="font-mono text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                        Web ({webProjects.length})
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest hidden sm:inline">
                      Full-Stack Platforms &amp; Web Applications
                    </span>
                  </div>
                  {webProjects.length === 0 ? (
                    <div className="py-6 text-center text-zinc-500 font-mono text-xs">
                      No web projects matching criteria.
                    </div>
                  ) : viewMode === "grid" ? (
                    renderGrid(webProjects)
                  ) : (
                    renderList(webProjects)
                  )}
                </div>

                {/* Section 2: Apps */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <Smartphone size={14} />
                      </div>
                      <h3 className="font-mono text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                        Apps ({appProjects.length})
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest hidden sm:inline">
                      Mobile, Flutter &amp; Client Applications
                    </span>
                  </div>
                  {appProjects.length === 0 ? (
                    <div className="py-6 text-center text-zinc-500 font-mono text-xs">
                      No app projects matching criteria.
                    </div>
                  ) : viewMode === "grid" ? (
                    renderGrid(appProjects)
                  ) : (
                    renderList(appProjects)
                  )}
                </div>
              </div>
            ) : viewMode === "grid" ? (
              renderGrid(displayedProjects)
            ) : (
              renderList(displayedProjects)
            )}
          </div>

          {/* Footer Bar */}
          <div className="pt-2.5 sm:pt-3 mt-2 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-zinc-500 shrink-0 gap-2">
            <span className="truncate">
              SHOWING {displayedProjects.length} OF {currentDataset.length} REPOSITORIES IN{" "}
              {selectedSubcat === "major"
                ? "MAJOR PROJECTS"
                : activeTab === "main"
                ? "MAIN PROJECTS"
                : "SIDE QUESTS"}
            </span>
            <span className="text-[#d4a22f] flex items-center gap-1.5 shrink-0">
              <Github size={12} />
              <span className="hidden sm:inline">OPEN SOURCE ON GITHUB</span>
              <span className="sm:hidden">GITHUB</span>
            </span>
          </div>
        </motion.div>

        {/* Big Pop-up Project Dossier Modal */}
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onSelectProject={(p) => setSelectedProject(p)}
        />
      </div>
    </AnimatePresence>
  );
};
