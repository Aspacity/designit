'use client';

import React, { useEffect, useRef } from 'react';
import { Box, Sun, Layers, Compass, Sliders, Smartphone } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Capabilities() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && sectionRef.current && gridRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(gridRef.current!.children, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        });
      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  const capabilities = [
    {
      title: 'Interactive 3D Camera System',
      description: 'Rotate, pan, and zoom with 360° orbit controls. Toggle instantly between Top-Down Floorplan, Isometric Preview, and First-Person Walkthrough.',
      icon: Compass,
      badge: 'Multi-Perspective',
    },
    {
      title: 'Curated Spatial Furniture Catalog',
      description: 'Access a growing library of 3D sofas, tables, lighting fixtures, and decor optimized for WebGL/WebGPU canvas performance.',
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
      title: 'Precision Room Dimensions',
      description: 'Define custom architectural wall boundaries, window apertures, and door placements to match real spatial measurements.',
      icon: Sliders,
      badge: 'Architectural Scale',
    },
    {
      title: 'Cross-Device Client Preview',
      description: 'Share interactive spatial scenes with clients that run smoothly on desktop, tablet, and mobile browsers without plugins.',
      icon: Smartphone,
      badge: 'Zero-Install Web',
    },
  ];

  return (
    <section ref={sectionRef} id="capabilities" className="py-16 sm:py-24 border-b dark:border-white/5 border-neutral-200 dark:bg-neutral-950/40 bg-neutral-50/50 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-mono font-semibold">
            <span>Platform Capabilities</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold dark:text-white text-neutral-900 tracking-tight">
            Built for Spatial{' '}
            <span className="bg-gradient-to-r from-amber-500 to-orange-600 dark:from-amber-400 dark:to-orange-500 bg-clip-text text-transparent">
              Precision & Speed.
            </span>
          </h2>

          <p className="text-base sm:text-lg dark:text-neutral-300 text-neutral-600 font-light">
            Everything you need to visualize, iterate, and communicate interior spaces effortlessly.
          </p>
        </div>

        {/* Feature Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, idx) => {
            const IconComponent = cap.icon;
            return (
              <div
                key={idx}
                className="relative flex flex-col justify-between rounded-2xl border dark:border-white/10 border-neutral-200 dark:bg-neutral-900/50 bg-white p-6 sm:p-8 backdrop-blur-xl hover:border-amber-500/40 transition-all duration-300 shadow-sm hover:shadow-md group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-all">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono uppercase dark:bg-neutral-800 bg-neutral-100 dark:text-neutral-300 text-neutral-700 px-2.5 py-1 rounded-md border dark:border-white/5 border-neutral-200 font-semibold">
                      {cap.badge}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold dark:text-white text-neutral-900 mb-2 group-hover:text-amber-500 transition-colors">
                    {cap.title}
                  </h3>

                  <p className="text-xs sm:text-sm dark:text-neutral-400 text-neutral-600 leading-relaxed">
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
