import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Network, Cpu } from 'lucide-react';

interface AIBotDisassemblyProps {
  progress: number; // 0 = Assembled, 1 = Fully Disassembled / Exploded
  glowHex?: string;
  onProjectClick?: (id: string) => void;
}

export const AIBotDisassembly: React.FC<AIBotDisassemblyProps> = ({
  progress,
  glowHex = '#a855f7',
  onProjectClick
}) => {
  // Clamped explosion factors
  const p = Math.max(0, Math.min(1, progress));

  // Layer offsets
  const cranialY = -p * 85;
  const cranialRotX = -p * 20;
  const leftPlateX = -p * 105;
  const rightPlateX = p * 105;
  const visorZ = p * 120;
  const visorScale = 1 + p * 0.12;
  const brainScale = 0.85 + p * 0.35;
  const brainGlow = 0.3 + p * 0.7;

  return (
    <div className="relative w-full h-[380px] sm:h-[440px] flex items-center justify-center [perspective:1200px] select-none">
      {/* Dynamic Background Neural Field */}
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
        {/* LAYER 1: CRANIAL CASING & SKULL SHELL (Lifts Upwards)    */}
        {/* ======================================================== */}
        <motion.div
          style={{
            transform: `translate3d(0px, ${cranialY}px, ${p * 40}px) rotateX(${cranialRotX}deg)`,
          }}
          className="absolute top-2 w-48 sm:w-56 h-20 rounded-t-3xl bg-gradient-to-b from-slate-800/95 via-slate-900/90 to-transparent border-t-2 border-x-2 border-purple-500/60 backdrop-blur-xl shadow-lg flex flex-col items-center justify-start pt-2 z-30 transition-transform duration-75"
        >
          {/* Cyber Vents & Screws */}
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-1 h-1 rounded-full bg-cyan-400" />
            <span className="w-8 h-0.5 bg-slate-700" />
            <span className="w-8 h-0.5 bg-purple-400/60" />
            <span className="w-8 h-0.5 bg-slate-700" />
            <span className="w-1 h-1 rounded-full bg-cyan-400" />
          </div>

          {/* Schematic Callout Label */}
          <motion.div
            style={{ opacity: p }}
            className="text-[9px] font-mono tracking-widest text-purple-300 uppercase bg-purple-950/80 px-2 py-0.5 rounded border border-purple-500/40"
          >
            [ CRANIAL_ARMOR // Ti-Al7 ]
          </motion.div>
        </motion.div>

        {/* ======================================================== */}
        {/* LAYER 2: LEFT TITANIUM FACEPLATE (Slides Left)           */}
        {/* ======================================================== */}
        <motion.div
          style={{
            transform: `translate3d(${leftPlateX}px, 0px, ${p * 60}px) rotateY(${-p * 25}deg)`,
          }}
          className="absolute left-2 sm:left-4 w-20 sm:w-24 h-40 sm:h-44 rounded-l-2xl bg-gradient-to-r from-slate-900/95 to-slate-950/80 border-l-2 border-y border-purple-500/50 backdrop-blur-xl p-2.5 flex flex-col justify-between z-25 shadow-xl transition-transform duration-75"
        >
          <div className="flex items-center gap-1 text-[8px] font-mono text-cyan-400">
            <Cpu className="w-2.5 h-2.5" />
            <span>SENSOR_L</span>
          </div>

          {/* Optical intake mesh */}
          <div className="space-y-1 opacity-50">
            <div className="h-0.5 w-full bg-purple-400/40" />
            <div className="h-0.5 w-3/4 bg-purple-400/30" />
            <div className="h-0.5 w-1/2 bg-purple-400/20" />
          </div>

          <motion.div
            style={{ opacity: p }}
            className="text-[8px] font-mono text-purple-300 tracking-tight"
          >
            [ CHEEK_PLATE_A ]
          </motion.div>
        </motion.div>

        {/* ======================================================== */}
        {/* LAYER 3: RIGHT TITANIUM FACEPLATE (Slides Right)         */}
        {/* ======================================================== */}
        <motion.div
          style={{
            transform: `translate3d(${rightPlateX}px, 0px, ${p * 60}px) rotateY(${p * 25}deg)`,
          }}
          className="absolute right-2 sm:right-4 w-20 sm:w-24 h-40 sm:h-44 rounded-r-2xl bg-gradient-to-l from-slate-900/95 to-slate-950/80 border-r-2 border-y border-purple-500/50 backdrop-blur-xl p-2.5 flex flex-col justify-between items-end z-25 shadow-xl transition-transform duration-75"
        >
          <div className="flex items-center gap-1 text-[8px] font-mono text-cyan-400">
            <span>SENSOR_R</span>
            <Cpu className="w-2.5 h-2.5" />
          </div>

          {/* Optical intake mesh */}
          <div className="space-y-1 opacity-50 w-full flex flex-col items-end">
            <div className="h-0.5 w-full bg-purple-400/40" />
            <div className="h-0.5 w-3/4 bg-purple-400/30" />
            <div className="h-0.5 w-1/2 bg-purple-400/20" />
          </div>

          <motion.div
            style={{ opacity: p }}
            className="text-[8px] font-mono text-purple-300 tracking-tight"
          >
            [ CHEEK_PLATE_B ]
          </motion.div>
        </motion.div>

        {/* ======================================================== */}
        {/* LAYER 4: OPTICAL VISOR & PERCEPTION MATRIX (Floats Front)*/}
        {/* ======================================================== */}
        <motion.div
          style={{
            transform: `translate3d(0px, -8px, ${visorZ}px) scale(${visorScale})`,
          }}
          className="absolute w-44 sm:w-52 h-14 rounded-2xl bg-gradient-to-r from-purple-950/90 via-slate-950/95 to-purple-950/90 border-2 border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.4)] backdrop-blur-2xl flex items-center justify-between px-3 z-40 transition-transform duration-75"
        >
          {/* Dual Optical Lenses with animated sweeping glow */}
          <div className="w-8 h-8 rounded-full border border-cyan-400/70 bg-cyan-950/50 flex items-center justify-center relative overflow-hidden">
            <span className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_8px_#38bdf8] animate-ping" />
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent" />
          </div>

          {/* Central Neural Data Beam */}
          <div className="flex-1 mx-2 flex flex-col items-center">
            <div className="h-[2px] w-full bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 animate-pulse" />
            <span className="text-[7px] font-mono text-purple-300 tracking-wider mt-0.5">
              QUANTUM_VISOR
            </span>
          </div>

          <div className="w-8 h-8 rounded-full border border-cyan-400/70 bg-cyan-950/50 flex items-center justify-center relative overflow-hidden">
            <span className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_8px_#38bdf8] animate-ping" />
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent" />
          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* LAYER 5: CORE COGNITIVE BRAIN & SYNAPTIC NEURON NETWORK  */}
        {/* (Exposed Heart of the AI Bot as layers disassemble)      */}
        {/* ======================================================== */}
        <motion.div
          style={{
            transform: `scale(${brainScale})`,
            filter: `drop-shadow(0 0 ${p * 35}px ${glowHex})`,
          }}
          className="relative w-52 sm:w-60 h-52 sm:h-60 rounded-full bg-slate-950/80 border border-purple-500/40 flex items-center justify-center p-2 z-20 backdrop-blur-md overflow-visible"
        >
          {/* Animated SVG Neural Synapse Network */}
          <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" viewBox="0 0 200 200">
            <defs>
              <linearGradient id="synapseGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Neural Axon Connection Pathways */}
            <path
              d="M 100 40 Q 60 70 45 100 T 100 160 T 155 100 Q 140 70 100 40 Z"
              fill="none"
              stroke="url(#synapseGlow)"
              strokeWidth="1.5"
              strokeDasharray="4,4"
              className="opacity-60"
            />
            <path
              d="M 100 40 L 100 160 M 45 100 L 155 100 M 70 65 L 130 135 M 130 65 L 70 135"
              fill="none"
              stroke="#a855f7"
              strokeWidth="1"
              className="opacity-40"
            />

            {/* Animated Data Impulse Packets traversing dendrites */}
            <motion.circle
              r="3.5"
              fill="#38bdf8"
              filter="url(#glow)"
              animate={{
                cx: [100, 60, 45, 100, 155, 140, 100],
                cy: [40, 70, 100, 160, 100, 70, 40],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
            <motion.circle
              r="3"
              fill="#ec4899"
              animate={{
                cx: [100, 140, 155, 100, 45, 60, 100],
                cy: [40, 70, 100, 160, 100, 70, 40],
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
            />

            {/* Synapse Nodes */}
            {[
              { cx: 100, cy: 40, label: 'INPUT' },
              { cx: 60, cy: 70, label: 'REASON' },
              { cx: 140, cy: 70, label: 'DAG' },
              { cx: 45, cy: 100, label: 'CLAUDE' },
              { cx: 100, cy: 100, label: 'ORACLE' },
              { cx: 155, cy: 100, label: 'AGENT' },
              { cx: 70, cy: 135, label: 'MEMORY' },
              { cx: 130, cy: 135, label: 'TOOL' },
              { cx: 100, cy: 160, label: 'ACTION' },
            ].map((node, i) => (
              <g key={i}>
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r="5"
                  fill="#07090e"
                  stroke="#c084fc"
                  strokeWidth="2"
                />
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r="2"
                  fill="#38bdf8"
                />
              </g>
            ))}
          </svg>

          {/* Central Glowing Brain Organelle Core */}
          <motion.div
            animate={{ scale: [0.94, 1.06, 0.94] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ boxShadow: `0 0 ${brainGlow * 30}px ${glowHex}80` }}
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600/30 via-slate-900 to-pink-600/30 border-2 border-purple-400/80 flex flex-col items-center justify-center p-2 shadow-2xl backdrop-blur-xl z-10"
          >
            <Brain className="w-8 h-8 text-purple-300 drop-shadow-[0_0_12px_#a855f7]" />
            <span className="text-[7px] font-mono text-cyan-300 tracking-tighter mt-1 font-bold">
              NEURAL_CORE
            </span>
          </motion.div>
        </motion.div>

        {/* ======================================================== */}
        {/* DISASSEMBLY SCHEMATIC CALLOUTS (Emerge as p approaches 1)*/}
        {/* ======================================================== */}
        {/* Top-Right: Agent Thought Loop DAG */}
        <motion.div
          style={{
            opacity: p,
            transform: `translate3d(${p * 145}px, ${-p * 90}px, 40px)`,
          }}
          className="absolute -top-4 -right-12 hidden sm:flex flex-col gap-1 p-2 rounded-xl bg-slate-900/90 border border-purple-500/40 backdrop-blur-xl shadow-xl w-36 pointer-events-none"
        >
          <div className="flex items-center gap-1 text-[9px] font-mono font-bold text-purple-400 border-b border-slate-800 pb-0.5">
            <Network className="w-3 h-3 text-cyan-400" />
            <span>AGENTIC DAG</span>
          </div>
          <div className="text-[8px] font-mono text-slate-300 space-y-0.5">
            <div>&gt; PERCEIVE INTENT</div>
            <div>&gt; LLM REASONING</div>
            <div>&gt; DISPATCH TOOL</div>
            <div className="text-emerald-400">&gt; GOAL_ACHIEVED</div>
          </div>
        </motion.div>

        {/* Bottom-Left: Connected Featured Project Spotlight */}
        <motion.div
          style={{
            opacity: p,
            transform: `translate3d(${-p * 145}px, ${p * 95}px, 40px)`,
          }}
          onClick={() => onProjectClick && onProjectClick('ai-mini-agent-builder')}
          className="absolute -bottom-6 -left-12 hidden sm:flex flex-col gap-1 p-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/70 border border-purple-500/50 backdrop-blur-xl shadow-2xl w-40 cursor-pointer transition-all hover:scale-105"
        >
          <div className="flex items-center justify-between text-[9px] font-mono text-cyan-400 font-bold">
            <span>AI Mini Agent Builder</span>
            <span className="text-[8px] bg-purple-500/30 px-1 rounded text-purple-200">REPO</span>
          </div>
          <p className="text-[8px] text-slate-300 line-clamp-2">
            Visual DAG workflow builder for autonomous multi-step reasoning.
          </p>
          <div className="text-[7px] font-mono text-purple-300 pt-0.5 border-t border-purple-500/30 flex justify-between">
            <span>Node.js • LLM Tools</span>
            <span className="text-cyan-400">&gt; Inspect</span>
          </div>
        </motion.div>

        {/* Bottom-Right: Project MELLO Spotlight */}
        <motion.div
          style={{
            opacity: p,
            transform: `translate3d(${p * 145}px, ${p * 95}px, 40px)`,
          }}
          onClick={() => onProjectClick && onProjectClick('project-mello')}
          className="absolute -bottom-6 -right-12 hidden sm:flex flex-col gap-1 p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-purple-500/40 backdrop-blur-xl shadow-2xl w-40 cursor-pointer transition-all hover:scale-105"
        >
          <div className="flex items-center justify-between text-[9px] font-mono text-purple-300 font-bold">
            <span>Project MELLO</span>
            <span className="text-[8px] bg-cyan-500/20 px-1 rounded text-cyan-300">DAEMON</span>
          </div>
          <p className="text-[8px] text-slate-300 line-clamp-2">
            Cross-platform desktop personal AI daemon companion.
          </p>
          <div className="text-[7px] font-mono text-slate-400 pt-0.5 border-t border-slate-800 flex justify-between">
            <span>Local AI • System Shell</span>
            <span className="text-purple-400">&gt; Inspect</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
