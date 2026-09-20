import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code,
  Bot,
  ShieldCheck,
  Globe,
  Smartphone,
  Gamepad2,
  Cpu,
  CheckCircle2
} from 'lucide-react';
import { SKILL_GROUPS } from '../data/skillsData';

const ICON_MAP: Record<string, React.ReactNode> = {
  Bot: <Bot className="w-5 h-5 text-purple-400" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-rose-400" />,
  Globe: <Globe className="w-5 h-5 text-sky-400" />,
  Smartphone: <Smartphone className="w-5 h-5 text-emerald-400" />,
  Gamepad2: <Gamepad2 className="w-5 h-5 text-amber-400" />,
  Cpu: <Cpu className="w-5 h-5 text-teal-400" />,
};

const SKILL_FILTERS = [
  { id: 'all', label: 'All Domains' },
  { id: 'ai', label: 'AI & Agents' },
  { id: 'cloud', label: 'Cloud & Cyber' },
  { id: 'web', label: 'Full-Stack Web' },
  { id: 'mobile', label: 'Mobile & Flutter' },
  { id: '3d', label: '3D, Games & AR' },
  { id: 'systems', label: 'Systems & IoT' },
];

export const SkillsSection: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<string>('all');

  const displayedGroups =
    selectedGroup === 'all'
      ? SKILL_GROUPS
      : SKILL_GROUPS.filter((g) => {
          if (selectedGroup === 'ai') return g.category.includes('AI');
          if (selectedGroup === 'cloud') return g.category.includes('Cloud');
          if (selectedGroup === 'web') return g.category.includes('Full-Stack');
          if (selectedGroup === 'mobile') return g.category.includes('Mobile');
          if (selectedGroup === '3d') return g.category.includes('3D');
          if (selectedGroup === 'systems') return g.category.includes('Systems');
          return true;
        });

  return (
    <section id="skills" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-3">
          <Code className="w-3.5 h-3.5" />
          <span>Full-Spectrum Capabilities</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Technology <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Stack & Mastery</span>
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base">
          Battle-tested engineering expertise across production mobile deployments, enterprise IAM governance, cloud architectures, and graphics engines.
        </p>

        {/* Quick Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {SKILL_FILTERS.map((f) => {
            const isSelected = selectedGroup === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setSelectedGroup(f.id)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/30'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedGroups.map((group, index) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="rounded-2xl bg-[#0c101a]/90 border border-slate-800 hover:border-cyan-500/40 p-6 backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 group flex flex-col justify-between"
          >
            <div>
              {/* Group Header */}
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-800">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  {ICON_MAP[group.icon] || <Cpu className="w-5 h-5 text-cyan-400" />}
                </div>
                <div>
                  <h3 className="font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                    {group.category}
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400">
                    {group.skills.length} core competencies
                  </span>
                </div>
              </div>

              {/* Skills List */}
              <ul className="space-y-2.5">
                {group.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className={`flex items-center justify-between p-2 rounded-xl text-xs transition-colors ${
                      skill.highlight
                        ? 'bg-slate-900/80 border border-slate-800/80 text-white font-medium'
                        : 'text-slate-300 hover:bg-slate-900/40'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2
                        className={`w-3.5 h-3.5 ${
                          skill.highlight ? 'text-cyan-400' : 'text-slate-500'
                        }`}
                      />
                      <span>{skill.name}</span>
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        skill.highlight
                          ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {skill.level}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
