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
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const children = gridRef.current.children;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          children,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            clearProps: 'opacity,transform',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 90%',
              once: true,
            },
          }
        );
      }, sectionRef);

      const fallbackTimer = setTimeout(() => {
        if (children) {
          Array.from(children).forEach((child) => {
            (child as HTMLElement).style.opacity = '1';
            (child as HTMLElement).style.transform = 'none';
          });
        }
      }, 1500);

      return () => {
        ctx.revert();
        clearTimeout(fallbackTimer);
      };
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
      title: 'Custom Blueprint Scaling',
      description: 'Define exact wall lengths, ceiling height offsets, and floorplan dimensions to test real-world spatial fit without physical tools.',
      icon: Sliders,
      badge: 'Architectural Scale',
    },
    {
      title: 'Browser & Mobile Accessible',
      description: '100% web-native with zero installation required. Share interactive model links across smartphone, tablet, and desktop viewports.',
      icon: Smartphone,
      badge: 'Universal Access',
    },
  ];

  return (
    <section ref={sectionRef} id="features" className="py-16 sm:py-24 border-b dark:border-white/5 border-neutral-200 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-mono font-semibold">
            <span>Capabilities & Features</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold dark:text-white text-neutral-900 tracking-tight">
            Engineered for Spatial Clarity &{' '}
            <span className="bg-gradient-to-r from-amber-500 to-orange-600 dark:from-amber-400 dark:to-orange-500 bg-clip-text text-transparent">
              Speed.
            </span>
          </h2>

          <p className="text-base sm:text-lg dark:text-neutral-300 text-neutral-600 font-light">
            Every feature in DesignIT is crafted to help you stage rooms, evaluate spatial relationships, and make confident design decisions.
          </p>
        </div>

        {/* 6 Capabilities Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl border dark:border-white/10 border-neutral-200 dark:bg-neutral-900/40 bg-white p-6 sm:p-8 backdrop-blur-xl hover:border-amber-500/40 transition-all duration-300 shadow-sm hover:shadow-md group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full dark:bg-neutral-800 bg-neutral-100 dark:text-amber-400 text-amber-600 text-[11px] font-mono font-semibold border dark:border-white/5 border-neutral-200">
                      {cap.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold dark:text-white text-neutral-900 group-hover:text-amber-500 transition-colors">
                    {cap.title}
                  </h3>

                  <p className="text-sm dark:text-neutral-400 text-neutral-600 leading-relaxed font-light">
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
