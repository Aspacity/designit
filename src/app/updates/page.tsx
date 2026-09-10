'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Calendar, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';

export default function UpdatesPage() {
  const allUpdates = [
    {
      slug: 'webgpu-engine-upgrade',
      date: 'September 08, 2026',
      tag: 'Engine Architecture',
      title: 'DesignIT WebGPU Spatial Engine v1.4 Released',
      summary: 'Achieved 60 FPS real-time rendering on browser canvas with dynamic sunlight simulation, PBR roughness controls, and low memory overhead.',
    },
    {
      slug: 'pbr-material-library-expansion',
      date: 'August 28, 2026',
      tag: 'Asset Pipeline',
      title: 'Expanded PBR Material Library & S3 Asset Resolver',
      summary: 'Added 40+ architectural materials including Italian marble, brushed brass, natural oak, and acoustic wall panels integrated with cloud storage.',
    },
    {
      slug: 'admin-playground-configurator',
      date: 'August 14, 2026',
      tag: 'Admin Tools',
      title: 'Introducing Admin Blueprint Configurator',
      summary: 'Administrators can now create, configure, and save master 3D room blueprints that act as starting templates for interior designers.',
    },
    {
      slug: 'aspacity-ecosystem-integration',
      date: 'July 30, 2026',
      tag: 'Platform Vision',
      title: 'Unifying DesignIT into the Aspacity Spatial Ecosystem',
      summary: 'Connected DesignIT auth, asset resolver, and project schema with PaintIT and upcoming spatial applications across Aspacity.',
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-500 selection:text-white">
      <Navbar />

      <main className="flex-1 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to DesignIT Home</span>
          </Link>

          <div className="space-y-4 border-b border-white/10 pb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Devlog & Release Notes</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Product Updates
            </h1>
            <p className="text-sm sm:text-base text-neutral-300 font-light max-w-2xl">
              Track our spatial rendering engine progress, new material releases, and feature rollouts leading up to public early access.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allUpdates.map((item) => (
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

                  <h2 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-4">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
                  <span>Read Log</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
