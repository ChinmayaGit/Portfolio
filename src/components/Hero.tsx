import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Shield,
  Cloud,
  Terminal,
  Linkedin,
  Award,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { KineticPolyhedron } from './3d/KineticPolyhedron';

interface HeroProps {
  onOpenCommandPalette: () => void;
}

const ROLES = [
  { title: 'AI Agent & LLM Developer', tag: 'Oracle & Claude Certified', color: 'from-[#ff4f36] to-[#ff9180]' },
  { title: 'Analyst – Cyber Risk & IAM', tag: 'Deloitte • AWS Architect', color: 'from-[#3687ff] to-[#82b5ff]' },
  { title: 'Full-Stack Web Architect', tag: 'React, TypeScript & Spring', color: 'from-[#ff4f36] to-[#ffb3a6]' },
  { title: 'Flutter & Mobile Specialist', tag: 'Published Play Store Apps', color: 'from-[#3687ff] to-[#a3c9ff]' },
  { title: '3D & Spatial Game Developer', tag: '60 FPS Canvas & C++ AR', color: 'from-[#ff4f36] to-[#ff806c]' },
  { title: 'Systems & IoT Firmware Engineer', tag: 'Embedded C++ & ESP32', color: 'from-[#3687ff] to-[#78afff]' },
];

type NameFont = 'telma' | 'syne' | 'unbounded' | 'space' | 'outfit';

const FONT_MAP: Record<NameFont, { name: string; class: string; letterSpacing: string }> = {
  telma: { name: 'Telma (Expressive Script)', class: 'font-telma', letterSpacing: 'tracking-normal' },
  syne: { name: 'Syne (Awwwards Avant-Garde)', class: 'font-display', letterSpacing: 'tracking-tight' },
  unbounded: { name: 'Unbounded (Futuristic Wide)', class: 'font-future', letterSpacing: 'tracking-tight' },
  space: { name: 'Space Grotesk (Cyber Tech)', class: 'font-cyber', letterSpacing: 'tracking-tight' },
  outfit: { name: 'Outfit (Modern Bold)', class: 'font-outfit', letterSpacing: 'tracking-tight' },
};

export const Hero: React.FC<HeroProps> = ({ onOpenCommandPalette }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [nameFont, setNameFont] = useState<NameFont>(() => {
    try {
      const saved = localStorage.getItem('portfolio_name_font') as NameFont;
      if (saved && FONT_MAP[saved]) return saved;
    } catch {
      // fallback
    }
    return 'telma';
  });

  const handleFontChange = (newFont: NameFont) => {
    setNameFont(newFont);
    try {
      localStorage.setItem('portfolio_name_font', newFont);
    } catch {
      // fallback
    }
  };

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
      className="relative min-h-screen flex flex-col justify-center items-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#101214]"
    >
      {/* Background Decorative Ambient Radial Glows (StringTune Red & Blue) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#ff4f36]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[420px] h-[420px] bg-[#3687ff]/12 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[380px] h-[380px] bg-[#ff4f36]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Main Hero Content: Typography (Left) + Interactive 3D Kinetic Polyhedron (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline, Role Ticker, Bio, CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Top Badges / HUD Bar */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 p-1.5 px-3 rounded-full bg-[#16191d]/90 border border-white/[0.08] backdrop-blur-xl shadow-xl"
            >
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff4f36]/15 border border-[#ff4f36]/40 text-[#ff4f36] text-xs font-mono shadow-[0_0_12px_rgba(255,79,54,0.25)]">
                <span className="w-2 h-2 rounded-full bg-[#ff4f36] animate-ping" />
                <span className="font-bold">Analyst @ Deloitte</span>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3687ff]/15 border border-[#3687ff]/40 text-[#3687ff] text-xs font-mono shadow-[0_0_12px_rgba(54,135,255,0.25)]">
                <Cloud className="w-3.5 h-3.5 text-[#3687ff]" />
                <span className="font-medium">AWS, Oracle & Claude Certified</span>
              </div>

              <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-mono">
                <Shield className="w-3.5 h-3.5 text-[#ff4f36]" />
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
              {/* Interactive Font Style Switcher Pill */}
              <div className="flex items-center justify-center lg:justify-start gap-1.5 mb-1 text-[11px] font-mono">
                <span className="text-slate-500 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-[#ff4f36]" />
                  <span>FONT:</span>
                </span>
                {(['telma', 'syne', 'unbounded', 'space', 'outfit'] as NameFont[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => handleFontChange(f)}
                    className={`px-2.5 py-0.5 rounded-full transition-all text-[10px] ${
                      nameFont === f
                        ? 'bg-[#ff4f36] text-[#101214] border border-[#ff4f36] font-black shadow-[0_0_15px_rgba(255,79,54,0.4)]'
                        : 'text-slate-400 hover:text-white bg-[#181b20] border border-white/[0.08]'
                    }`}
                  >
                    {f === 'telma' ? 'Telma' : f === 'syne' ? 'Syne' : f === 'unbounded' ? 'Unbounded' : f === 'space' ? 'Space' : 'Outfit'}
                  </button>
                ))}
              </div>

              <h1 className={`${FONT_MAP[nameFont].class} ${FONT_MAP[nameFont].letterSpacing} text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-tight tracking-normal transition-all duration-300 py-1`}>
                Chinmaya{' '}
                <span className="bg-gradient-to-r from-[#ff4f36] via-[#ffffff] to-[#3687ff] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(255,79,54,0.45)]">
                  Garnaik
                </span>
              </h1>

              {/* Animated Role Ticker */}
              <div className="h-14 sm:h-16 flex flex-col items-center lg:items-start justify-center">
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
                      className={`text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r ${currentRole.color} bg-clip-text text-transparent`}
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
              className="max-w-2xl mx-auto lg:mx-0 text-base sm:text-lg text-slate-300 leading-relaxed font-normal"
            >
              Bridging enterprise identity security at <span className="text-white font-bold">Deloitte</span> with cloud
              architectures and cross-platform mobile engineering. Creator of{' '}
              <span className="text-[#ff4f36] font-bold font-mono">70+ open-source repositories</span>, Google Play
              Store applications with thousands of downloads, and interactive real-time systems.
            </motion.p>

            {/* Interactive CTA Buttons (StringTune Tactile Style) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2"
            >
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#ff4f36] hover:bg-[#ff6854] text-[#101214] font-black text-sm tracking-wide shadow-[0_0_30px_rgba(255,79,54,0.4)] hover:shadow-[0_0_40px_rgba(255,79,54,0.6)] hover:scale-105 active:scale-95 transition-all"
              >
                <span>EXPLORE PROJECT MATRIX</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#certifications"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#14171c]/90 hover:bg-[#3687ff] border-2 border-[#3687ff] text-[#3687ff] hover:text-white font-bold text-sm transition-all shadow-[0_0_20px_rgba(54,135,255,0.25)] hover:shadow-[0_0_30px_rgba(54,135,255,0.5)] hover:scale-105 active:scale-95"
              >
                <Award className="w-4 h-4" />
                <span>AWS & CERTIFICATIONS</span>
              </a>

              <a
                href="https://www.linkedin.com/in/chinmaya-garnaik-a093a21b5/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-full bg-[#181b20] hover:bg-[#0077B5]/20 border border-white/10 hover:border-[#0077B5]/50 text-slate-300 hover:text-white font-medium text-sm transition-all"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4 text-[#0077B5]" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>

              <button
                onClick={onOpenCommandPalette}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-full bg-[#181b20] hover:bg-[#ff4f36]/15 border border-white/10 hover:border-[#ff4f36]/40 text-slate-400 hover:text-[#ff4f36] font-mono text-xs transition-all"
                title="Press Cmd+K to search anything"
              >
                <Terminal className="w-4 h-4 text-[#ff4f36]" />
                <span>⌘K</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: 3D Kinetic Polyhedron Stage (StringTune Style) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative py-4"
          >
            {/* Ambient Holographic Radial Glow (Red & Blue Pop) */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ff4f36]/15 via-[#3687ff]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

            {/* Interactive 3D Mathematical Polyhedron */}
            <KineticPolyhedron
              size={360}
              glowColor="#ff4f36"
              showControls={true}
              className="z-10"
            />

            {/* Micro Interaction Cue */}
            <div className="mt-12 text-center flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
              <Sparkles className="w-3 h-3 text-[#ff4f36]" />
              <span>Interactive 3D Geometry • Drag to tilt • Scroll to spin</span>
            </div>
          </motion.div>
        </div>

        {/* Live Metrics HUD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-14 pt-8 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          <div className="p-4 rounded-2xl bg-[#14171c]/90 border border-white/[0.08] backdrop-blur-sm text-center group hover:border-[#ff4f36] hover:shadow-[0_0_20px_rgba(255,79,54,0.25)] transition-all">
            <div className="font-mono text-3xl sm:text-4xl font-black text-[#ff4f36] group-hover:scale-105 transition-transform">
              71+
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-mono mt-1">
              GitHub Repositories
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#14171c]/90 border border-white/[0.08] backdrop-blur-sm text-center group hover:border-[#3687ff] hover:shadow-[0_0_20px_rgba(54,135,255,0.25)] transition-all">
            <div className="font-mono text-3xl sm:text-4xl font-black text-[#3687ff] group-hover:scale-105 transition-transform">
              30+
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-mono mt-1">
              Certifications & Badges
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#14171c]/90 border border-white/[0.08] backdrop-blur-sm text-center group hover:border-[#ff4f36] hover:shadow-[0_0_20px_rgba(255,79,54,0.25)] transition-all">
            <div className="font-mono text-3xl sm:text-4xl font-black text-[#ff4f36] group-hover:scale-105 transition-transform">
              1,000+
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-mono mt-1">
              Play Store Downloads
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#14171c]/90 border border-white/[0.08] backdrop-blur-sm text-center group hover:border-[#3687ff] hover:shadow-[0_0_20px_rgba(54,135,255,0.25)] transition-all">
            <div className="font-mono text-3xl sm:text-4xl font-black text-[#3687ff] group-hover:scale-105 transition-transform">
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
            className="flex flex-col items-center text-xs text-slate-500 hover:text-[#ff4f36] transition-colors"
          >
            <span className="font-mono text-[11px] mb-1">DISCOVER TECH CATEGORIES</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[#ff4f36]" />
          </a>
        </div>
      </div>
    </section>
  );
};
