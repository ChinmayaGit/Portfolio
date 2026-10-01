import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Smartphone,
  Bot,
  Gamepad2,
  Globe,
  ShieldCheck,
  Cpu,
  ArrowRight,
  ChevronDown,
  Activity
} from 'lucide-react';
import { AIBotDisassembly } from './disassembly/AIBotDisassembly';
import { CloudCyberDisassembly } from './disassembly/CloudCyberDisassembly';
import { FullStackDisassembly } from './disassembly/FullStackDisassembly';
import { MobileDisassembly } from './disassembly/MobileDisassembly';
import { Games3DDisassembly } from './disassembly/Games3DDisassembly';
import { SystemsIoTDisassembly } from './disassembly/SystemsIoTDisassembly';
import { Project, PROJECTS } from '../data/projectsData';

interface ScrollDomainShowcaseProps {
  onSelectCategory: (categoryId: 'all' | 'mobile' | 'ai' | 'games3d' | 'fullstack' | 'cloud' | 'systems') => void;
  onSelectProject?: (project: Project) => void;
}

interface DomainStory {
  id: 'mobile' | 'ai' | 'games3d' | 'fullstack' | 'cloud' | 'systems';
  indexString: string;
  name: string;
  subtitle: string;
  accentColor: string;
  glowColor: string;
  glowHex: string;
  borderAccent: string;
  bgGradient: string;
  icon: React.ReactNode;
  tagline: string;
  description: string;
  keyHighlights: string[];
  metrics: string;
  coreTech: string[];
  topProjects: string[];
}

const DOMAINS: DomainStory[] = [
  {
    id: 'ai',
    indexString: '01',
    name: 'AI & Agents',
    subtitle: 'Agentic DAGs, LLM Tooling & Autonomous Workflows',
    accentColor: 'text-[#ff4f36]',
    glowColor: 'shadow-[#ff4f36]/30',
    glowHex: '#ff4f36',
    borderAccent: 'border-[#ff4f36]/40',
    bgGradient: 'from-[#ff4f36]/15 via-red-500/5 to-transparent',
    icon: <Bot className="w-8 h-8 text-[#ff4f36]" />,
    tagline: 'Oracle & Claude Certified AI Developer',
    description: 'Architecting intelligent autonomous agent builders, cross-platform personal AI daemons, and automated generative workflows. Certified in Oracle Fusion AI Agent Studio Rel 26-2 and Claude Certified Developer.',
    keyHighlights: [
      'Visual DAG workflow builder for autonomous multi-step reasoning (AI Mini Agent Builder)',
      'Cross-platform desktop personal assistant daemon (Project MELLO)',
      'Cloud-automated generative media production pipelines with n8n',
      'Certified in Claude Code in Action, AI Fluency, and Oracle AI Foundations'
    ],
    metrics: 'Oracle AI Certified Developer • Claude Certified Foundations',
    coreTech: ['Agent Studio', 'Claude API', 'LLM Tool Calling', 'Node.js', 'n8n', 'Python'],
    topProjects: ['AI_Mini_Agent_Builder', 'Project_MELLO', 'openclaw_skills', 'n8n-render-gen-clip']
  },
  {
    id: 'cloud',
    indexString: '02',
    name: 'Cloud & Cyber',
    subtitle: 'Enterprise IAM Governance, Zero Trust & AWS Architecture',
    accentColor: 'text-[#3687ff]',
    glowColor: 'shadow-[#3687ff]/30',
    glowHex: '#3687ff',
    borderAccent: 'border-[#3687ff]/40',
    bgGradient: 'from-[#3687ff]/15 via-blue-500/5 to-transparent',
    icon: <ShieldCheck className="w-8 h-8 text-[#3687ff]" />,
    tagline: 'Deloitte Analyst • AWS Solutions Architect & Data Engineer',
    description: 'Deloitte Analyst in Cyber Risk & IAM specializing in SailPoint Identity Security Cloud (ISC), Active Directory federation, Zero Trust security models, and AWS enterprise architectures.',
    keyHighlights: [
      'SailPoint Identity Security Professional & Leader certified practitioner',
      'AWS Certified Solutions Architect (SAA-C03) & AWS Certified Data Engineer (DEA-C01)',
      'Enterprise database persistence & Spring Boot microservices (Deloitte JPA)',
      'Rootless container virtualization running Alpine Linux on Android (Podroid)'
    ],
    metrics: 'Deloitte Analyst • Dual AWS Certified • SailPoint ISC',
    coreTech: ['SailPoint ISC', 'AWS Cloud', 'Active Directory', 'Zero Trust', 'Spring Boot', 'Linux'],
    topProjects: ['deloitte-jpa-demo', 'Employee-Management-System', 'Podroid', 'deloitte_labs']
  },
  {
    id: 'fullstack',
    indexString: '03',
    name: 'Full-Stack Web',
    subtitle: 'Modern Reactive Web Platforms & Fintech Dashboards',
    accentColor: 'text-[#ff4f36]',
    glowColor: 'shadow-[#ff4f36]/30',
    glowHex: '#ff4f36',
    borderAccent: 'border-[#ff4f36]/40',
    bgGradient: 'from-[#ff4f36]/15 via-red-500/5 to-transparent',
    icon: <Globe className="w-8 h-8 text-[#ff4f36]" />,
    tagline: 'React, TypeScript & Enterprise Web Platforms',
    description: 'Developing high-performance responsive web applications, fintech reward trackers, examination platforms, and peer-to-peer streaming tools utilizing React, Next.js, TypeScript, and Tailwind CSS.',
    keyHighlights: [
      'Productivity and deep work analytics dashboard (Reclaim Web)',
      'Credit card deals, rewards & cashback intelligence portal (Cards-Apps OfferTracker)',
      'Peer-to-peer browser encrypted file transfer engine (simpleShare)',
      'Full-stack examination portal with randomized timers & grading (mcq_web)'
    ],
    metrics: 'Next.js & React • TypeScript • Reactive State',
    coreTech: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'RxJS', 'WebSockets'],
    topProjects: ['Reclaim_Web', 'Cards-Apps_OfferTracker', 'PlayStorePurchaseTracker', 'simpleShare']
  },
  {
    id: 'mobile',
    indexString: '04',
    name: 'Mobile & Flutter',
    subtitle: 'Cross-Platform & Native Mobile Architecture',
    accentColor: 'text-[#3687ff]',
    glowColor: 'shadow-[#3687ff]/30',
    glowHex: '#3687ff',
    borderAccent: 'border-[#3687ff]/40',
    bgGradient: 'from-[#3687ff]/15 via-blue-500/5 to-transparent',
    icon: <Smartphone className="w-8 h-8 text-[#3687ff]" />,
    tagline: '1,000+ Downloads on Google Play Store',
    description: 'Specializing in production Flutter (Dart) and native Android (Kotlin) / iOS (Swift) engineering. Architect of published devotional, productivity, and offline-first mobile applications with custom canvas rendering and background services.',
    keyHighlights: [
      'Published "Odia Bhagabata" with 1,000+ active users & offline SQLite caching',
      'Client-side AES-256 encrypted biometric vault (P_Manager)',
      'Custom hardware-accelerated video streaming pipelines (BetterPlayer)',
      'Digital wellbeing & productivity habits engine (Reclaim)'
    ],
    metrics: '1,000+ Play Store Downloads • 14+ Dart Repositories',
    coreTech: ['Flutter', 'Dart', 'Android Kotlin', 'Swift', 'SQLite', 'Riverpod'],
    topProjects: ['odia_bhagabata', 'findwho', 'P_Manager', 'reclaim']
  },
  {
    id: 'games3d',
    indexString: '05',
    name: '3D, Games & AR',
    subtitle: 'Real-Time Multiplayer Combat & Spatial AR Engines',
    accentColor: 'text-[#ff4f36]',
    glowColor: 'shadow-[#ff4f36]/30',
    glowHex: '#ff4f36',
    borderAccent: 'border-[#ff4f36]/40',
    bgGradient: 'from-[#ff4f36]/15 via-red-500/5 to-transparent',
    icon: <Gamepad2 className="w-8 h-8 text-[#ff4f36]" />,
    tagline: '60 FPS Canvas Loops & WebSocket Multiplayer',
    description: 'Engineering interactive graphics experiences from low-latency WebSocket multiplayer fighting arenas to 360-degree panoramic virtual tours and hardware-accelerated C++ augmented reality model inspectors.',
    keyHighlights: [
      'Real-time WebSocket fighting arena with client prediction & hitbox math (Bloodline)',
      'Equirectangular panoramic 3D spherical projection viewer (360_Tour)',
      'Hardware-accelerated C++ AR 3D model inspector & exhibition engine (AR_View)',
      'Particle explosion and physics game loops running at steady 60 FPS'
    ],
    metrics: '60 FPS Game Loops • WebSockets • C++ AR Engine',
    coreTech: ['Three.js', 'WebGL', 'HTML5 Canvas', 'C++', 'WebSockets', 'Augmented Reality'],
    topProjects: ['Bloodline', 'AR_View', '360_Tour', 'SlugBattle']
  },
  {
    id: 'systems',
    indexString: '06',
    name: 'Systems & IoT',
    subtitle: 'Bare-Metal Microcontrollers & Low-Level Tooling',
    accentColor: 'text-[#3687ff]',
    glowColor: 'shadow-[#3687ff]/30',
    glowHex: '#3687ff',
    borderAccent: 'border-[#3687ff]/40',
    bgGradient: 'from-[#3687ff]/15 via-blue-500/5 to-transparent',
    icon: <Cpu className="w-8 h-8 text-[#3687ff]" />,
    tagline: 'Embedded ESP32 Firmware & Terminal Productivity',
    description: 'Building low-overhead systems, bare-metal C++ firmware for ESP32 microcontrollers, hardware SPI communication drivers, and developer productivity CLI utilities.',
    keyHighlights: [
      'Bare-metal C++ SPI filesystem driver for ESP32 microcontroller (ESP32SDReader)',
      'Terminal clock & customizable Pomodoro stopwatch with ANSI rendering (CLI_Clock)',
      'Automated filesystem icon injection & desktop organizer (Custom-Icon-Folder)',
      'Google Photos batch EXIF synchronization helper in C++'
    ],
    metrics: 'Bare-Metal C++ • ESP32 • Low-Latency Drivers',
    coreTech: ['ESP32', 'Embedded C++', 'SPI Drivers', 'FreeRTOS', 'Linux', 'Bash'],
    topProjects: ['ESP32SDReader', 'CLI_Clock', 'Custom-Icon-Folder', 'GooglePhotosEXIFSync']
  }
];

export const ScrollDomainShowcase: React.FC<ScrollDomainShowcaseProps> = ({
  onSelectCategory,
  onSelectProject
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Intra-domain scroll explosion progress (0 = Assembled, 1 = Fully Exploded)
  const domainLocalProgress = useTransform(scrollYProgress, (v) => {
    const step = 1 / 6;
    const local = (v % step) / step;
    if (local < 0.2) return local / 0.2;
    if (local < 0.8) return 1.0;
    return 1.0 - (local - 0.8) / 0.2;
  });

  const [manualExplosion, setManualExplosion] = useState<number | null>(null);
  const [scrollExplosion, setScrollExplosion] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = domainLocalProgress.on('change', (val) => {
      setScrollExplosion(val);
    });
    return () => unsubscribe();
  }, [domainLocalProgress]);

  const currentExplosionProgress = manualExplosion !== null ? manualExplosion : scrollExplosion;

  // Update active domain index based on scroll position
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const idx = Math.min(5, Math.floor(v * 6));
      setActiveIndex(idx);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const currentDomain = DOMAINS[activeIndex];

  const handleJumpToProjects = (catId: DomainStory['id']) => {
    onSelectCategory(catId);
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDomainMilestone = (index: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const targetScroll = containerTop + (index / 5.8) * (containerHeight - window.innerHeight);
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  const handleProjectBadgeClick = (id: string) => {
    if (onSelectProject) {
      const proj = PROJECTS.find((p) => p.id === id);
      if (proj) {
        onSelectProject(proj);
      }
    }
  };

  const renderDisassemblyStage = () => {
    switch (currentDomain.id) {
      case 'ai':
        return (
          <AIBotDisassembly
            progress={currentExplosionProgress}
            glowHex={currentDomain.glowHex}
            onProjectClick={handleProjectBadgeClick}
          />
        );
      case 'cloud':
        return (
          <CloudCyberDisassembly
            progress={currentExplosionProgress}
            glowHex={currentDomain.glowHex}
            onProjectClick={handleProjectBadgeClick}
          />
        );
      case 'fullstack':
        return (
          <FullStackDisassembly
            progress={currentExplosionProgress}
            glowHex={currentDomain.glowHex}
            onProjectClick={handleProjectBadgeClick}
          />
        );
      case 'mobile':
        return (
          <MobileDisassembly
            progress={currentExplosionProgress}
            glowHex={currentDomain.glowHex}
            onProjectClick={handleProjectBadgeClick}
          />
        );
      case 'games3d':
        return (
          <Games3DDisassembly
            progress={currentExplosionProgress}
            glowHex={currentDomain.glowHex}
            onProjectClick={handleProjectBadgeClick}
          />
        );
      case 'systems':
        return (
          <SystemsIoTDisassembly
            progress={currentExplosionProgress}
            glowHex={currentDomain.glowHex}
            onProjectClick={handleProjectBadgeClick}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={containerRef}
      id="domain-showcase"
      className="relative h-[480vh] bg-[#101214] text-slate-100"
    >
      {/* Sticky Fullscreen 3D Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between p-4 sm:p-8 lg:p-12 overflow-hidden select-none">
        {/* Dynamic Ambient Background Glow that changes color with the active domain */}
        <div
          className="absolute inset-0 transition-all duration-700 pointer-events-none opacity-30"
          style={{
            background: `radial-gradient(circle 500px at 50% 50%, ${currentDomain.glowHex}30, transparent 70%)`,
          }}
        />

        {/* Top HUD Status Bar */}
        <div className="relative z-20 flex items-center justify-between border-b border-white/[0.08] pb-3 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#16191d] border border-white/10 text-xs font-mono shadow-md">
              <span
                className="w-2 h-2 rounded-full animate-ping"
                style={{ backgroundColor: currentDomain.glowHex }}
              />
              <span className="text-white font-bold">CORE_SYNC: ACTIVE</span>
            </div>
            <span className="hidden md:inline text-xs font-mono text-slate-400">
              STRING_TUNE 3D DISASSEMBLY // SCROLL TO TRANSFORM
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-xs font-mono">
              <span className="text-slate-500">DOMAIN: </span>
              <span className="font-bold text-white">
                {currentDomain.indexString} / 06
              </span>
            </div>

            {/* Quick Skip to Projects */}
            <button
              onClick={() => handleJumpToProjects(currentDomain.id)}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#ff4f36] hover:bg-[#ff6854] text-[#101214] font-bold text-xs font-mono transition-all shadow-[0_0_15px_rgba(255,79,54,0.35)] hover:scale-105 active:scale-95"
            >
              <span>Explore Matrix</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Central Stage: 3D Holographic Cyber Core + Dual HUD Wings */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-6 my-auto max-w-7xl mx-auto w-full">
          {/* Left Wing: Domain Information & Story */}
          <div className="lg:col-span-6 space-y-4 max-w-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDomain.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="space-y-3 sm:space-y-4"
              >
                {/* Domain Category Pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#16191d] border border-white/10 text-xs font-mono shadow-md">
                  <span className={currentDomain.accentColor}>{currentDomain.icon}</span>
                  <span className="text-white font-bold uppercase tracking-wider">
                    DOMAIN {currentDomain.indexString}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className={currentDomain.accentColor}>{currentDomain.subtitle}</span>
                </div>

                {/* Giant Glowing Title */}
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
                  {currentDomain.name}
                </h2>

                {/* Tagline Badge */}
                <div className="inline-block px-3.5 py-1.5 rounded-full bg-[#16191d] border border-white/10 text-xs sm:text-sm font-mono text-white">
                  ⚡ {currentDomain.tagline}
                </div>

                {/* Description */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {currentDomain.description}
                </p>

                {/* Key Technical Highlights */}
                <div className="space-y-1.5 pt-1">
                  {currentDomain.keyHighlights.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                        style={{ backgroundColor: currentDomain.glowHex }}
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Core Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {currentDomain.coreTech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-full bg-[#16191d] border border-white/[0.08] text-slate-300 text-[11px] font-mono hover:border-white/20 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action CTA Button */}
                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => handleJumpToProjects(currentDomain.id)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-black text-xs sm:text-sm text-[#101214] shadow-[0_0_25px_rgba(255,79,54,0.35)] transition-all hover:scale-105 active:scale-95"
                    style={{
                      background: `linear-gradient(to right, ${currentDomain.glowHex}, #ffffff)`,
                    }}
                  >
                    <span>View {currentDomain.name} Repositories</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Centerpiece: Interactive Anime.js-style 3D Disassembly Stage */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center py-2 relative">
            {/* Interactive HUD Control Deck */}
            <div className="w-full max-w-md mb-2 px-3.5 py-1.5 rounded-full bg-[#16191d]/90 border border-white/[0.08] backdrop-blur-md flex items-center justify-between gap-3 text-[11px] font-mono shadow-xl z-20">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full animate-ping"
                  style={{ backgroundColor: currentDomain.glowHex }}
                />
                <span className="text-white font-bold uppercase tracking-wider">
                  EXPLODED VIEW
                </span>
                <span
                  className="font-bold px-2 py-0.5 rounded-full bg-[#101214] border border-white/10"
                  style={{ color: currentDomain.glowHex }}
                >
                  {Math.round(currentExplosionProgress * 100)}%
                </span>
              </div>

              {/* Interactive Scrubber & Auto Sync Toggle */}
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.02"
                  value={currentExplosionProgress}
                  onChange={(e) => setManualExplosion(parseFloat(e.target.value))}
                  className="w-20 sm:w-28 h-1.5 bg-[#101214] rounded-full appearance-none cursor-pointer accent-[#ff4f36]"
                  title="Scrub Disassembly Degree"
                />
                {manualExplosion !== null ? (
                  <button
                    onClick={() => setManualExplosion(null)}
                    className="px-2.5 py-0.5 rounded-full bg-[#ff4f36]/20 text-[#ff4f36] border border-[#ff4f36]/40 hover:bg-[#ff4f36]/30 text-[10px] font-bold transition-colors"
                    title="Return to scroll-driven explosion"
                  >
                    SYNC
                  </button>
                ) : (
                  <button
                    onClick={() => setManualExplosion(currentExplosionProgress > 0.5 ? 0 : 1)}
                    className="px-2.5 py-0.5 rounded-full bg-[#101214] text-slate-300 hover:text-white border border-white/10 text-[10px] font-bold transition-colors"
                    title="Toggle explode / assemble"
                  >
                    {currentExplosionProgress > 0.5 ? 'FOLD' : 'EXPLODE'}
                  </button>
                )}
              </div>
            </div>

            {/* 3D Disassembly Viewport with AnimatePresence across domain transitions */}
            <div className="relative w-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentDomain.id}
                  initial={{ opacity: 0, scale: 0.88, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.88, y: -20 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="w-full flex items-center justify-center"
                >
                  {renderDisassemblyStage()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Interactive Project Callout Hint */}
            <div className="mt-1 text-center">
              <span className="text-[11px] font-mono text-slate-400">
                💡 Tip: Click highlighted schematic badges to inspect project architecture
              </span>
            </div>
          </div>
        </div>

        {/* Bottom HUD Bar & Vertical Domain Milestone Scrubber */}
        <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between pt-3 border-t border-white/[0.08] gap-3">
          {/* Scroll instruction cue */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Activity className="w-3.5 h-3.5 text-[#ff4f36] animate-pulse" />
            <span>SCROLL DOWN TO ADVANCE DOMAINS (01 - 06)</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#ff4f36] animate-bounce" />
          </div>

          {/* Interactive Milestone Indicator Dots */}
          <div className="flex items-center gap-2">
            {DOMAINS.map((d, i) => {
              const isSelected = i === activeIndex;
              return (
                <button
                  key={d.id}
                  onClick={() => scrollToDomainMilestone(i)}
                  className={`group flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all ${
                    isSelected
                      ? 'bg-[#181b20] border text-white font-bold shadow-lg'
                      : 'text-slate-400 hover:text-white bg-[#14161a] border border-white/[0.06]'
                  }`}
                  style={{
                    borderColor: isSelected ? d.glowHex : undefined,
                  }}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${isSelected ? 'animate-ping' : ''}`}
                    style={{ backgroundColor: isSelected ? d.glowHex : '#475569' }}
                  />
                  <span>{d.indexString}</span>
                  <span className="hidden md:inline">{d.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
