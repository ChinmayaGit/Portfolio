import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Layers, Database, ArrowUpDown } from 'lucide-react';

interface FullStackDisassemblyProps {
  progress: number;
  glowHex?: string;
  onProjectClick?: (id: string) => void;
}

export const FullStackDisassembly: React.FC<FullStackDisassemblyProps> = ({
  progress,
  glowHex = '#38bdf8',
  onProjectClick
}) => {
  const p = Math.max(0, Math.min(1, progress));

  // Layer exploded offsets
  const layer1Z = p * 110;
  const layer1Y = -p * 45;
  const layer2Z = p * 60;
  const layer2Y = -p * 15;
  const layer3Z = p * 15;
  const layer3Y = p * 20;
  const layer4Z = -p * 30;
  const layer4Y = p * 55;

  return (
    <div className="relative w-full h-[380px] sm:h-[440px] flex items-center justify-center [perspective:1200px] select-none">
      {/* Background Ambient Glow */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500"
        style={{
          opacity: p * 0.4,
          background: `radial-gradient(circle 240px at 50% 50%, ${glowHex}30, transparent 70%)`
        }}
      />

      {/* Main 3D Exploded Container */}
      <div className="relative w-[300px] sm:w-[360px] h-[340px] sm:h-[380px] flex items-center justify-center [transform-style:preserve-3d]">
        
        {/* ======================================================== */}
        {/* TIER 1: FRONTEND GLASS BROWSER UI (Lifts Out Forward)   */}
        {/* ======================================================== */}
        <motion.div
          style={{
            transform: `translate3d(0px, ${layer1Y}px, ${layer1Z}px) rotateX(${-p * 12}deg)`,
            boxShadow: p > 0.2 ? `0 0 25px ${glowHex}40` : undefined,
          }}
          className="absolute w-56 sm:w-64 h-36 sm:h-40 rounded-2xl bg-slate-900/90 border-2 border-sky-400/80 backdrop-blur-2xl p-3 flex flex-col justify-between z-40 shadow-2xl transition-transform duration-75"
        >
          {/* Browser Window Header with Traffic Lights */}
          <div className="flex items-center justify-between border-b border-slate-700/80 pb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <div className="px-2 py-0.5 rounded bg-slate-950/80 border border-slate-700 text-[8px] font-mono text-sky-300">
              https://chinmaya.dev/app
            </div>
            <Globe className="w-3 h-3 text-sky-400" />
          </div>

          {/* Browser UI Card Wireframe */}
          <div className="grid grid-cols-3 gap-1.5 my-auto">
            <div className="col-span-2 h-14 rounded-lg bg-sky-950/40 border border-sky-500/30 p-1.5 flex flex-col justify-between">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                <span className="text-[7px] font-mono text-white font-bold">React 18 + TS</span>
              </div>
              <div className="h-1 w-3/4 bg-sky-400/40 rounded" />
              <div className="h-1 w-1/2 bg-sky-400/30 rounded" />
            </div>
            <div className="col-span-1 h-14 rounded-lg bg-slate-950/60 border border-slate-800 p-1.5 flex flex-col justify-around">
              <div className="h-1 w-full bg-slate-700 rounded" />
              <div className="h-1 w-full bg-purple-400/40 rounded" />
              <div className="h-1 w-full bg-slate-700 rounded" />
            </div>
          </div>

          <div className="flex justify-between items-center text-[8px] font-mono text-slate-400 pt-1 border-t border-slate-800">
            <span className="text-sky-300">[ TIER 01: REACT UI ]</span>
            <span className="text-emerald-400">STATUS: 200 OK</span>
          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* TIER 2: VIRTUAL DOM HIERARCHY TREE (Middle-Front Layer)  */}
        {/* ======================================================== */}
        <motion.div
          style={{
            transform: `translate3d(0px, ${layer2Y}px, ${layer2Z}px) rotateX(${-p * 8}deg)`,
          }}
          className="absolute w-52 sm:w-60 h-28 sm:h-32 rounded-xl bg-slate-950/85 border border-sky-500/40 backdrop-blur-xl p-2.5 flex flex-col justify-between z-30 shadow-xl transition-transform duration-75"
        >
          <div className="flex items-center justify-between text-[8px] font-mono text-sky-400 font-bold border-b border-slate-800 pb-1">
            <div className="flex items-center gap-1">
              <Layers className="w-3 h-3 text-sky-400" />
              <span>VIRTUAL DOM TREE</span>
            </div>
            <span className="text-purple-400">REACTIVE FIBER</span>
          </div>

          {/* Component Tree Branches */}
          <div className="flex items-center justify-around py-1">
            <div className="px-2 py-1 rounded bg-slate-900 border border-sky-500/30 text-[8px] font-mono text-sky-300">
              &lt;Header /&gt;
            </div>
            <div className="h-[1px] w-4 bg-sky-400/50" />
            <div className="px-2 py-1 rounded bg-purple-950/60 border border-purple-500/40 text-[8px] font-mono text-purple-300 font-bold">
              &lt;StateEngine /&gt;
            </div>
            <div className="h-[1px] w-4 bg-sky-400/50" />
            <div className="px-2 py-1 rounded bg-slate-900 border border-sky-500/30 text-[8px] font-mono text-sky-300">
              &lt;View /&gt;
            </div>
          </div>

          <div className="text-[7px] font-mono text-slate-400 flex justify-between">
            <span>[ TIER 02: CLIENT STATE ]</span>
            <span className="text-cyan-400">RxJS & Zustand Sync</span>
          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* TIER 3: REST & GRAPHQL API GATEWAY (Middle Layer)        */}
        {/* ======================================================== */}
        <motion.div
          style={{
            transform: `translate3d(0px, ${layer3Y}px, ${layer3Z}px)`,
          }}
          className="absolute w-48 sm:w-56 h-24 sm:h-28 rounded-xl bg-slate-950/90 border border-blue-500/40 backdrop-blur-xl p-2.5 flex flex-col justify-between z-20 shadow-xl transition-transform duration-75"
        >
          <div className="flex items-center justify-between text-[8px] font-mono text-blue-400 font-bold border-b border-slate-800 pb-1">
            <div className="flex items-center gap-1">
              <ArrowUpDown className="w-3 h-3 text-blue-400" />
              <span>API GATEWAY // PIPELINE</span>
            </div>
            <span className="text-emerald-400">WEBSOCKETS</span>
          </div>

          {/* Flow conduits */}
          <div className="space-y-1 my-1">
            <div className="flex items-center justify-between text-[7px] font-mono px-1 py-0.5 rounded bg-slate-900 text-slate-300">
              <span>GET /api/v1/offers</span>
              <span className="text-emerald-400">32ms</span>
            </div>
            <div className="flex items-center justify-between text-[7px] font-mono px-1 py-0.5 rounded bg-slate-900 text-slate-300">
              <span>WS /sync/realtime</span>
              <span className="text-cyan-400">ACTIVE</span>
            </div>
          </div>

          <div className="text-[7px] font-mono text-slate-400 flex justify-between">
            <span>[ TIER 03: MIDDLEWARE ]</span>
            <span className="text-blue-300">Node / Spring Boot</span>
          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* TIER 4: DATABASE & PERSISTENT STORAGE (Base Foundation)  */}
        {/* ======================================================== */}
        <motion.div
          style={{
            transform: `translate3d(0px, ${layer4Y}px, ${layer4Z}px) rotateX(${p * 15}deg)`,
          }}
          className="absolute w-44 sm:w-52 h-20 sm:h-24 rounded-xl bg-slate-950/95 border-2 border-indigo-500/50 backdrop-blur-2xl p-2.5 flex flex-col justify-between z-10 shadow-2xl transition-transform duration-75"
        >
          <div className="flex items-center justify-between text-[8px] font-mono text-indigo-400 font-bold border-b border-slate-800 pb-1">
            <div className="flex items-center gap-1">
              <Database className="w-3 h-3 text-indigo-400" />
              <span>PERSISTENCE CLUSTER</span>
            </div>
            <span className="text-amber-400">REDIS CACHE</span>
          </div>

          <div className="flex items-center justify-around py-0.5">
            <div className="text-[7px] font-mono text-slate-300 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700">
              PostgreSQL
            </div>
            <div className="text-[7px] font-mono text-slate-300 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700">
              Redis KV
            </div>
            <div className="text-[7px] font-mono text-slate-300 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700">
              JPA Entity
            </div>
          </div>

          <div className="text-[7px] font-mono text-slate-400 flex justify-between">
            <span>[ TIER 04: STORAGE ENGINE ]</span>
            <span className="text-indigo-300">ACID Trans</span>
          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* DISASSEMBLY SCHEMATIC PROJECT CALLOUTS                   */}
        {/* ======================================================== */}
        {/* Bottom-Left Spotlight: Reclaim Web Portal */}
        <motion.div
          style={{
            opacity: p,
            transform: `translate3d(${-p * 145}px, ${p * 100}px, 40px)`,
          }}
          onClick={() => onProjectClick && onProjectClick('reclaim-web')}
          className="absolute -bottom-6 -left-12 hidden sm:flex flex-col gap-1 p-2 rounded-xl bg-slate-900/90 hover:bg-sky-950/60 border border-sky-500/50 backdrop-blur-xl shadow-2xl w-40 cursor-pointer transition-all hover:scale-105 z-40"
        >
          <div className="flex items-center justify-between text-[9px] font-mono text-sky-400 font-bold">
            <span>Reclaim Web Portal</span>
            <span className="text-[7px] bg-sky-500/20 px-1 rounded text-sky-300">REACT</span>
          </div>
          <p className="text-[8px] text-slate-300 line-clamp-2">
            Modern productivity analytics dashboard with weekly focus heatmaps.
          </p>
          <div className="text-[7px] font-mono text-sky-300 pt-0.5 border-t border-slate-800 flex justify-between">
            <span>React • TypeScript</span>
            <span className="text-cyan-400">&gt; Inspect</span>
          </div>
        </motion.div>

        {/* Bottom-Right Spotlight: Cards-Apps OfferTracker */}
        <motion.div
          style={{
            opacity: p,
            transform: `translate3d(${p * 145}px, ${p * 100}px, 40px)`,
          }}
          onClick={() => onProjectClick && onProjectClick('cards-apps-offertracker')}
          className="absolute -bottom-6 -right-12 hidden sm:flex flex-col gap-1 p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-sky-500/40 backdrop-blur-xl shadow-2xl w-40 cursor-pointer transition-all hover:scale-105 z-40"
        >
          <div className="flex items-center justify-between text-[9px] font-mono text-cyan-400 font-bold">
            <span>OfferTracker</span>
            <span className="text-[7px] bg-cyan-500/20 px-1 rounded text-cyan-300">FINTECH</span>
          </div>
          <p className="text-[8px] text-slate-300 line-clamp-2">
            Credit card rewards, cashback intelligence & deal monitoring platform.
          </p>
          <div className="text-[7px] font-mono text-slate-400 pt-0.5 border-t border-slate-800 flex justify-between">
            <span>Next.js • Tailwind</span>
            <span className="text-sky-400">&gt; Inspect</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
