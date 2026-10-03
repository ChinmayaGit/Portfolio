import React from "react";

type Props = { children: React.ReactNode; className?: string };

export const EyebrowBadge: React.FC<Props> = ({ children, className = "" }) => {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[#d4a22f] backdrop-blur-md ${className}`}
      style={{
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.06), 0 0 24px -8px rgba(212,162,47,0.3)",
      }}
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#d4a22f] shadow-[0_0_10px_rgba(212,162,47,0.85)] animate-pulse" />
      {children}
    </span>
  );
};
