import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Box, Eye, Activity, Triangle } from 'lucide-react';

interface Games3DDisassemblyProps {
  progress: number;
  glowHex?: string;
  onProjectClick?: (id: string) => void;
}

export const Games3DDisassembly: React.FC<Games3DDisassemblyProps> = ({
  progress,
  glowHex = '#f59e0b',
  onProjectClick
}) => {
  const p = Math.max(0, Math.min(1, progress));

  // Exploded layer offsets
  const polyZ = p * 115;
  const polyY = -p * 40;
  const wireZ = p * 65;
  const wireY = -p * 10;
  const skeletonZ = p * 15;
  const skeletonY = p * 20;
  const arMatrixZ = -p * 35;
  const arMatrixY = p * 50;

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
        {/* LAYER 1: PBR TEXTURED POLYGONAL ARMOR SHELL (Lifts Off)  */}
        {/* ======================================================== */}
        <motion.div
          style={{
            transform: `translate3d(0px, ${polyY}px, ${polyZ}px) rotateX(${-p * 15}deg) rotateY(${p * 10}deg)`,
            boxShadow: p > 0.2 ? `0 0 25px ${glowHex}40` : undefined,
          }}
          className="absolute w-48 sm:w-56 h-48 sm:h-56 rounded-3xl bg-gradient-to-br from-amber-500/20 via-slate-900/90 to-amber-950/80 border-2 border-amber-400/80 backdrop-blur-2xl p-3 flex flex-col justify-between z-40 shadow-2xl transition-transform duration-75"
        >
          {/* Surface Facets & Shader Shards */}
          <div className="flex items-center justify-between border-b border-amber-500/40 pb-1.5">
            <div className="flex items-center gap-1.5">
              <Gamepad2 className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[8px] font-mono text-white font-bold">PBR SURFACE MESH</span>
            </div>
            <span className="text-[7px] font-mono text-amber-300 bg-amber-950/80 px-1.5 py-0.5 rounded">
              WebGL 2.0
            </span>
          </div>

          {/* Central Combat Icon & 3D Shading */}
          <div className="flex-1 flex flex-col items-center justify-center my-1">
            <div className="w-16 h-16 rounded-2xl bg-amber-950/50 border border-amber-400/50 flex flex-col items-center justify-center relative overflow-hidden">
              <Box className="w-8 h-8 text-amber-300 drop-shadow-[0_0_12px_#f59e0b]" />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-500/30 via-transparent to-cyan-500/20" />
            </div>
            <span className="text-[7px] font-mono text-amber-200 mt-1 font-bold">
              BLOODLINE COMBAT HERO
            </span>
          </div>

          <div className="flex justify-between items-center text-[7px] font-mono text-slate-400 pt-1 border-t border-slate-800">
            <span className="text-amber-300">[ PBR SHADER ENGINE ]</span>
            <span className="text-emerald-400">FPS: 60 LOCKED</span>
          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* LAYER 2: LOW-POLY WIREFRAME TRIANGULATION MESH           */}
        {/* ======================================================== */}
        <motion.div
          style={{
            transform: `translate3d(0px, ${wireY}px, ${wireZ}px) rotateX(${-p * 8}deg)`,
          }}
          className="absolute w-44 sm:w-52 h-44 sm:h-52 rounded-2xl bg-slate-950/85 border border-amber-500/40 backdrop-blur-xl p-2.5 flex flex-col justify-between z-30 shadow-xl transition-transform duration-75"
        >
          <div className="flex items-center justify-between text-[7px] font-mono text-amber-400 font-bold border-b border-slate-800 pb-1">
            <div className="flex items-center gap-1">
              <Triangle className="w-2.5 h-2.5 text-amber-400" />
              <span>WIREFRAME VERTEX GRID</span>
            </div>
            <span className="text-cyan-400">14,280 TRIS</span>
          </div>

          {/* Wireframe lines simulation */}
          <div className="relative flex-1 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <polygon points="50,15 90,80 10,80" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2,2" />
              <line x1="50" y1="15" x2="50" y2="80" stroke="#38bdf8" strokeWidth="0.8" />
              <line x1="10" y1="80" x2="90" y2="80" stroke="#f59e0b" strokeWidth="0.8" />
              <line x1="50" y1="50" x2="90" y2="80" stroke="#f59e0b" strokeWidth="0.8" />
              <line x1="50" y1="50" x2="10" y2="80" stroke="#f59e0b" strokeWidth="0.8" />
              <circle cx="50" cy="15" r="2" fill="#38bdf8" />
              <circle cx="90" cy="80" r="2" fill="#38bdf8" />
              <circle cx="10" cy="80" r="2" fill="#38bdf8" />
              <circle cx="50" cy="50" r="2" fill="#f59e0b" />
            </svg>
          </div>

          <div className="text-[6px] font-mono text-slate-400 flex justify-between">
            <span>[ VERTEX BUFFER ]</span>
            <span className="text-amber-400">Indexed Geometry</span>
          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* LAYER 3: SKELETAL RIG & INVERSE KINEMATICS               */}
        {/* ======================================================== */}
        <motion.div
          style={{
            transform: `translate3d(0px, ${skeletonY}px, ${skeletonZ}px)`,
          }}
          className="absolute w-40 sm:w-48 h-40 sm:h-48 rounded-xl bg-slate-950/90 border border-orange-500/40 backdrop-blur-xl p-2 flex flex-col justify-between z-20 shadow-xl transition-transform duration-75"
        >
          <div className="flex items-center justify-between text-[7px] font-mono text-orange-400 font-bold border-b border-slate-800 pb-1">
            <div className="flex items-center gap-1">
              <Activity className="w-2.5 h-2.5 text-orange-400" />
              <span>SKELETAL RIG (IK)</span>
            </div>
            <span className="text-emerald-400">PHYSICS DELTA</span>
          </div>

          {/* Bone hierarchy schematic */}
          <div className="space-y-1 my-auto px-1">
            <div className="flex justify-between text-[7px] font-mono text-slate-300 bg-slate-900 px-1.5 py-0.5 rounded">
              <span>BONE_SPINE_01</span>
              <span className="text-cyan-400">ROT_X: 14°</span>
            </div>
            <div className="flex justify-between text-[7px] font-mono text-slate-300 bg-slate-900 px-1.5 py-0.5 rounded">
              <span>BONE_ARM_L</span>
              <span className="text-orange-400">IK_SOLVER</span>
            </div>
          </div>

          <div className="text-[6px] font-mono text-slate-400 flex justify-between">
            <span>[ BONE MATRICES ]</span>
            <span className="text-orange-300">Inverse Kinematics</span>
          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* LAYER 4: AR RAYCASTING & HITBOX MATRIX (Base)            */}
        {/* ======================================================== */}
        <motion.div
          style={{
            transform: `translate3d(0px, ${arMatrixY}px, ${arMatrixZ}px) rotateX(${p * 15}deg)`,
          }}
          className="absolute w-44 sm:w-52 h-44 sm:h-52 rounded-2xl bg-slate-950/95 border-2 border-amber-600/40 backdrop-blur-2xl p-2.5 flex flex-col justify-between z-10 shadow-2xl transition-transform duration-75"
        >
          <div className="flex items-center justify-between text-[7px] font-mono text-amber-400 font-bold border-b border-slate-800 pb-1">
            <div className="flex items-center gap-1">
              <Eye className="w-2.5 h-2.5 text-amber-400" />
              <span>AR SPATIAL RAYCAST</span>
            </div>
            <span className="text-cyan-400">C++ ENGINE</span>
          </div>

          {/* AR Cones and 360 projection rings */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full border border-dashed border-amber-400/50 flex items-center justify-center animate-spin" style={{ animationDuration: '15s' }}>
              <div className="w-12 h-12 rounded-full border border-dotted border-cyan-400/60 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
              </div>
            </div>
            <span className="text-[6px] font-mono text-amber-300 mt-1">
              360° Spherical Panoramic Projection
            </span>
          </div>

          <div className="text-[6px] font-mono text-slate-400 flex justify-between">
            <span>[ AR_VIEW C++ CORE ]</span>
            <span className="text-amber-400">Hitbox Collision Matrix</span>
          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* DISASSEMBLY SCHEMATIC PROJECT CALLOUTS                   */}
        {/* ======================================================== */}
        {/* Bottom-Left Spotlight: Bloodline */}
        <motion.div
          style={{
            opacity: p,
            transform: `translate3d(${-p * 145}px, ${p * 100}px, 40px)`,
          }}
          onClick={() => onProjectClick && onProjectClick('bloodline')}
          className="absolute -bottom-6 -left-12 hidden sm:flex flex-col gap-1 p-2 rounded-xl bg-slate-900/90 hover:bg-amber-950/60 border border-amber-500/50 backdrop-blur-xl shadow-2xl w-40 cursor-pointer transition-all hover:scale-105 z-40"
        >
          <div className="flex items-center justify-between text-[9px] font-mono text-amber-400 font-bold">
            <span>Bloodline Arena</span>
            <span className="text-[7px] bg-amber-500/20 px-1 rounded text-amber-300">60 FPS</span>
          </div>
          <p className="text-[8px] text-slate-300 line-clamp-2">
            Real-time multiplayer combat arena with hitboxes & WebSocket prediction.
          </p>
          <div className="text-[7px] font-mono text-amber-300 pt-0.5 border-t border-slate-800 flex justify-between">
            <span>Canvas • WebSockets</span>
            <span className="text-cyan-400">&gt; Inspect</span>
          </div>
        </motion.div>

        {/* Bottom-Right Spotlight: AR_View */}
        <motion.div
          style={{
            opacity: p,
            transform: `translate3d(${p * 145}px, ${p * 100}px, 40px)`,
          }}
          onClick={() => onProjectClick && onProjectClick('ar-view')}
          className="absolute -bottom-6 -right-12 hidden sm:flex flex-col gap-1 p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-amber-500/40 backdrop-blur-xl shadow-2xl w-40 cursor-pointer transition-all hover:scale-105 z-40"
        >
          <div className="flex items-center justify-between text-[9px] font-mono text-cyan-400 font-bold">
            <span>AR_View C++</span>
            <span className="text-[7px] bg-cyan-500/20 px-1 rounded text-cyan-300">SPATIAL</span>
          </div>
          <p className="text-[8px] text-slate-300 line-clamp-2">
            Hardware-accelerated C++ augmented reality 3D model inspector.
          </p>
          <div className="text-[7px] font-mono text-slate-400 pt-0.5 border-t border-slate-800 flex justify-between">
            <span>C++ • AR Core</span>
            <span className="text-amber-400">&gt; Inspect</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
