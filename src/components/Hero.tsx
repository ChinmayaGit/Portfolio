import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Shield,
  Cloud,
  Terminal,
  Linkedin,
  Award,
  ChevronDown
} from 'lucide-react';

interface HeroProps {
  onOpenCommandPalette: () => void;
}

const ROLES = [
  { title: 'AI Agent & LLM Developer', tag: 'Oracle & Claude Certified', color: 'from-purple-400 to-pink-500' },
  { title: 'Analyst – Cyber Risk & IAM', tag: 'Deloitte • AWS Architect', color: 'from-rose-400 to-red-500' },
  { title: 'Full-Stack Web Architect', tag: 'React, TypeScript & Spring', color: 'from-sky-400 to-blue-500' },
  { title: 'Flutter & Mobile Specialist', tag: 'Published Play Store Apps', color: 'from-emerald-400 to-teal-500' },
  { title: '3D & Spatial Game Developer', tag: '60 FPS Canvas & C++ AR', color: 'from-amber-400 to-orange-500' },
  { title: 'Systems & IoT Firmware Engineer', tag: 'Embedded C++ & ESP32', color: 'from-teal-400 to-cyan-500' },
];

export const Hero: React.FC<HeroProps> = ({ onOpenCommandPalette }) => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const currentRole = ROLES[roleIndex];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Decorative Ambient Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[380px] h-[380px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[420px] h-[420px] bg-blue-600/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Top Badges / HUD Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 px-3 rounded-full bg-slate-900/80 border border-slate-700/70 backdrop-blur-xl shadow-lg mb-8"
        >
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Analyst @ Deloitte</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
            <Cloud className="w-3.5 h-3.5 text-cyan-400" />
            <span>AWS, Oracle & Claude Certified</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono">
            <Shield className="w-3.5 h-3.5 text-purple-400" />
            <span>Cyber & IAM Specialist</span>
          </div>
        </motion.div>

        {/* Hero Main Name Headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="space-y-3"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white">
            CHINMAYA{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(56,189,248,0.35)]">
              GARNAIK
            </span>
          </h1>

          {/* Animated Role Ticker */}
          <div className="h-16 sm:h-20 flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentRole.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3"
              >
                <span
                  className={`text-xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r ${currentRole.color} bg-clip-text text-transparent`}
                >
                  {currentRole.title}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700">
                  {currentRole.tag}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Impact Bio Summary */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-4 max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-normal"
        >
          Bridging enterprise identity security at <span className="text-white font-medium">Deloitte</span> with cloud
          architectures and cross-platform mobile engineering. Creator of{' '}
          <span className="text-cyan-300 font-semibold font-mono">70+ open-source repositories</span>, Google Play
          Store applications with thousands of downloads, and interactive real-time systems.
        </motion.p>

        {/* Interactive CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Explore Project Matrix</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#certifications"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 hover:border-cyan-500/50 text-white font-semibold text-sm transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>AWS & Deloitte Certifications</span>
          </a>

          <a
            href="https://www.linkedin.com/in/chinmaya-garnaik-a093a21b5/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-slate-900/70 hover:bg-[#0077B5]/20 border border-slate-800 hover:border-[#0077B5]/50 text-slate-300 hover:text-white font-medium text-sm transition-all"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4 text-[#0077B5]" />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>

          <button
            onClick={onOpenCommandPalette}
            className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-slate-900/70 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-300 font-mono text-xs transition-all"
            title="Press Cmd+K to search anything"
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>⌘K</span>
          </button>
        </motion.div>

        {/* Live Metrics HUD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm text-center group hover:border-cyan-500/30 transition-colors">
            <div className="font-mono text-3xl sm:text-4xl font-black text-cyan-400 group-hover:scale-105 transition-transform">
              71+
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-mono mt-1">
              GitHub Repositories
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm text-center group hover:border-amber-500/30 transition-colors">
            <div className="font-mono text-3xl sm:text-4xl font-black text-amber-400 group-hover:scale-105 transition-transform">
              30+
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-mono mt-1">
              Certifications & Badges
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm text-center group hover:border-emerald-500/30 transition-colors">
            <div className="font-mono text-3xl sm:text-4xl font-black text-emerald-400 group-hover:scale-105 transition-transform">
              1,000+
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-mono mt-1">
              Play Store Downloads
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm text-center group hover:border-purple-500/30 transition-colors">
            <div className="font-mono text-3xl sm:text-4xl font-black text-purple-400 group-hover:scale-105 transition-transform">
              6
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-mono mt-1">
              Tech Domains
            </div>
          </div>
        </motion.div>

        {/* Scroll down indicator */}
        <div className="mt-12 flex justify-center">
          <a
            href="#projects"
            aria-label="Scroll down to projects"
            className="flex flex-col items-center text-xs text-slate-500 hover:text-cyan-400 transition-colors"
          >
            <span className="font-mono text-[11px] mb-1">DISCOVER TECH CATEGORIES</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};
