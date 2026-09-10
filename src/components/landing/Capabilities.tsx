'use client';

import React from 'react';
import { Box, Sun, Layers, Compass, Video, Sparkles, Sliders, Smartphone } from 'lucide-react';

export function Capabilities() {
  const capabilities = [
    {
      title: 'Interactive 3D Camera System',
      description: 'Rotate, pan, and zoom with 360° orbit controls. Toggle instantly between Top-Down Floorplan, Isometric Preview, and First-Person Walkthrough.',
      icon: Compass,
      badge: 'Multi-Perspective',
    },
    {
      title: 'Curated Spatial Furniture Catalog',
      description: 'Access a growing library of 3D sofas, tables, lighting fixtures, and decor optimized for web loading performance.',
      icon: Box,
      badge: 'GLTF / GLB Native',
    },
    {
      title: 'Real-Time PBR Materials',
      description: 'Customize surfaces with realistic PBR textures—hardwood flooring, Italian marble, polished concrete, woven linen, and metallic accents.',
      icon: Layers,
      badge: 'Dynamic Shading',
    },
    {
      title: 'Sunlight & Ambiance Controls',
      description: 'Simulate natural sunlight progression across room windows, test ambient warm lighting, and evaluate shadow depth in real time.',
      icon: Sun,
      badge: 'Daylight Simulator',
    },
    {
      title: 'Admin Model Templates',
      description: 'Pre-configured architectural bases saved directly by administrators to serve as starting templates for projects.',
      icon: Sliders,
      badge: 'Template System',
    },
    {
      title: 'Cross-Device Client Preview',
      description: 'Share interactive spatial scenes with clients that run smoothly on desktop, tablet, and mobile browsers without plugins.',
      icon: Smartphone,
      badge: 'Zero-Install Web',
    },
  ];

  return (
    <section id="capabilities" className="py-16 sm:py-24 border-b border-white/5 bg-neutral-950/40 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Platform Capabilities</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Built for Spatial{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Precision & Speed.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 font-light">
            Everything you need to visualize, iterate, and communicate interior spaces effortlessly.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, idx) => {
            const IconComponent = cap.icon;
            return (
              <div
                key={idx}
                className="relative flex flex-col justify-between rounded-2xl border border-white/10 bg-neutral-900/50 p-6 sm:p-8 backdrop-blur-xl hover:border-amber-500/40 hover:bg-neutral-900/70 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-all">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono uppercase bg-neutral-800 text-neutral-300 px-2.5 py-1 rounded-md border border-white/5">
                      {cap.badge}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {cap.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
