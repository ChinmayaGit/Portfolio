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
  Bot: <Bot className="w-5 h-5 text-[#ff4f36]" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-[#3687ff]" />,
  Globe: <Globe className="w-5 h-5 text-[#ff4f36]" />,
  Smartphone: <Smartphone className="w-5 h-5 text-[#3687ff]" />,
  Gamepad2: <Gamepad2 className="w-5 h-5 text-[#ff4f36]" />,
  Cpu: <Cpu className="w-5 h-5 text-[#3687ff]" />,
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ff4f36]/15 border border-[#ff4f36]/30 text-[#ff4f36] text-xs font-mono mb-3 shadow-[0_0_12px_rgba(255,79,54,0.2)]">
          <Code className="w-3.5 h-3.5" />
          <span className="font-bold">FULL-SPECTRUM CAPABILITIES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Technology <span className="bg-gradient-to-r from-[#ff4f36] via-[#ffffff] to-[#3687ff] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(255,79,54,0.4)]">Stack & Mastery</span>
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
                className={`px-3.5 py-1 rounded-full text-xs font-mono font-bold transition-all ${
                  isSelected
                    ? 'bg-[#ff4f36] text-[#101214] shadow-[0_0_15px_rgba(255,79,54,0.4)]'
                    : 'bg-[#16191d] hover:bg-[#1c2026] text-slate-300 hover:text-white border border-white/[0.08] hover:border-[#ff4f36]/40'
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
            className="rounded-2xl bg-[#14171c] hover:bg-[#181b22] border border-white/[0.08] hover:border-[#ff4f36] p-6 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,79,54,0.25)] hover:-translate-y-1.5 group flex flex-col justify-between"
          >
            <div>
              {/* Group Header */}
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/[0.08]">
                <div className="p-2.5 rounded-xl bg-[#101214] border border-white/10">
                  {ICON_MAP[group.icon] || <Cpu className="w-5 h-5 text-[#3687ff]" />}
                </div>
                <div>
                  <h3 className="font-bold text-base text-white group-hover:text-[#ff4f36] transition-colors">
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
                        ? 'bg-[#101214] border border-white/[0.08] text-white font-medium'
                        : 'text-slate-300 hover:bg-white/[0.03]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2
                        className={`w-3.5 h-3.5 ${
                          skill.highlight ? 'text-[#ff4f36]' : 'text-slate-500'
                        }`}
                      />
                      <span>{skill.name}</span>
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        skill.highlight
                          ? 'bg-[#3687ff]/15 text-[#3687ff] border border-[#3687ff]/30 font-semibold'
                          : 'bg-[#101214] text-slate-400 border border-white/[0.06]'
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
