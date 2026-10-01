import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Server, Lock, Key } from 'lucide-react';

interface CloudCyberDisassemblyProps {
  progress: number;
  glowHex?: string;
  onProjectClick?: (id: string) => void;
}

export const CloudCyberDisassembly: React.FC<CloudCyberDisassemblyProps> = ({
  progress,
  glowHex = '#f43f5e',
  onProjectClick
}) => {
  const p = Math.max(0, Math.min(1, progress));

  // Layer offsets
  const leftDoorX = -p * 105;
  const rightDoorX = p * 105;
  const blade1Z = p * 75;
  const blade2Z = p * 50;
  const blade3Z = p * 25;
  const shieldScale = 0.9 + p * 0.45;
  const shieldRotate = p * 45;

  return (
    <div className="relative w-full h-[380px] sm:h-[440px] flex items-center justify-center [perspective:1200px] select-none">
      {/* Background Ambient Cyber Field */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500"
        style={{
          opacity: p * 0.4,
          background: `radial-gradient(circle 240px at 50% 50%, ${glowHex}30, transparent 70%)`
        }}
      />

      {/* Main 3D Container */}
      <div className="relative w-[300px] sm:w-[360px] h-[340px] sm:h-[380px] flex items-center justify-center [transform-style:preserve-3d]">
        
        {/* ======================================================== */}
        {/* LAYER 1: EXPANDING ZERO-TRUST CRYPTO SHIELD RING (3D)    */}
        {/* ======================================================== */}
        <motion.div
          style={{
            transform: `scale(${shieldScale}) rotateZ(${shieldRotate}deg) rotateX(${p * 15}deg)`,
          }}
          className="absolute w-56 sm:w-64 h-56 sm:h-64 rounded-full border-2 border-dashed border-rose-500/50 flex items-center justify-center pointer-events-none transition-transform duration-75"
        >
          {/* Inner Secondary Rotating Ring */}
          <div className="w-44 sm:w-52 h-44 sm:h-52 rounded-full border border-rose-400/40 border-dotted flex items-center justify-center">
            <span className="absolute -top-3 px-2 bg-slate-950 text-[8px] font-mono text-rose-400 border border-rose-500/40 rounded">
              ZERO_TRUST_BOUNDARY
            </span>
          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* LAYER 2: SERVER RACK CHASSIS (Base Foundation)          */}
        {/* ======================================================== */}
        <div className="relative w-44 sm:w-52 h-64 sm:h-72 rounded-2xl bg-slate-950/95 border-2 border-rose-500/40 shadow-2xl backdrop-blur-xl flex flex-col justify-between p-3 z-10">
          
          {/* Rack Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-1 text-[9px] font-mono text-rose-400 font-bold">
              <Server className="w-3 h-3 text-rose-400" />
              <span>RACK // OCI_BLADE</span>
            </div>
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            </div>
          </div>

          {/* ====================================================== */}
          {/* LAYER 3: SERVER BLADES (Slide forward on rails in 3D)  */}
          {/* ====================================================== */}
          <div className="flex-1 my-2 flex flex-col justify-around relative">
            
            {/* Blade 1 (Top: AWS Solutions Architect / IAM Engine) */}
            <motion.div
              style={{
                transform: `translate3d(0px, 0px, ${blade1Z}px)`,
                boxShadow: p > 0.2 ? `0 0 15px ${glowHex}40` : undefined,
              }}
              className="w-full h-10 rounded-lg bg-gradient-to-r from-slate-900 to-slate-800 border border-rose-500/40 px-2 flex items-center justify-between z-20 transition-transform duration-75"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[8px] font-mono text-slate-300 font-bold">BLADE_01: IAM_CORE</span>
              </div>
              <span className="text-[7px] font-mono text-rose-300 bg-rose-950/80 px-1 rounded">
                SailPoint ISC
              </span>
            </motion.div>

            {/* Blade 2 (Middle: JPA & Microservices Enterprise) */}
            <motion.div
              style={{
                transform: `translate3d(0px, 0px, ${blade2Z}px)`,
                boxShadow: p > 0.2 ? `0 0 15px ${glowHex}30` : undefined,
              }}
              className="w-full h-10 rounded-lg bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 px-2 flex items-center justify-between z-15 transition-transform duration-75"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span className="text-[8px] font-mono text-slate-300 font-bold">BLADE_02: CLOUD_JPA</span>
              </div>
              <span className="text-[7px] font-mono text-cyan-300 bg-slate-900 px-1 rounded">
                Spring Boot
              </span>
            </motion.div>

            {/* Blade 3 (Bottom: Container Runtime & Alpine Linux) */}
            <motion.div
              style={{
                transform: `translate3d(0px, 0px, ${blade3Z}px)`,
              }}
              className="w-full h-10 rounded-lg bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 px-2 flex items-center justify-between z-10 transition-transform duration-75"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span className="text-[8px] font-mono text-slate-300 font-bold">BLADE_03: CONTAINERS</span>
              </div>
              <span className="text-[7px] font-mono text-purple-300 bg-slate-900 px-1 rounded">
                Rootless Podman
              </span>
            </motion.div>
          </div>

          {/* Rack Base Telemetry */}
          <div className="border-t border-slate-800 pt-1.5 flex justify-between text-[7px] font-mono text-slate-400">
            <span>AES-256 GCM</span>
            <span className="text-emerald-400">RBAC: ENFORCED</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* LAYER 4: LEFT ARMORED VAULT DOOR (Slides Left)          */}
        {/* ======================================================== */}
        <motion.div
          style={{
            transform: `translate3d(${leftDoorX}px, 0px, ${p * 45}px) rotateY(${-p * 35}deg)`,
          }}
          className="absolute left-6 sm:left-10 w-24 sm:w-28 h-64 sm:h-72 rounded-l-2xl bg-gradient-to-r from-slate-900/95 via-slate-950/95 to-slate-900/90 border-l-2 border-y-2 border-rose-500/60 backdrop-blur-xl p-3 flex flex-col justify-between z-30 shadow-2xl transition-transform duration-75"
        >
          <div className="flex items-center gap-1 text-[8px] font-mono text-rose-400 font-bold">
            <Lock className="w-3 h-3" />
            <span>VAULT_DOOR_L</span>
          </div>

          {/* Hex Security Grid */}
          <div className="space-y-1.5 opacity-60">
            <div className="h-1 w-full bg-rose-500/30 rounded" />
            <div className="h-1 w-3/4 bg-rose-500/20 rounded" />
            <div className="h-1 w-1/2 bg-rose-500/10 rounded" />
          </div>

          <motion.div
            style={{ opacity: p }}
            className="text-[7px] font-mono text-rose-300 uppercase tracking-widest bg-rose-950/80 p-1 rounded border border-rose-500/30"
          >
            [ LOCK_BOLTS: DISENGAGED ]
          </motion.div>
        </motion.div>

        {/* ======================================================== */}
        {/* LAYER 5: RIGHT ARMORED VAULT DOOR (Slides Right)        */}
        {/* ======================================================== */}
        <motion.div
          style={{
            transform: `translate3d(${rightDoorX}px, 0px, ${p * 45}px) rotateY(${p * 35}deg)`,
          }}
          className="absolute right-6 sm:right-10 w-24 sm:w-28 h-64 sm:h-72 rounded-r-2xl bg-gradient-to-l from-slate-900/95 via-slate-950/95 to-slate-900/90 border-r-2 border-y-2 border-rose-500/60 backdrop-blur-xl p-3 flex flex-col justify-between items-end z-30 shadow-2xl transition-transform duration-75"
        >
          <div className="flex items-center gap-1 text-[8px] font-mono text-rose-400 font-bold">
            <span>VAULT_DOOR_R</span>
            <ShieldCheck className="w-3 h-3" />
          </div>

          {/* Biometric Scanner */}
          <div className="w-8 h-8 rounded-lg border border-rose-400/50 bg-rose-950/40 flex items-center justify-center">
            <Key className="w-4 h-4 text-rose-300 animate-pulse" />
          </div>

          <motion.div
            style={{ opacity: p }}
            className="text-[7px] font-mono text-rose-300 uppercase tracking-widest bg-rose-950/80 p-1 rounded border border-rose-500/30"
          >
            [ IDENTITY: DELOITTE_IAM ]
          </motion.div>
        </motion.div>

        {/* ======================================================== */}
        {/* DISASSEMBLY SCHEMATIC PROJECT CALLOUTS                   */}
        {/* ======================================================== */}
        {/* Bottom-Left Spotlight: Deloitte JPA Enterprise */}
        <motion.div
          style={{
            opacity: p,
            transform: `translate3d(${-p * 145}px, ${p * 100}px, 40px)`,
          }}
          onClick={() => onProjectClick && onProjectClick('deloitte-jpa-demo')}
          className="absolute -bottom-6 -left-12 hidden sm:flex flex-col gap-1 p-2 rounded-xl bg-slate-900/90 hover:bg-rose-950/60 border border-rose-500/50 backdrop-blur-xl shadow-2xl w-40 cursor-pointer transition-all hover:scale-105 z-40"
        >
          <div className="flex items-center justify-between text-[9px] font-mono text-rose-400 font-bold">
            <span>Deloitte JPA Demo</span>
            <span className="text-[7px] bg-rose-500/20 px-1 rounded text-rose-300">SPRING</span>
          </div>
          <p className="text-[8px] text-slate-300 line-clamp-2">
            Enterprise persistence, transaction management & Hibernate microservices.
          </p>
          <div className="text-[7px] font-mono text-rose-300 pt-0.5 border-t border-slate-800 flex justify-between">
            <span>Java • PostgreSQL</span>
            <span className="text-cyan-400">&gt; Inspect</span>
          </div>
        </motion.div>

        {/* Bottom-Right Spotlight: Employee Management System */}
        <motion.div
          style={{
            opacity: p,
            transform: `translate3d(${p * 145}px, ${p * 100}px, 40px)`,
          }}
          onClick={() => onProjectClick && onProjectClick('employee-management-system')}
          className="absolute -bottom-6 -right-12 hidden sm:flex flex-col gap-1 p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-rose-500/40 backdrop-blur-xl shadow-2xl w-40 cursor-pointer transition-all hover:scale-105 z-40"
        >
          <div className="flex items-center justify-between text-[9px] font-mono text-cyan-400 font-bold">
            <span>RBAC IAM System</span>
            <span className="text-[7px] bg-cyan-500/20 px-1 rounded text-cyan-300">IAM</span>
          </div>
          <p className="text-[8px] text-slate-300 line-clamp-2">
            Enterprise role-based access control, auditing & employee lifecycle security.
          </p>
          <div className="text-[7px] font-mono text-slate-400 pt-0.5 border-t border-slate-800 flex justify-between">
            <span>Security • Auditing</span>
            <span className="text-rose-400">&gt; Inspect</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
