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
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16191d]/95 hover:bg-[#181b20] border border-[#ff4f36]/40 text-[#ff4f36] shadow-2xl backdrop-blur-md transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(255,79,54,0.2)]"
          title="Expand StringTune Performance HUD"
        >
          <span className="w-2 h-2 rounded-full bg-[#ff4f36] animate-pulse" />
          <span className="font-bold">STRING_TUNE</span>
          <span className="text-white">{fps} FPS</span>
          <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
        </button>
      ) : (
        <div className="flex flex-col gap-2.5 p-3.5 rounded-2xl bg-[#101214]/95 border border-white/[0.1] backdrop-blur-xl shadow-2xl text-slate-300 max-w-[280px]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#ff4f36] animate-ping" />
              <span className="font-black text-white tracking-wider text-[11px]">
                STRING_TUNE HUD
              </span>
            </div>

            <button
              onClick={() => setCollapsed(true)}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Collapse HUD"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Telemetry Metrics Grid */}
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            {/* FPS Meter */}
            <div className="p-1.5 rounded-xl bg-[#16191d] border border-white/[0.08] flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-[#ff4f36]" />
              <div>
                <div className="text-[9px] text-slate-500">ENGINE_FPS</div>
                <div className="font-black text-[#ff4f36]">{fps} FPS</div>
              </div>
            </div>

            {/* Scroll Velocity */}
            <div className="p-1.5 rounded-xl bg-[#16191d] border border-white/[0.08] flex items-center gap-1.5">
              <Gauge className="w-3 h-3 text-[#3687ff]" />
              <div>
                <div className="text-[9px] text-slate-500">VELOCITY</div>
                <div className="font-black text-[#3687ff]">
                  {velocity >= 0 ? `+${velocity}` : velocity} <span className="text-[8px] font-normal">px/f</span>
                </div>
              </div>
            </div>
          </div>

          {/* StringTune Progress Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-[9px] text-slate-400">
              <span>--progress-slice</span>
              <span className="text-white font-bold">{progress.toFixed(3)}</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#181b20] overflow-hidden border border-white/[0.06]">
              <div
                className="h-full bg-gradient-to-r from-[#ff4f36] via-[#ffffff] to-[#3687ff] transition-all duration-75"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
          </div>

          {/* Kinetic Speed Spark Indicator */}
          <div className="flex items-center justify-between text-[9px] pt-0.5">
            <span className="text-slate-500">SPRING INERTIA:</span>
            <span className="text-[#ff4f36] font-mono font-bold">
              {speed > 0.5 ? 'ACTIVE (0.09)' : 'IDLE'}
            </span>
          </div>

          {/* Interactive Actions */}
          <div className="flex items-center gap-1.5 pt-1">
            <button
              onClick={() => setEnabled(!enabled)}
              className={`flex-1 flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-full border text-[10px] font-bold transition-all ${
                enabled
                  ? 'bg-[#ff4f36] border-[#ff4f36] text-[#101214] font-black shadow-[0_0_15px_rgba(255,79,54,0.35)]'
                  : 'bg-[#181b20] border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-3 h-3" />
              <span>{enabled ? 'SMOOTH LERP ON' : 'NATIVE SCROLL'}</span>
            </button>

            {onMorphPoly && (
              <button
                onClick={onMorphPoly}
                className="px-2.5 py-1.5 rounded-full bg-[#3687ff] border border-[#3687ff] text-white hover:bg-[#5297ff] text-[10px] font-bold transition-all shadow-[0_0_15px_rgba(54,135,255,0.35)]"
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

