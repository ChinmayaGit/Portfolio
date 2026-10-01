import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Terminal } from 'lucide-react';

interface SystemLoadingScreenProps {
  onComplete: () => void;
}

const DIAGNOSTIC_STEPS = [
  { threshold: 0, text: 'INITIALIZING QUANTUM RUNTIME // CORE v2.6' },
  { threshold: 22, text: 'CONFIGURING 6 TECH DOMAINS (AI, CLOUD, WEB, MOBILE, 3D, SYSTEMS)...' },
  { threshold: 48, text: 'INDEXING 71+ OPEN-SOURCE REPOSITORIES...' },
  { threshold: 72, text: 'AUTHENTICATING 30+ CERTIFICATIONS (ORACLE, CLAUDE, AWS, DELOITTE)...' },
  { threshold: 92, text: 'SYSTEM OPTIMAL // DISPATCHING DEV MATRIX...' },
];

export const SystemLoadingScreen: React.FC<SystemLoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState(DIAGNOSTIC_STEPS[0].text);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Escape key instantly completes loader
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setProgress(100);
        setIsFinished(true);
        setTimeout(onComplete, 300);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onComplete]);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Nonlinear progression: faster start, brief pause around 70%, then finishes
      let increment = 1;
      if (current < 30) increment = Math.random() * 4 + 2;
      else if (current < 70) increment = Math.random() * 3 + 1.5;
      else if (current < 90) increment = Math.random() * 2 + 1;
      else increment = Math.random() * 3 + 2;

      current = Math.min(100, Math.round(current + increment));
      setProgress(current);

      // Update diagnostic text according to threshold
      for (let i = DIAGNOSTIC_STEPS.length - 1; i >= 0; i--) {
        if (current >= DIAGNOSTIC_STEPS[i].threshold) {
          setStatusText(DIAGNOSTIC_STEPS[i].text);
          break;
        }
      }

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(onComplete, 450);
        }, 250);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    setProgress(100);
    setIsFinished(true);
    setTimeout(onComplete, 250);
  };

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#101214] text-white px-4 overflow-hidden select-none will-change-[opacity]"
        >
          {/* Ambient Background Radial Glows */}
          <div className="absolute w-[500px] h-[500px] bg-[#ff4f36]/12 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute w-[360px] h-[360px] bg-[#3687ff]/12 rounded-full blur-[100px] pointer-events-none" />

          {/* Background Grid Accent Lines */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#ff4f36 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />

          <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full">
            {/* Holographic Logo Emblem with Rotating Rings */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center mb-6">
              {/* Outer Counter-Rotating Dashed Orbit Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-dashed border-[#ff4f36]/40"
              />

              {/* Inner Pulsing Gyro Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-2 rounded-full border border-[#3687ff]/40"
              />

              {/* Central Core Emblem */}
              <motion.div
                animate={{ scale: [0.96, 1.04, 0.96] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-[#14171c] border border-white/[0.12] flex flex-col items-center justify-center shadow-lg shadow-[0_0_20px_rgba(255,79,54,0.3)] backdrop-blur-xl"
              >
                <span className="font-mono font-black text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#ff4f36] via-[#ffffff] to-[#3687ff]">
                  CG
                </span>
              </motion.div>
            </div>

            {/* Brand Title */}
            <div className="space-y-1 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#ff4f36]/15 border border-[#ff4f36]/30 text-[#ff4f36] text-[11px] font-mono tracking-wider shadow-[0_0_10px_rgba(255,79,54,0.2)]">
                <Cpu className="w-3 h-3" />
                <span>CHINMAYA GARNAIK</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white font-mono">
                DEVELOPER MATRIX
              </h2>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full space-y-2">
              {/* Percentage & Progress Header */}
              <div className="flex items-center justify-between text-xs font-mono px-1">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#ff4f36] animate-pulse" />
                  <span>INITIALIZING</span>
                </span>
                <span className="font-bold text-[#ff4f36] font-mono tracking-wider text-sm">
                  {progress}%
                </span>
              </div>

              {/* The Glowing Progress Bar Track */}
              <div className="relative w-full h-2.5 sm:h-3 rounded-full bg-[#16191d] border border-white/[0.08] p-[2px] overflow-hidden shadow-inner">
                {/* Fill Bar */}
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#ff4f36] via-[#ffffff] to-[#3687ff] relative"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'linear' }}
                >
                  {/* Leading Laser Glow / Sparkle */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#ff4f36] rounded-full blur-[2px] shadow-[0_0_12px_#ff4f36]" />
                </motion.div>
              </div>

              {/* Live Diagnostic Status Stream */}
              <div className="h-6 flex items-center justify-center">
                <p className="text-[11px] sm:text-xs font-mono text-slate-400 tracking-wide truncate">
                  <span className="text-[#ff4f36] mr-1.5">&gt;</span>
                  {statusText}
                </p>
              </div>
            </div>

            {/* Skip Option */}
            <div className="mt-8 flex items-center gap-2">
              <button
                onClick={handleSkip}
                className="text-[11px] font-mono text-slate-500 hover:text-[#ff4f36] transition-colors px-2 py-1 rounded border border-transparent hover:border-white/[0.08]"
              >
                Press <span className="text-slate-300 underline">Esc</span> or click to skip intro
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
