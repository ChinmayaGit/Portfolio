import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  alpha: number;
}

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number | null = null;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Optimized particle count to prevent GPU fill-rate throttling
    const particleCount = width < 768 ? 24 : 42;
    const maxDistance = width < 768 ? 85 : 115;
    const maxDistanceSq = maxDistance * maxDistance;
    const particles: Particle[] = [];

    const colors = [
      '#ff4f36', // string neon red
      '#3687ff', // string electric blue
      '#ff4f36', // string neon red
      '#3687ff', // string electric blue
      '#ffffff', // crisp white
    ];

    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 1.5 + 0.8;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius,
        baseRadius: radius,
        color: colors[i % colors.length],
        alpha: Math.random() * 0.4 + 0.3,
      });
    }

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 120,
    };
    const mouseRadiusSq = mouse.radius * mouse.radius;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible && animationFrameId === null) {
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = () => {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Update Positions & Physics
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off screen borders smoothly
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse interaction check (squared distance prevents Math.sqrt)
        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouseSq = dxMouse * dxMouse + dyMouse * dyMouse;

        if (distMouseSq < mouseRadiusSq) {
          const distMouse = Math.sqrt(distMouseSq);
          const force = (1 - distMouse / mouse.radius) * 0.7;
          p.x -= (dxMouse / (distMouse || 1)) * force * 2.5;
          p.y -= (dyMouse / (distMouse || 1)) * force * 2.5;
          p.radius = p.baseRadius * 1.5;
        } else {
          p.radius = p.baseRadius;
        }
      }

      // 2. Batched Line Drawing (Single path and single stroke call = 50x faster)
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 79, 54, 0.08)';
      ctx.lineWidth = 0.75;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistanceSq) {
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
          }
        }
      }
      ctx.stroke();

      // 3. Batched Particle Drawing per Color (Zero ctx.save/restore or shadowBlur thrashing)
      for (const col of colors) {
        ctx.beginPath();
        ctx.fillStyle = col;
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          if (p.color === col) {
            ctx.moveTo(p.x + p.radius, p.y);
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          }
        }
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60 will-change-transform"
      style={{ background: 'transparent' }}
    />
  );
};
