import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';

interface SmoothScrollContextType {
  enabled: boolean;
  setEnabled: (val: boolean) => void;
  scrollY: number;
  velocity: number;
  speed: number;
  progress: number;
  fps: number;
  getVelocity: () => number;
  scrollTo: (target: number | string, options?: { offset?: number; immediate?: boolean }) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  enabled: true,
  setEnabled: () => {},
  scrollY: 0,
  velocity: 0,
  speed: 0,
  progress: 0,
  fps: 60,
  getVelocity: () => 0,
  scrollTo: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  const [enabled, setEnabledState] = useState<boolean>(() => {
    try {
      const saved = sessionStorage.getItem('string_tune_smooth_scroll');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  const [metrics, setMetrics] = useState({
    scrollY: 0,
    velocity: 0,
    speed: 0,
    progress: 0,
    fps: 60,
  });

  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;

  const currentYRef = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const targetYRef = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const lastYRef = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const velocityRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  // FPS tracking
  const lastFrameTimeRef = useRef<number>(performance.now());
  const frameCountRef = useRef<number>(0);
  const fpsRef = useRef<number>(60);
  const lastMetricsUpdateRef = useRef<number>(0);
  const isRestingRef = useRef<boolean>(true);

  const getVelocity = useCallback(() => velocityRef.current, []);

  const setEnabled = (val: boolean) => {
    setEnabledState(val);
    try {
      sessionStorage.setItem('string_tune_smooth_scroll', String(val));
    } catch {
      // Ignore
    }
  };

  const getMaxScroll = () => {
    if (typeof document === 'undefined') return 0;
    return Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight
    );
  };

  const scrollTo = useCallback((target: number | string, options: { offset?: number; immediate?: boolean } = {}) => {
    const offset = options.offset ?? 0;
    let targetPos = 0;

    if (typeof target === 'string') {
      const id = target.startsWith('#') ? target.slice(1) : target;
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        targetPos = rect.top + window.scrollY - offset;
      }
    } else {
      targetPos = target - offset;
    }

    const max = getMaxScroll();
    targetPos = Math.max(0, Math.min(targetPos, max));

    if (options.immediate || !enabledRef.current) {
      currentYRef.current = targetPos;
      targetYRef.current = targetPos;
      window.scrollTo(0, targetPos);
    } else {
      targetYRef.current = targetPos;
      isAnimatingRef.current = true;
      isRestingRef.current = false;
    }
  }, []);

  // Main animation frame loop for momentum lerp
  useEffect(() => {
    let active = true;

    const tick = (now: number) => {
      if (!active) return;

      // Calculate FPS
      frameCountRef.current++;
      if (now - lastFrameTimeRef.current >= 500) {
        fpsRef.current = Math.round((frameCountRef.current * 1000) / (now - lastFrameTimeRef.current));
        frameCountRef.current = 0;
        lastFrameTimeRef.current = now;
      }

      const maxScroll = getMaxScroll();

      if (enabledRef.current) {
        const diff = targetYRef.current - currentYRef.current;
        // StringTune-style fluid lerp (0.09 factor gives weighted momentum)
        const ease = 0.09;

        if (Math.abs(diff) > 0.4) {
          currentYRef.current += diff * ease;
          isAnimatingRef.current = true;
          isRestingRef.current = false;
          window.scrollTo(0, currentYRef.current);
        } else if (isAnimatingRef.current) {
          currentYRef.current = targetYRef.current;
          window.scrollTo(0, currentYRef.current);
          isAnimatingRef.current = false;
        }
      } else {
        currentYRef.current = window.scrollY;
        targetYRef.current = window.scrollY;
      }

      // Calculate instantaneous velocity in px/frame with smoothing
      const instantaneousVelocity = currentYRef.current - lastYRef.current;
      velocityRef.current = velocityRef.current * 0.72 + instantaneousVelocity * 0.28;
      lastYRef.current = currentYRef.current;

      const currentSpeed = Math.abs(velocityRef.current);

      // Only update React state if actively moving or settling to rest
      if (isAnimatingRef.current || currentSpeed > 0.05) {
        isRestingRef.current = false;
        if (now - lastMetricsUpdateRef.current > 80) {
          lastMetricsUpdateRef.current = now;
          const progress = maxScroll > 0 ? Math.min(1, Math.max(0, currentYRef.current / maxScroll)) : 0;

          setMetrics({
            scrollY: Math.round(currentYRef.current),
            velocity: parseFloat(velocityRef.current.toFixed(2)),
            speed: parseFloat(currentSpeed.toFixed(2)),
            progress: parseFloat(progress.toFixed(3)),
            fps: Math.min(60, fpsRef.current),
          });
        }
      } else if (!isRestingRef.current) {
        // One final settling dispatch to rest metrics and stop re-rendering
        isRestingRef.current = true;
        velocityRef.current = 0;
        const progress = maxScroll > 0 ? Math.min(1, Math.max(0, currentYRef.current / maxScroll)) : 0;
        setMetrics((prev) => ({
          ...prev,
          scrollY: Math.round(currentYRef.current),
          velocity: 0,
          speed: 0,
          progress: parseFloat(progress.toFixed(3)),
          fps: Math.min(60, fpsRef.current),
        }));
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      active = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // Intercept wheel events for momentum lerp
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!enabledRef.current) return;

      // Don't hijack scroll inside interactive elements that handle internal scroll
      const target = e.target as HTMLElement | null;
      if (target) {
        const scrollableParent = target.closest('[data-lenis-prevent], .overflow-y-auto, .overflow-y-scroll, textarea, pre');
        if (scrollableParent && scrollableParent !== document.documentElement && scrollableParent !== document.body) {
          const { scrollHeight, clientHeight, scrollTop } = scrollableParent;
          const isScrollable = scrollHeight > clientHeight;
          if (isScrollable) {
            const atTop = scrollTop <= 0 && e.deltaY < 0;
            const atBottom = scrollTop + clientHeight >= scrollHeight - 1 && e.deltaY > 0;
            if (!atTop && !atBottom) {
              return;
            }
          }
        }
      }

      // Check if body is locked by modal
      if (document.body.style.overflow === 'hidden') {
        return;
      }

      e.preventDefault();

      const maxScroll = getMaxScroll();
      // Normalize wheel delta for trackpads and physical wheels
      const delta = e.deltaY * 0.95;
      targetYRef.current = Math.max(0, Math.min(targetYRef.current + delta, maxScroll));
      isAnimatingRef.current = true;
      isRestingRef.current = false;
    };

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!enabledRef.current) return;

      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
        return;
      }

      const maxScroll = getMaxScroll();
      let delta = 0;

      switch (e.key) {
        case 'ArrowDown':
          delta = 100;
          break;
        case 'ArrowUp':
          delta = -100;
          break;
        case 'PageDown':
          delta = window.innerHeight * 0.8;
          break;
        case 'PageUp':
          delta = -window.innerHeight * 0.8;
          break;
        case 'Space':
          delta = e.shiftKey ? -window.innerHeight * 0.75 : window.innerHeight * 0.75;
          break;
        case 'Home':
          e.preventDefault();
          targetYRef.current = 0;
          isAnimatingRef.current = true;
          isRestingRef.current = false;
          return;
        case 'End':
          e.preventDefault();
          targetYRef.current = maxScroll;
          isAnimatingRef.current = true;
          isRestingRef.current = false;
          return;
        default:
          return;
      }

      if (delta !== 0) {
        e.preventDefault();
        targetYRef.current = Math.max(0, Math.min(targetYRef.current + delta, maxScroll));
        isAnimatingRef.current = true;
        isRestingRef.current = false;
      }
    };

    // Keep target synchronized when native scrollbar is dragged
    const handleNativeScroll = () => {
      if (!isAnimatingRef.current) {
        targetYRef.current = window.scrollY;
        currentYRef.current = window.scrollY;
      }
    };

    // Smooth Anchor Link Handling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const element = document.getElementById(href.slice(1));
        if (element) {
          e.preventDefault();
          scrollTo(element.offsetTop);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleNativeScroll, { passive: true });
    document.addEventListener('click', handleAnchorClick);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleNativeScroll);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [scrollTo]);

  return (
    <SmoothScrollContext.Provider
      value={{
        enabled,
        setEnabled,
        scrollY: metrics.scrollY,
        velocity: metrics.velocity,
        speed: metrics.speed,
        progress: metrics.progress,
        fps: metrics.fps,
        getVelocity,
        scrollTo,
      }}
    >
      {children}
    </SmoothScrollContext.Provider>
  );
};
