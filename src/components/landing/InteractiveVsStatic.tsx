'use client';

import React, { useState } from 'react';
import { Eye, Clock, RefreshCw, Sparkles, CheckCircle2, RotateCw } from 'lucide-react';

export function InteractiveVsStatic() {
  const [activeMode, setActiveMode] = useState<'static' | 'interactive'>('interactive');

  return (
    <section className="py-16 sm:py-24 border-b border-white/5 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive vs Static</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Stop Sending Dead Screenshots.{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Send Experiences.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 font-light">
            Toggle below to experience the difference between static render loops and DesignIT's real-time interactive exploration.
          </p>
        </div>

        {/* Mode Toggle Bar */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 p-1.5 rounded-xl bg-neutral-900 border border-white/10">
            <button
              onClick={() => setActiveMode('static')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeMode === 'static'
                  ? 'bg-neutral-800 text-white border border-white/10'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Static Render Loop
            </button>
            <button
              onClick={() => setActiveMode('interactive')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeMode === 'interactive'
                  ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/25'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Real-time Interactive 3D
            </button>
          </div>
        </div>

        {/* Dynamic Display Window */}
        <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-neutral-900/60 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden min-h-[320px] flex flex-col justify-between">
          
          {activeMode === 'static' ? (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-red-400 font-mono text-xs">
                  <Clock className="w-4 h-4" />
                  <span>Estimated Render Time: 4 Hours 12 Mins</span>
                </div>
                <span className="text-[10px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded border border-red-500/20">
                  Fixed Single Angle
                </span>
              </div>

              <div className="aspect-video w-full rounded-xl bg-neutral-950/80 border border-white/5 flex flex-col items-center justify-center p-6 text-center space-y-3 relative">
                <RefreshCw className="w-8 h-8 text-neutral-600 animate-spin" />
                <p className="text-xs text-neutral-400 font-mono">
                  Rendering Frame #1/1... Progress 42%. View is locked. Want a different angle? Re-render for 4 hours.
                </p>
              </div>

              <div className="text-xs text-neutral-400 space-y-1">
                <p>• Client asks: "Can we see what the sofa looks like from the window angle?"</p>
                <p className="text-red-400 font-mono">• Designer response: "I'll have to set up a new render camera and send it tomorrow."</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs">
                  <RotateCw className="w-4 h-4 animate-spin" style={{ animationDuration: '8s' }} />
                  <span>Real-time Viewport: 60 FPS Active</span>
                </div>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                  360° Infinite Angles
                </span>
              </div>

              <div className="aspect-video w-full rounded-xl bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 border border-amber-500/30 flex flex-col items-center justify-center p-6 text-center space-y-3 relative overflow-hidden">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-1">
                  <Eye className="w-8 h-8 animate-pulse" />
                </div>
                <h4 className="text-base font-bold text-white">Full Spatial Freedom</h4>
                <p className="text-xs text-neutral-300 max-w-md">
                  Orbit, move inside, change lighting, swap materials, and inspect room details immediately with zero lag.
                </p>
              </div>

              <div className="text-xs text-neutral-300 space-y-1">
                <p>• Client asks: "Can we see what the sofa looks like from the window angle?"</p>
                <p className="text-emerald-400 font-mono">• Designer response: "Sure! Watch as I orbit the camera right now on our live call."</p>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
