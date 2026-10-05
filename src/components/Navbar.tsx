import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Github, Linkedin, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['hero', 'domain-showcase', 'projects', 'certifications', 'skills', 'experience', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '3D Domains', href: '#domain-showcase' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Tech Stack', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#101214]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4f36] rounded-lg p-1"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#16191d] border border-white/[0.12] group-hover:border-[#ff4f36] transition-all shadow-sm group-hover:shadow-[0_0_15px_rgba(255,79,54,0.35)]">
            <span className="font-mono font-black text-lg text-white group-hover:text-[#ff4f36] transition-colors">
              CG
            </span>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#ff4f36] rounded-full border-2 border-[#101214]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-telma font-bold text-base tracking-normal text-white group-hover:text-[#ff4f36] transition-colors">
                Chinmaya Garnaik
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#ff4f36] opacity-90" />
            </div>
            <p className="text-[11px] font-mono text-slate-400">
              Analyst <span className="text-[#3687ff] font-semibold">@ Deloitte</span>
            </p>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1 bg-[#16191d]/90 p-1.5 rounded-full border border-white/[0.08] backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#ff4f36]/25 via-[#232730] to-[#3687ff]/25 border border-[#ff4f36]/40 rounded-full shadow-[0_0_15px_rgba(255,79,54,0.2)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </div>

        {/* Right Action Icons & Command Palette Trigger */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#16191d] hover:bg-[#1c2026] border border-white/[0.08] hover:border-[#ff4f36]/50 text-xs font-mono text-slate-300 hover:text-[#ff4f36] transition-all shadow-inner"
            title="Open Command Palette (Cmd + K)"
          >
            <Terminal className="w-3.5 h-3.5 text-[#ff4f36]" />
            <span>Search</span>
            <kbd className="px-1.5 py-0.5 text-[10px] bg-[#101214] border border-white/10 rounded-full text-slate-400">
              ⌘K
            </kbd>
          </button>

          <a
            href="https://github.com/ChinmayaGit"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-[#16191d] hover:bg-[#ff4f36]/15 border border-white/[0.08] hover:border-[#ff4f36]/40 text-slate-400 hover:text-[#ff4f36] transition-all hover:shadow-[0_0_12px_rgba(255,79,54,0.3)]"
            title="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href="https://linkedin.com/in/chinmaya-garnaik-a093a21b5"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-[#16191d] hover:bg-[#3687ff]/15 border border-white/[0.08] hover:border-[#3687ff]/40 text-slate-400 hover:text-[#3687ff] transition-all hover:shadow-[0_0_12px_rgba(54,135,255,0.3)]"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenCommandPalette}
            className="p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-cyan-400"
            aria-label="Command Palette"
          >
            <Terminal className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0d14]/95 border-b border-slate-800 backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-cyan-300 hover:bg-slate-800/50"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/ChinmayaGit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
                  >
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/chinmaya-garnaik-a093a21b5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300"
                  >
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </a>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCommandPalette();
                  }}
                  className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded text-xs text-cyan-400 font-mono"
                >
                  ⌘K Menu
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

