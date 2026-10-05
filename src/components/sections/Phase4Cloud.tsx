import React, { useCallback, useEffect, useRef, useState } from "react";
import { EyebrowBadge } from "../ui/EyebrowBadge";
import { HudFrame } from "../ui/HudFrame";
import { Cloud, Server, CheckCircle2 } from "lucide-react";

export const FRAME_COUNT = 150;
export const framePath = (n: number) =>
  `/cloud/ezgif-frame-${String(n).padStart(3, "0")}.jpg`;

export const Phase4Cloud: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const leftTextRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);
  const powerReadoutRef = useRef<HTMLSpanElement | null>(null);
  const seqReadoutRef = useRef<HTMLSpanElement | null>(null);

  const framesRef = useRef<HTMLImageElement[]>([]);
  const tickingRef = useRef(false);
  const lastFrameRef = useRef(-1);

  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const imgs: HTMLImageElement[] = new Array(FRAME_COUNT);
    let loadedCount = 0;

    const registerLoaded = () => {
      if (cancelled) return;
      loadedCount++;
      setLoadProgress(loadedCount / FRAME_COUNT);
      if (loadedCount >= 8 && !loaded) {
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

    loadSingleFrame(0, true);

    for (let i = 4; i < FRAME_COUNT; i += 4) {
      loadSingleFrame(i);
    }

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

        // Left text animation (0.04 to 0.96)
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

        // Right cloud card animation
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
          const pwr = 98.7 + Math.sin(progress * Math.PI * 2) * 1.3;
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
    <section id="cloud" ref={sectionRef} className="phase-scroll relative">
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
              "radial-gradient(120% 85% at 45% 45%, transparent 35%, rgba(0,0,0,0.35) 65%, #000000 100%)",
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
            Phase 04 // Cloud Infrastructure &mdash; Live
          </span>
        </div>

        <div className="pointer-events-none absolute right-6 top-20 z-10 flex items-center gap-3 md:right-10 md:top-24">
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-zinc-400">
            Cloud Mesh
          </span>
          <span
            ref={powerReadoutRef}
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#d4a22f]"
          >
            98.7%
          </span>
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-[#d4a22f] shadow-[0_0_10px_rgba(212,162,47,0.85)] animate-pulse" />
        </div>

        {/* Left Side: Cloud Developer Heading */}
        <div
          ref={leftTextRef}
          className="pointer-events-none absolute bottom-24 left-6 z-10 hidden max-w-[55%] flex-col gap-4 md:flex md:bottom-28 md:left-12"
          style={{ opacity: 0, transition: "opacity 80ms linear, transform 80ms linear" }}
        >
          <span className="inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.3em] text-[#d4a22f]">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-[#d4a22f] shadow-[0_0_10px_rgba(212,162,47,0.85)]" />
            Phase 04 &mdash; Multi-Cloud Scale
          </span>
          <h2 className="font-sans font-semibold leading-[0.88] tracking-tighter text-white text-[clamp(3.5rem,7.5vw,7.5rem)]">
            Cloud
            <br />
            <span className="font-telma font-bold text-[#d4a22f] capitalize">Developer</span>
          </h2>
          <p className="max-w-[38ch] font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
            High-availability cloud architectures, automated DevOps, and distributed scale.
          </p>
        </div>

        {/* Right Side: Elevated Glassmorphic Cloud Card */}
        <div
          ref={cardRef}
          className="pointer-events-none absolute right-6 top-[12%] sm:top-[14%] md:top-[16%] lg:top-[18%] z-20 w-[420px] max-w-[92vw] md:right-14"
          style={{ opacity: 0, transition: "opacity 80ms linear, transform 80ms linear" }}
        >
          <div className="card-surface pointer-events-auto p-5 md:p-6 space-y-3.5 border border-[#d4a22f]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#d4a22f] flex items-center gap-1.5">
                <Cloud size={14} />
                PHASE 04 // CLOUD INFRASTRUCTURE
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#d4a22f]/15 text-[#d4a22f] border border-[#d4a22f]/30">
                ACTIVE
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white flex items-center gap-2.5">
              <Server size={26} className="text-[#d4a22f]" />
              Cloud Developer
            </h2>

            <p className="text-zinc-300 text-xs md:text-sm leading-relaxed">
              Architecting secure, high-availability multi-cloud infrastructure across AWS, Oracle Cloud Infrastructure (OCI), and Azure with automated containerized pipelines.
            </p>

            <div className="space-y-2 pt-2 border-t border-white/10 font-mono text-xs">
              <div className="flex items-center justify-between text-zinc-400">
                <span>Architecture</span>
                <span className="text-white font-medium flex items-center gap-1">
                  <CheckCircle2 size={12} className="text-[#d4a22f]" />
                  AWS Solutions Architect
                </span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>Data Pipelines</span>
                <span className="text-white font-medium flex items-center gap-1">
                  <CheckCircle2 size={12} className="text-[#d4a22f]" />
                  AWS Certified Data Engineer
                </span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>Cloud Platforms</span>
                <span className="text-[#d4a22f] font-semibold">AWS &bull; OCI &bull; Azure &bull; K8s</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
              <span>STATUS: CLOUD DEVOPS ARMED</span>
              <span className="text-[#d4a22f]">PHASE 04</span>
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
            <span ref={seqReadoutRef}>SEQ 001 / {FRAME_COUNT}</span>
            <span>PHASE 04 // CLOUD INFRASTRUCTURE</span>
            <span>Scroll &darr;</span>
          </div>
        </div>

        {/* Loading Overlay */}
        {!loaded && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-5 bg-[#0a0a0b] px-6">
            <EyebrowBadge>CLOUD FABRIC // CONNECTING</EyebrowBadge>
            <div className="h-px w-60 bg-white/10 md:w-80">
              <div
                className="h-full bg-[#d4a22f] transition-[width] duration-150 ease-out"
                style={{ width: `${Math.round(loadProgress * 100)}%` }}
              />
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">
              Loading Cloud Sequence &nbsp;&middot;&nbsp; {Math.round(loadProgress * 100)}%
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
