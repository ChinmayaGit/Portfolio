import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const TopProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none overflow-hidden bg-slate-900/30 backdrop-blur-[1px]">
      <motion.div
        className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 origin-left shadow-[0_0_12px_rgba(56,189,248,0.9)]"
        style={{ scaleX }}
      />
    </div>
  );
};

