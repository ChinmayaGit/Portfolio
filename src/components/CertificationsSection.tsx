import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  Shield,
  Cloud,
  Bot,
  Cpu,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Calendar,
  KeyRound,
  Layers,
  Search
} from 'lucide-react';
import { ALL_CERTIFICATIONS } from '../data/certificationsData';

const CATEGORY_TABS = [
  { id: 'all', label: 'All Credentials', icon: <Layers className="w-4 h-4" /> },
  { id: 'ai', label: 'AI & Agent Systems', icon: <Bot className="w-4 h-4" /> },
  { id: 'cloud', label: 'Cloud & Data', icon: <Cloud className="w-4 h-4" /> },
  { id: 'security', label: 'Cybersecurity & IAM', icon: <Shield className="w-4 h-4" /> },
  { id: 'engineering', label: 'Specialized & ISRO', icon: <Cpu className="w-4 h-4" /> },
];

const ISSUER_BADGES: Record<string, { bg: string; text: string; border: string }> = {
  Anthropic: { bg: 'bg-purple-500/10', text: 'text-purple-300', border: 'border-purple-500/30' },
  Oracle: { bg: 'bg-red-500/10', text: 'text-red-300', border: 'border-red-500/30' },
  'Amazon Web Services (AWS)': { bg: 'bg-amber-500/10', text: 'text-amber-300', border: 'border-amber-500/30' },
  SailPoint: { bg: 'bg-blue-500/10', text: 'text-blue-300', border: 'border-blue-500/30' },
  'Google Cloud Skills Boost': { bg: 'bg-emerald-500/10', text: 'text-emerald-300', border: 'border-emerald-500/30' },
  'Google Career Certificates': { bg: 'bg-emerald-500/10', text: 'text-emerald-300', border: 'border-emerald-500/30' },
  'Google Cloud Training Online': { bg: 'bg-emerald-500/10', text: 'text-emerald-300', border: 'border-emerald-500/30' },
  'ROI Training': { bg: 'bg-teal-500/10', text: 'text-teal-300', border: 'border-teal-500/30' },
  Cisco: { bg: 'bg-sky-500/10', text: 'text-sky-300', border: 'border-sky-500/30' },
  'Indian Institute of Remote Sensing (IIRS), ISRO': { bg: 'bg-orange-500/10', text: 'text-orange-300', border: 'border-orange-500/30' },
};

export const CertificationsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredCerts = useMemo(() => {
    return ALL_CERTIFICATIONS.filter((cert) => {
      if (activeTab !== 'all' && cert.category !== activeTab) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = cert.title.toLowerCase().includes(q);
        const matchesIssuer = cert.issuer.toLowerCase().includes(q);
        const matchesSkills = cert.skills.some((s) => s.toLowerCase().includes(q));
        const matchesId = cert.credentialId?.toLowerCase().includes(q);
        return matchesTitle || matchesIssuer || matchesSkills || matchesId;
      }
      return true;
    });
  }, [activeTab, searchQuery]);

  // Counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: ALL_CERTIFICATIONS.length };
    ALL_CERTIFICATIONS.forEach((c) => {
      counts[c.category] = (counts[c.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <section id="certifications" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#ff4f36]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#3687ff]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ff4f36]/15 border border-[#ff4f36]/30 text-[#ff4f36] text-xs font-mono mb-3 shadow-[0_0_12px_rgba(255,79,54,0.2)]">
          <Award className="w-3.5 h-3.5" />
          <span className="font-bold">VERIFIABLE CREDENTIAL REGISTRY</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Certifications & <span className="bg-gradient-to-r from-[#ff4f36] via-[#ffffff] to-[#3687ff] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(255,79,54,0.4)]">Achievements</span>
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base">
          A verifiable repository of <span className="text-[#ff4f36] font-bold font-mono">30+ industry certifications</span> spanning Oracle Fusion AI Agents, Anthropic Claude Developer, AWS Solutions & Data Engineering, SailPoint Identity Governance, Google Cybersecurity, Cisco CyberOps, and ISRO Research.
        </p>
      </div>

      {/* Category Filter Tabs & Search Bar */}
      <div className="mb-8 space-y-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const count = categoryCounts[tab.id] || 0;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group relative flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'text-white shadow-xl'
                    : 'text-slate-400 hover:text-white bg-[#16191d] hover:bg-[#1c2026] border border-white/[0.08]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCertTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#ff4f36]/30 via-[#232730] to-[#3687ff]/30 border border-[#ff4f36]/50 rounded-full shadow-[0_0_20px_rgba(255,79,54,0.3)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${isActive ? 'text-[#ff4f36]' : 'text-slate-400'}`}>{tab.icon}</span>
                <span className="relative z-10">{tab.label}</span>
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

        {/* Live Search Bar for Certifications */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 max-w-xl mx-auto">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search credentials by title, issuer, or skill (e.g. Claude, SailPoint, AWS)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#16191d] border border-white/[0.08] focus:border-[#ff4f36] focus:outline-none focus:ring-2 focus:ring-[#ff4f36]/30 text-xs sm:text-sm text-white placeholder-slate-500 font-mono transition-all"
            />
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs font-mono text-[#ff4f36] hover:underline shrink-0"
            >
              Clear Search
            </button>
          )}
        </div>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        <AnimatePresence>
          {filteredCerts.map((cert) => {
            const badgeStyle = ISSUER_BADGES[cert.issuer] || {
              bg: 'bg-[#181b20]',
              text: 'text-slate-300',
              border: 'border-white/10',
            };

            return (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="group relative rounded-2xl bg-[#14171c] hover:bg-[#181b22] border border-white/[0.08] hover:border-[#ff4f36] p-5.5 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,79,54,0.25)] hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  {/* Top Issuer Badge & Issue Date */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`px-3 py-0.5 rounded-full text-[11px] font-mono font-bold border ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border} truncate max-w-[210px]`}
                      title={cert.issuer}
                    >
                      {cert.issuer}
                    </span>

                    <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 shrink-0">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span>{cert.issueDate}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#ff4f36] transition-colors leading-snug flex items-start gap-1.5">
                    <span>{cert.title}</span>
                    {cert.featured && (
                      <span title="Featured Credential">
                        <Sparkles className="w-3.5 h-3.5 text-[#ff4f36] shrink-0 mt-0.5" />
                      </span>
                    )}
                  </h3>

                  {/* Credential ID if available */}
                  {cert.credentialId && (
                    <div className="mt-2.5 flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-[#101214] px-2.5 py-1 rounded-full border border-white/[0.06] truncate">
                      <KeyRound className="w-3 h-3 text-[#3687ff] shrink-0" />
                      <span className="truncate">ID: {cert.credentialId}</span>
                    </div>
                  )}

                  {/* Expiry if available */}
                  {cert.expiryDate && (
                    <div className="mt-1 text-[10px] font-mono text-slate-400">
                      Validity: {cert.issueDate} — {cert.expiryDate}
                    </div>
                  )}

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-0.5 rounded-full bg-[#101214] border border-white/[0.06] text-slate-300 text-[10px] font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="mt-5 pt-3 border-t border-white/[0.08] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#ff4f36] flex items-center gap-1 font-bold">
                    <CheckCircle2 className="w-3 h-3 text-[#ff4f36]" />
                    Verified
                  </span>

                  {cert.credentialUrl ? (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#3687ff] hover:text-[#7bb0ff] transition-colors group-hover:translate-x-0.5"
                    >
                      <span>Show Credential</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="text-[11px] font-mono text-slate-500">Verified Issuer</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredCerts.length === 0 && (
        <div className="py-12 text-center text-slate-400 text-xs font-mono bg-slate-900/30 rounded-2xl border border-slate-800">
          No credentials found matching your search.
        </div>
      )}
    </section>
  );
};
