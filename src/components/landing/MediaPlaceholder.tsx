'use client';

import React, { useState } from 'react';
import { Play, Eye, Sparkles, Layers, Box, Maximize2, ShieldCheck } from 'lucide-react';

interface MediaPlaceholderProps {
  title?: string;
  subtitle?: string;
}

export function MediaPlaceholder({ title = "DesignIT Real-Time Spatial Engine", subtitle = "Interactive 3D Preview Placeholder" }: MediaPlaceholderProps) {
  const [activeTab, setActiveTab] = useState<'orbit' | 'materials' | 'walkthrough'>('orbit');
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-full rounded-2xl border border-white/10 bg-neutral-900/60 p-2 sm:p-4 backdrop-blur-2xl shadow-2xl overflow-hidden group">
      {/* Top Ambient Glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-amber-500/20 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute -bottom-24 right-10 w-80 h-40 bg-orange-600/15 blur-[90px] pointer-events-none rounded-full" />

      {/* Frame Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-2 border-b border-white/5 bg-neutral-950/40 rounded-t-xl mb-3 text-xs text-neutral-400">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
          </div>
          <span className="ml-2 font-mono text-[11px] text-neutral-400 border-l border-white/10 pl-3 hidden sm:inline">
            engine://spatial-v1.4.0
          </span>
        </div>

        {/* View mode tabs */}
        <div className="flex items-center gap-1 bg-neutral-900/80 p-1 rounded-lg border border-white/5">
          <button
            onClick={() => setActiveTab('orbit')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'orbit'
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Box className="w-3 h-3" />
            <span>Orbit 360°</span>
          </button>
          <button
            onClick={() => setActiveTab('materials')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'materials'
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>Materials</span>
          </button>
          <button
            onClick={() => setActiveTab('walkthrough')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'walkthrough'
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>Walkthrough</span>
          </button>
        </div>

        <div className="hidden md:flex items-center gap-2 text-neutral-400">
          <span className="flex items-center gap-1 text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> 60 FPS
          </span>
        </div>
      </div>

      {/* Main Glass Media Container */}
      <div className="relative aspect-video w-full rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border border-white/10 overflow-hidden flex flex-col items-center justify-center text-center p-6 shadow-inner">
        {/* Simulated 3D Environment Background Grid */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Floating 3D wireframe / mockup elements */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
          <div className="w-72 h-72 rounded-full border border-amber-500/30 animate-spin" style={{ animationDuration: '35s' }} />
          <div className="absolute w-96 h-96 rounded-full border border-dashed border-white/10 animate-spin" style={{ animationDuration: '50s', animationDirection: 'reverse' }} />
        </div>

        {/* Center Content Placeholder */}
        <div className="relative z-10 max-w-md space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Spatial Editor Demo</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            {title}
          </h3>

          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            {subtitle}. Instant real-time lighting, material swapping, and 3D room exploration without software installation.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium text-xs sm:text-sm shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isPlaying ? "Pause Preview Reel" : "Watch Feature Walkthrough"}</span>
            </button>
          </div>
        </div>

        {/* Corner Controls Overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-neutral-400 bg-neutral-950/60 backdrop-blur-md px-4 py-2 rounded-lg border border-white/5">
          <div className="flex items-center gap-3">
            <span className="text-neutral-400 font-mono text-[11px]">Mode: {activeTab.toUpperCase()}</span>
            <span className="text-neutral-600">|</span>
            <span className="text-neutral-400 text-[11px]">Lighting: Warm Afternoon</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-amber-400/90 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              WebGPU Ready
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
