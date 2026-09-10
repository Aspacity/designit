'use client';

import React, { useEffect, useRef } from 'react';
import { Check, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function TheDifference() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const boxesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && sectionRef.current && boxesRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(boxesRef.current!.children, {
          y: 40,
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
    <section ref={sectionRef} className="py-16 sm:py-24 border-b dark:border-white/5 border-neutral-200 dark:bg-neutral-950/40 bg-neutral-50/50 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-mono font-semibold">
            <span>The DesignIT Advantage</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold dark:text-white text-neutral-900 tracking-tight">
            Professional Software is Powerful.{' '}
            <span className="bg-gradient-to-r from-amber-500 to-orange-600 dark:from-amber-400 dark:to-orange-500 bg-clip-text text-transparent">
              It Isn't Always Accessible.
            </span>
          </h2>

          <p className="text-base sm:text-lg dark:text-neutral-300 text-neutral-600 font-light">
            DesignIT is not here to replace complex CAD tools like Blender, Revit, or SketchUp. It is designed to remove the friction of presenting, staging, and exploring spatial ideas.
          </p>
        </div>

        {/* Comparison Grid */}
        <div ref={boxesRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Traditional Software Box */}
          <div className="rounded-2xl border dark:border-white/10 border-neutral-200 dark:bg-neutral-900/40 bg-white p-6 sm:p-8 backdrop-blur-xl space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b dark:border-white/10 border-neutral-200 pb-4">
              <div>
                <h3 className="text-xl font-bold dark:text-neutral-300 text-neutral-800">Traditional CAD & Renderers</h3>
                <p className="text-xs dark:text-neutral-400 text-neutral-500">Blender, Revit, SketchUp, Lumion</p>
              </div>
              <span className="text-[10px] font-mono uppercase dark:bg-neutral-800 bg-neutral-100 dark:text-neutral-400 text-neutral-600 px-2.5 py-1 rounded font-semibold">
                Complex Workflow
              </span>
            </div>

            <ul className="space-y-4 text-xs sm:text-sm dark:text-neutral-400 text-neutral-600">
              <li className="flex items-start gap-3">
                <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>Steep learning curve requiring weeks or months of specialized training</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>Heavy desktop software installation requiring expensive GPU workstations</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>Multi-hour raytracing render queues for static images</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>Clients receive static 2D images with zero spatial interactivity</span>
              </li>
            </ul>
          </div>

          {/* DesignIT Spatial Engine Box */}
          <div className="rounded-2xl border border-amber-500/40 dark:bg-gradient-to-b dark:from-amber-500/10 dark:via-neutral-900/60 dark:to-neutral-900/40 bg-gradient-to-b from-amber-500/5 via-white to-amber-500/5 p-6 sm:p-8 backdrop-blur-xl space-y-6 shadow-xl relative">
            <div className="absolute -top-3 right-6 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full shadow">
              Web-Native Spatial Platform
            </div>

            <div className="flex items-center justify-between border-b dark:border-white/10 border-neutral-200 pb-4">
              <div>
                <h3 className="text-xl font-bold dark:text-white text-neutral-900">DesignIT Spatial Engine</h3>
                <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">Powered by Aspacity 3D Pipeline</p>
              </div>
            </div>

            <ul className="space-y-4 text-xs sm:text-sm dark:text-neutral-200 text-neutral-800 font-medium">
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Zero learning curve—designed for designers, clients, and homeowners</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>100% browser-native—runs seamlessly on laptops, tablets, and phones</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Real-time 60 FPS WebGPU viewport with instant material & light changes</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>1-click shareable URLs enabling interactive 360° client walkthroughs</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}
