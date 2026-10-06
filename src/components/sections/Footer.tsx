import { ArrowUpRight } from "lucide-react";

interface FooterProps {
  onOpenProjects: () => void;
  onOpenCertifications: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenProjects,
  onOpenCertifications,
  onOpenContact,
}) => {
  return (
    <footer
      id="footer"
      className="border-t border-white/5 bg-[#0a0a0b] px-6 py-14 md:px-10 md:py-16"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-white">
              <span
                aria-hidden
                className="inline-block h-2 w-2 rounded-full bg-[#d4a22f] shadow-[0_0_12px_rgba(212,162,47,0.9)]"
              />
              <span className="font-telma text-base font-bold text-white capitalize">
                Chinmaya Garnaik
              </span>
            </div>
            <p className="max-w-[38ch] font-sans text-sm leading-relaxed text-zinc-400">
              &copy; 2026 Chinmaya Garnaik &mdash; Full Stack Developer, Cloud Architect & Network Engineer.
              Engineering systems that perform, front to back.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-3">
            <button
              onClick={onOpenProjects}
              className="group flex flex-col items-start gap-1 text-left"
            >
              <span className="font-sans text-[13px] font-medium text-white transition-colors group-hover:text-[#d4a22f]">
                Projects Archive
                <ArrowUpRight
                  size={11}
                  className="ml-1 inline-block align-baseline opacity-0 transition-opacity group-hover:opacity-100"
                />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                71+ Repositories
              </span>
            </button>

            <button
              onClick={onOpenCertifications}
              className="group flex flex-col items-start gap-1 text-left"
            >
              <span className="font-sans text-[13px] font-medium text-white transition-colors group-hover:text-[#d4a22f]">
                Certifications
                <ArrowUpRight
                  size={11}
                  className="ml-1 inline-block align-baseline opacity-0 transition-opacity group-hover:opacity-100"
                />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                40+ Credentials
              </span>
            </button>

            <button
              onClick={onOpenContact}
              className="group flex flex-col items-start gap-1 text-left"
            >
              <span className="font-sans text-[13px] font-medium text-white transition-colors group-hover:text-[#d4a22f]">
                Contact
                <ArrowUpRight
                  size={11}
                  className="ml-1 inline-block align-baseline opacity-0 transition-opacity group-hover:opacity-100"
                />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                Direct Dispatch
              </span>
            </button>

            <a
              href="https://github.com/ChinmayaGit"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-1"
            >
              <span className="font-sans text-[13px] font-medium text-white transition-colors group-hover:text-[#d4a22f]">
                GitHub
                <ArrowUpRight
                  size={11}
                  className="ml-1 inline-block align-baseline opacity-0 transition-opacity group-hover:opacity-100"
                />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                Open source
              </span>
            </a>

            <a
              href="https://linkedin.com/in/chinmaya-garnaik-a093a21b5"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-1"
            >
              <span className="font-sans text-[13px] font-medium text-white transition-colors group-hover:text-[#d4a22f]">
                LinkedIn
                <ArrowUpRight
                  size={11}
                  className="ml-1 inline-block align-baseline opacity-0 transition-opacity group-hover:opacity-100"
                />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                Enterprise Profile
              </span>
            </a>

            <a
              href="mailto:cgarnaik09@gmail.com"
              className="group flex flex-col gap-1"
            >
              <span className="font-sans text-[13px] font-medium text-white transition-colors group-hover:text-[#d4a22f]">
                Email
                <ArrowUpRight
                  size={11}
                  className="ml-1 inline-block align-baseline opacity-0 transition-opacity group-hover:opacity-100"
                />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                cgarnaik09@gmail.com
              </span>
            </a>
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/5 pt-6 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500 md:flex-row md:items-center md:justify-between">
          <span>PORTFOLIO &nbsp;&middot;&nbsp; Chinmaya Garnaik &nbsp;&middot;&nbsp; Full Stack Developer</span>
          <span>Crafted with React, TypeScript &amp; Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
};
