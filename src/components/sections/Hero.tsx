import React, { useCallback, useEffect, useRef, useState } from "react";
import { EyebrowBadge } from "../ui/EyebrowBadge";
import { HudFrame } from "../ui/HudFrame";
import { Cloud, Shield, ArrowDown } from "lucide-react";

export const FRAME_COUNT = 150;
export const framePath = (n: number) =>
  `/frames/frame-${String(n).padStart(3, "0")}.jpg`;

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Direct DOM references for 120 FPS buttery-smooth scroll transformations
  const heroTextRef = useRef<HTMLDivElement | null>(null);
  const bigLeftTextRef = useRef<HTMLDivElement | null>(null);
  const cloudCardRef = useRef<HTMLDivElement | null>(null);
  const networkCardRef = useRef<HTMLDivElement | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);
  const powerReadoutRef = useRef<HTMLSpanElement | null>(null);
  const seqReadoutRef = useRef<HTMLSpanElement | null>(null);

  const framesRef = useRef<HTMLImageElement[]>([]);
  const tickingRef = useRef(false);
  const lastFrameRef = useRef(-1);

  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Fast-start frame loader with keyframe prioritization
  useEffect(() => {
    let cancelled = false;
    const imgs: HTMLImageElement[] = new Array(FRAME_COUNT);
    let loadedCount = 0;

    const registerLoaded = () => {
      if (cancelled) return;
      loadedCount++;
      setLoadProgress(loadedCount / FRAME_COUNT);
      if (loadedCount >= 10 && !loaded) {
        setLoaded(true);
      }
    };

    const loadSingleFrame = (idx: number, isCritical = false) => {
      const img = new Image();
      img.src = framePath(idx + 1);
      img.onload = () => {
        if (cancelled) return;
        imgs[idx] = img;
        registerLoaded();
        if (isCritical && idx === 0) {
          drawFrame(0);
        } else if (lastFrameRef.current === idx) {
          drawFrame(idx);
        }
      };
      img.onerror = () => {
        if (cancelled) return;
        imgs[idx] = img;
        registerLoaded();
      };
    };

    // 1. Immediately request the 1st frame
    loadSingleFrame(0, true);

    // 2. Request keyframes every 4th frame for instant scrub response
    for (let i = 4; i < FRAME_COUNT; i += 4) {
      loadSingleFrame(i);
    }

    // 3. Load all remaining frames
    for (let i = 1; i < FRAME_COUNT; i++) {
      if (i % 4 !== 0) {
        loadSingleFrame(i);
      }
    }

    framesRef.current = imgs;

    return () => {
      cancelled = true;
    };
  }, []);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Retrieve requested image or fallback to nearest loaded frame
    let img = framesRef.current[index];
    if (!img || !img.complete || !img.naturalWidth) {
      for (let offset = 1; offset < FRAME_COUNT; offset++) {
        if (index - offset >= 0) {
          const prev = framesRef.current[index - offset];
          if (prev && prev.complete && prev.naturalWidth) {
            img = prev;
            break;
          }
        }
        if (index + offset < FRAME_COUNT) {
          const next = framesRef.current[index + offset];
          if (next && next.complete && next.naturalWidth) {
            img = next;
            break;
          }
        }
      }
    }

    if (!img || !img.complete || !img.naturalWidth) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = cw / ch;

    let drawW: number;
    let drawH: number;
    if (canvasRatio > imgRatio) {
      drawW = cw;
      drawH = cw / imgRatio;
    } else {
      drawH = ch;
      drawW = ch * imgRatio;
    }

    if (window.innerWidth <= 768) {
      drawW *= 1.25;
      drawH *= 1.25;
    }

    const drawX = (cw - drawW) / 2;
    const drawY = (ch - drawH) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    drawFrame(lastFrameRef.current >= 0 ? lastFrameRef.current : 0);
  }, [drawFrame]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  // Initial render when ready
  useEffect(() => {
    drawFrame(0);
    lastFrameRef.current = 0;
  }, [drawFrame]);

  // Scroll handler without blocking
  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      requestAnimationFrame(() => {
        tickingRef.current = false;
        const section = sectionRef.current;
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const scrollable = section.offsetHeight - window.innerHeight;
        const progress =
          scrollable <= 0
            ? 0
            : Math.min(1, Math.max(0, -rect.top / scrollable));

        const frameIndex = Math.min(
          FRAME_COUNT - 1,
          Math.floor(progress * FRAME_COUNT)
        );

        if (frameIndex !== lastFrameRef.current) {
          lastFrameRef.current = frameIndex;
          drawFrame(frameIndex);
        }

        // ==============================================================
        // 1st SCROLL: Hero Initial State (Full Stack Developer)
        // Range: 0.00 to 0.18
        // ==============================================================
        if (heroTextRef.current) {
          const opacity = Math.max(0, Math.min(1, 1 - progress / 0.14));
          heroTextRef.current.style.opacity = String(opacity);
          heroTextRef.current.style.transform = `translateY(${(1 - opacity) * 16}px)`;
          heroTextRef.current.style.pointerEvents = opacity > 0.05 ? "auto" : "none";
        }

        // ==============================================================
        // Brand Title on Left: Visible during Stage 2 & 3
        // Range: 0.16 to 0.90
        // ==============================================================
        if (bigLeftTextRef.current) {
          let op = 0;
          if (progress >= 0.16 && progress <= 0.90) {
            if (progress < 0.24) op = (progress - 0.16) / 0.08;
            else if (progress > 0.82) op = (0.90 - progress) / 0.08;
            else op = 1;
          }
          bigLeftTextRef.current.style.opacity = String(Math.max(0, Math.min(1, op)));
          bigLeftTextRef.current.style.transform = `translateY(${(1 - op) * 14}px)`;
        }

        // ==============================================================
        // 2nd SCROLL: Cloud Developer
        // Range: 0.18 to 0.54 (Peak: 0.26 - 0.46)
        // ==============================================================
        if (cloudCardRef.current) {
          let op = 0;
          if (progress >= 0.18 && progress <= 0.54) {
            if (progress < 0.26) op = (progress - 0.18) / 0.08;
            else if (progress > 0.46) op = (0.54 - progress) / 0.08;
            else op = 1;
          }
          cloudCardRef.current.style.opacity = String(Math.max(0, Math.min(1, op)));
          cloudCardRef.current.style.transform = `translateY(${(1 - op) * 16}px)`;
          cloudCardRef.current.style.pointerEvents = op > 0.05 ? "auto" : "none";
        }

        // ==============================================================
        // 3rd SCROLL: Network Engineer
        // Range: 0.54 to 0.88 (Peak: 0.62 - 0.80)
        // ==============================================================
        if (networkCardRef.current) {
          let op = 0;
          if (progress >= 0.54 && progress <= 0.88) {
            if (progress < 0.62) op = (progress - 0.54) / 0.08;
            else if (progress > 0.80) op = (0.88 - progress) / 0.08;
            else op = 1;
          }
          networkCardRef.current.style.opacity = String(Math.max(0, Math.min(1, op)));
          networkCardRef.current.style.transform = `translateY(${(1 - op) * 16}px)`;
          networkCardRef.current.style.pointerEvents = op > 0.05 ? "auto" : "none";
        }

        // Bottom progress scrubber
        if (progressFillRef.current) {
          progressFillRef.current.style.transform = `scaleX(${progress})`;
        }

        // Arc reactor telemetry readout
        if (powerReadoutRef.current) {
          const pwr = 88.5 + Math.sin(progress * Math.PI * 2) * 7.5;
          powerReadoutRef.current.textContent = pwr.toFixed(1) + "%";
        }

        // Live sequence counter
        if (seqReadoutRef.current) {
          seqReadoutRef.current.textContent = `SEQ ${String(frameIndex + 1).padStart(3, "0")} / ${FRAME_COUNT}`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [drawFrame]);

  return (
    <section ref={sectionRef} className="scroll-animation relative">
      <div
        className="sticky top-0 min-h-[100dvh] w-full overflow-hidden bg-[#0a0a0b]"
        style={{ height: "100dvh", willChange: "transform", transform: "translateZ(0)" }}
      >
        {/* Render Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ willChange: "contents", transform: "translateZ(0)" }}
        />

        {/* Ambient Vignette Overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 10%, transparent 30%, rgba(10,10,11,0.45) 70%, rgba(10,10,11,0.85) 100%)",
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
            Telemetry Link &mdash; Live
          </span>
        </div>

        <div className="pointer-events-none absolute right-6 top-20 z-10 flex items-center gap-3 md:right-10 md:top-24">
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-zinc-400">
            Arc Reactor
          </span>
          <span
            ref={powerReadoutRef}
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#d4a22f]"
          >
            88.5%
          </span>
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-[#d4a22f] shadow-[0_0_10px_rgba(212,162,47,0.85)] animate-pulse" />
        </div>

        {/* ============================================================== */}
        {/* 1st PAGE: HERO INITIAL STATE (Full Stack Developer)            */}
        {/* ============================================================== */}
        <div
          ref={heroTextRef}
          className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-start gap-4 px-6 pb-24 md:px-12 md:pb-28"
          style={{ transition: "opacity 80ms linear, transform 80ms linear" }}
        >
          <EyebrowBadge>MARK LXXXV // CHINMAYA.DEV // ONLINE</EyebrowBadge>

          <h1 className="max-w-[14ch] text-5xl font-semibold leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl">
            I am{" "}
            <span className="font-telma font-bold text-[#d4a22f] tracking-normal capitalize">
              Chinmaya Garnaik.
            </span>
          </h1>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-white font-mono text-xs uppercase tracking-wider">
              Full Stack Developer
              Full-Stack AI Engineer
            </span>
            <span className="text-zinc-500 font-mono text-xs">/ System Core</span>
          </div>

          <p className="max-w-[44ch] font-sans text-sm leading-relaxed text-zinc-400 md:text-base">
            Engineering scalable web architectures, pixel-perfect interfaces, and high-concurrency systems &mdash; front to back.
            Engineering autonomous agent systems, neural interfaces, and scalable full-stack architectures &mdash; front to back.
          </p>

          <div className="flex items-center gap-2 pt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500">
            <ArrowDown size={14} className="animate-bounce text-[#d4a22f]" />
            <span>Scroll down to run diagnostic</span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* LEFT SIDE BRANDING (Visible during Scroll 2 & 3)               */}
        {/* LEFT SIDE: Full-Stack AI Engineer (Primary Specialization)     */}
        {/* ============================================================== */}
        <div
          ref={bigLeftTextRef}
          className="pointer-events-none absolute bottom-24 left-6 z-10 hidden max-w-[55%] flex-col gap-4 md:flex md:bottom-28 md:left-12"
          style={{ opacity: 0, transition: "opacity 80ms linear, transform 80ms linear" }}
        >
          <span className="inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.3em] text-[#d4a22f]">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-[#d4a22f] shadow-[0_0_10px_rgba(212,162,47,0.85)]" />
            Protocol &mdash; Mk LXXXV
            Primary Skill &mdash; Mk LXXXV
          </span>
          <h2 className="font-sans font-semibold leading-[0.88] tracking-tighter text-white text-[clamp(3.5rem,7.5vw,7.5rem)]">
            Build
            Full-Stack
            <br />
            with <span className="font-telma font-bold text-[#d4a22f] capitalize">Chinmaya Garnaik</span>
            <span className="font-telma font-bold text-[#d4a22f] capitalize">AI Engineer</span>
          </h2>
          <p className="max-w-[36ch] font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
            Interfaces &amp; products, engineered from front to back.
            Autonomous agent systems, neural interfaces &amp; scalable cloud architectures.
          </p>
        </div>

        {/* ============================================================== */}
        {/* 2nd SCROLL: CLOUD DEVELOPER                                    */}
        {/* ============================================================== */}
        <div
          ref={cloudCardRef}
          className="pointer-events-none absolute right-6 top-[12%] sm:top-[14%] md:top-[16%] lg:top-[18%] z-20 w-[420px] max-w-[92vw] md:right-14"
          style={{ opacity: 0, transition: "opacity 80ms linear, transform 80ms linear" }}
        >
          <div className="card-surface pointer-events-auto p-5 md:p-6 space-y-3.5 border border-[#d4a22f]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#d4a22f] flex items-center gap-1.5">
                <Cloud size={14} />
                PHASE 02 // CLOUD INFRASTRUCTURE
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#d4a22f]/15 text-[#d4a22f] border border-[#d4a22f]/30">
                ACTIVE
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              Cloud Developer
            </h2>

            <p className="text-zinc-300 text-xs md:text-sm leading-relaxed">
              Architecting secure, high-availability multi-cloud infrastructure across AWS, Oracle Cloud Infrastructure (OCI), and Azure with automated containerized pipelines.
            </p>

            <div className="space-y-2 pt-2 border-t border-white/10 font-mono text-xs">
              <div className="flex items-center justify-between text-zinc-400">
                <span>Architecture</span>
                <span className="text-white font-medium">AWS Solutions Architect</span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>Data Pipelines</span>
                <span className="text-white font-medium">AWS Certified Data Engineer</span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>Cloud Platforms</span>
                <span className="text-[#d4a22f] font-semibold">AWS &bull; OCI &bull; Azure</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
              <span>STATUS: CLOUD DEVOPS ARMED</span>
              <span className="text-[#d4a22f]">DIAGNOSTIC 02</span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3rd SCROLL: NETWORK ENGINEER                                   */}
        {/* ============================================================== */}
        <div
          ref={networkCardRef}
          className="pointer-events-none absolute right-6 top-[12%] sm:top-[14%] md:top-[16%] lg:top-[18%] z-20 w-[420px] max-w-[92vw] md:right-14"
          style={{ opacity: 0, transition: "opacity 80ms linear, transform 80ms linear" }}
        >
          <div className="card-surface pointer-events-auto p-5 md:p-6 space-y-3.5 border border-[#d4a22f]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#d4a22f] flex items-center gap-1.5">
                <Shield size={14} />
                PHASE 03 // CYBER & NETWORK SYSTEMS
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#d4a22f]/15 text-[#d4a22f] border border-[#d4a22f]/30">
                SECURE
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              Network Engineer
            </h2>

            <p className="text-zinc-300 text-xs md:text-sm leading-relaxed">
              Enterprise Cyber Risk & IAM at Deloitte, specializing in Zero Trust network governance, SailPoint Identity Security Cloud (ISC), privileged access, and Active Directory federation.
            </p>

            <div className="space-y-2 pt-2 border-t border-white/10 font-mono text-xs">
              <div className="flex items-center justify-between text-zinc-400">
                <span>Enterprise Role</span>
                <span className="text-white font-medium">Analyst @ Deloitte</span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>Identity Governance</span>
                <span className="text-white font-medium">SailPoint ISC Certified</span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>Security Model</span>
                <span className="text-[#d4a22f] font-semibold">Zero Trust &bull; RBAC &bull; IAM</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
              <span>STATUS: PROTOCOLS VERIFIED</span>
              <span className="text-[#d4a22f]">DIAGNOSTIC 03</span>
            </div>
          </div>
        </div>

        {/* Bottom Sequence Scrubber & Status */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
          <div className="mx-6 mb-3 h-px bg-white/10 md:mx-10">
            <div
              ref={progressFillRef}
              className="h-full origin-left bg-[#d4a22f]"
              style={{ transform: "scaleX(0)", transition: "transform 80ms linear" }}
            />
          </div>
          <div className="mx-6 flex items-center justify-between pb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500 md:mx-10">
            <span ref={seqReadoutRef}>SEQ 001 / {FRAME_COUNT}</span>
            <span>J.A.R.V.I.S. // DIAGNOSTIC</span>
            <span>Scroll &darr;</span>
          </div>
        </div>

        {/* Loading Overlay */}
        {!loaded && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-5 bg-[#0a0a0b] px-6">
            <EyebrowBadge>CHINMAYA.DEV // BOOTING</EyebrowBadge>
            <div className="h-px w-60 bg-white/10 md:w-80">
              <div
                className="h-full bg-[#d4a22f] transition-[width] duration-150 ease-out"
                style={{ width: `${Math.round(loadProgress * 100)}%` }}
              />
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">
              Loading Diagnostics &nbsp;&middot;&nbsp; {Math.round(loadProgress * 100)}%
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
