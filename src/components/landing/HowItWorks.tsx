'use client';

import React, { useEffect, useRef } from 'react';
import { Layers, Palette, Eye, Share2, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && sectionRef.current && stepsRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(stepsRef.current!.children, {
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

  const steps = [
    {
      number: '01',
      title: 'Choose Room Layout',
      description: 'Select an architectural room template or set custom wall dimensions, windows, and entry points.',
      icon: Layers,
      highlight: 'Architectural room blueprints',
    },
    {
      number: '02',
      title: 'Stage & Customize',
      description: 'Drag 3D furniture into the canvas. Adjust scale, rotation, materials, and natural daylight intensity.',
      icon: Palette,
      highlight: 'Real-time WebGPU lighting & material shaders',
    },
    {
      number: '03',
      title: 'Walk & Inspect',
      description: 'Switch between Orbit 360° view, isometric layout, and first-person walkthrough to verify proportions.',
      icon: Eye,
      highlight: 'True-to-scale camera orbits & ground view',
    },
    {
      number: '04',
      title: 'Share & Present',
      description: 'Generate an interactive link for clients or team members to explore the space live on mobile or desktop.',
      icon: Share2,
      highlight: 'No software installation required for clients',
    },
  ];

  return (
    <section ref={sectionRef} id="how-it-works" className="py-16 sm:py-24 border-b dark:border-white/5 border-neutral-200 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-mono font-semibold">
            <span>Intuitive Workflow</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold dark:text-white text-neutral-900 tracking-tight">
            Designed for Speed and{' '}
            <span className="bg-gradient-to-r from-amber-500 to-orange-600 dark:from-amber-400 dark:to-orange-500 bg-clip-text text-transparent">
              Simplicity.
            </span>
          </h2>

          <p className="text-base sm:text-lg dark:text-neutral-300 text-neutral-600 font-light">
            Go from zero to a fully rendered, interactive 3D spatial experience in minutes.
          </p>
        </div>

        {/* Steps Grid */}
        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.number}
                className="relative flex flex-col justify-between rounded-2xl border dark:border-white/10 border-neutral-200 dark:bg-neutral-900/40 bg-white p-6 backdrop-blur-xl hover:border-amber-500/40 transition-all duration-300 shadow-sm hover:shadow-md group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-amber-500/40 font-mono group-hover:text-amber-500 transition-colors">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold dark:text-white text-neutral-900 mb-2 group-hover:text-amber-500 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm dark:text-neutral-400 text-neutral-600 leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t dark:border-white/5 border-neutral-100 flex items-center gap-1.5 text-[11px] dark:text-neutral-400 text-neutral-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{step.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
