import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Building, CheckCircle2, Shield, Layers, Cloud } from 'lucide-react';

interface TimelineItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  badgeBg: string;
  badgeColor: string;
  icon: React.ReactNode;
  description: string;
  achievements: string[];
  techTags: string[];
}

const TIMELINE: TimelineItem[] = [
  {
    id: 'deloitte-analyst',
    role: 'Analyst – Cyber Risk & IAM',
    organization: 'Deloitte Touche Tohmatsu India',
    location: 'Bhubaneswar / India',
    period: '2024 — Present',
    badgeBg: 'bg-emerald-500/10 border-emerald-500/30',
    badgeColor: 'text-emerald-400',
    icon: <Shield className="w-5 h-5 text-emerald-400" />,
    description:
      'Serving as Analyst in Cyber Risk & IAM at Deloitte, specializing in Enterprise Identity & Access Management, SailPoint Identity Security Cloud (ISC), privileged access controls, and Zero Trust security architectures.',
    achievements: [
      'Architected automated identity lifecycle provisioning and governance workflows across enterprise systems',
      'Configured and deployed SailPoint ISC connectors for hybrid directory synchronization and access certifications',
      'Audited high-privilege access, enforced Segregation of Duties (SoD), and delivered compliance reviews for enterprise clients',
      'Implemented Zero Trust IAM principles across multi-cloud and hybrid identity estates'
    ],
    techTags: ['SailPoint ISC', 'Cyber Risk & IAM', 'Active Directory', 'Zero Trust', 'Cloud Security', 'RBAC']
  },
  {
    id: 'hids-technology-intern',
    role: 'Full Stack, Cloud & Multi-Platform Engineering Intern (2 Years)',
    organization: 'Hids Technology (While Masters in College)',
    location: 'Internship (2 Years)',
    period: 'Master’s Degree (MCA)',
    badgeBg: 'bg-cyan-500/10 border-cyan-500/30',
    badgeColor: 'text-cyan-400',
    icon: <Layers className="w-5 h-5 text-cyan-400" />,
    description:
      'Completed an intensive 2-year engineering internship during Master of Computer Applications (MCA), driving full-stack web platforms, multi-cloud DevOps (AWS / Azure / GCP), end-to-end automation, native & cross-platform mobile apps (Android / iOS), and immersive AR/VR spatial experiences.',
    achievements: [
      'Full Stack & React: Architected high-performance responsive web applications using React, Node.js, and TypeScript',
      'Multi-Cloud DevOps: Configured and managed cloud infrastructure across AWS, Azure, and Google Cloud Platform (GCP) with CI/CD automation',
      'Application Development: Engineered and published native & cross-platform mobile applications for Android & iOS',
      'AR/VR & Immersive Tech: Built spatial 3D interactive applications and augmented reality experiences using C++ and WebGL engines',
      'Automation: Developed automated deployment pipelines, shell automation scripts, and workflow triggers'
    ],
    techTags: ['Full Stack', 'Cloud & DevOps (AWS/Azure/GCP)', 'Automation', 'Mobile (Android/iOS)', 'AR / VR', 'React', 'TypeScript']
  },
  {
    id: 'startwithgenesis-intern',
    role: 'Full Stack, Application Dev & Cloud Intern',
    organization: 'STARTWITHGENESIS (While in Bachelor\'s in College)',
    location: 'Internship',
    period: 'June 2021 — Aug 2021',
    badgeBg: 'bg-purple-500/10 border-purple-500/30',
    badgeColor: 'text-purple-400',
    icon: <Cloud className="w-5 h-5 text-purple-400" />,
    description:
      'Served as Full Stack, Application Development, and Cloud Intern during undergraduate bachelor’s studies, contributing to web portal development, cloud hosting configurations, and client-facing feature implementations.',
    achievements: [
      'Designed and implemented full-stack web interfaces and backend endpoints for digital client portals',
      'Assisted in cloud infrastructure staging, server setup, and database provisioning',
      'Built mobile application features with responsive layouts and REST API communication'
    ],
    techTags: ['Full Stack', 'Application Development', 'Cloud Infrastructure', 'JavaScript', 'REST APIs']
  }
];

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Professional Milestones</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Career & <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">Experience Timeline</span>
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base">
          Proven journey spanning enterprise cyber risk at Deloitte, multi-cloud and AR/VR engineering during postgraduate MCA, and foundational full-stack cloud internships.
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative max-w-4xl mx-auto">
        {/* Central Glowing Vertical Track */}
        <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-emerald-500 via-cyan-500 to-purple-500 opacity-30" />

        <div className="space-y-10 sm:space-y-12">
          {TIMELINE.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col sm:flex-row items-start ${
                  isEven ? 'sm:flex-row-reverse' : ''
                } gap-6 sm:gap-10`}
              >
                {/* Timeline Icon Marker */}
                <div className="absolute left-4 sm:left-1/2 top-0 -translate-x-1/2 w-9 h-9 rounded-xl bg-[#0c101a] border border-cyan-500/40 flex items-center justify-center shadow-lg shadow-cyan-500/20 z-10">
                  {item.icon}
                </div>

                {/* Content Card */}
                <div className="ml-12 sm:ml-0 w-full sm:w-[calc(50%-2rem)]">
                  <div className="p-6 rounded-2xl bg-[#0c101a]/90 border border-slate-800 hover:border-cyan-500/40 backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5 group">
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono border ${item.badgeBg} ${item.badgeColor}`}>
                        {item.period}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        <span>{item.location}</span>
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {item.role}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400/90 mt-1 mb-3">
                      <Building className="w-3.5 h-3.5" />
                      <span>{item.organization}</span>
                    </div>

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Achievements List */}
                    <div className="space-y-1.5 pt-3 border-t border-slate-800 mb-4">
                      {item.achievements.map((ach, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/60">
                      {item.techTags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-slate-900/90 border border-slate-800 text-[10px] font-mono text-slate-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
