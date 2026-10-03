import React, { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

interface NavbarProps {
  onOpenProjects?: () => void;
  onOpenCertifications?: () => void;
  onOpenContact?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenProjects,
  onOpenCertifications,
  onOpenContact,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,backdrop-filter,border-color] duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-black/60 backdrop-blur-2xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-8 md:py-5">
        <a
          href="#"
          className="flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-[#e4e4e7] hover:text-white transition-colors"
        >
          <span
            aria-hidden
            className="inline-block h-2 w-2 rounded-full bg-[#d4a22f] shadow-[0_0_12px_rgba(212,162,47,0.9)]"
          />
          <span className="font-telma font-bold text-lg tracking-normal capitalize text-white">Chinmaya Garnaik</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <button
            onClick={onOpenProjects}
            className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-400 transition-colors hover:text-white"
          >
            Projects
          </button>
          <button
            onClick={onOpenCertifications}
            className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-400 transition-colors hover:text-white"
          >
            Certifications
          </button>
          <a
            href="#systems"
            className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-400 transition-colors hover:text-white"
          >
            Systems
          </a>
        </nav>

        <button
          onClick={onOpenContact}
          className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[#e4e4e7] backdrop-blur-md transition-all duration-200 hover:bg-white/[0.1] hover:text-white active:translate-y-[1px]"
        >
          Contact
          <ArrowUpRight
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#d4a22f]"
          />
        </button>
      </div>
    </header>
  );
};
