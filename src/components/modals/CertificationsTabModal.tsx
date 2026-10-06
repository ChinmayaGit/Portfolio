import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Search,
  Award,
  ExternalLink,
  ShieldCheck,
  LayoutGrid,
  List,
  Maximize2,
  Minimize2,
  BadgeCheck,
  BookOpen,
  ArrowUpDown,
  ChevronDown,
  Check,
  Sparkles,
} from "lucide-react";
import { ALL_CERTIFICATIONS } from "../../data/certificationsData";

interface CertificationsTabModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type MainTab = "licenses" | "normal";
type NormalSubcategory = "all" | "google" | "sailpoint" | "anthropic" | "other";

const NORMAL_SUBCATEGORIES: { id: NormalSubcategory; label: string }[] = [
  { id: "all", label: "All Coursework" },
  { id: "google", label: "Google Cloud & Security" },
  { id: "sailpoint", label: "SailPoint Identity Cloud" },
  { id: "anthropic", label: "Anthropic & GenAI" },
  { id: "other", label: "Other Credentials" },
];

export type SortOption =
  | "name-asc"
  | "name-desc"
  | "date-desc"
  | "date-asc"
  | "issuer-asc";

const SORT_OPTIONS: { id: SortOption; label: string; shortLabel: string }[] = [
  { id: "name-asc", label: "Name (A → Z)", shortLabel: "Name (A-Z)" },
  { id: "name-desc", label: "Name (Z → A)", shortLabel: "Name (Z-A)" },
  { id: "date-desc", label: "Date (Newest first)", shortLabel: "Date (Newest)" },
  { id: "date-asc", label: "Date (Oldest first)", shortLabel: "Date (Oldest)" },
  { id: "issuer-asc", label: "Issuer (A → Z)", shortLabel: "Issuer (A-Z)" },
];

const parseIssueDate = (dateStr: string): number => {
  const timestamp = Date.parse(`01 ${dateStr}`);
  return isNaN(timestamp) ? 0 : timestamp;
};

export const CertificationsTabModal: React.FC<CertificationsTabModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<MainTab>("licenses");
  const [selectedSubcat, setSelectedSubcat] = useState<NormalSubcategory>("all");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("name-asc");
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

  if (!isOpen) return null;

  // Separate data into Licenses vs Normal (Course & Learning Certificates)
  const licensesList = ALL_CERTIFICATIONS.filter((c) => c.kind === "license");
  const normalList = ALL_CERTIFICATIONS.filter((c) => c.kind === "normal");

  const currentDataset = activeTab === "licenses" ? licensesList : normalList;

  // Filter based on subcategory (only for normal tab) & search query
  const filtered = currentDataset.filter((c) => {
    const matchesSubcat =
      activeTab === "licenses" ||
      selectedSubcat === "all" ||
      c.subcategory === selectedSubcat;

    const matchesSearch =
      search.trim() === "" ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.issuer.toLowerCase().includes(search.toLowerCase()) ||
      c.credentialId?.toLowerCase().includes(search.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));

    return matchesSubcat && matchesSearch;
  });

  // Sort dataset based on active sort option (default: name-asc)
  const displayedCerts = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "name-asc":
        return a.title.localeCompare(b.title);
      case "name-desc":
        return b.title.localeCompare(a.title);
      case "date-desc": {
        const diff = parseIssueDate(b.issueDate) - parseIssueDate(a.issueDate);
        return diff !== 0 ? diff : a.title.localeCompare(b.title);
      }
      case "date-asc": {
        const diff = parseIssueDate(a.issueDate) - parseIssueDate(b.issueDate);
        return diff !== 0 ? diff : a.title.localeCompare(b.title);
      }
      case "issuer-asc": {
        const issuerDiff = a.issuer.localeCompare(b.issuer);
        return issuerDiff !== 0 ? issuerDiff : a.title.localeCompare(b.title);
      }
      default:
        return a.title.localeCompare(b.title);
    }
  });

  const getIssuerBadgeStyle = (issuer: string) => {
    const low = issuer.toLowerCase();
    if (low.includes("aws") || low.includes("amazon")) {
      return "bg-amber-500/10 text-amber-400 border-amber-500/30";
    }
    if (low.includes("oracle")) {
      return "bg-rose-500/10 text-rose-400 border-rose-500/30";
    }
    if (low.includes("google")) {
      return "bg-sky-500/10 text-sky-400 border-sky-500/30";
    }
    if (low.includes("sailpoint")) {
      return "bg-blue-500/10 text-blue-400 border-blue-500/30";
    }
    if (low.includes("anthropic") || low.includes("claude")) {
      return "bg-[#d4a22f]/10 text-[#d4a22f] border-[#d4a22f]/30";
    }
    return "bg-zinc-500/10 text-zinc-300 border-zinc-500/30";
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
                <Award size={20} className="sm:w-[22px] sm:h-[22px]" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base sm:text-xl font-bold text-white flex items-center gap-1.5 sm:gap-2 truncate">
                  <span>Verified Credentials</span>
                  <span className="text-[10px] sm:text-xs font-mono font-normal text-zinc-400">
                    ({ALL_CERTIFICATIONS.length})
                  </span>
                </h3>
                <p className="text-[10px] sm:text-xs font-mono text-zinc-400 truncate">
                  Licenses &amp; Industry Coursework
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
                {isFullscreen ? <Minimize2 size={15} className="sm:w-4 sm:h-4" /> : <Maximize2 size={15} className="sm:w-4 sm:h-4" />}
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

          {/* Main 2-Tab Navigation: Licenses vs Normal */}
          <div className="pt-3 sm:pt-4 pb-2 flex items-center justify-between gap-2 border-b border-white/5 shrink-0">
            <div className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
              <button
                onClick={() => {
                  setActiveTab("licenses");
                  setSelectedSubcat("all");
                }}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                  activeTab === "licenses"
                    ? "bg-[#d4a22f] text-black shadow-[0_0_20px_rgba(212,162,47,0.35)]"
                    : "bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/10"
                }`}
              >
                <BadgeCheck size={14} className="shrink-0" />
                <span className="truncate">Licenses ({licensesList.length})</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab("normal");
                  setSelectedSubcat("all");
                }}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                  activeTab === "normal"
                    ? "bg-[#d4a22f] text-black shadow-[0_0_20px_rgba(212,162,47,0.35)]"
                    : "bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/10"
                }`}
              >
                <BookOpen size={14} className="shrink-0" />
                <span className="truncate">Coursework ({normalList.length})</span>
              </button>
            </div>

            {/* Quick Context Summary Tag */}
            <div className="font-mono text-[11px] text-zinc-400 hidden sm:block">
              {activeTab === "licenses" ? (
                <span className="text-[#d4a22f]">
                  Official Industry Credentials &bull; AWS, Oracle, SailPoint &amp; Anthropic
                </span>
              ) : (
                <span>Specialized Domain Coursework &bull; Filterable by Vendor</span>
              )}
            </div>
          </div>

          {/* Search Bar & Normal Subcategories */}
          <div className="py-3.5 space-y-3 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative flex-1">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={
                    activeTab === "licenses"
                      ? "Search licenses by name, issuer, or credential..."
                      : "Search courses by title, topic, or vendor..."
                  }
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-white placeholder-zinc-500 text-xs font-mono focus:outline-none focus:border-[#d4a22f]/60"
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
                  title="Sort credentials by name, date, issuer"
                  aria-label="Sort credentials"
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
                          {sortBy === opt.id && <Check size={13} className="shrink-0" />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Subcategory Pills: Only displayed in the "Normal" tab */}
            {activeTab === "normal" && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {NORMAL_SUBCATEGORIES.map((sub) => {
                  const subCount =
                    sub.id === "all"
                      ? normalList.length
                      : normalList.filter((c) => c.subcategory === sub.id).length;

                  return (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedSubcat(sub.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all duration-200 ${
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
            )}
          </div>

          {/* Main Credentials Display Area (Grid or List View) */}
          <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
            {displayedCerts.length === 0 ? (
              <div className="py-20 text-center text-zinc-500 font-mono text-xs">
                No credentials found matching your search.
              </div>
            ) : viewMode === "grid" ? (
              /* GRID VIEW */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pb-2">
                {displayedCerts.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-[#d4a22f]/40 transition-all duration-200 group flex flex-col justify-between"
                  >
                    <div className="space-y-2.5">
                      {/* Title & Featured Badge */}
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-[#d4a22f] transition-colors leading-snug">
                          {cert.title}
                        </h4>
                        {cert.featured && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#d4a22f]/10 border border-[#d4a22f]/30 text-[#d4a22f] shrink-0 pt-0.5">
                            <Sparkles size={10} />
                            <span>Featured</span>
                          </span>
                        )}
                      </div>

                      {/* Pills tag below the name */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono border ${getIssuerBadgeStyle(
                            cert.issuer
                          )}`}
                        >
                          {cert.issuer}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.05] text-zinc-400 border border-white/5">
                          {cert.categoryLabel}
                        </span>
                        {cert.kind === "license" && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#d4a22f]/10 text-[#d4a22f] border border-[#d4a22f]/20 uppercase">
                            Official License
                          </span>
                        )}
                      </div>

                      {/* Dates and Credential ID */}
                      <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 flex-wrap pt-0.5">
                        <span>Issued: {cert.issueDate}</span>
                        {cert.expiryDate && <span>&bull; Expires: {cert.expiryDate}</span>}
                        {cert.credentialId && (
                          <span className="text-zinc-500 truncate max-w-[200px]">
                            &bull; ID: {cert.credentialId}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-white/5 flex flex-col gap-2.5">
                      {cert.skills && cert.skills.length > 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {cert.skills.map((skill, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/40 text-zinc-400 border border-white/5"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                      {cert.credentialUrl && (
                        <div className="flex items-center justify-end pt-1">
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-white/[0.06] hover:bg-[#d4a22f] text-zinc-300 hover:text-black border border-white/10 hover:border-transparent transition-all duration-200"
                          >
                            <ShieldCheck size={13} />
                            <span>Verify Credential</span>
                            <ExternalLink size={11} />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* LIST VIEW */
              <div className="divide-y divide-white/5 border border-white/5 rounded-2xl overflow-hidden bg-white/[0.01]">
                {displayedCerts.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-3 sm:p-4 hover:bg-white/[0.04] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3 group"
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      {/* Title & Featured */}
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <h4 className="text-sm font-semibold text-white group-hover:text-[#d4a22f] transition-colors">
                          {cert.title}
                        </h4>
                        {cert.featured && (
                          <span className="inline-flex items-center gap-1 text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#d4a22f]/10 text-[#d4a22f] border border-[#d4a22f]/30 shrink-0">
                            <Sparkles size={9} />
                            Featured
                          </span>
                        )}
                      </div>

                      {/* Pills tag below the name */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono border ${getIssuerBadgeStyle(
                            cert.issuer
                          )}`}
                        >
                          {cert.issuer}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.05] text-zinc-400 border border-white/5">
                          {cert.categoryLabel}
                        </span>
                        {cert.kind === "license" && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-[#d4a22f]/10 text-[#d4a22f] border border-[#d4a22f]/20 uppercase">
                            Official License
                          </span>
                        )}
                        <span className="text-zinc-500 font-mono text-[11px]">
                          Issued {cert.issueDate}
                        </span>
                        {cert.expiryDate && (
                          <span className="text-zinc-500 font-mono text-[11px]">
                            &bull; Expires {cert.expiryDate}
                          </span>
                        )}
                        {cert.credentialId && (
                          <span className="text-zinc-600 font-mono text-[10px] hidden lg:inline">
                            &bull; ID: {cert.credentialId}
                          </span>
                        )}
                      </div>

                      {cert.skills && cert.skills.length > 0 && (
                        <div className="flex items-center gap-1 flex-wrap pt-0.5">
                          {cert.skills.slice(0, 4).map((s, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-mono text-zinc-500 bg-white/[0.03] px-1.5 py-0.5 rounded"
                            >
                              {s}
                            </span>
                          ))}
                          {cert.skills.length > 4 && (
                            <span className="text-[10px] font-mono text-zinc-600">
                              +{cert.skills.length - 4} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {cert.credentialUrl && (
                      <div className="shrink-0 flex items-center">
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-white/[0.05] hover:bg-[#d4a22f] text-zinc-300 hover:text-black border border-white/10 hover:border-transparent transition-all duration-200"
                        >
                          <ShieldCheck size={12} />
                          <span>Verify</span>
                          <ExternalLink size={10} />
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-500 shrink-0">
            <span>
              SHOWING {displayedCerts.length} OF {currentDataset.length} CREDENTIALS IN{" "}
              {activeTab === "licenses" ? "LICENSES" : "COURSEWORK"}
            </span>
            <span className="text-[#d4a22f] flex items-center gap-1.5">
              <ShieldCheck size={12} />
              <span>CRYPTOGRAPHICALLY VERIFIABLE</span>
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
