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

interface ScrollDomainShowcaseProps {
  onSelectCategory: (categoryId: 'all' | 'mobile' | 'ai' | 'games3d' | 'fullstack' | 'cloud' | 'systems') => void;
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
    accentColor: 'text-purple-400',
    glowColor: 'shadow-purple-500/30',
    glowHex: '#a855f7',
    borderAccent: 'border-purple-500/40',
    bgGradient: 'from-purple-500/15 via-pink-500/5 to-transparent',
    icon: <Bot className="w-8 h-8 text-purple-400" />,
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
    accentColor: 'text-rose-400',
    glowColor: 'shadow-rose-500/30',
    glowHex: '#f43f5e',
    borderAccent: 'border-rose-500/40',
    bgGradient: 'from-rose-500/15 via-red-500/5 to-transparent',
    icon: <ShieldCheck className="w-8 h-8 text-rose-400" />,
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
    accentColor: 'text-sky-400',
    glowColor: 'shadow-sky-500/30',
    glowHex: '#38bdf8',
    borderAccent: 'border-sky-500/40',
    bgGradient: 'from-sky-500/15 via-blue-500/5 to-transparent',
    icon: <Globe className="w-8 h-8 text-sky-400" />,
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
    accentColor: 'text-emerald-400',
    glowColor: 'shadow-emerald-500/30',
    glowHex: '#10b981',
    borderAccent: 'border-emerald-500/40',
    bgGradient: 'from-emerald-500/15 via-teal-500/5 to-transparent',
    icon: <Smartphone className="w-8 h-8 text-emerald-400" />,
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
    accentColor: 'text-amber-400',
    glowColor: 'shadow-amber-500/30',
    glowHex: '#f59e0b',
    borderAccent: 'border-amber-500/40',
    bgGradient: 'from-amber-500/15 via-orange-500/5 to-transparent',
    icon: <Gamepad2 className="w-8 h-8 text-amber-400" />,
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
    accentColor: 'text-teal-400',
    glowColor: 'shadow-teal-500/30',
    glowHex: '#14b8a6',
    borderAccent: 'border-teal-500/40',
    bgGradient: 'from-teal-500/15 via-cyan-500/5 to-transparent',
    icon: <Cpu className="w-8 h-8 text-teal-400" />,
    tagline: 'Embedded ESP32 Firmware & Terminal Productivity',
    description: 'Building low-overhead systems, bare-metal C++ firmware for ESP32 microcontrollers, hardware SPI communication drivers, and developer productivity CLI utilities.',
    keyHighlights: [
      'Bare-metal C++ SPI filesystem driver for ESP32 microcontroller (ESP32SDReader)',
      'Terminal clock & customizable Pomodoro stopwatch with ANSI rendering (CLI_Clock)',
      'Automated filesystem icon injection & desktop organizer (Custom-Icon-Folder)',
      'Google Photos batch EXIF synchronization helper in C++'
    ],
    metrics: 'Bare-Metal C++ • FreeRTOS • Python Automation',
    coreTech: ['C++', 'ESP32', 'FreeRTOS', 'SPI Protocol', 'Python CLI', 'Hardware IoT'],
    topProjects: ['ESP32SDReader', 'CLI_Clock', 'Custom-Icon-Folder-Library', 'googleUnlimtedPhotoAlbumApi']
  }
];

export const ScrollDomainShowcase: React.FC<ScrollDomainShowcaseProps> = ({ onSelectCategory }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate 3D rotations based on scroll progress
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, -25, 15]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [0, 360]);

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

  return (
    <div
      ref={containerRef}
      id="domain-showcase"
      className="relative h-[480vh] bg-[#07090e] text-slate-100"
    >
      {/* Sticky Fullscreen 3D Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between p-4 sm:p-8 lg:p-12 overflow-hidden select-none">
        {/* Dynamic Ambient Background Glow that changes color with the active domain */}
        <div
          className="absolute inset-0 transition-all duration-700 pointer-events-none opacity-40"
          style={{
            background: `radial-gradient(circle 500px at 50% 50%, ${currentDomain.glowHex}25, transparent 70%)`,
          }}
        />

        {/* Top HUD Status Bar */}
        <div className="relative z-20 flex items-center justify-between border-b border-slate-800/80 pb-3 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono">
              <span
                className="w-2 h-2 rounded-full animate-ping"
                style={{ backgroundColor: currentDomain.glowHex }}
              />
              <span className="text-slate-300">CORE_SYNC: ACTIVE</span>
            </div>
            <span className="hidden md:inline text-xs font-mono text-slate-500">
              ROTATING 3D QUANTUM CORE // SCROLL TO TRANSFORM
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
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-mono transition-colors"
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
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono">
                  <span className={currentDomain.accentColor}>{currentDomain.icon}</span>
                  <span className="text-slate-400 font-bold uppercase tracking-wider">
                    DOMAIN {currentDomain.indexString}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className={currentDomain.accentColor}>{currentDomain.subtitle}</span>
                </div>

                {/* Giant Glowing Title */}
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
                  {currentDomain.name}
                </h2>

                {/* Tagline Badge */}
                <div className="inline-block px-3 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300">
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
                      className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-[11px] font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action CTA Button */}
                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => handleJumpToProjects(currentDomain.id)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-950 shadow-lg transition-all hover:scale-105 active:scale-95"
                    style={{
                      background: `linear-gradient(to right, ${currentDomain.glowHex}, #00f0ff)`,
                    }}
                  >
                    <span>View {currentDomain.name} Repositories</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Centerpiece: Futuristic 3D Holographic Quantum Core (Replaces Iron Man) */}
          <div className="lg:col-span-6 flex items-center justify-center py-4 relative">
            <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] flex items-center justify-center [perspective:1000px]">
              {/* Outer Rotating Gyroscope Ring with Degree Tick Marks */}
              <motion.div
                style={{
                  rotateZ,
                  rotateX,
                  borderColor: currentDomain.glowHex,
                }}
                className="absolute inset-0 rounded-full border-2 border-dashed opacity-40 transition-colors duration-500"
              />

              {/* Middle Angled Elliptical Orbit Ring */}
              <motion.div
                style={{
                  rotateY,
                  rotateX,
                  borderColor: currentDomain.glowHex,
                }}
                className="absolute inset-4 rounded-full border border-double opacity-60 transition-colors duration-500 shadow-2xl"
              />

              {/* Reverse Counter-Rotating High-Flux Ring */}
              <motion.div
                style={{
                  rotateZ: useTransform(scrollYProgress, [0, 1], [360, 0]),
                  rotateY,
                }}
                className="absolute inset-10 rounded-full border border-cyan-400/50 border-dotted opacity-70"
              />

              {/* 3D Holographic Faceted Polyhedron Core */}
              <motion.div
                style={{
                  rotateY,
                  rotateX,
                  boxShadow: `0 0 45px ${currentDomain.glowHex}40, inset 0 0 35px ${currentDomain.glowHex}30`,
                }}
                className="relative w-32 h-32 sm:w-44 sm:h-44 rounded-3xl bg-slate-900/90 border-2 transition-colors duration-500 flex flex-col items-center justify-center [transform-style:preserve-3d] backdrop-blur-2xl"
              >
                {/* Holographic Glowing Icon of the Active Domain */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentDomain.id}
                    initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.5, opacity: 0, rotate: 45 }}
                    transition={{ type: 'spring', damping: 15 }}
                    className="flex flex-col items-center justify-center text-center p-2"
                  >
                    <div
                      className="p-4 rounded-2xl bg-slate-950/80 border transition-colors duration-500 shadow-xl"
                      style={{ borderColor: `${currentDomain.glowHex}60` }}
                    >
                      {currentDomain.icon}
                    </div>
                    <span className="mt-2 text-[10px] font-mono text-slate-300 font-bold uppercase tracking-wider">
                      DOMAIN {currentDomain.indexString}
                    </span>
                  </motion.div>
                </AnimatePresence>

                {/* Crosshair Wireframe HUD Overlay */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
                  <div className="w-full h-[1px] bg-cyan-400" />
                  <div className="h-full w-[1px] bg-cyan-400 absolute" />
                </div>
              </motion.div>

              {/* Floating Orbiting Satellite Nodes */}
              <motion.div
                style={{ rotateY, rotateZ }}
                className="absolute w-full h-full pointer-events-none"
              >
                <div
                  className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full shadow-lg"
                  style={{
                    backgroundColor: currentDomain.glowHex,
                    boxShadow: `0 0 15px ${currentDomain.glowHex}`,
                  }}
                />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
                <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-purple-400" />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-amber-400" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom HUD Bar & Vertical Domain Milestone Scrubber */}
        <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between pt-3 border-t border-slate-800/80 gap-3">
          {/* Scroll instruction cue */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>SCROLL DOWN TO ADVANCE DOMAINS (01 - 06)</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 animate-bounce" />
          </div>

          {/* Interactive Milestone Indicator Dots */}
          <div className="flex items-center gap-2">
            {DOMAINS.map((d, i) => {
              const isSelected = i === activeIndex;
              return (
                <button
                  key={d.id}
                  onClick={() => scrollToDomainMilestone(i)}
                  className={`group flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                    isSelected
                      ? 'bg-slate-800 border text-white font-bold shadow-md'
                      : 'text-slate-500 hover:text-slate-300 bg-slate-900/60 border border-slate-800'
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
