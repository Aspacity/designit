'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, UserCheck, Building2, Home } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function UseCases() {
  const [activeTab, setActiveTab] = useState<'designers' | 'architects' | 'homeowners'>('designers');
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && sectionRef.current && cardRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(cardRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.9,
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

  const useCases = {
    designers: {
      title: 'For Interior Designers',
      badge: 'Designers & Stagers',
      icon: UserCheck,
      description: 'Streamline your client presentation workflow with instant 3D room staging and material customization.',
      benefits: [
        'Present interactive 360° concepts instead of flat moodboards',
        'Swap flooring, wall colors, and fabric textures in real time during client meetings',
        'Eliminate multi-day rendering delays and software license overhead',
        'Share self-guided walkthrough links for remote client approval',
      ],
      quote: '"DesignIT lets me show clients exactly how furniture scale and lighting work in their space before placing orders."',
    },
    architects: {
      title: 'For Architects & Developers',
      badge: 'Architects & Sales',
      icon: Building2,
      description: 'Bridge the gap between technical CAD blueprints and client-ready spatial experiences.',
      benefits: [
        'Import architectural blueprints into interactive WebGPU 3D environments',
        'Accelerate pre-sale marketing with zero-installation browser previews',
        'Validate spatial flow, doorway sightlines, and natural illumination',
        'Collaborate across design teams with central model templates',
      ],
      quote: '"Clients understand 3D spatial flow immediately when they can orbit and walk through the model themselves."',
    },
    homeowners: {
      title: 'For Homeowners & Renovators',
      badge: 'Clients & Buyers',
      icon: Home,
      description: 'Visualize your dream home renovation or furniture layout before spending a single dollar.',
      benefits: [
        'Experiment with furniture sizes to see what actually fits in your room',
        'Test paint shades, cabinet finishes, and lighting mood beforehand',
        'Avoid expensive renovation mistakes and return headaches',
        'Easily communicate your vision with contractors and interior specialists',
      ],
      quote: '"We tested 5 different couch arrangements in DesignIT and found the perfect layout before buying any furniture."',
    },
  };

  const currentCase = useCases[activeTab];
  const IconComponent = currentCase.icon;

  return (
    <section ref={sectionRef} id="use-cases" className="py-16 sm:py-24 border-b border-white/5 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-semibold">
            <span>Tailored Solutions</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Built for Every Stage of{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Spatial Planning.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 font-light">
            Whether you design professionally or plan your own home, DesignIT empowers your vision.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-2 p-1.5 rounded-xl bg-neutral-900 border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setActiveTab('designers')}
              className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'designers'
                  ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/25'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Interior Designers</span>
            </button>
            <button
              onClick={() => setActiveTab('architects')}
              className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'architects'
                  ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/25'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Architects & Developers</span>
            </button>
            <button
              onClick={() => setActiveTab('homeowners')}
              className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'homeowners'
                  ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/25'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Homeowners</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display Card */}
        <div ref={cardRef} className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-neutral-900/60 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 blur-[100px] pointer-events-none rounded-full" />

          <div className="relative z-10 space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{currentCase.title}</h3>
                  <p className="text-xs sm:text-sm text-neutral-400">{currentCase.description}</p>
                </div>
              </div>
              <span className="text-xs font-mono uppercase bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full border border-amber-500/20 font-semibold">
                {currentCase.badge}
              </span>
            </div>

            {/* Benefits List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentCase.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3 bg-neutral-950/40 p-4 rounded-xl border border-white/5">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Testimonial Quote */}
            <div className="p-4 sm:p-5 rounded-xl bg-neutral-950/60 border border-amber-500/20 text-xs sm:text-sm text-amber-300/90 italic font-light">
              {currentCase.quote}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
