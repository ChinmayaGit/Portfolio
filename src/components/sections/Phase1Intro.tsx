import React, { useEffect, useRef, useState } from "react";
import { EyebrowBadge } from "../ui/EyebrowBadge";
import { HudFrame } from "../ui/HudFrame";
import { ArrowDown } from "lucide-react";

export const Phase1Intro: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const heroTextRef = useRef<HTMLDivElement | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);
  const powerReadoutRef = useRef<HTMLSpanElement | null>(null);
  const seqReadoutRef = useRef<HTMLSpanElement | null>(null);

  const tickingRef = useRef(false);
  const [loaded, setLoaded] = useState(false);

  // Initialize and prime video for responsive scrubbing
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    const onReady = () => {
      setLoaded(true);
      if (video.duration && !isNaN(video.duration)) {
        video.currentTime = 0;
      }
    };

    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);

    if (video.readyState >= 2) {
      onReady();
    }

    // Prime hardware decoder session
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          video.pause();
          video.currentTime = 0;
        })
        .catch(() => {});
    }

    return () => {
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
    };
  }, []);

  // Butter-smooth scroll-linked video scrubbing
  useEffect(() => {
    let animationFrameId: number;
    let isSeeking = false;
    let pendingTargetTime = 0;

    const requestVideoSeek = (targetTime: number) => {
      const video = videoRef.current;
      if (!video || !video.duration || isNaN(video.duration)) return;

      pendingTargetTime = targetTime;

      if (!isSeeking && Math.abs(video.currentTime - targetTime) > 0.02) {
        isSeeking = true;
        if ("fastSeek" in video && typeof (video as any).fastSeek === "function") {
          (video as any).fastSeek(targetTime);
        } else {
          video.currentTime = targetTime;
        }
      }
    };

    const onSeeked = () => {
      isSeeking = false;
      const video = videoRef.current;
      if (video && Math.abs(video.currentTime - pendingTargetTime) > 0.03) {
        requestVideoSeek(pendingTargetTime);
      }
    };

    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      animationFrameId = requestAnimationFrame(() => {
        tickingRef.current = false;
        const section = sectionRef.current;
        const video = videoRef.current;
        if (!section || !video) return;

        const rect = section.getBoundingClientRect();
        const scrollable = section.offsetHeight - window.innerHeight;
        const progress =
          scrollable <= 0
            ? 0
            : Math.min(1, Math.max(0, -rect.top / scrollable));

        if (video.duration && !isNaN(video.duration)) {
          const targetTime = Math.min(
            video.duration - 0.05,
            Math.max(0, progress * video.duration)
          );
          requestVideoSeek(targetTime);
        }

        // Hero initial text fade (0.00 to 0.35)
        if (heroTextRef.current) {
          const opacity = Math.max(0, Math.min(1, 1 - progress / 0.35));
          heroTextRef.current.style.opacity = String(opacity);
          heroTextRef.current.style.transform = `translateY(${(1 - opacity) * 16}px)`;
          heroTextRef.current.style.pointerEvents = opacity > 0.05 ? "auto" : "none";
        }

        if (progressFillRef.current) {
          progressFillRef.current.style.transform = `scaleX(${progress})`;
        }

        if (powerReadoutRef.current) {
          const pwr = 88.5 + Math.sin(progress * Math.PI * 2) * 7.5;
          powerReadoutRef.current.textContent = pwr.toFixed(1) + "%";
        }

        if (seqReadoutRef.current) {
          const frameNum = Math.min(100, Math.floor(progress * 100) + 1);
          seqReadoutRef.current.textContent = `SEQ ${String(frameNum).padStart(3, "0")} / 100`;
        }
      });
    };

    const video = videoRef.current;
    if (video) {
      video.addEventListener("seeked", onSeeked);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScroll);
      if (video) {
        video.removeEventListener("seeked", onSeeked);
      }
    };
  }, []);

  return (
    <section id="intro" ref={sectionRef} className="phase-scroll relative">
      <div
        className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-black flex items-center justify-center"
        style={{ willChange: "transform", transform: "translateZ(0)" }}
      >
        <video
          ref={videoRef}
          src="/1st.mp4"
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-contain pointer-events-none select-none scale-[0.90] md:scale-[0.82]"
          style={{ willChange: "transform" }}
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
            Phase 01 // Systems Initialization &mdash; Ready
          </span>
        </div>

        <div className="pointer-events-none absolute right-6 top-20 z-10 flex items-center gap-3 md:right-10 md:top-24">
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-zinc-400">
            Optic Matrix
          </span>
          <span
            ref={powerReadoutRef}
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#d4a22f]"
          >
            98.5%
          </span>
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 rounded-full bg-[#d4a22f] shadow-[0_0_10px_rgba(212,162,47,0.85)] animate-pulse"
          />
        </div>

        {/* Center / Bottom Cinematic Hero Content */}
        <div
          ref={heroTextRef}
          className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-start gap-4 px-6 pb-24 md:px-12 md:pb-28"
          style={{ transition: "opacity 80ms linear, transform 80ms linear" }}
        >
          <EyebrowBadge>MARK LXXXV // CHINMAYA.DEV // PHASE 01</EyebrowBadge>

          <h1 className="max-w-[14ch] text-5xl font-semibold leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl">
            I am{" "}
            <span className="font-telma font-bold text-[#d4a22f] tracking-normal capitalize">
              Chinmaya Garnaik.
            </span>
          </h1>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-white font-mono text-xs uppercase tracking-wider">
              Full-Stack AI Engineer
            </span>
            <span className="text-zinc-500 font-mono text-xs">/ System Core</span>
          </div>

          <p className="max-w-[44ch] font-sans text-sm leading-relaxed text-zinc-400 md:text-base">
            Engineering autonomous agent systems, neural interfaces, and scalable full-stack architectures &mdash; front to back.
          </p>

          <div className="flex items-center gap-2 pt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500">
            <ArrowDown size={14} className="animate-bounce text-[#d4a22f]" />
            <span>Scroll down to engage Phase 02</span>
          </div>
        </div>

        {/* Bottom Sequence Scrubber */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
          <div className="mx-6 mb-3 h-px bg-white/10 md:mx-10">
            <div
              ref={progressFillRef}
              className="h-full origin-left bg-[#d4a22f]"
              style={{ transform: "scaleX(0)", transition: "transform 80ms linear" }}
            />
          </div>
          <div className="mx-6 flex items-center justify-between pb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500 md:mx-10">
            <span ref={seqReadoutRef}>SEQ 001 / 100</span>
            <span>PHASE 01 // INTRO SEQUENCE</span>
            <span>Scroll &darr;</span>
          </div>
        </div>

        {/* Loading Overlay */}
        {!loaded && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-5 bg-black px-6">
            <EyebrowBadge>CHINMAYA.DEV // BOOTING</EyebrowBadge>
            <div className="h-px w-60 bg-white/10 md:w-80">
              <div className="h-full w-full bg-[#d4a22f] animate-pulse" />
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">
              Streaming Optical Sequence
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
