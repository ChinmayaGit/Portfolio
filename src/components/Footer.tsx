import React from 'react';
import { ArrowUp, Github, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-slate-800/80 bg-[#07090e] py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative gradient beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand & Tagline */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-base text-white tracking-wider">
              CHINMAYA GARNAIK
            </span>
            <span className="text-cyan-400 font-mono text-xs">/ dev matrix</span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Analyst @ Deloitte • Cloud & AI Certified • Flutter Engineer
          </p>
        </div>

        {/* Social Links & Back to Top */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/ChinmayaGit"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href="https://www.linkedin.com/in/chinmaya-garnaik-a093a21b5/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-blue-500/10 border border-slate-800 text-slate-400 hover:text-blue-400 transition-colors"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 hover:text-cyan-300 transition-all hover:scale-105 active:scale-95"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tech Stack Attribution */}
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-mono gap-2 text-center sm:text-left">
        <div>
          © {new Date().getFullYear()} Chinmaya Garnaik. All rights reserved.
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
          <span>Engineered with</span>
          <span className="text-cyan-400 font-semibold">React</span>
          <span>•</span>
          <span className="text-cyan-400 font-semibold">TypeScript</span>
          <span>•</span>
          <span className="text-cyan-400 font-semibold">Tailwind CSS</span>
          <span>•</span>
          <span className="text-cyan-400 font-semibold">Framer Motion</span>
        </div>
      </div>
    </footer>
  );
};
