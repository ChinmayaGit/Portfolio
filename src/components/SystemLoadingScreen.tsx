import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Terminal, ArrowRight } from "lucide-react";
import { preloadInitialPhases } from "../utils/frameLoader";

interface SystemLoadingScreenProps {
  onComplete: () => void;
}

export const SystemLoadingScreen: React.FC<SystemLoadingScreenProps> = ({
  onComplete,
}) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING SYSTEM RUNTIME...");
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // Allow user to instantly skip via Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setProgress(100);
        setIsFinished(true);
        setTimeout(onComplete, 250);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Start real preloading of Phase 1 and Phase 2
    preloadInitialPhases((pct, status) => {
      if (cancelled) return;
      setProgress(pct);
      setStatusText(status);
    })
      .then(() => {
        if (cancelled) return;
        setProgress(100);
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(onComplete, 350);
        }, 200);
      })
      .catch(() => {
        if (cancelled) return;
        setProgress(100);
        setIsFinished(true);
        setTimeout(onComplete, 200);
      });

    return () => {
      cancelled = true;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setProgress(100);
    setIsFinished(true);
    setTimeout(onComplete, 200);
  };

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0b] text-white px-4 overflow-hidden select-none will-change-[opacity]"
        >
          {/* Subtle Ambient Radial Glows in Gold */}
          <div className="absolute w-[500px] h-[500px] bg-[#d4a22f]/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute w-[360px] h-[360px] bg-white/[0.04] rounded-full blur-[100px] pointer-events-none" />

          {/* Background Grid Accent Lines */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#d4a22f 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full">
            {/* Holographic Logo Emblem with Rotating Rings */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center mb-6">
              {/* Outer Counter-Rotating Dashed Orbit Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-[#d4a22f]/40"
              />

              {/* Inner Pulsing Gyro Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border border-[#d4a22f]/25"
              />

              {/* Central Core Emblem */}
              <motion.div
                animate={{ scale: [0.96, 1.04, 0.96] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-[#141417] border border-[#d4a22f]/30 flex flex-col items-center justify-center shadow-lg shadow-[0_0_25px_rgba(212,162,47,0.25)] backdrop-blur-xl"
              >
                <span className="font-mono font-black text-xl sm:text-2xl text-[#d4a22f] tracking-tight">
                  CG
                </span>
              </motion.div>
            </div>

            {/* Brand Title */}
            <div className="space-y-1 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#d4a22f]/10 border border-[#d4a22f]/30 text-[#d4a22f] text-[11px] font-mono tracking-wider shadow-[0_0_12px_rgba(212,162,47,0.15)]">
                <Cpu className="w-3 h-3" />
                <span className="font-telma font-bold text-xs tracking-normal">
                  Chinmaya Garnaik
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-mono uppercase">
                Full-Stack Systems
              </h2>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full space-y-2">
              {/* Percentage & Progress Header */}
              <div className="flex items-center justify-between text-xs font-mono px-1">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#d4a22f] animate-pulse" />
                  <span>PRELOADING PHASE 01 &bull; 02</span>
                </span>
                <span className="font-bold text-[#d4a22f] font-mono tracking-wider text-sm">
                  {progress}%
                </span>
              </div>

              {/* The Glowing Progress Bar Track */}
              <div className="relative w-full h-2 rounded-full bg-[#18181b] border border-white/[0.08] p-[2px] overflow-hidden shadow-inner">
                {/* Fill Bar */}
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#d4a22f] via-[#f59e0b] to-[#ffffff] relative"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.15 }}
                >
                  {/* Leading Laser Glow */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#d4a22f] rounded-full blur-[2px] shadow-[0_0_10px_#d4a22f]" />
                </motion.div>
              </div>

              {/* Live Diagnostic Status Stream */}
              <div className="h-6 flex items-center justify-center">
                <p className="text-[11px] sm:text-xs font-mono text-zinc-400 tracking-wide truncate">
                  <span className="text-[#d4a22f] mr-1.5">&gt;</span>
                  <span dangerouslySetInnerHTML={{ __html: statusText }} />
                </p>
              </div>
            </div>

            {/* Skip Option */}
            <div className="mt-7 flex items-center gap-2">
              <button
                onClick={handleSkip}
                className="inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-500 hover:text-[#d4a22f] transition-colors px-3 py-1 rounded-full border border-white/5 hover:border-[#d4a22f]/30"
              >
                <span>Skip loader</span>
                <ArrowRight size={11} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
