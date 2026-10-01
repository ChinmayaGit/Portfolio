import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Layers, Cpu, Battery, Lock, Star } from 'lucide-react';

interface MobileDisassemblyProps {
  progress: number;
  glowHex?: string;
  onProjectClick?: (id: string) => void;
}

export const MobileDisassembly: React.FC<MobileDisassemblyProps> = ({
  progress,
  glowHex = '#10b981',
  onProjectClick
}) => {
  const p = Math.max(0, Math.min(1, progress));

  // Exploded layer offsets
  const screenZ = p * 115;
  const screenY = -p * 40;
  const flutterZ = p * 65;
  const flutterY = -p * 10;
  const logicZ = p * 15;
  const logicY = p * 20;
  const chassisZ = -p * 35;
  const chassisY = p * 50;

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
        {/* LAYER 1: CURVED 120HZ GLASS DISPLAY (Lifts Forward)      */}
        {/* ======================================================== */}
        <motion.div
          style={{
            transform: `translate3d(0px, ${screenY}px, ${screenZ}px) rotateX(${-p * 12}deg)`,
            boxShadow: p > 0.2 ? `0 0 25px ${glowHex}40` : undefined,
          }}
          className="absolute w-40 sm:w-48 h-64 sm:h-72 rounded-[2.2rem] bg-gradient-to-b from-slate-900/95 via-slate-950/95 to-slate-900/90 border-2 border-emerald-400/80 backdrop-blur-2xl p-2.5 flex flex-col justify-between z-40 shadow-2xl transition-transform duration-75"
        >
          {/* Punch Hole Camera / Dynamic Island */}
          <div className="flex items-center justify-between px-2 pt-0.5">
            <span className="text-[7px] font-mono text-emerald-400">9:41</span>
            <div className="w-12 h-3.5 rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
            </div>
            <div className="flex gap-1">
              <span className="w-2 h-1.5 bg-emerald-400/80 rounded-sm" />
            </div>
          </div>

          {/* Odia Bhagabata / Flutter Mobile App Mockup Screen */}
          <div className="flex-1 my-2 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 p-2 flex flex-col justify-between overflow-hidden relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-[8px] font-mono text-emerald-300 font-bold">
                <Smartphone className="w-2.5 h-2.5 text-emerald-400" />
                <span>Odia Bhagabata</span>
              </div>
              <span className="text-[6px] bg-emerald-500/20 text-emerald-300 px-1 rounded font-mono">
                1,000+ USERS
              </span>
            </div>

            {/* Shloka Reader lines */}
            <div className="space-y-1 my-auto">
              <div className="h-1.5 w-full bg-emerald-400/30 rounded" />
              <div className="h-1.5 w-5/6 bg-emerald-400/20 rounded" />
              <div className="h-1.5 w-4/6 bg-emerald-400/30 rounded" />
              <div className="h-1 w-1/2 bg-slate-600 rounded mt-1" />
            </div>

            {/* Audio Playback Pill */}
            <div className="h-4 rounded-full bg-emerald-900/60 border border-emerald-500/40 flex items-center justify-between px-2 text-[7px] font-mono text-emerald-300">
              <span>▶ Audio Shloka</span>
              <span>12:40</span>
            </div>
          </div>

          <div className="flex justify-between items-center text-[7px] font-mono text-slate-400 pt-0.5 border-t border-slate-800 px-1">
            <span className="text-emerald-300">[ 120Hz GORILLA GLASS ]</span>
            <span className="text-emerald-400">TOUCH: 240Hz</span>
          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* LAYER 2: FLUTTER RENDER PIPELINE & WIDGET ENGINE         */}
        {/* ======================================================== */}
        <motion.div
          style={{
            transform: `translate3d(0px, ${flutterY}px, ${flutterZ}px) rotateX(${-p * 8}deg)`,
          }}
          className="absolute w-36 sm:w-44 h-56 sm:h-64 rounded-[1.8rem] bg-slate-950/85 border border-emerald-500/40 backdrop-blur-xl p-2.5 flex flex-col justify-between z-30 shadow-xl transition-transform duration-75"
        >
          <div className="flex items-center justify-between text-[7px] font-mono text-emerald-400 font-bold border-b border-slate-800 pb-1">
            <div className="flex items-center gap-1">
              <Layers className="w-2.5 h-2.5 text-emerald-400" />
              <span>FLUTTER PIPELINE</span>
            </div>
            <span className="text-cyan-400">IMPELLER GPU</span>
          </div>

          {/* Widget Tree Diagram */}
          <div className="space-y-1 py-1">
            <div className="text-[7px] font-mono text-slate-300 bg-slate-900/80 px-1.5 py-0.5 rounded border border-emerald-500/20">
              ProviderScope
            </div>
            <div className="ml-2 text-[7px] font-mono text-emerald-300 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-500/30">
              ↳ MaterialApp.router
            </div>
            <div className="ml-4 text-[7px] font-mono text-cyan-300 bg-cyan-950/40 px-1.5 py-0.5 rounded border border-cyan-500/30">
              ↳ CustomRenderBox
            </div>
          </div>

          <div className="text-[6px] font-mono text-slate-400 flex justify-between">
            <span>[ WIDGET TREE ]</span>
            <span className="text-emerald-400">Riverpod / Bloc</span>
          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* LAYER 3: LOGIC MOTHERBOARD & SECURE ENCLAVE              */}
        {/* ======================================================== */}
        <motion.div
          style={{
            transform: `translate3d(0px, ${logicY}px, ${logicZ}px)`,
          }}
          className="absolute w-32 sm:w-40 h-48 sm:h-56 rounded-2xl bg-slate-950/90 border border-teal-500/40 backdrop-blur-xl p-2 flex flex-col justify-between z-20 shadow-xl transition-transform duration-75"
        >
          <div className="flex items-center justify-between text-[7px] font-mono text-teal-400 font-bold border-b border-slate-800 pb-1">
            <div className="flex items-center gap-1">
              <Cpu className="w-2.5 h-2.5 text-teal-400" />
              <span>SOC MOTHERBOARD</span>
            </div>
            <span className="text-emerald-400">4nm ARM</span>
          </div>

          {/* Central Silicon Chip & Secure Vault */}
          <div className="my-auto flex flex-col items-center">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-950 via-slate-900 to-emerald-950 border border-emerald-400/60 p-1 flex flex-col items-center justify-center">
              <Lock className="w-4 h-4 text-emerald-300" />
              <span className="text-[6px] font-mono text-emerald-300 font-bold mt-0.5">
                AES-256
              </span>
            </div>
            <span className="text-[6px] font-mono text-slate-400 mt-1">
              P_Manager Secure Enclave
            </span>
          </div>

          <div className="text-[6px] font-mono text-slate-400 flex justify-between">
            <span>[ SECURE CHIP ]</span>
            <span className="text-teal-300">Biometric Auth</span>
          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* LAYER 4: ALUMINUM CHASSIS & BATTERY PACK (Base)          */}
        {/* ======================================================== */}
        <motion.div
          style={{
            transform: `translate3d(0px, ${chassisY}px, ${chassisZ}px) rotateX(${p * 15}deg)`,
          }}
          className="absolute w-40 sm:w-48 h-64 sm:h-72 rounded-[2.2rem] bg-slate-950/95 border-2 border-emerald-600/40 backdrop-blur-2xl p-2.5 flex flex-col justify-between z-10 shadow-2xl transition-transform duration-75"
        >
          {/* Dual Camera Module on chassis back */}
          <div className="w-12 h-16 rounded-xl bg-slate-900 border border-slate-700 p-1 flex flex-col justify-around items-center">
            <div className="w-4 h-4 rounded-full bg-slate-950 border border-emerald-400/50 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            </div>
            <div className="w-4 h-4 rounded-full bg-slate-950 border border-emerald-400/50 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
          </div>

          {/* Battery Pack representation */}
          <div className="w-full h-24 rounded-xl bg-slate-900/60 border border-slate-800 p-1.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[7px] font-mono text-slate-400">
              <div className="flex items-center gap-1">
                <Battery className="w-3 h-3 text-emerald-400" />
                <span>Li-Po 5000 mAh</span>
              </div>
              <span className="text-emerald-400 font-bold">100%</span>
            </div>
            <div className="h-1 w-full bg-slate-800 rounded overflow-hidden">
              <div className="h-full w-full bg-emerald-400 rounded" />
            </div>
          </div>

          <div className="text-[7px] font-mono text-slate-400 flex justify-between">
            <span>[ CNC ALUMINUM ]</span>
            <span className="text-emerald-400">IP68 WATERPROOF</span>
          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* DISASSEMBLY SCHEMATIC PROJECT CALLOUTS                   */}
        {/* ======================================================== */}
        {/* Bottom-Left Spotlight: Odia Bhagabata */}
        <motion.div
          style={{
            opacity: p,
            transform: `translate3d(${-p * 145}px, ${p * 100}px, 40px)`,
          }}
          onClick={() => onProjectClick && onProjectClick('odia-bhagabata')}
          className="absolute -bottom-6 -left-12 hidden sm:flex flex-col gap-1 p-2 rounded-xl bg-slate-900/90 hover:bg-emerald-950/60 border border-emerald-500/50 backdrop-blur-xl shadow-2xl w-40 cursor-pointer transition-all hover:scale-105 z-40"
        >
          <div className="flex items-center justify-between text-[9px] font-mono text-emerald-400 font-bold">
            <span>Odia Bhagabata</span>
            <span className="flex items-center gap-0.5 text-[7px] bg-emerald-500/20 px-1 rounded text-emerald-300">
              <Star className="w-2 h-2 text-amber-400 fill-amber-400" /> Play Store
            </span>
          </div>
          <p className="text-[8px] text-slate-300 line-clamp-2">
            Published devotional Flutter app with 1,000+ downloads & SQLite caching.
          </p>
          <div className="text-[7px] font-mono text-emerald-300 pt-0.5 border-t border-slate-800 flex justify-between">
            <span>Flutter • Dart</span>
            <span className="text-cyan-400">&gt; Inspect</span>
          </div>
        </motion.div>

        {/* Bottom-Right Spotlight: P_Manager */}
        <motion.div
          style={{
            opacity: p,
            transform: `translate3d(${p * 145}px, ${p * 100}px, 40px)`,
          }}
          onClick={() => onProjectClick && onProjectClick('p-manager')}
          className="absolute -bottom-6 -right-12 hidden sm:flex flex-col gap-1 p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-emerald-500/40 backdrop-blur-xl shadow-2xl w-40 cursor-pointer transition-all hover:scale-105 z-40"
        >
          <div className="flex items-center justify-between text-[9px] font-mono text-cyan-400 font-bold">
            <span>P_Manager Vault</span>
            <span className="text-[7px] bg-cyan-500/20 px-1 rounded text-cyan-300">AES-256</span>
          </div>
          <p className="text-[8px] text-slate-300 line-clamp-2">
            Client-side encrypted biometric credentials vault for mobile devices.
          </p>
          <div className="text-[7px] font-mono text-slate-400 pt-0.5 border-t border-slate-800 flex justify-between">
            <span>Security • Biometrics</span>
            <span className="text-emerald-400">&gt; Inspect</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
