import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Flame, Shield, Cloud, Bot, Smartphone, Cpu } from 'lucide-react';

export const StringTuneMarquee: React.FC = () => {
  const items = [
    { text: 'AI & AGENT WORKFLOWS', icon: <Bot className="w-3.5 h-3.5 text-[#ff4f36]" />, color: 'red' },
    { text: 'DELOITTE CYBER ANALYST', icon: <Shield className="w-3.5 h-3.5 text-[#3687ff]" />, color: 'blue' },
    { text: '71+ REPOSITORIES', icon: <Zap className="w-3.5 h-3.5 text-[#ff4f36]" />, color: 'red' },
    { text: 'AWS SOLUTIONS ARCHITECT', icon: <Cloud className="w-3.5 h-3.5 text-[#3687ff]" />, color: 'blue' },
    { text: '1,000+ PLAY STORE USERS', icon: <Smartphone className="w-3.5 h-3.5 text-[#ff4f36]" />, color: 'red' },
    { text: 'ORACLE AI CERTIFIED', icon: <Sparkles className="w-3.5 h-3.5 text-[#3687ff]" />, color: 'blue' },
    { text: '3D SPATIAL & AR ENGINES', icon: <Flame className="w-3.5 h-3.5 text-[#ff4f36]" />, color: 'red' },
    { text: 'EMBEDDED C++ & IOT', icon: <Cpu className="w-3.5 h-3.5 text-[#3687ff]" />, color: 'blue' },
  ];

  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden bg-[#101214] border-y border-white/[0.08] py-3 select-none">
      {/* Subtle guide shadow lines */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#101214] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#101214] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex items-center gap-4 whitespace-nowrap will-change-transform"
        animate={{ x: [0, -1400] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 32,
        }}
      >
        {duplicatedItems.map((item, idx) => {
          const isRed = item.color === 'red';
          return (
            <div
              key={idx}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-[11px] font-semibold tracking-wider uppercase transition-all duration-200 cursor-default ${
                isRed
                  ? 'bg-[#181b20] border border-[#ff4f36]/30 text-white hover:border-[#ff4f36] hover:shadow-[0_0_15px_rgba(255,79,54,0.35)]'
                  : 'bg-[#181b20] border border-[#3687ff]/30 text-white hover:border-[#3687ff] hover:shadow-[0_0_15px_rgba(54,135,255,0.35)]'
              }`}
            >
              <span className="flex items-center justify-center">{item.icon}</span>
              <span>{item.text}</span>
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isRed ? 'bg-[#ff4f36] animate-pulse' : 'bg-[#3687ff] animate-pulse'
                }`}
              />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

