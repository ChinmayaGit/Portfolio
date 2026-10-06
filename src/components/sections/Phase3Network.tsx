import React, { useCallback, useEffect, useRef } from "react";
import { HudFrame } from "../ui/HudFrame";
import { Shield, Lock, CheckCircle2 } from "lucide-react";

import { FRAME_COUNT } from "../../constants/frameManifest";
import { frameCache, loadSingleFrame } from "../../utils/frameLoader";

export { FRAME_COUNT };

export const Phase3Network: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const leftTextRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);
  const powerReadoutRef = useRef<HTMLSpanElement | null>(null);
  const seqReadoutRef = useRef<HTMLSpanElement | null>(null);

  const tickingRef = useRef(false);
  const lastFrameRef = useRef(-1);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let img = frameCache.security[index];
    if (!img || !img.complete || !img.naturalWidth) {
      loadSingleFrame("security", index);
      for (let offset = 1; offset < FRAME_COUNT; offset++) {
        if (index - offset >= 0) {
          const prev = frameCache.security[index - offset];
          if (prev && prev.complete && prev.naturalWidth) {
            img = prev;
            break;
          }
        }
        if (index + offset < FRAME_COUNT) {
          const next = frameCache.security[index + offset];
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
    // Zoom factor: keep crisp and appropriately sized
    const zoomFactor = isMobile ? 0.95 : 0.80;

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

    let drawX: number;
    let drawY: number;

    if (isMobile) {
      // In mobile portrait, the detail card is displayed in the upper region.
      // Position the animation in the lower half so it is completely visible and not covered by the card.
      drawX = (cw - drawW) / 2;

      const dpr = window.devicePixelRatio || 1;
      const cardHeightCss = cardRef.current?.offsetHeight || 330;
      const cardTopCss = 56; // top-14 in CSS px
      const cardBottomPx = (cardTopCss + cardHeightCss) * dpr;
      const bottomReservedPx = 68 * dpr; // reserved space for bottom dock & controls
      const availableBottomPx = ch - bottomReservedPx;

      if (availableBottomPx > cardBottomPx + drawH) {
        // Center the animation in the lower area between the card and the bottom dock
        const lowerCenterPx = cardBottomPx + (availableBottomPx - cardBottomPx) / 2;
        drawY = lowerCenterPx - drawH / 2;
      } else {
        // Fallback for compact viewports: anchor near the bottom above the dock
        drawY = Math.max(cardBottomPx + 6 * dpr, ch - drawH - (20 * dpr));
      }
    } else {
      drawX = (cw - drawW) / 2;
      drawY = (ch - drawH) / 2;
    }

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
    loadSingleFrame("security", 0).then(() => {
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

        // Right network card animation
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
          seqReadoutRef.current.textContent = `SEQ ${String(frameIndex + 1).padStart(3, "0")} / ${FRAME_COUNT}`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [drawFrame]);

  return (
    <section id="network" ref={sectionRef} className="phase-scroll relative">
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
          className="pointer-events-none absolute inset-0 hidden sm:block"
          style={{
            background:
              "radial-gradient(120% 85% at 50% 45%, transparent 35%, rgba(0,0,0,0.35) 65%, #000000 100%)",
          }}
        />

        {/* Corner HUD Framing Elements */}
        <div className="pointer-events-none absolute left-6 top-24 text-[#d4a22f] md:left-10 md:top-28 hidden sm:block">
          <HudFrame corner="tl" size={26} />
        </div>
        <div className="pointer-events-none absolute right-6 top-24 text-[#d4a22f] md:right-10 md:top-28 hidden sm:block">
          <HudFrame corner="tr" size={26} />
        </div>
        <div className="pointer-events-none absolute bottom-14 left-6 text-[#d4a22f] md:bottom-16 md:left-10 hidden sm:block">
          <HudFrame corner="bl" size={26} />
        </div>
        <div className="pointer-events-none absolute bottom-14 right-6 text-[#d4a22f] md:bottom-16 md:right-10 hidden sm:block">
          <HudFrame corner="br" size={26} />
        </div>

        {/* Top Status Indicators */}
        <div className="pointer-events-none absolute left-6 top-20 z-10 hidden sm:flex items-center gap-2 md:left-10 md:top-24">
          <div className="h-px w-8 bg-[#d4a22f]/60" />
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-zinc-400">
            Phase 03 // Cyber &amp; Network Systems &mdash; Live
          </span>
        </div>

        <div className="pointer-events-none absolute right-6 top-20 z-10 hidden sm:flex items-center gap-3 md:right-10 md:top-24">
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-zinc-400">
            Security Index
          </span>
          <span
            ref={powerReadoutRef}
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#d4a22f]"
          >
            95.8%
          </span>
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-[#d4a22f] shadow-[0_0_10px_rgba(212,162,47,0.85)] animate-pulse" />
        </div>

        {/* Left Side: Network Engineer Heading */}
        <div
          ref={leftTextRef}
          className="pointer-events-none absolute bottom-24 left-6 z-10 hidden max-w-[55%] flex-col gap-4 md:flex md:bottom-28 md:left-12"
          style={{ opacity: 0, transition: "opacity 80ms linear, transform 80ms linear" }}
        >
          <span className="inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.3em] text-[#d4a22f]">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-[#d4a22f] shadow-[0_0_10px_rgba(212,162,47,0.85)]" />
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
          className="pointer-events-none absolute left-3 right-3 sm:left-auto sm:right-6 md:right-14 top-14 sm:top-[14%] md:top-[16%] lg:top-[18%] z-20 w-auto sm:w-[420px] max-w-full sm:max-w-[92vw]"
          style={{ opacity: 0, transition: "opacity 80ms linear, transform 80ms linear" }}
        >
          <div className="card-surface pointer-events-auto p-3.5 sm:p-5 md:p-6 space-y-2.5 sm:space-y-3.5 border border-[#d4a22f]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#d4a22f] flex items-center gap-1.5">
                <Shield size={14} />
                PHASE 03 // CYBER RISK &amp; GOVERNANCE
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#d4a22f]/15 text-[#d4a22f] border border-[#d4a22f]/30">
                SECURE
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white flex items-center gap-2 sm:gap-2.5">
              <Lock size={24} className="text-[#d4a22f] sm:w-[26px] sm:h-[26px]" />
              Network Engineer
            </h2>

            <p className="text-zinc-300 text-xs md:text-sm leading-relaxed">
              Enterprise Cyber Risk &amp; IAM engineering, specializing in Zero Trust network governance, SailPoint Identity Security Cloud (ISC), privileged access, and Active Directory federation.
            </p>

            <div className="space-y-2 pt-2 border-t border-white/10 font-mono text-xs">
              <div className="flex items-center justify-between text-zinc-400">
                <span>Identity Governance</span>
                <span className="text-white font-medium flex items-center gap-1">
                  <CheckCircle2 size={12} className="text-[#d4a22f]" />
                  SailPoint ISC Certified
                </span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>Cyber Defense</span>
                <span className="text-white font-medium flex items-center gap-1">
                  <CheckCircle2 size={12} className="text-[#d4a22f]" />
                  Cisco CyberOps Associate
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
            <span ref={seqReadoutRef}>SEQ 001 / {FRAME_COUNT}</span>
            <span>PHASE 03 // CYBER DEFENSE SEQUENCE</span>
            <span>Scroll &darr;</span>
          </div>
        </div>
      </div>
    </section>
  );
};
