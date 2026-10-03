import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Award, ExternalLink, ShieldCheck, CheckCircle2 } from "lucide-react";
import { ALL_CERTIFICATIONS } from "../../data/certificationsData";

interface CertificationsTabModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  { id: "all", label: "All Certifications" },
  { id: "ai", label: "AI & Agents" },
  { id: "cloud", label: "Cloud & DevOps" },
  { id: "security", label: "Security & IAM" },
  { id: "engineering", label: "Engineering" },
];

export const CertificationsTabModal: React.FC<CertificationsTabModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");

  if (!isOpen) return null;

  const filtered = ALL_CERTIFICATIONS.filter((c) => {
    const matchesCat = selectedCat === "all" || c.category === selectedCat;
    const matchesSearch =
      search.trim() === "" ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.issuer.toLowerCase().includes(search.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
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
                <Award size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  Verified Credentials
                  <span className="text-xs font-mono font-normal text-zinc-400">
                    ({ALL_CERTIFICATIONS.length} credentials)
                  </span>
                </h3>
                <p className="text-xs font-mono text-zinc-400">
                  Industry certifications from Oracle, AWS, Anthropic, Deloitte & SailPoint
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-zinc-400 hover:text-white transition-colors"
              aria-label="Close modal"
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
                placeholder="Search credentials by title, issuer, or skill..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/[0.04] border border-white/10 text-white placeholder-zinc-500 text-xs font-mono focus:outline-none focus:border-[#d4a22f]/60"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCat(c.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all duration-200 ${
                    selectedCat === c.id
                      ? "bg-[#d4a22f] text-black font-semibold shadow-[0_0_15px_rgba(212,162,47,0.3)]"
                      : "bg-white/[0.04] border border-white/10 text-zinc-400 hover:text-white hover:bg-white/[0.08]"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Scrollable Certificates Grid */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-3 custom-scrollbar">
            {filtered.length === 0 ? (
              <div className="py-16 text-center text-zinc-500 font-mono text-xs">
                No verified credentials match your search criteria.
              </div>
            ) : (
              filtered.map((cert) => (
                <div
                  key={cert.id}
                  className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-[#d4a22f]/40 transition-all duration-200 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#d4a22f]/10 text-[#d4a22f] border border-[#d4a22f]/25">
                          {cert.issuer}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.05] text-zinc-400">
                          {cert.categoryLabel}
                        </span>
                        {cert.featured && (
                          <span className="flex items-center gap-1 text-[10px] font-mono text-[#d4a22f]">
                            <CheckCircle2 size={11} /> Featured
                          </span>
                        )}
                      </div>

                      <h4 className="text-base font-semibold text-white group-hover:text-[#d4a22f] transition-colors leading-snug">
                        {cert.title}
                      </h4>

                      <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                        <span>Issued: {cert.issueDate}</span>
                        {cert.expiryDate && <span>Expires: {cert.expiryDate}</span>}
                        {cert.credentialId && (
                          <span className="hidden md:inline text-zinc-500">
                            ID: {cert.credentialId}
                          </span>
                        )}
                      </div>
                    </div>

                    {cert.credentialUrl && (
                      <div className="flex items-center pt-2 sm:pt-0">
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono bg-white/[0.06] hover:bg-[#d4a22f] text-zinc-300 hover:text-black border border-white/10 hover:border-transparent transition-all duration-200"
                        >
                          <ShieldCheck size={13} />
                          <span>Verify</span>
                          <ExternalLink size={11} />
                        </a>
                      </div>
                    )}
                  </div>

                  {cert.skills && cert.skills.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap pt-3 mt-3 border-t border-white/5">
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
                </div>
              ))
            )}
          </div>

          {/* Footer note */}
          <div className="pt-4 mt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <span>SHOWING {filtered.length} OF {ALL_CERTIFICATIONS.length} CREDENTIALS</span>
            <span className="text-[#d4a22f]">ALL BADGES CRYPTOGRAPHICALLY VERIFIABLE</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
