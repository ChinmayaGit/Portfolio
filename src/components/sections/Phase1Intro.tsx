import React, { useCallback, useEffect, useRef } from "react";
import { EyebrowBadge } from "../ui/EyebrowBadge";
import { HudFrame } from "../ui/HudFrame";
import { ArrowDown, ChevronDown } from "lucide-react";

import { FRAME_COUNT } from "../../constants/frameManifest";
import { frameCache, loadSingleFrame } from "../../utils/frameLoader";

export { FRAME_COUNT };

export const Phase1Intro: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroTextRef = useRef<HTMLDivElement | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);
  const powerReadoutRef = useRef<HTMLSpanElement | null>(null);
  const seqReadoutRef = useRef<HTMLSpanElement | null>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement | null>(null);

  const tickingRef = useRef(false);
  const lastFrameRef = useRef(-1);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let img = frameCache.intro[index];
    if (!img || !img.complete || !img.naturalWidth) {
      loadSingleFrame("intro", index);
      for (let offset = 1; offset < FRAME_COUNT; offset++) {
        if (index - offset >= 0) {
          const prev = frameCache.intro[index - offset];
          if (prev && prev.complete && prev.naturalWidth) {
            img = prev;
            break;
          }
        }
        if (index + offset < FRAME_COUNT) {
          const next = frameCache.intro[index + offset];
          if (next && next.complete && next.naturalWidth) {
            img = next;
            break;
          }
        }
      }
    }

    if (!img || !img.complete || !img.naturalWidth) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const cw = canvas.width;
    const ch = canvas.height;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = cw / ch;

    const isMobile = window.innerWidth <= 768;
    // Zoom out so 1280x720 frames stay crisp without pixelation or stretching
    const zoomFactor = isMobile ? 0.90 : 0.80;

    let drawW: number;
    let drawH: number;
    if (canvasRatio > imgRatio) {
      drawH = ch * zoomFactor;
      drawW = drawH * imgRatio;
    } else {
      drawW = cw * zoomFactor;
      drawH = drawW / imgRatio;
    }

    const maxDrawW = img.naturalWidth * (window.devicePixelRatio || 1) * 1.2;
    if (drawW > maxDrawW && !isMobile) {
      drawW = maxDrawW;
      drawH = drawW / imgRatio;
    }

    const drawX = (cw - drawW) / 2;
    const drawY = (ch - drawH) / 2;

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, cw, ch);
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
    let cancelled = false;
    loadSingleFrame("intro", 0).then(() => {
      if (!cancelled) {
        drawFrame(0);
        lastFrameRef.current = 0;
      }
    });
    return () => {
      cancelled = true;
    };
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

        // Hero initial text fade (stays 100% solid through SEQ 40+, fades out smoothly towards SEQ 75-84)
        if (heroTextRef.current) {
          let opacity = 1;
          if (progress > 0.40) {
            opacity = Math.max(0, Math.min(1, 1 - (progress - 0.40) / 0.30));
          }
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

        if (scrollIndicatorRef.current) {
          scrollIndicatorRef.current.style.opacity = progress < 0.92 ? "1" : "0";
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
        className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-black"
        style={{ willChange: "transform", transform: "translateZ(0)" }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ willChange: "contents", transform: "translateZ(0)" }}
        />

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
            Phase 01 // Overview &mdash; Live
          </span>
        </div>

        <div className="pointer-events-none absolute right-6 top-20 z-10 flex items-center gap-3 md:right-10 md:top-24">
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-zinc-400">
            System Status
          </span>
          <span
            ref={powerReadoutRef}
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#d4a22f]"
          >
            98.5%
          </span>
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-[#d4a22f] shadow-[0_0_10px_rgba(212,162,47,0.85)] animate-pulse" />
        </div>

        {/* Hero Initial State Content */}
        <div
          ref={heroTextRef}
          className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-start gap-3 sm:gap-4 px-4 sm:px-6 md:px-12 pb-20 sm:pb-24 md:pb-28"
          style={{ transition: "opacity 80ms linear, transform 80ms linear" }}
        >
          <EyebrowBadge>PORTFOLIO // CHINMAYA.DEV // PHASE 01</EyebrowBadge>

          <h1 className="max-w-[14ch] text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.98] tracking-tight text-white">
            I am{" "}
            <span className="font-telma font-bold text-[#d4a22f] tracking-normal capitalize block sm:inline">
              Chinmaya Garnaik.
            </span>
          </h1>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/[0.06] border border-white/10 text-white font-mono text-[11px] sm:text-xs uppercase tracking-wider">
              FULL-STACK DEVELOPER
            </span>
            <span className="text-zinc-500 font-mono text-[11px] sm:text-xs">/ Web &amp; Cloud</span>
          </div>

          <p className="max-w-[44ch] font-sans text-xs leading-relaxed text-zinc-400 sm:text-sm md:text-base">
            Engineering scalable web applications, robust APIs, and modern cloud architectures &mdash; front to back.
          </p>

          <div className="flex items-center gap-2 pt-0.5 sm:pt-1 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-zinc-500">
            <ArrowDown size={13} className="animate-bounce text-[#d4a22f] shrink-0 sm:w-3.5 sm:h-3.5" />
            <span>Scroll down to engage Phase 02</span>
          </div>
        </div>

        {/* Scroll Arrow Indicator: Below Center, Blinking while scroll is left */}
        <div
          ref={scrollIndicatorRef}
          className="pointer-events-none absolute bottom-14 sm:bottom-7 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-0.5 transition-opacity duration-300 animate-pulse"
          style={{ opacity: 1 }}
        >
          <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.28em] text-zinc-400/60 hidden sm:inline">
            Scroll
          </span>
          <ChevronDown size={18} className="text-[#d4a22f]/80 animate-bounce" />
        </div>

        {/* Bottom Sequence Scrubber */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
          <div className="mx-4 mb-2.5 sm:mb-3 h-px bg-white/10 sm:mx-6 md:mx-10">
            <div
              ref={progressFillRef}
              className="h-full origin-left bg-[#d4a22f]"
              style={{ transform: "scaleX(0)", transition: "transform 80ms linear" }}
            />
          </div>
          <div className="mx-4 flex items-center justify-between pb-3 sm:pb-4 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.28em] text-zinc-500 sm:mx-6 md:mx-10">
            <span ref={seqReadoutRef}>SEQ 001 / {FRAME_COUNT}</span>
            <span className="hidden xs:inline">PHASE 01 // INTRO SEQUENCE</span>
            <span>Scroll &darr;</span>
          </div>
        </div>
      </div>
    </section>
  );
};
