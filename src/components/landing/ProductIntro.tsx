'use client';

import React from 'react';
import { Eye, Sun, Box, Move3d, Sparkles } from 'lucide-react';

export function ProductIntro() {
  return (
    <section id="about" className="py-16 sm:py-24 border-b border-white/5 bg-neutral-950/40 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Product Overview</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            From an Idea to an{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Experience.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-light">
            Traditional spatial software was built for manual drafting and multi-hour render queues. DesignIT is engineered for immediate clarity—enabling you to stage, adjust, and walk through spaces in real time.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Pillar 1 */}
          <div className="relative rounded-2xl border border-white/10 bg-neutral-900/50 p-6 sm:p-8 backdrop-blur-xl hover:border-amber-500/40 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-all">
              <Box className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
              Zero Technical Barrier
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              No complex node setups or steep learning curves. Drag, position, and customize curated 3D objects with intuitive gizmos and camera presets.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="relative rounded-2xl border border-white/10 bg-neutral-900/50 p-6 sm:p-8 backdrop-blur-xl hover:border-amber-500/40 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-all">
              <Sun className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
              Real-time Lighting & Materials
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              See sunlight cast across wood grain, marble, and fabric in real time. Tweak colors, roughness, and intensity without offline rendering wait times.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="relative rounded-2xl border border-white/10 bg-neutral-900/50 p-6 sm:p-8 backdrop-blur-xl hover:border-amber-500/40 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-all">
              <Move3d className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
              Interactive 360° Exploration
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Switch seamlessly between top-down floorplan orbit, isometric angles, and first-person walkthrough mode to evaluate real spatial proportions.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
