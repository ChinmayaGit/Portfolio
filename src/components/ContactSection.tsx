import React, { useState } from 'react';
import {
  Mail,
  Linkedin,
  Github,
  MapPin,
  Send,
  Copy,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('cgarnaik09@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ff4f36]/15 border border-[#ff4f36]/30 text-[#ff4f36] text-xs font-mono mb-3 shadow-[0_0_12px_rgba(255,79,54,0.2)]">
          <Mail className="w-3.5 h-3.5" />
          <span className="font-bold">TRANSMISSION CHANNEL</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Let's Build <span className="bg-gradient-to-r from-[#ff4f36] via-[#ffffff] to-[#3687ff] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(255,79,54,0.4)]">Something Exceptional</span>
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base">
          Whether you're interested in cloud architecture advisory, enterprise identity security, mobile development, or open-source collaborations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
        {/* Left Column: Direct Links & Info */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            {/* LinkedIn Card */}
            <a
              href="https://linkedin.com/in/chinmaya-garnaik-a093a21b5"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-2xl bg-[#14171c] border border-white/[0.08] hover:border-[#3687ff] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(54,135,255,0.25)] hover:-translate-y-1 flex items-center justify-between"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-[#3687ff]/15 border border-[#3687ff]/30 text-[#3687ff]">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">Professional Network</div>
                  <div className="text-sm font-bold text-white group-hover:text-[#3687ff] transition-colors">
                    LinkedIn / chinmaya-garnaik
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-[#3687ff] transition-colors" />
            </a>

            {/* GitHub Card */}
            <a
              href="https://github.com/ChinmayaGit"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-2xl bg-[#14171c] border border-white/[0.08] hover:border-[#ff4f36] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,79,54,0.25)] hover:-translate-y-1 flex items-center justify-between"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-[#ff4f36]/15 border border-[#ff4f36]/30 text-[#ff4f36]">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">Open Source Ecosystem</div>
                  <div className="text-sm font-bold text-white group-hover:text-[#ff4f36] transition-colors">
                    GitHub / @ChinmayaGit
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-[#ff4f36] transition-colors" />
            </a>

            {/* Email Copy Card */}
            <div className="p-5 rounded-2xl bg-[#14171c] border border-white/[0.08] backdrop-blur-xl flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-[#ff4f36]/15 border border-[#ff4f36]/30 text-[#ff4f36]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">Direct Email</div>
                  <div className="text-sm font-bold text-white font-mono">
                    cgarnaik09@gmail.com
                  </div>
                </div>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-2.5 rounded-xl bg-[#101214] hover:bg-[#1c2027] border border-white/[0.1] text-slate-300 hover:text-white transition-colors"
                title="Copy Email"
              >
                {copiedEmail ? <CheckCircle2 className="w-4 h-4 text-[#ff4f36]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Location / Status Badge */}
          <div className="p-5 rounded-2xl bg-[#14171c] border border-white/[0.08] backdrop-blur-sm">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
              <MapPin className="w-4 h-4 text-[#3687ff]" />
              <span>Base of Operations</span>
            </div>
            <div className="text-sm font-semibold text-white">
              Bhubaneswar, Odisha, India
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#ff4f36] mt-2">
              <span className="w-2 h-2 rounded-full bg-[#ff4f36] animate-pulse" />
              <span>Available for Technical Advisory & Collaboration</span>
            </div>
          </div>
        </div>

        {/* Right Column: Direct Recruiter Dispatch */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#14171c] border border-white/[0.08] backdrop-blur-xl shadow-2xl space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3687ff]/15 border border-[#3687ff]/30 text-[#3687ff] text-xs font-mono mb-2">
                <Send className="w-3.5 h-3.5" />
                <span>DIRECT RECRUITER CHANNEL</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Connect Directly &mdash; No Forms Needed
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Click any direct channel below to immediately reach my personal inbox or network.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="mailto:cgarnaik09@gmail.com?subject=Interview%20Invitation%20-%20Chinmaya%20Garnaik"
                className="p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[#3687ff] transition-all group"
              >
                <div className="text-xs font-mono text-[#3687ff] mb-1">Interviews &amp; Hiring</div>
                <div className="text-sm font-bold text-white group-hover:text-[#3687ff] transition-colors flex items-center justify-between">
                  <span>Schedule Interview</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                </div>
              </a>

              <a
                href="mailto:cgarnaik09@gmail.com?subject=Opportunity%20Inquiry%20-%20Chinmaya%20Garnaik"
                className="p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[#ff4f36] transition-all group"
              >
                <div className="text-xs font-mono text-[#ff4f36] mb-1">Full-Time / Hybrid</div>
                <div className="text-sm font-bold text-white group-hover:text-[#ff4f36] transition-colors flex items-center justify-between">
                  <span>Discuss Roles</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                </div>
              </a>
            </div>

            <div className="p-4 rounded-xl bg-[#101214] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Currently Active &amp; Responding within 24 Hours</span>
              </div>
              <a
                href="mailto:cgarnaik09@gmail.com"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#3687ff] hover:bg-[#2f75dd] text-white font-bold text-xs transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Open Mailbox</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
