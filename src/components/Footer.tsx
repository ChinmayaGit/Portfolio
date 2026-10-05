import React from 'react';
import { ArrowUp, Github, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#101214] py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative StringTune kinetic gradient beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 sm:w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#ff4f36] to-transparent shadow-[0_0_15px_#ff4f36]" />

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand & Tagline */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-telma font-bold text-lg text-white tracking-normal">
              Chinmaya Garnaik
            </span>
            <span className="text-[#ff4f36] font-mono text-xs">/ dev matrix</span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Analyst @ Deloitte • Cloud & AI Certified • Flutter Engineer
          </p>
        </div>

        {/* Social Links & Back to Top */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/ChinmayaGit"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-[#16191d] hover:bg-[#1e2229] border border-white/[0.1] text-slate-300 hover:text-[#ff4f36] hover:border-[#ff4f36]/60 transition-all hover:shadow-[0_0_15px_rgba(255,79,54,0.3)]"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href="https://linkedin.com/in/chinmaya-garnaik-a093a21b5"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-[#16191d] hover:bg-[#1e2229] border border-white/[0.1] text-slate-300 hover:text-[#3687ff] hover:border-[#3687ff]/60 transition-all hover:shadow-[0_0_15px_rgba(54,135,255,0.3)]"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-[#ff4f36] hover:bg-[#ff6852] text-[#101214] font-bold shadow-[0_0_20px_rgba(255,79,54,0.4)] transition-all hover:scale-105 active:scale-95"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tech Stack Attribution */}
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-mono gap-2 text-center sm:text-left">
        <div>
          © {new Date().getFullYear()} Chinmaya Garnaik. All rights reserved.
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
          <span>Engineered with</span>
          <span className="text-[#ff4f36] font-semibold">React</span>
          <span>•</span>
          <span className="text-white font-semibold">TypeScript</span>
          <span>•</span>
          <span className="text-[#3687ff] font-semibold">Tailwind CSS</span>
          <span>•</span>
          <span className="text-white font-semibold">Three.js</span>
        </div>
      </div>
    </footer>
  );
};
