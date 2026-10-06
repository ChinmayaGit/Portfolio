import React, { useEffect, useRef, useState } from "react";
import { EyebrowBadge } from "../ui/EyebrowBadge";
import { HudFrame } from "../ui/HudFrame";
import { Shield, Lock, CheckCircle2 } from "lucide-react";

export const Phase3Network: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const leftTextRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
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

        // Left branding animation (fades in 0.04-0.18, fades out 0.82-0.96)
        if (leftTextRef.current) {
          let op = 0;
          if (progress >= 0.04 && progress <= 0.96) {
            if (progress < 0.18) op = (progress - 0.04) / 0.14;
            else if (progress > 0.82) op = (0.96 - progress) / 0.14;
            else op = 1;
          }
          leftTextRef.current.style.opacity = String(Math.max(0, Math.min(1, op)));
          leftTextRef.current.style.transform = `translateY(${(1 - op) * 14}px)`;
        }

        // Right Network card animation (fades in 0.06-0.20, fades out 0.80-0.94)
        if (cardRef.current) {
          let op = 0;
          if (progress >= 0.06 && progress <= 0.94) {
            if (progress < 0.20) op = (progress - 0.06) / 0.14;
            else if (progress > 0.80) op = (0.94 - progress) / 0.14;
            else op = 1;
          }
          cardRef.current.style.opacity = String(Math.max(0, Math.min(1, op)));
          cardRef.current.style.transform = `translateY(${(1 - op) * 16}px)`;
          cardRef.current.style.pointerEvents = op > 0.1 ? "auto" : "none";
        }

        if (progressFillRef.current) {
          progressFillRef.current.style.transform = `scaleX(${progress})`;
        }

        if (powerReadoutRef.current) {
          const pwr = 95.8 + Math.sin(progress * Math.PI * 2) * 3.8;
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
    <section id="network" ref={sectionRef} className="phase-scroll relative">
      <div
        className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-black flex items-center justify-center"
        style={{ willChange: "transform", transform: "translateZ(0)" }}
      >
        <video
          ref={videoRef}
          src="/Security.mp4"
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
            Phase 03 // Cyber &amp; Network Systems &mdash; Live
          </span>
        </div>

        <div className="pointer-events-none absolute right-6 top-20 z-10 flex items-center gap-3 md:right-10 md:top-24">
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-zinc-400">
            Security Index
          </span>
          <span
            ref={powerReadoutRef}
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#d4a22f]"
          >
            95.8%
          </span>
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 rounded-full bg-[#d4a22f] shadow-[0_0_10px_rgba(212,162,47,0.85)] animate-pulse"
          />
        </div>

        {/* Left Side: Network Engineer Heading */}
        <div
          ref={leftTextRef}
          className="pointer-events-none absolute bottom-24 left-6 z-10 hidden max-w-[55%] flex-col gap-4 md:flex md:bottom-28 md:left-12"
          style={{ opacity: 0, transition: "opacity 80ms linear, transform 80ms linear" }}
        >
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
        <div
          ref={cardRef}
          className="pointer-events-none absolute right-6 top-[12%] sm:top-[14%] md:top-[16%] lg:top-[18%] z-20 w-[420px] max-w-[92vw] md:right-14"
          style={{ opacity: 0, transition: "opacity 80ms linear, transform 80ms linear" }}
        >
          <div className="card-surface pointer-events-auto p-5 md:p-6 space-y-3.5 border border-[#d4a22f]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
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
            <span>PHASE 03 // CYBER DEFENSE SEQUENCE</span>
            <span>Scroll &darr;</span>
          </div>
        </div>

        {/* Sleek Loading Overlay */}
        {!loaded && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 bg-black/90 px-6 backdrop-blur-sm">
            <EyebrowBadge>CYBER CORE // VERIFYING</EyebrowBadge>
            <div className="h-1 w-48 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-full bg-[#d4a22f] animate-pulse" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
