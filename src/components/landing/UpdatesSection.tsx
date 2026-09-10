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
      const ctx = gsap.context(() => {
        gsap.from(cardsRef.current!.children, {
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
            Follow our active spatial rendering progress leading up to private early access.
          </p>
        </div>

        {/* Updates Grid */}
        <div ref={cardsRef} className="max-w-2xl mx-auto mb-10">
          {realUpdates.map((item) => (
            <Link
              key={item.slug}
              href={`/updates/${item.slug}`}
              className="group rounded-2xl border dark:border-white/10 border-neutral-200 dark:bg-neutral-900/50 bg-white p-6 sm:p-8 backdrop-blur-xl hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between block shadow-sm hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between text-xs dark:text-neutral-400 text-neutral-500 mb-4">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-amber-500" />
                    <span>{item.date}</span>
                  </span>
                  <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-mono px-2.5 py-0.5 rounded border border-amber-500/20 font-semibold">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold dark:text-white text-neutral-900 mb-3 group-hover:text-amber-500 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm dark:text-neutral-300 text-neutral-600 leading-relaxed mb-6 font-light">
                  {item.summary}
                </p>
              </div>

              <div className="pt-4 border-t dark:border-white/5 border-neutral-100 flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
                <span>Read Development Update</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/updates"
            className="inline-flex items-center gap-2 text-sm font-semibold dark:text-neutral-300 text-neutral-700 hover:text-amber-500 transition-colors"
          >
            <span>Explore Release Logs & Roadmap</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
