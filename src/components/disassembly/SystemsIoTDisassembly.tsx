import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Activity, HardDrive, Radio } from 'lucide-react';

interface SystemsIoTDisassemblyProps {
  progress: number;
  glowHex?: string;
  onProjectClick?: (id: string) => void;
}

export const SystemsIoTDisassembly: React.FC<SystemsIoTDisassemblyProps> = ({
  progress,
  glowHex = '#14b8a6',
  onProjectClick
}) => {
  const p = Math.max(0, Math.min(1, progress));

  // Exploded layer offsets
  const rfShieldZ = p * 115;
  const rfShieldY = -p * 40;
  const siliconZ = p * 65;
  const siliconY = -p * 10;
  const spiBusZ = p * 15;
  const spiBusY = p * 20;
  const pcbZ = -p * 35;
  const pcbY = p * 50;

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
        {/* LAYER 1: METALLIC RF SHIELD CASING (Lifts Upwards)       */}
        {/* ======================================================== */}
        <motion.div
          style={{
            transform: `translate3d(0px, ${rfShieldY}px, ${rfShieldZ}px) rotateX(${-p * 15}deg)`,
            boxShadow: p > 0.2 ? `0 0 25px ${glowHex}40` : undefined,
          }}
          className="absolute w-44 sm:w-52 h-44 sm:h-52 rounded-2xl bg-gradient-to-br from-slate-800/95 via-slate-900/90 to-teal-950/80 border-2 border-teal-400/80 backdrop-blur-2xl p-3 flex flex-col justify-between z-40 shadow-2xl transition-transform duration-75"
        >
          {/* RF Shielding Header with Antenna trace */}
          <div className="flex items-center justify-between border-b border-teal-500/40 pb-1.5">
            <div className="flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
              <span className="text-[8px] font-mono text-white font-bold">ESP32-WROOM-32</span>
            </div>
            <span className="text-[7px] font-mono text-teal-300 bg-teal-950/80 px-1.5 py-0.5 rounded">
              Wi-Fi / BLE
            </span>
          </div>

          {/* Engraved Microcontroller Emblem */}
          <div className="flex-1 flex flex-col items-center justify-center my-1">
            <div className="w-16 h-16 rounded-2xl bg-teal-950/50 border border-teal-400/50 flex flex-col items-center justify-center relative overflow-hidden">
              <Cpu className="w-8 h-8 text-teal-300 drop-shadow-[0_0_12px_#14b8a6]" />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-500/30 via-transparent to-cyan-500/20" />
            </div>
            <span className="text-[7px] font-mono text-teal-200 mt-1 font-bold">
              ESPRESSIF SYSTEMS
            </span>
          </div>

          <div className="flex justify-between items-center text-[7px] font-mono text-slate-400 pt-1 border-t border-slate-800">
            <span className="text-teal-300">[ RF SHIELD CASING ]</span>
            <span className="text-emerald-400">STATUS: ACTIVE</span>
          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* LAYER 2: DUAL-CORE SILICON DIE (Exposed Transistors)      */}
        {/* ======================================================== */}
        <motion.div
          style={{
            transform: `translate3d(0px, ${siliconY}px, ${siliconZ}px) rotateX(${-p * 8}deg)`,
          }}
          className="absolute w-40 sm:w-48 h-40 sm:h-48 rounded-xl bg-slate-950/85 border border-teal-500/40 backdrop-blur-xl p-2.5 flex flex-col justify-between z-30 shadow-xl transition-transform duration-75"
        >
          <div className="flex items-center justify-between text-[7px] font-mono text-teal-400 font-bold border-b border-slate-800 pb-1">
            <div className="flex items-center gap-1">
              <Zap className="w-2.5 h-2.5 text-teal-400" />
              <span>SILICON DIE TRANSISTORS</span>
            </div>
            <span className="text-cyan-400">240 MHz</span>
          </div>

          {/* Dual-core silicon layout */}
          <div className="grid grid-cols-2 gap-1.5 my-auto p-1">
            <div className="h-14 rounded-lg bg-teal-950/50 border border-teal-500/30 p-1 flex flex-col justify-between text-[7px] font-mono text-teal-300">
              <span className="font-bold">CORE_0</span>
              <span className="text-[6px] text-slate-400">Xtensa LX6</span>
              <div className="h-1 w-full bg-teal-400/40 rounded" />
            </div>
            <div className="h-14 rounded-lg bg-teal-950/50 border border-teal-500/30 p-1 flex flex-col justify-between text-[7px] font-mono text-teal-300">
              <span className="font-bold">CORE_1</span>
              <span className="text-[6px] text-slate-400">FreeRTOS</span>
              <div className="h-1 w-full bg-teal-400/40 rounded" />
            </div>
          </div>

          <div className="text-[6px] font-mono text-slate-400 flex justify-between">
            <span>[ DUAL-CORE SOC ]</span>
            <span className="text-teal-400">520 KB SRAM</span>
          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* LAYER 3: HARDWARE SPI / I2C BUS COMMUNICATION TRACES     */}
        {/* ======================================================== */}
        <motion.div
          style={{
            transform: `translate3d(0px, ${spiBusY}px, ${spiBusZ}px)`,
          }}
          className="absolute w-36 sm:w-44 h-36 sm:h-44 rounded-xl bg-slate-950/90 border border-cyan-500/40 backdrop-blur-xl p-2 flex flex-col justify-between z-20 shadow-xl transition-transform duration-75"
        >
          <div className="flex items-center justify-between text-[7px] font-mono text-cyan-400 font-bold border-b border-slate-800 pb-1">
            <div className="flex items-center gap-1">
              <Activity className="w-2.5 h-2.5 text-cyan-400" />
              <span>SPI / I2C BUS TRACES</span>
            </div>
            <span className="text-emerald-400">80 MHz CLK</span>
          </div>

          {/* Oscilloscope Square Wave / Signal Bus */}
          <div className="space-y-1 my-auto px-1">
            <div className="flex justify-between text-[7px] font-mono text-slate-300 bg-slate-900 px-1.5 py-0.5 rounded">
              <span>SPI_MOSI // MISO</span>
              <span className="text-cyan-400">SD_DRIVER</span>
            </div>
            <div className="flex justify-between text-[7px] font-mono text-slate-300 bg-slate-900 px-1.5 py-0.5 rounded">
              <span>I2C_SDA // SCL</span>
              <span className="text-teal-400">SENSOR_BUS</span>
            </div>
          </div>

          <div className="text-[6px] font-mono text-slate-400 flex justify-between">
            <span>[ BARE-METAL DRIVER ]</span>
            <span className="text-cyan-300">ESP32SDReader C++</span>
          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* LAYER 4: MULTI-LAYER COPPER PCB & GPIO PINS (Base)       */}
        {/* ======================================================== */}
        <motion.div
          style={{
            transform: `translate3d(0px, ${pcbY}px, ${pcbZ}px) rotateX(${p * 15}deg)`,
          }}
          className="absolute w-44 sm:w-52 h-44 sm:h-52 rounded-2xl bg-slate-950/95 border-2 border-teal-600/40 backdrop-blur-2xl p-2.5 flex flex-col justify-between z-10 shadow-2xl transition-transform duration-75"
        >
          <div className="flex items-center justify-between text-[7px] font-mono text-teal-400 font-bold border-b border-slate-800 pb-1">
            <div className="flex items-center gap-1">
              <HardDrive className="w-2.5 h-2.5 text-teal-400" />
              <span>FR4 COPPER PCB</span>
            </div>
            <span className="text-cyan-400">30-PIN GPIO</span>
          </div>

          {/* Pin rows visualization */}
          <div className="flex justify-between items-center px-1 my-auto">
            <div className="space-y-1">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-2 h-1 bg-amber-400/70 rounded-xs" />
              ))}
            </div>
            
            {/* Crystal Resonator */}
            <div className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-[6px] font-mono text-slate-300 flex flex-col items-center">
              <span>40.000 MHz</span>
              <span className="text-teal-400">XTAL</span>
            </div>

            <div className="space-y-1 flex flex-col items-end">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-2 h-1 bg-amber-400/70 rounded-xs" />
              ))}
            </div>
          </div>

          <div className="text-[6px] font-mono text-slate-400 flex justify-between">
            <span>[ 4-LAYER BOARD ]</span>
            <span className="text-teal-400">C++ BARE-METAL</span>
          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* DISASSEMBLY SCHEMATIC PROJECT CALLOUTS                   */}
        {/* ======================================================== */}
        {/* Bottom-Left Spotlight: ESP32SDReader */}
        <motion.div
          style={{
            opacity: p,
            transform: `translate3d(${-p * 145}px, ${p * 100}px, 40px)`,
          }}
          onClick={() => onProjectClick && onProjectClick('esp32-sd-reader')}
          className="absolute -bottom-6 -left-12 hidden sm:flex flex-col gap-1 p-2 rounded-xl bg-slate-900/90 hover:bg-teal-950/60 border border-teal-500/50 backdrop-blur-xl shadow-2xl w-40 cursor-pointer transition-all hover:scale-105 z-40"
        >
          <div className="flex items-center justify-between text-[9px] font-mono text-teal-400 font-bold">
            <span>ESP32SDReader</span>
            <span className="text-[7px] bg-teal-500/20 px-1 rounded text-teal-300">C++</span>
          </div>
          <p className="text-[8px] text-slate-300 line-clamp-2">
            Embedded C++ firmware for ESP32 with bare-metal SPI filesystem driver.
          </p>
          <div className="text-[7px] font-mono text-teal-300 pt-0.5 border-t border-slate-800 flex justify-between">
            <span>ESP32 • SPI Protocol</span>
            <span className="text-cyan-400">&gt; Inspect</span>
          </div>
        </motion.div>

        {/* Bottom-Right Spotlight: CLI_Clock */}
        <motion.div
          style={{
            opacity: p,
            transform: `translate3d(${p * 145}px, ${p * 100}px, 40px)`,
          }}
          onClick={() => onProjectClick && onProjectClick('cli-clock')}
          className="absolute -bottom-6 -right-12 hidden sm:flex flex-col gap-1 p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-teal-500/40 backdrop-blur-xl shadow-2xl w-40 cursor-pointer transition-all hover:scale-105 z-40"
        >
          <div className="flex items-center justify-between text-[9px] font-mono text-cyan-400 font-bold">
            <span>CLI_Clock</span>
            <span className="text-[7px] bg-cyan-500/20 px-1 rounded text-cyan-300">TERMINAL</span>
          </div>
          <p className="text-[8px] text-slate-300 line-clamp-2">
            Terminal productivity clock & Pomodoro stopwatch with ANSI formatting.
          </p>
          <div className="text-[7px] font-mono text-slate-400 pt-0.5 border-t border-slate-800 flex justify-between">
            <span>C++ • Systems</span>
            <span className="text-teal-400">&gt; Inspect</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
