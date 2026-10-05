import React, { useCallback, useEffect, useRef, useState } from "react";
import { EyebrowBadge } from "../ui/EyebrowBadge";
import { HudFrame } from "../ui/HudFrame";
import { ArrowDown } from "lucide-react";

export const FRAME_COUNT = 150;
export const framePath = (n: number) =>
  `/frames/frame-${String(n).padStart(3, "0")}.jpg`;

export const Phase1Intro: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroTextRef = useRef<HTMLDivElement | null>(null);
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

  useEffect(() => {
    drawFrame(0);
    lastFrameRef.current = 0;
  }, [drawFrame]);

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

        // Hero initial text fade (0.00 to 0.40)
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
          seqReadoutRef.current.textContent = `SEQ ${String(frameIndex + 1).padStart(3, "0")} / ${FRAME_COUNT}`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [drawFrame]);

  return (
    <section id="intro" ref={sectionRef} className="phase-scroll relative">
      <div
        className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-[#0a0a0b]"
        style={{ willChange: "transform", transform: "translateZ(0)" }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ willChange: "contents", transform: "translateZ(0)" }}
        />

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
            Phase 01 // System Core &mdash; Live
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

        {/* Hero Initial State Content */}
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
            <span ref={seqReadoutRef}>SEQ 001 / {FRAME_COUNT}</span>
            <span>PHASE 01 // INTRO SEQUENCE</span>
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
