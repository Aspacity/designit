'use client';

import React, { useEffect, useRef } from 'react';
import { ArrowRight, Compass, Zap, Globe, Layers } from 'lucide-react';
import { MediaPlaceholder } from './MediaPlaceholder';
import gsap from 'gsap';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ctx = gsap.context(() => {
        gsap.from(headlineRef.current, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        });
        gsap.from(subtitleRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.9,
          delay: 0.2,
          ease: 'power3.out',
        });
        gsap.from(ctaRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          delay: 0.4,
          ease: 'power3.out',
        });
        gsap.from(mediaRef.current, {
          scale: 0.95,
          opacity: 0,
          duration: 1.1,
          delay: 0.5,
          ease: 'power3.out',
        });
      }, heroRef);

      return () => ctx.revert();
    }
  }, []);

  const scrollToWaitlist = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('waitlist');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={heroRef} className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 border-b dark:border-white/5 border-neutral-200">
      {/* Ambient Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-amber-500/10 via-orange-500/10 to-transparent blur-[140px] pointer-events-none rounded-full" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-14">
        
        {/* Hero Text Stack */}
        <div className="mx-auto max-w-4xl text-center space-y-6">
          
          {/* Pre-launch Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-md text-amber-600 dark:text-amber-400 text-xs sm:text-sm font-semibold shadow-sm">
            <span>Pre-Launch Access • Aspacity Spatial Ecosystem</span>
          </div>

          {/* Main Title */}
          <h1 ref={headlineRef} className="text-4xl sm:text-6xl lg:text-7xl font-extrabold dark:text-white text-neutral-900 tracking-tight leading-[1.1]">
            Bring your space to life...{' '}
            <span className="block mt-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 dark:from-amber-400 dark:via-orange-400 dark:to-amber-500 bg-clip-text text-transparent">
              Design, Stage & Experience in 3D.
            </span>
          </h1>

          {/* Subheading */}
          <p ref={subtitleRef} className="mx-auto max-w-2xl text-base sm:text-lg lg:text-xl dark:text-neutral-300 text-neutral-600 leading-relaxed font-light">
            DesignIT gives creators, architects, interior specialists, and homeowners the freedom to build and customize real-time spatial environments directly in their browser.
          </p>

          {/* Action CTAs */}
          <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={scrollToWaitlist}
              className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-6 py-3.5 text-sm sm:text-base font-bold text-white shadow-xl shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all"
            >
              <span>Join the Waitlist</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <a
              href="https://aspacity.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl dark:bg-neutral-900/80 bg-neutral-100 dark:border-white/10 border-neutral-200 px-6 py-3.5 text-sm sm:text-base font-semibold dark:text-neutral-200 text-neutral-800 dark:hover:text-white hover:text-neutral-900 backdrop-blur-md transition-all shadow-sm"
            >
              <Compass className="w-5 h-5 dark:text-neutral-400 text-neutral-500" />
              <span>Explore Aspacity</span>
            </a>
          </div>

          {/* Value Badges */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl mx-auto text-xs sm:text-sm dark:text-neutral-400 text-neutral-600">
            <div className="flex items-center justify-center gap-2 dark:bg-neutral-900/40 bg-neutral-100 p-2.5 rounded-lg border dark:border-white/5 border-neutral-200">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Zero Render Wait Time</span>
            </div>
            <div className="flex items-center justify-center gap-2 dark:bg-neutral-900/40 bg-neutral-100 p-2.5 rounded-lg border dark:border-white/5 border-neutral-200">
              <Globe className="w-4 h-4 text-amber-500" />
              <span>100% Browser Native</span>
            </div>
            <div className="flex items-center justify-center gap-2 dark:bg-neutral-900/40 bg-neutral-100 p-2.5 rounded-lg border dark:border-white/5 border-neutral-200 col-span-2 sm:col-span-1">
              <Layers className="w-4 h-4 text-amber-500" />
              <span>1-Click Interactive Link</span>
            </div>
          </div>

        </div>

        {/* Hero Interactive Media Showcase */}
        <div ref={mediaRef} className="mx-auto max-w-5xl">
          <MediaPlaceholder
            title="DesignIT Real-Time Spatial Engine"
            subtitle="Interactive 3D Preview Placeholder — Experience seamless room staging, material swapping, and natural lighting simulation."
          />
        </div>

      </div>
    </section>
  );
}
