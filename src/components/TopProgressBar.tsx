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
    <div className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none overflow-hidden bg-[#101214]/60 backdrop-blur-[1px]">
      <motion.div
        className="h-full bg-gradient-to-r from-[#ff4f36] via-[#ffffff] to-[#3687ff] origin-left shadow-[0_0_12px_rgba(255,79,54,0.9)]"
        style={{ scaleX }}
      />
    </div>
  );
};

