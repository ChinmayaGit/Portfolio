import React, { useRef, useEffect } from 'react';
import { useSmoothScroll } from '../smooth-scroll/SmoothScrollProvider';

interface ElasticStringWaveProps {
  className?: string;
  stringCount?: number;
  height?: number;
}

export const ElasticStringWave: React.FC<ElasticStringWaveProps> = ({
  className = '',
  stringCount = 3,
  height = 90,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, prevX: -1000, prevY: -1000, speed: 0 });

  const { getVelocity } = useSmoothScroll();
  const getVelocityRef = useRef(getVelocity);
  getVelocityRef.current = getVelocity;
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = container.clientWidth;
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    // Handle Resize
    const handleResize = () => {
      if (!container || !canvas) return;
      width = container.clientWidth;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      initStrings();
    };

    window.addEventListener('resize', handleResize);

    // Track mouse speed & intersection
    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      const dx = currentX - mouseRef.current.prevX;
      const dy = currentY - mouseRef.current.prevY;
      mouseRef.current.speed = Math.sqrt(dx * dx + dy * dy);

      mouseRef.current.x = currentX;
      mouseRef.current.y = currentY;
      mouseRef.current.prevX = currentX;
      mouseRef.current.prevY = currentY;
    };

    const handlePointerLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerleave', handlePointerLeave);

    // Physics String Simulation Nodes
    const nodeCount = Math.max(40, Math.floor(width / 14));
    interface StringLine {
      baseY: number;
      nodes: { y: number; vy: number }[];
      color: string;
      glowColor: string;
      tension: number;
      damping: number;
      thickness: number;
    }

    let strings: StringLine[] = [];

    const initStrings = () => {
      strings = [];
      const colors = [
        { stroke: '#00f0ff', glow: '#00f0ff', tension: 0.045, damping: 0.965, thickness: 1.8 },
        { stroke: '#a855f7', glow: '#a855f7', tension: 0.038, damping: 0.97, thickness: 1.2 },
        { stroke: '#38bdf8', glow: '#38bdf8', tension: 0.052, damping: 0.96, thickness: 1.0 },
      ];

      for (let s = 0; s < stringCount; s++) {
        const c = colors[s % colors.length];
        const baseY = (height / (stringCount + 1)) * (s + 1);
        const nodes = Array.from({ length: nodeCount }).map(() => ({ y: baseY, vy: 0 }));
        strings.push({
          baseY,
          nodes,
          color: c.stroke,
          glowColor: c.glow,
          tension: c.tension,
          damping: c.damping,
          thickness: c.thickness,
        });
      }
    };

    initStrings();

    // Pluck simulation loop
    const render = () => {
      if (!isVisibleRef.current) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      // Scroll wave disturbance (adds subtle harmonic ripple when user scrolls)
      const currentVelocity = getVelocityRef.current();
      const scrollImpulse = Math.sin(Date.now() * 0.005) * Math.min(Math.abs(currentVelocity) * 0.4, 6);

      strings.forEach((str, sIdx) => {
        const { nodes, baseY, tension, damping, color, glowColor, thickness } = str;

        // Apply Pluck when cursor crosses string line
        if (mouseRef.current.x >= 0 && mouseRef.current.x <= width) {
          const mouseDistY = Math.abs(mouseRef.current.y - baseY);
          if (mouseDistY < 18) {
            const nodeIdx = Math.floor((mouseRef.current.x / width) * nodeCount);
            if (nodeIdx >= 0 && nodeIdx < nodeCount) {
              const impulse = Math.min(mouseRef.current.speed * 0.45 + 4, 22) * (mouseRef.current.y < baseY ? -1 : 1);
              nodes[nodeIdx].vy += impulse;
              if (nodeIdx > 0) nodes[nodeIdx - 1].vy += impulse * 0.5;
              if (nodeIdx < nodeCount - 1) nodes[nodeIdx + 1].vy += impulse * 0.5;
            }
          }
        }

        // Apply Scroll Harmonic excitation to middle node
        if (Math.abs(scrollImpulse) > 0.5) {
          const midNode = Math.floor(nodeCount / 2);
          nodes[midNode].vy += scrollImpulse * (sIdx % 2 === 0 ? 0.3 : -0.3);
        }

        // Wave propagation solver
        for (let i = 1; i < nodeCount - 1; i++) {
          const left = nodes[i - 1].y;
          const right = nodes[i + 1].y;
          const current = nodes[i].y;

          // 1D Wave equation: d^2y/dt^2 = c^2 * d^2y/dx^2 - damping * dy/dt
          const force = tension * (left + right - 2 * current) - (current - baseY) * 0.012;
          nodes[i].vy = (nodes[i].vy + force) * damping;
        }

        // Anchor endpoints
        nodes[0].y = baseY;
        nodes[nodeCount - 1].y = baseY;

        for (let i = 1; i < nodeCount - 1; i++) {
          nodes[i].y += nodes[i].vy;
        }

        // Draw Spline Wave Curve
        ctx.beginPath();
        const stepX = width / (nodeCount - 1);
        ctx.moveTo(0, nodes[0].y);

        for (let i = 1; i < nodeCount - 1; i++) {
          const xc = (i * stepX + (i + 1) * stepX) / 2;
          const yc = (nodes[i].y + nodes[i + 1].y) / 2;
          ctx.quadraticCurveTo(i * stepX, nodes[i].y, xc, yc);
        }
        ctx.lineTo(width, nodes[nodeCount - 1].y);

        ctx.strokeStyle = color;
        ctx.lineWidth = thickness;
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Draw StringTune-style harmonic coordinate tick markers
        if (sIdx === 0) {
          const tickInterval = Math.floor(nodeCount / 8);
          ctx.fillStyle = '#64748b';
          ctx.font = '8px monospace';
          for (let i = 1; i < 8; i++) {
            const n = i * tickInterval;
            const tx = n * stepX;
            const ty = nodes[n].y;
            ctx.beginPath();
            ctx.arc(tx, ty, 1.8, 0, Math.PI * 2);
            ctx.fill();
            if (n % 2 === 0) {
              ctx.fillText(`+${n.toString().padStart(3, '0')}`, tx - 10, ty + 12);
            }
          }
        }
      });

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [stringCount, height]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none cursor-crosshair ${className}`}
      style={{ height }}
    >
      <canvas ref={canvasRef} className="w-full h-full block outline-none" />

      {/* Micro HUD Labels */}
      <div className="absolute top-2 left-4 flex items-center gap-2 pointer-events-none text-[9px] font-mono text-slate-500">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span>STRING_TUNE // HARMONIC ELASTIC STRING</span>
        <span className="text-slate-600 hidden sm:inline">SWEEP CURSOR TO PLUCK</span>
      </div>

      <div className="absolute bottom-2 right-4 flex items-center gap-2 pointer-events-none text-[9px] font-mono text-slate-600">
        <span>TENSION: 0.045</span>
        <span>•</span>
        <span>DAMPING: 0.965</span>
      </div>
    </div>
  );
};

