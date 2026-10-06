import { ArrowUpRight, FolderGit2, Award, Mail } from "lucide-react";
import { EyebrowBadge } from "../ui/EyebrowBadge";
import { AnimatedItem, AnimatedSection } from "../ui/AnimatedSection";

interface SystemsNominalProps {
  onOpenProjects: () => void;
  onOpenCertifications: () => void;
  onOpenContact: () => void;
}

const telemetry = [
  { label: "Enterprise Experience", value: "Deloitte", note: "Analyst · AI Systems, Multi-Cloud Architecture & Cyber/IAM" },
  { label: "Core Specialization", value: "Full Stack", note: "React · TypeScript · Node.js · Next.js" },
  { label: "Cloud & DevOps", value: "Multi-Cloud", note: "AWS · OCI · Docker · Kubernetes · CI/CD" },
  { label: "Security & IAM", value: "Zero Trust", note: "SailPoint ISC · RBAC · Identity Governance & Defense" },
  { label: "Projects Shipped", value: "71+", note: "Full stack platforms, cloud tools, and APIs" },
  { label: "Verified Credentials", value: "41", note: "AWS, Azure, Oracle, Anthropic Claude, SailPoint & Google" },
  { label: "Availability Status", value: "Available", note: "Hyderabad, India · Open for full-time & high-impact roles" },
];

export const SystemsNominal: React.FC<SystemsNominalProps> = ({
  onOpenProjects,
  onOpenCertifications,
  onOpenContact,
}) => {
  return (
    <section
      id="systems"
      className="relative border-t border-white/5 bg-[#0a0a0b] px-6 pb-36 pt-24 md:px-10 md:pb-44 md:pt-32"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-16 md:grid md:grid-cols-[5fr_4fr] md:gap-20">
        {/* Left Column: Mission statement */}
        <AnimatedSection className="flex flex-col gap-8">
          <AnimatedItem>
            <EyebrowBadge>PHASE 05 // SYSTEMS ARCHITECT</EyebrowBadge>
          </AnimatedItem>

          <AnimatedItem>
            <h2 className="max-w-[16ch] text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-6xl">
              Full-Stack &amp;{" "}
              <span className="font-telma font-bold text-[#d4a22f] inline-block">
                Systems Architect
              </span>
            </h2>
          </AnimatedItem>

          <AnimatedItem>
            <div className="flex flex-col gap-3">
              <p className="font-sans text-lg font-medium text-white md:text-xl">
                You bring the problem. I&rsquo;ll bring the solution.
              </p>
              <p className="max-w-[48ch] font-sans text-base leading-relaxed text-zinc-400 md:text-lg">
                Full Stack Developer, Cloud Architect, and Network Engineer building fast, resilient, and scalable systems &mdash; from pixel-perfect client experiences to enterprise cloud security.
              </p>
            </div>
          </AnimatedItem>

          {/* Quick Action Button Group */}
          <AnimatedItem>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenProjects}
                className="group inline-flex items-center gap-2 rounded-full border border-[#d4a22f]/30 bg-[#d4a22f]/10 px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d4a22f] backdrop-blur-md transition-all duration-200 hover:bg-[#d4a22f] hover:text-black active:translate-y-[1px]"
              >
                <span>View Projects</span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>

              <button
                onClick={onOpenCertifications}
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-white backdrop-blur-md transition-all duration-200 hover:bg-white/[0.08] active:translate-y-[1px]"
              >
                <span>Certifications</span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>

              <button
                onClick={onOpenContact}
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-white backdrop-blur-md transition-all duration-200 hover:bg-white/[0.08] active:translate-y-[1px]"
              >
                <span>Contact</span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>
            </div>
          </AnimatedItem>
        </AnimatedSection>

        {/* Right Column: Telemetry Matrix */}
        <AnimatedSection className="flex flex-col divide-y divide-white/10 border-t border-white/10 font-mono md:mt-3">
          {telemetry.map((row) => (
            <AnimatedItem key={row.label}>
              <div className="flex items-baseline justify-between gap-4 sm:gap-6 py-3.5 sm:py-5">
                <div className="flex flex-col gap-1 min-w-0 pr-2">
                  <span className="text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                    {row.label}
                  </span>
                  <span className="font-sans text-[12px] sm:text-[13px] text-zinc-400 leading-snug">
                    {row.note}
                  </span>
                </div>
                <span className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-white shrink-0 group-hover:text-[#d4a22f]">
                  {row.value}
                </span>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </div>

      {/* ============================================================== */}
      {/* BOTTOM FLOATING DOCK TABS: Projects, Certifications, Contact */}
      {/* ============================================================== */}
      <div className="fixed bottom-4 sm:bottom-6 left-3 right-3 sm:left-auto sm:right-6 z-40 flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 rounded-2xl border border-[#d4a22f]/30 bg-[#101013]/95 p-1.5 sm:p-2 shadow-[0_10px_35px_rgba(0,0,0,0.85),0_0_20px_rgba(212,162,47,0.15)] backdrop-blur-xl max-w-fit mx-auto sm:mx-0">
        <button
          onClick={onOpenProjects}
          className="group flex items-center gap-1.5 sm:gap-2 rounded-xl px-2.5 sm:px-3.5 py-1.5 sm:py-2 font-mono text-[11px] sm:text-xs text-zinc-300 transition-all duration-200 hover:bg-[#d4a22f] hover:text-black active:scale-95"
          title="Browse 71+ Shipped Projects"
        >
          <FolderGit2 size={14} className="text-[#d4a22f] group-hover:text-black transition-colors shrink-0" />
          <span className="font-semibold tracking-wider uppercase">Projects</span>
          <span className="rounded-full bg-white/10 px-1.5 py-0.2 text-[9px] sm:text-[10px] group-hover:bg-black/20">
            71+
          </span>
        </button>

        <div className="h-3.5 sm:h-4 w-px bg-white/15" />

        <button
          onClick={onOpenCertifications}
          className="group flex items-center gap-1.5 sm:gap-2 rounded-xl px-2.5 sm:px-3.5 py-1.5 sm:py-2 font-mono text-[11px] sm:text-xs text-zinc-300 transition-all duration-200 hover:bg-[#d4a22f] hover:text-black active:scale-95"
          title="Verified Industry Credentials"
        >
          <Award size={14} className="text-[#d4a22f] group-hover:text-black transition-colors shrink-0" />
          <span className="font-semibold tracking-wider uppercase hidden sm:inline">Certifications</span>
          <span className="font-semibold tracking-wider uppercase sm:hidden">Certs</span>
          <span className="rounded-full bg-white/10 px-1.5 py-0.2 text-[9px] sm:text-[10px] group-hover:bg-black/20">
            40+
          </span>
        </button>

        <div className="h-3.5 sm:h-4 w-px bg-white/15" />

        <button
          onClick={onOpenContact}
          className="group flex items-center gap-1.5 sm:gap-2 rounded-xl px-2.5 sm:px-3.5 py-1.5 sm:py-2 font-mono text-[11px] sm:text-xs text-zinc-300 transition-all duration-200 hover:bg-[#d4a22f] hover:text-black active:scale-95"
          title="Get in Touch / Contact"
        >
          <Mail size={14} className="text-[#d4a22f] group-hover:text-black transition-colors shrink-0" />
          <span className="font-semibold tracking-wider uppercase">Contact</span>
          <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      </div>
    </section>
  );
};
