import React, { useEffect, useRef, useState } from "react";
import { HudFrame } from "../ui/HudFrame";
import { Shield, Lock, CheckCircle2 } from "lucide-react";

export const Phase3Network: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoProgress, setVideoProgress] = useState(0);
  const [powerReadout, setPowerReadout] = useState("95.8%");

  // IntersectionObserver: ONLY play when this section is in viewport; pause when scrolled away
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(section);

    const onTimeUpdate = () => {
      if (video.duration && !isNaN(video.duration)) {
        const prog = video.currentTime / video.duration;
        setVideoProgress(prog);
        const pwr = 93 + Math.sin(prog * Math.PI * 2) * 3.5;
        setPowerReadout(pwr.toFixed(1) + "%");
      }
    };

    video.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      observer.disconnect();
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.pause();
    };
  }, []);

  return (
    <section
      id="network"
      ref={sectionRef}
      className="relative min-h-[100dvh] h-screen w-full overflow-hidden bg-black flex items-center justify-center border-b border-white/5"
    >
      {/* Centered crisp video */}
      <video
        ref={videoRef}
        src="/Security.mp4"
        loop
        muted
        playsInline
        preload="auto"
        className="h-full w-full object-contain pointer-events-none select-none scale-[0.90] md:scale-[0.82]"
      />

      {/* Seamless edge blend vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 85% at 50% 45%, transparent 35%, rgba(0,0,0,0.35) 65%, #000000 100%)",
        }}
      />

      {/* Corner HUD Framing Elements */}
      <div className="pointer-events-none absolute left-6 top-24 text-[#d4a22f] md:left-10 md:top-28">
        <HudFrame corner="tl" size={26} />
      </div>
      <div className="pointer-events-none absolute right-6 top-24 text-[#d4a22f] md:right-10 md:top-28">
        <HudFrame corner="tr" size={26} />
      </div>
      <div className="pointer-events-none absolute bottom-14 left-6 text-[#d4a22f] md:bottom-16 md:left-10">
        <HudFrame corner="bl" size={26} />
      </div>
      <div className="pointer-events-none absolute bottom-14 right-6 text-[#d4a22f] md:bottom-16 md:right-10">
        <HudFrame corner="br" size={26} />
      </div>

      {/* Top Status Indicators */}
      <div className="pointer-events-none absolute left-6 top-20 z-10 flex items-center gap-2 md:left-10 md:top-24">
        <div className="h-px w-8 bg-[#d4a22f]/60" />
        <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-zinc-400">
          Phase 03 // Cyber &amp; Network Systems &mdash; Live
        </span>
      </div>

      <div className="pointer-events-none absolute right-6 top-20 z-10 flex items-center gap-3 md:right-10 md:top-24">
        <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-zinc-400">
          Security Index
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#d4a22f]">
          {powerReadout}
        </span>
        <span
          aria-hidden
          className="inline-block h-1.5 w-1.5 rounded-full bg-[#d4a22f] shadow-[0_0_10px_rgba(212,162,47,0.85)] animate-pulse"
        />
      </div>

      {/* Left Side: Network Engineer Heading */}
      <div className="pointer-events-none absolute bottom-24 left-6 z-10 hidden max-w-[55%] flex-col gap-4 md:flex md:bottom-28 md:left-12">
        <span className="inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.3em] text-[#d4a22f]">
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 rounded-full bg-[#d4a22f] shadow-[0_0_10px_rgba(212,162,47,0.85)]"
          />
          Phase 03 &mdash; Enterprise Cyber
        </span>
        <h2 className="font-sans font-semibold leading-[0.88] tracking-tighter text-white text-[clamp(3.5rem,7.5vw,7.5rem)]">
          Network
          <br />
          <span className="font-telma font-bold text-[#d4a22f] capitalize">Engineer</span>
        </h2>
        <p className="max-w-[38ch] font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
          Zero Trust network governance, IAM security, and enterprise cyber resilience.
        </p>
      </div>

      {/* Right Side: Elevated Glassmorphic Network Card */}
      <div className="absolute z-20 w-[420px] max-w-[92vw] left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-14 top-[10%] sm:top-[12%] md:top-[14%] lg:top-[16%]">
        <div className="card-surface p-5 md:p-6 space-y-3.5 border border-[#d4a22f]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#d4a22f] flex items-center gap-1.5">
              <Shield size={14} />
              PHASE 03 // CYBER RISK &amp; GOVERNANCE
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#d4a22f]/15 text-[#d4a22f] border border-[#d4a22f]/30">
              SECURE
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Lock size={26} className="text-[#d4a22f]" />
            Network Engineer
          </h2>

          <p className="text-zinc-300 text-xs md:text-sm leading-relaxed">
            Enterprise Cyber Risk &amp; IAM at Deloitte, specializing in Zero Trust network governance, SailPoint Identity Security Cloud (ISC), privileged access, and Active Directory federation.
          </p>

          <div className="space-y-2 pt-2 border-t border-white/10 font-mono text-xs">
            <div className="flex items-center justify-between text-zinc-400">
              <span>Enterprise Role</span>
              <span className="text-white font-medium flex items-center gap-1">
                <CheckCircle2 size={12} className="text-[#d4a22f]" />
                Analyst @ Deloitte
              </span>
            </div>
            <div className="flex items-center justify-between text-zinc-400">
              <span>Identity Governance</span>
              <span className="text-white font-medium flex items-center gap-1">
                <CheckCircle2 size={12} className="text-[#d4a22f]" />
                SailPoint ISC Certified
              </span>
            </div>
            <div className="flex items-center justify-between text-zinc-400">
              <span>Security Model</span>
              <span className="text-[#d4a22f] font-semibold">Zero Trust &bull; RBAC &bull; IAM</span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
            <span>STATUS: PROTOCOLS VERIFIED</span>
            <span className="text-[#d4a22f]">PHASE 03</span>
          </div>
        </div>
      </div>

      {/* Bottom Sequence HUD */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
        <div className="mx-6 mb-3 h-px bg-white/10 md:mx-10">
          <div
            className="h-full origin-left bg-[#d4a22f] transition-transform duration-100 ease-linear"
            style={{ transform: `scaleX(${videoProgress})` }}
          />
        </div>
        <div className="mx-6 flex items-center justify-between pb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500 md:mx-10">
          <span>LIVE SEQUENCE &bull; {Math.round(videoProgress * 100)}%</span>
          <span>PHASE 03 // CYBER DEFENSE SEQUENCE</span>
          <a
            href="#cloud"
            className="pointer-events-auto hover:text-[#d4a22f] transition-colors"
          >
            Scroll &darr;
          </a>
        </div>
      </div>
    </section>
  );
};
