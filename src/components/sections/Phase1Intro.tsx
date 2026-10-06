import React, { useEffect, useRef, useState } from "react";
import { EyebrowBadge } from "../ui/EyebrowBadge";
import { HudFrame } from "../ui/HudFrame";
import { ArrowDown } from "lucide-react";

export const Phase1Intro: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoProgress, setVideoProgress] = useState(0);
  const [powerReadout, setPowerReadout] = useState("98.5%");

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
        const pwr = 92 + Math.sin(prog * Math.PI * 2) * 6.5;
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
      id="intro"
      ref={sectionRef}
      className="relative min-h-[100dvh] h-screen w-full overflow-hidden bg-black flex items-center justify-center border-b border-white/5"
    >
      {/* Centered crisp video */}
      <video
        ref={videoRef}
        src="/1st.mp4"
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
          Phase 01 // Systems Initialization &mdash; Active
        </span>
      </div>

      <div className="pointer-events-none absolute right-6 top-20 z-10 flex items-center gap-3 md:right-10 md:top-24">
        <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-zinc-400">
          Optic Matrix
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#d4a22f]">
          {powerReadout}
        </span>
        <span
          aria-hidden
          className="inline-block h-1.5 w-1.5 rounded-full bg-[#d4a22f] shadow-[0_0_10px_rgba(212,162,47,0.85)] animate-pulse"
        />
      </div>

      {/* Center / Bottom Cinematic Hero Content */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-start gap-4 px-6 pb-24 md:px-12 md:pb-28">
        <EyebrowBadge>MARK LXXXV // CHINMAYA.DEV // PHASE 01</EyebrowBadge>

        <h1 className="font-sans text-5xl font-semibold leading-[0.88] tracking-tighter text-white sm:text-6xl md:text-8xl lg:text-9xl">
          <span className="font-telma font-bold text-[#d4a22f] capitalize block">
            Chinmaya
          </span>
          <span className="block text-white">Garnaik</span>
        </h1>

        <div className="max-w-[50ch] space-y-1.5 pt-1">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-zinc-300 md:text-sm">
            Full-Stack Developer &bull; Cloud Architect &bull; Network Engineer
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500">
            Analyst @ Deloitte &bull; Hyderabad, India
          </p>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <a
            href="#ai"
            className="group inline-flex items-center gap-2 rounded-full border border-[#d4a22f]/30 bg-[#d4a22f]/10 px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d4a22f] backdrop-blur-md transition-all duration-200 hover:bg-[#d4a22f] hover:text-black active:translate-y-[1px]"
          >
            <span>Initialize Systems</span>
            <ArrowDown
              size={12}
              className="transition-transform duration-200 group-hover:translate-y-0.5"
            />
          </a>
        </div>
      </div>

      {/* Bottom Live Sequence Scrubber */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
        <div className="mx-6 mb-3 h-px bg-white/10 md:mx-10">
          <div
            className="h-full origin-left bg-[#d4a22f] transition-transform duration-100 ease-linear"
            style={{ transform: `scaleX(${videoProgress})` }}
          />
        </div>
        <div className="mx-6 flex items-center justify-between pb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500 md:mx-10">
          <span>LIVE SEQUENCE &bull; {Math.round(videoProgress * 100)}%</span>
          <span>PHASE 01 // OPTIC MATRIX</span>
          <a
            href="#ai"
            className="pointer-events-auto hover:text-[#d4a22f] transition-colors"
          >
            Scroll &darr;
          </a>
        </div>
      </div>
    </section>
  );
};
