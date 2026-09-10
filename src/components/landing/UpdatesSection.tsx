'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';

export function UpdatesSection() {
  const recentUpdates = [
    {
      slug: 'webgpu-engine-upgrade',
      date: 'September 08, 2026',
      tag: 'Engine Architecture',
      title: 'DesignIT WebGPU Spatial Engine v1.4 Released',
      summary: 'Achieved 60 FPS real-time rendering on browser canvas with dynamic sunlight simulation and low memory overhead.',
    },
    {
      slug: 'pbr-material-library-expansion',
      date: 'August 28, 2026',
      tag: 'Asset Pipeline',
      title: 'Expanded PBR Material Library & S3 Asset Resolver',
      summary: 'Added 40+ architectural materials including Italian marble, brushed brass, natural oak, and acoustic wall panels.',
    },
    {
      slug: 'admin-playground-configurator',
      date: 'August 14, 2026',
      tag: 'Admin Tools',
      title: 'Introducing Admin Blueprint Configurator',
      summary: 'Administrators can now create, configure, and save master 3D room blueprints that act as starting templates for designers.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 border-b border-white/5 bg-neutral-950/40 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Product Updates</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Latest News &{' '}
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Development Progress.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-neutral-300 font-light">
            Stay up to date with our product roadmap, engine improvements, and spatial feature releases.
          </p>
        </div>

        {/* Updates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {recentUpdates.map((item) => (
            <Link
              key={item.slug}
              href={`/updates/${item.slug}`}
              className="group rounded-2xl border border-white/10 bg-neutral-900/50 p-6 backdrop-blur-xl hover:border-amber-500/40 hover:bg-neutral-900/70 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>{item.date}</span>
                  </span>
                  <span className="bg-amber-500/10 text-amber-400 text-[10px] font-mono px-2 py-0.5 rounded border border-amber-500/20">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-4">
                  {item.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
                <span>Read Full Log</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/updates"
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-300 hover:text-amber-400 transition-colors"
          >
            <span>Explore All Release Logs & Roadmap</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
