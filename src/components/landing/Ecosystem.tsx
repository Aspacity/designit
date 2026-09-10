'use client';

import React from 'react';
import { Compass, ExternalLink, Sparkles } from 'lucide-react';

export function Ecosystem() {
  const products = [
    {
      name: 'PaintIT',
      status: 'Live Platform',
      description: '3D surface paint & color visualizer. Test wall shades and lighting tones instantly.',
      url: 'https://paintit.aspacity.com',
      isCurrent: false,
    },
    {
      name: 'DesignIT',
      status: 'Pre-Launch (You are here)',
      description: 'Zero-barrier 3D interior spatial visualization engine for designers, architects, and homeowners.',
      url: '#',
      isCurrent: true,
    },
    {
      name: 'BuildIT',
      status: 'In Development',
      description: 'Architectural blueprint translation and construction site spatial execution tracking.',
      url: 'https://aspacity.com',
      isCurrent: false,
    },
    {
      name: 'SellIT',
      status: 'In Development',
      description: 'Real estate 3D presale staging and interactive property virtual tours.',
      url: 'https://aspacity.com',
      isCurrent: false,
    },
    {
      name: 'FurnishIT',
      status: 'In Development',
      description: 'Spatial furniture e-commerce staging and AR procurement for retail brands.',
      url: 'https://aspacity.com',
      isCurrent: false,
    },
  ];

  return (
    <section className="py-16 sm:py-24 border-b border-white/5 bg-neutral-950/60 relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
            <Compass className="w-3.5 h-3.5" />
            <span>Looking for something else?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Explore the{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Aspacity Spatial Ecosystem.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 font-light">
            DesignIT is part of Aspacity—a suite of interconnected spatial tools powering the future of interior design, real estate, and architecture.
          </p>
        </div>

        {/* Ecosystem Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map((prod, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-5 border backdrop-blur-xl transition-all duration-300 flex flex-col justify-between ${
                prod.isCurrent
                  ? 'border-amber-500/60 bg-amber-500/10 shadow-lg shadow-amber-500/10'
                  : 'border-white/10 bg-neutral-900/40 hover:border-white/20 hover:bg-neutral-900/70'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`font-bold text-lg ${prod.isCurrent ? 'text-amber-400' : 'text-white'}`}>
                    {prod.name}
                  </h3>
                  {prod.isCurrent ? (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  ) : (
                    <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                  )}
                </div>

                <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border inline-block mb-3 ${
                  prod.isCurrent
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    : 'bg-neutral-800 text-neutral-400 border-white/5'
                }`}>
                  {prod.status}
                </span>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  {prod.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5">
                {prod.isCurrent ? (
                  <span className="text-[11px] font-medium text-amber-400">Current Product</span>
                ) : (
                  <a
                    href={prod.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-medium text-neutral-300 hover:text-white flex items-center gap-1"
                  >
                    <span>Visit {prod.name}</span>
                    <span>&rarr;</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
