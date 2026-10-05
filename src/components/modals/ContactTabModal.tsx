import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Mail,
  Linkedin,
  Github,
  Copy,
  Check,
  Radio,
  MapPin,
  Clock,
  ArrowUpRight,
  Briefcase,
  Sparkles,
} from "lucide-react";

interface ContactTabModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactTabModal: React.FC<ContactTabModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const emailAddress = "cgarnaik09@gmail.com";
  const linkedinUrl = "https://linkedin.com/in/chinmaya-garnaik-a093a21b5";
  const githubUrl = "https://github.com/ChinmayaGit";

  const handleCopy = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const recruiterTemplates = [
    {
      title: "Schedule Technical Interview",
      subject: "Interview Invitation: Full-Stack / Cloud AI Engineer - Chinmaya Garnaik",
      body: "Hi Chinmaya,\n\nWe came across your portfolio and background in Cloud Architecture, AI Agents, and Full-Stack Engineering. We'd love to schedule a technical discussion regarding an opportunity at our organization.\n\nBest regards,\n[Your Name / Company]",
    },
    {
      title: "Discuss Full-Time Role",
      subject: "Full-Time Opportunity Discussion - Chinmaya Garnaik",
      body: "Hi Chinmaya,\n\nI am reaching out regarding a Full-Stack AI Engineer / Cloud Architect position that matches your technical profile and credentials.\n\nBest regards,\n[Your Name / Company]",
    },
    {
      title: "Architecture Advisory / Contract",
      subject: "Architecture Advisory / Consulting Inquiry - Chinmaya Garnaik",
      body: "Hi Chinmaya,\n\nWe have an upcoming project requiring expertise in scalable systems, AI workflow integration, and cloud infrastructure. We'd like to discuss an engagement.\n\nBest regards,\n[Your Name / Company]",
    },
  ];

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
          className="relative w-full max-w-2xl bg-[#101013] border border-white/10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] p-6 sm:p-8 z-10 max-h-[90vh] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#d4a22f]/10 border border-[#d4a22f]/20 text-[#d4a22f]">
                <Radio size={20} className="animate-pulse" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  Direct Recruiter Frequency
                </h3>
                <p className="text-xs font-mono text-zinc-400">
                  Direct channels to connect with Chinmaya Garnaik &mdash; No forms required
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

          <div className="flex-1 overflow-y-auto pr-1 py-5 space-y-6 custom-scrollbar">
            {/* Primary Action: Direct Email Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-[#d4a22f]/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4a22f]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#d4a22f] flex items-center gap-1.5 font-bold">
                  <Mail size={12} />
                  Primary Email Channel
                </span>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  ONLINE &amp; RESPONSIVE
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 pb-3">
                <div>
                  <a
                    href={`mailto:${emailAddress}`}
                    className="text-lg sm:text-xl font-mono font-bold text-white hover:text-[#d4a22f] transition-colors break-all"
                  >
                    {emailAddress}
                  </a>
                  <p className="text-xs text-zinc-400 mt-1">
                    Direct inbox for recruiters, hiring managers, and technical leads
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white text-xs font-mono transition-all"
                    title="Copy Email to Clipboard"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${emailAddress}?subject=Opportunity%20Discussion%20-%20Chinmaya%20Garnaik`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#d4a22f] hover:bg-[#e5b33d] text-black text-xs font-mono font-bold transition-all shadow-[0_0_20px_rgba(212,162,47,0.3)]"
                  >
                    <Mail size={14} />
                    <span>Send Email</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Professional & Code Profiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* LinkedIn */}
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-[#3687ff]/60 flex items-center justify-between transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#3687ff]/15 border border-[#3687ff]/30 text-[#3687ff]">
                    <Linkedin size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white group-hover:text-[#3687ff] transition-colors flex items-center gap-1">
                      <span>LinkedIn Profile</span>
                      <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-[11px] font-mono text-zinc-400">
                      InMail &amp; Connection
                    </div>
                  </div>
                </div>
                <span className="text-xs font-mono text-zinc-500 group-hover:text-zinc-300">
                  Open &rarr;
                </span>
              </a>

              {/* GitHub */}
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-[#d4a22f]/60 flex items-center justify-between transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/[0.08] border border-white/15 text-white">
                    <Github size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white group-hover:text-[#d4a22f] transition-colors flex items-center gap-1">
                      <span>GitHub Archive</span>
                      <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-[11px] font-mono text-zinc-400">
                      71+ Repositories &amp; Code
                    </div>
                  </div>
                </div>
                <span className="text-xs font-mono text-zinc-500 group-hover:text-zinc-300">
                  Open &rarr;
                </span>
              </a>
            </div>

            {/* Recruiter Quick Fast-Facts / Telemetry */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 font-mono text-xs">
              <div className="flex items-center gap-2 text-zinc-400 pb-1 border-b border-white/5">
                <Briefcase size={14} className="text-[#d4a22f]" />
                <span className="font-semibold uppercase tracking-wider text-[11px] text-white">
                  Recruiter Fast Facts
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-zinc-400">
                <div className="flex items-start justify-between border-b border-white/5 pb-2">
                  <span>Current Background:</span>
                  <span className="text-white text-right font-sans text-[12px] font-medium">Analyst @ Deloitte</span>
                </div>
                <div className="flex items-start justify-between border-b border-white/5 pb-2">
                  <span>Target Roles:</span>
                  <span className="text-white text-right font-sans text-[12px] font-medium">AI / Cloud / Full Stack</span>
                </div>
                <div className="flex items-start justify-between border-b border-white/5 pb-2 sm:border-b-0 sm:pb-0">
                  <span>Base Location:</span>
                  <span className="text-white flex items-center gap-1">
                    <MapPin size={11} className="text-[#d4a22f]" /> Bengaluru, IN / Remote
                  </span>
                </div>
                <div className="flex items-start justify-between">
                  <span>Guaranteed SLA:</span>
                  <span className="text-white flex items-center gap-1">
                    <Clock size={11} className="text-[#d4a22f]" /> &lt; 24h Response
                  </span>
                </div>
              </div>
            </div>

            {/* 1-Click Pre-filled Email Templates for Recruiters */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                <Sparkles size={12} className="text-[#d4a22f]" />
                <span>1-Click Email Starter for Recruiters</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {recruiterTemplates.map((template) => (
                  <a
                    key={template.title}
                    href={`mailto:${emailAddress}?subject=${encodeURIComponent(
                      template.subject
                    )}&body=${encodeURIComponent(template.body)}`}
                    className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[#d4a22f]/50 text-left transition-all duration-200 group flex flex-col justify-between"
                  >
                    <span className="font-sans text-xs font-semibold text-white group-hover:text-[#d4a22f] transition-colors">
                      {template.title}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-500 mt-2 flex items-center gap-1">
                      Compose <ArrowUpRight size={10} />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-zinc-500">
            <span>DIRECT CANDIDATE CONTACT</span>
            <span className="text-[#d4a22f]">ZERO FRICTION &middot; IMMEDIATE DISPATCH</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
