import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  ExternalLink,
  Award,
  Layers,
  Code,
  Briefcase,
  Mail,
  Github,
  Linkedin,
  Copy,
  Check
} from 'lucide-react';
import { PROJECTS, Project } from '../data/projectsData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  action: () => void;
  shortcut?: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectProject,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Global shortcut Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggling
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const copyEmail = () => {
    navigator.clipboard.writeText('chinugarnaiklabs@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const jumpTo = (id: string) => {
    onClose();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Base navigation & quick action commands
  const defaultCommands: CommandItem[] = [
    {
      id: 'nav-projects',
      title: 'Navigate to Projects Matrix',
      category: 'Navigation',
      icon: <Layers className="w-4 h-4 text-[#ff4f36]" />,
      action: () => jumpTo('projects'),
      shortcut: 'P',
    },
    {
      id: 'nav-certifications',
      title: 'Navigate to Certifications & Achievements (30+)',
      category: 'Navigation',
      icon: <Award className="w-4 h-4 text-[#3687ff]" />,
      action: () => jumpTo('certifications'),
      shortcut: 'C',
    },
    {
      id: 'nav-skills',
      title: 'Navigate to Tech Stack & Capabilities',
      category: 'Navigation',
      icon: <Code className="w-4 h-4 text-[#ff4f36]" />,
      action: () => jumpTo('skills'),
      shortcut: 'S',
    },
    {
      id: 'nav-experience',
      title: 'Navigate to Experience & Timeline',
      category: 'Navigation',
      icon: <Briefcase className="w-4 h-4 text-[#3687ff]" />,
      action: () => jumpTo('experience'),
      shortcut: 'E',
    },
    {
      id: 'nav-contact',
      title: 'Navigate to Contact & Reach Out',
      category: 'Navigation',
      icon: <Mail className="w-4 h-4 text-[#ff4f36]" />,
      action: () => jumpTo('contact'),
      shortcut: 'M',
    },
    {
      id: 'cert-oracle-agent',
      title: 'View Credential: Oracle Fusion AI Agent Studio Developer Professional',
      category: 'Certifications',
      icon: <Award className="w-4 h-4 text-[#ff4f36]" />,
      action: () => window.open('https://catalog-education.oracle.com/pls/certview/sharebadge?id=7C08B401E74C98A76EE353B55D7622271FC002A7B68C15FDEEECF47DE01E42E8', '_blank'),
    },
    {
      id: 'cert-claude-dev',
      title: 'View Credential: Claude Certified Developer - Foundations (Anthropic)',
      category: 'Certifications',
      icon: <Award className="w-4 h-4 text-[#3687ff]" />,
      action: () => window.open('https://www.credly.com/badges/627a1223-637f-411a-b676-0077ad40de9c/linked_in_profile', '_blank'),
    },
    {
      id: 'cert-aws-dea',
      title: 'View Credential: AWS Certified Data Engineer – Associate (DEA-C01)',
      category: 'Certifications',
      icon: <Award className="w-4 h-4 text-[#3687ff]" />,
      action: () => window.open('https://www.credly.com/badges/7ebf4313-a5cb-4419-85ad-721c724f29be/linked_in_profile', '_blank'),
    },
    {
      id: 'cert-aws-saa',
      title: 'View Credential: AWS Certified Solutions Architect – Associate (SAA-C03)',
      category: 'Certifications',
      icon: <Award className="w-4 h-4 text-[#ff4f36]" />,
      action: () => window.open('https://www.credly.com/badges/f3167b1d-00c9-45a5-839f-03031e91015d/linked_in_profile', '_blank'),
    },
    {
      id: 'link-github',
      title: 'Open GitHub Profile (@ChinmayaGit)',
      category: 'Social',
      icon: <Github className="w-4 h-4 text-white" />,
      action: () => window.open('https://github.com/ChinmayaGit?tab=repositories', '_blank'),
    },
    {
      id: 'link-linkedin',
      title: 'Open LinkedIn Profile (Chinmaya Garnaik)',
      category: 'Social',
      icon: <Linkedin className="w-4 h-4 text-[#3687ff]" />,
      action: () => window.open('https://www.linkedin.com/in/chinmaya-garnaik-a093a21b5/', '_blank'),
    },
    {
      id: 'link-linkedin-certs',
      title: 'Open LinkedIn Certifications Directory',
      category: 'Certifications',
      icon: <Award className="w-4 h-4 text-[#3687ff]" />,
      action: () => window.open('https://www.linkedin.com/in/chinmaya-garnaik-a093a21b5/details/certifications/', '_blank'),
    },
    {
      id: 'action-copy-email',
      title: copiedEmail ? 'Email Copied!' : 'Copy Chinmaya\'s Contact Email',
      category: 'Action',
      icon: copiedEmail ? <Check className="w-4 h-4 text-[#ff4f36]" /> : <Copy className="w-4 h-4 text-[#3687ff]" />,
      action: copyEmail,
      shortcut: 'Enter',
    },
  ];

  // Dynamically search projects
  const projectCommands: CommandItem[] = PROJECTS.map((project) => ({
    id: `project-${project.id}`,
    title: `${project.title} — ${project.tagline}`,
    category: `Project (${project.categoryLabel})`,
    icon: <Layers className="w-4 h-4 text-[#ff4f36]" />,
    action: () => {
      onClose();
      onSelectProject(project);
    },
  }));

  const allItems = [...defaultCommands, ...projectCommands];

  const filteredItems = query.trim()
    ? allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : allItems;

  const handleKeyDownList = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Palette Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-xl bg-[#14171c] border border-white/[0.12] rounded-3xl shadow-[0_0_50px_rgba(255,79,54,0.2)] overflow-hidden z-10 flex flex-col max-h-[75vh]"
        >
          {/* Top Search Bar */}
          <div className="flex items-center px-4 py-3.5 border-b border-white/[0.08] bg-[#101214]">
            <Search className="w-5 h-5 text-[#ff4f36] mr-3 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDownList}
              placeholder="Type a project name, technology, or command..."
              className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none font-mono"
            />
            {query ? (
              <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            ) : (
              <kbd className="px-2 py-0.5 text-[10px] font-mono bg-[#16191d] border border-white/[0.1] text-slate-400 rounded-md">
                ESC
              </kbd>
            )}
          </div>

          {/* Results List */}
          <div className="overflow-y-auto p-2 divide-y divide-white/[0.04]">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <div
                    key={item.id}
                    onClick={item.action}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-2xl cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#ff4f36]/15 border border-[#ff4f36]/40 text-white shadow-[0_0_15px_rgba(255,79,54,0.15)]'
                        : 'text-slate-300 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 rounded-xl bg-[#101214] border border-white/[0.08] shrink-0">
                        {item.icon}
                      </div>
                      <div className="truncate">
                        <div className="text-xs sm:text-sm font-semibold truncate">{item.title}</div>
                        <div className="text-[10px] font-mono text-slate-400">{item.category}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      {item.shortcut && (
                        <kbd className="px-2 py-0.5 text-[10px] font-mono bg-[#101214] border border-white/[0.1] text-slate-300 rounded-md">
                          {item.shortcut}
                        </kbd>
                      )}
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-8 text-center text-xs text-slate-400 font-mono">
                No matching results found for "{query}"
              </div>
            )}
          </div>

          {/* Palette Footer */}
          <div className="px-4 py-2.5 bg-[#101214] border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>
              Use <kbd className="px-1 bg-[#16191d] rounded">↑</kbd>{' '}
              <kbd className="px-1 bg-[#16191d] rounded">↓</kbd> to navigate
            </span>
            <span>
              Press <kbd className="px-1 bg-[#16191d] rounded">Enter</kbd> to select
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
