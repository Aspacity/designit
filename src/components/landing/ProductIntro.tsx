'use client';

import React, { useEffect, useRef } from 'react';
import { Sun, Box, Move3d } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProductIntro() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && sectionRef.current && cardsRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(cardsRef.current!.children, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
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

  return (
    <section ref={sectionRef} id="about" className="py-16 sm:py-24 border-b dark:border-white/5 border-neutral-200 dark:bg-neutral-950/40 bg-neutral-50/50 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-mono font-semibold">
            <span>Product Overview</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold dark:text-white text-neutral-900 tracking-tight">
            From an Idea to an{' '}
            <span className="bg-gradient-to-r from-amber-500 to-orange-600 dark:from-amber-400 dark:to-orange-500 bg-clip-text text-transparent">
              Experience.
            </span>
          </h2>

          <p className="text-base sm:text-lg dark:text-neutral-300 text-neutral-600 leading-relaxed font-light">
            Traditional spatial software forces you to wait for static render queues. DesignIT is engineered for immediate clarity—enabling you to stage, adjust, and walk through spaces in real time.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Pillar 1 */}
          <div className="relative rounded-2xl border dark:border-white/10 border-neutral-200 dark:bg-neutral-900/50 bg-white p-6 sm:p-8 backdrop-blur-xl hover:border-amber-500/40 transition-all duration-300 shadow-sm hover:shadow-md group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-6 group-hover:scale-110 transition-all">
              <Box className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold dark:text-white text-neutral-900 mb-3 group-hover:text-amber-500 transition-colors">
              Zero Technical Barrier
            </h3>
            <p className="text-sm dark:text-neutral-400 text-neutral-600 leading-relaxed">
              No complex node setups or steep learning curves. Drag, position, and customize curated 3D objects with intuitive controls.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="relative rounded-2xl border dark:border-white/10 border-neutral-200 dark:bg-neutral-900/50 bg-white p-6 sm:p-8 backdrop-blur-xl hover:border-amber-500/40 transition-all duration-300 shadow-sm hover:shadow-md group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-6 group-hover:scale-110 transition-all">
              <Sun className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold dark:text-white text-neutral-900 mb-3 group-hover:text-amber-500 transition-colors">
              Real-time Lighting & Materials
            </h3>
            <p className="text-sm dark:text-neutral-400 text-neutral-600 leading-relaxed">
              See sunlight cast across wood grain, marble, and fabric in real time. Tweak colors, roughness, and intensity instantly.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="relative rounded-2xl border dark:border-white/10 border-neutral-200 dark:bg-neutral-900/50 bg-white p-6 sm:p-8 backdrop-blur-xl hover:border-amber-500/40 transition-all duration-300 shadow-sm hover:shadow-md group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-6 group-hover:scale-110 transition-all">
              <Move3d className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold dark:text-white text-neutral-900 mb-3 group-hover:text-amber-500 transition-colors">
              Interactive 360° Exploration
            </h3>
            <p className="text-sm dark:text-neutral-400 text-neutral-600 leading-relaxed">
              Switch seamlessly between top-down floorplan orbit, isometric angles, and first-person walkthrough mode to evaluate real spatial proportions.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
