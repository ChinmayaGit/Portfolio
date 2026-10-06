import {
  FRAME_COUNT,
  getIntroFramePath,
  getAiFramePath,
  getSecurityFramePath,
  getCloudFramePath,
} from "../constants/frameManifest";

export type PhaseName = "intro" | "ai" | "security" | "cloud";

// Centralized image element cache
export const frameCache: Record<PhaseName, (HTMLImageElement | null)[]> = {
  intro: new Array(FRAME_COUNT).fill(null),
  ai: new Array(FRAME_COUNT).fill(null),
  security: new Array(FRAME_COUNT).fill(null),
  cloud: new Array(FRAME_COUNT).fill(null),
};

export const getPhaseFramePath = (phase: PhaseName, index: number): string => {
  switch (phase) {
    case "intro":
      return getIntroFramePath(index);
    case "ai":
      return getAiFramePath(index);
    case "security":
      return getSecurityFramePath(index);
    case "cloud":
      return getCloudFramePath(index);
  }
};

const inFlight = new Map<string, Promise<HTMLImageElement>>();

/**
 * Loads a single frame into the centralized cache.
 * Deduplicates in-flight requests and avoids re-fetching completed frames.
 */
export const loadSingleFrame = (
  phase: PhaseName,
  index: number
): Promise<HTMLImageElement> => {
  const clampedIndex = Math.max(0, Math.min(FRAME_COUNT - 1, Math.floor(index)));
  const existing = frameCache[phase][clampedIndex];
  if (existing && existing.complete && existing.naturalWidth) {
    return Promise.resolve(existing);
  }

  const url = getPhaseFramePath(phase, clampedIndex);
  if (inFlight.has(url)) {
    return inFlight.get(url)!;
  }

  const promise = new Promise<HTMLImageElement>((resolve) => {
    const img = new Image();
    img.decoding = "async";
    img.src = url;

    img.onload = () => {
      frameCache[phase][clampedIndex] = img;
      inFlight.delete(url);
      resolve(img);
    };

    img.onerror = () => {
      frameCache[phase][clampedIndex] = img;
      inFlight.delete(url);
      resolve(img);
    };
  });

  inFlight.set(url, promise);
  return promise;
};

/**
 * Concurrency-controlled task queue for smooth batch image downloads
 */
async function runWithConcurrency<T>(
  tasks: (() => Promise<T>)[],
  maxConcurrent = 6
): Promise<void> {
  let index = 0;
  const workers: Promise<void>[] = [];

  const runWorker = async () => {
    while (index < tasks.length) {
      const taskIndex = index++;
      try {
        await tasks[taskIndex]();
      } catch {
        // continue even on single frame error
      }
    }
  };

  const poolSize = Math.min(maxConcurrent, tasks.length);
  for (let i = 0; i < poolSize; i++) {
    workers.push(runWorker());
  }

  await Promise.all(workers);
}

let backgroundLoadingStarted = false;

/**
 * Preloads Phase 1 (Intro) and Phase 2 (AI) before revealing the application.
 * Reports real progress to the caller.
 */
export async function preloadInitialPhases(
  onProgress?: (percent: number, status: string) => void
): Promise<void> {
  const phases: PhaseName[] = ["intro", "ai"];
  const totalFrames = FRAME_COUNT * phases.length; // 240 frames total
  let loadedCount = 0;

  const report = (status: string) => {
    if (!onProgress) return;
    const pct = Math.min(100, Math.round((loadedCount / totalFrames) * 100));
    onProgress(pct, status);
  };

  report("INITIALIZING SYSTEM RUNTIME...");

  // 1. Critical first frames for instant visual display
  await Promise.all([
    loadSingleFrame("intro", 0),
    loadSingleFrame("ai", 0),
  ]);
  loadedCount += 2;
  report("PRELOADING PHASE 01 // INTRO SEQUENCE...");

  // 2. Keyframe skeleton (every 4th frame: 0, 4, 8, ... 116)
  const keyframeTasks: (() => Promise<HTMLImageElement>)[] = [];
  for (const phase of phases) {
    for (let i = 4; i < FRAME_COUNT; i += 4) {
      keyframeTasks.push(async () => {
        const res = await loadSingleFrame(phase, i);
        loadedCount++;
        const phaseLabel = phase === "intro" ? "PHASE 01 (INTRO)" : "PHASE 02 (AI SYSTEMS)";
        report(`BUFFERING KEYFRAMES &bull; ${phaseLabel}`);
        return res;
      });
    }
  }

  // Run keyframes with 8 concurrent connections for maximum throughput
  await runWithConcurrency(keyframeTasks, 8);

  // 3. Intermediate frames
  const intermediateTasks: (() => Promise<HTMLImageElement>)[] = [];
  for (const phase of phases) {
    for (let i = 1; i < FRAME_COUNT; i++) {
      if (i % 4 !== 0) {
        intermediateTasks.push(async () => {
          const res = await loadSingleFrame(phase, i);
          loadedCount++;
          const phaseLabel = phase === "intro" ? "PHASE 01 (INTRO)" : "PHASE 02 (AI SYSTEMS)";
          report(`SYNCHRONIZING CANVAS FRAMES &bull; ${phaseLabel}`);
          return res;
        });
      }
    }
  }

  // Fallback safety timeout: If network is slow, allow entering once all keyframes + 50% are ready
  let isDone = false;
  const timeoutPromise = new Promise<void>((resolve) => {
    setTimeout(() => {
      if (!isDone && loadedCount >= 80) {
        report("SYSTEM READY // ENGAGING INTERFACE...");
        resolve();
      }
    }, 2800);
  });

  const loadAllPromise = runWithConcurrency(intermediateTasks, 8).then(() => {
    isDone = true;
    report("SYSTEM OPTIMAL // READY");
  });

  await Promise.race([loadAllPromise, timeoutPromise]);
  if (onProgress) {
    onProgress(100, "SYSTEM READY // WELCOME");
  }

  // Automatically start background loading of Phase 3 and Phase 4
  startBackgroundPhasesPreload();
}

/**
 * Progressively preloads Phase 3 (Security/Network) and Phase 4 (Cloud) in the background.
 * Uses a lower concurrency pool (4 workers) to prevent network/CPU spikes while the user is interacting.
 */
export function startBackgroundPhasesPreload(): void {
  if (backgroundLoadingStarted) return;
  backgroundLoadingStarted = true;

  const schedule = (cb: () => void) => {
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      (window as Window & { requestIdleCallback: (fn: () => void) => void }).requestIdleCallback(cb);
    } else {
      setTimeout(cb, 250);
    }
  };

  schedule(async () => {
    const phases: PhaseName[] = ["security", "cloud"];

    // 1. Initial first frames
    await Promise.all([
      loadSingleFrame("security", 0),
      loadSingleFrame("cloud", 0),
    ]);

    // 2. Keyframes (every 4th frame)
    const keyTasks: (() => Promise<HTMLImageElement>)[] = [];
    for (const phase of phases) {
      for (let i = 4; i < FRAME_COUNT; i += 4) {
        keyTasks.push(() => loadSingleFrame(phase, i));
      }
    }
    await runWithConcurrency(keyTasks, 6);

    // 3. Fill in intermediate frames in gentle background batches
    const intermediateTasks: (() => Promise<HTMLImageElement>)[] = [];
    for (const phase of phases) {
      for (let i = 1; i < FRAME_COUNT; i++) {
        if (i % 4 !== 0) {
          intermediateTasks.push(() => loadSingleFrame(phase, i));
        }
      }
    }
    await runWithConcurrency(intermediateTasks, 4);
  });
}
