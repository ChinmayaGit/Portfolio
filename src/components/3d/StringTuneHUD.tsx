import React, { useState } from 'react';
import { useSmoothScroll } from '../smooth-scroll/SmoothScrollProvider';
import { Activity, Gauge, Zap, ChevronUp, ChevronDown } from 'lucide-react';

interface StringTuneHUDProps {
  onMorphPoly?: () => void;
}

export const StringTuneHUD: React.FC<StringTuneHUDProps> = ({ onMorphPoly }) => {
  const { enabled, setEnabled, velocity, speed, progress, fps } = useSmoothScroll();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-40 select-none font-mono text-[11px]">
      {collapsed ? (
        <button
          onClick={() => setCollapsed(false)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 shadow-xl backdrop-blur-md transition-all hover:scale-105 active:scale-95"
          title="Expand StringTune Performance HUD"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>STRING_TUNE</span>
          <span className="text-slate-400">{fps} FPS</span>
          <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
        </button>
      ) : (
        <div className="flex flex-col gap-2 p-3 rounded-2xl bg-slate-950/90 border border-slate-800/90 backdrop-blur-xl shadow-2xl text-slate-300 max-w-[280px]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-bold text-white tracking-wider text-[11px]">
                STRING_TUNE HUD
              </span>
            </div>

            <button
              onClick={() => setCollapsed(true)}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Collapse HUD"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Telemetry Metrics Grid */}
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            {/* FPS Meter */}
            <div className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800/80 flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-emerald-400" />
              <div>
                <div className="text-[9px] text-slate-500">ENGINE_FPS</div>
                <div className="font-bold text-emerald-300">{fps} FPS</div>
              </div>
            </div>

            {/* Scroll Velocity */}
            <div className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800/80 flex items-center gap-1.5">
              <Gauge className="w-3 h-3 text-cyan-400" />
              <div>
                <div className="text-[9px] text-slate-500">VELOCITY</div>
                <div className="font-bold text-cyan-300">
                  {velocity >= 0 ? `+${velocity}` : velocity} <span className="text-[8px] font-normal">px/f</span>
                </div>
              </div>
            </div>
          </div>

          {/* StringTune Progress Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-[9px] text-slate-400">
              <span>--progress-slice</span>
              <span className="text-cyan-300 font-bold">{progress.toFixed(3)}</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 transition-all duration-75"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
          </div>

          {/* Kinetic Speed Spark Indicator */}
          <div className="flex items-center justify-between text-[9px] pt-1">
            <span className="text-slate-500">INERTIA DAMPING:</span>
            <span className="text-purple-300 font-mono">
              {speed > 0.5 ? 'ACTIVE (0.09)' : 'IDLE'}
            </span>
          </div>

          {/* Interactive Actions */}
          <div className="flex items-center gap-1.5 pt-1">
            <button
              onClick={() => setEnabled(!enabled)}
              className={`flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg border text-[10px] font-bold transition-all ${
                enabled
                  ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/25'
                  : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
              }`}
            >
              <Zap className="w-3 h-3" />
              <span>{enabled ? 'SMOOTH LERP ON' : 'NATIVE SCROLL'}</span>
            </button>

            {onMorphPoly && (
              <button
                onClick={onMorphPoly}
                className="px-2 py-1.5 rounded-lg bg-purple-500/15 border border-purple-500/40 text-purple-300 hover:bg-purple-500/25 text-[10px] font-bold transition-all"
                title="Morph 3D Polyhedron"
              >
                POLY ✦
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

