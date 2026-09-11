'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function UpdatesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && sectionRef.current && cardsRef.current) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const children = cardsRef.current.children;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          children,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.15,
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

  const realUpdates = [
    {
      slug: 'core-spatial-engine-development',
      date: 'September 10, 2026',
      tag: 'Core Development',
      title: 'DesignIT Core Spatial Engine Currently Under Active Development',
      summary: 'Our engineering team is actively building the high-performance WebGPU/WebGL 3D canvas, real-time lighting pipeline, and S3 spatial asset resolver.',
    },
  ];

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 border-b dark:border-white/5 border-neutral-200 dark:bg-neutral-950/40 bg-neutral-50/50 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-mono font-semibold">
            <span>Product Updates</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold dark:text-white text-neutral-900 tracking-tight">
            Latest Development &{' '}
            <span className="bg-gradient-to-r from-amber-500 to-orange-600 dark:from-amber-400 dark:to-orange-500 bg-clip-text text-transparent">
              Engine Progress.
            </span>
          </h2>

          <p className="text-base sm:text-lg dark:text-neutral-300 text-neutral-600 font-light">
            Transparent milestones as we assemble the DesignIT WebGPU spatial visualization engine.
          </p>
        </div>

        {/* Updates Grid */}
        <div ref={cardsRef} className="max-w-3xl mx-auto space-y-6">
          {realUpdates.map((item) => (
            <div
              key={item.slug}
              className="rounded-2xl border dark:border-white/10 border-neutral-200 dark:bg-neutral-900/40 bg-white p-6 sm:p-8 backdrop-blur-xl hover:border-amber-500/40 transition-all duration-300 shadow-sm hover:shadow-md space-y-4 group"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono font-semibold border border-amber-500/20">
                  {item.tag}
                </span>
                <div className="flex items-center gap-1.5 dark:text-neutral-400 text-neutral-500 font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.date}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold dark:text-white text-neutral-900 group-hover:text-amber-500 transition-colors">
                {item.title}
              </h3>

              <p className="text-sm dark:text-neutral-300 text-neutral-600 leading-relaxed font-light">
                {item.summary}
              </p>

              <div className="pt-2">
                <Link
                  href={`/updates/${item.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-amber-500 hover:text-amber-400 transition-colors"
                >
                  <span>Read Full Milestone Report</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
