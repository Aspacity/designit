'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';

export default function UpdatesPage() {
  const allUpdates = [
    {
      slug: 'core-spatial-engine-development',
      date: 'September 10, 2026',
      tag: 'Core Development',
      title: 'DesignIT Core Spatial Engine Currently Under Active Development',
      summary: 'Our engineering team is actively building the high-performance WebGPU/WebGL 3D canvas, real-time lighting pipeline, and S3 spatial asset resolver.',
    },
  ];

  return (
    <div className="min-h-screen dark:bg-neutral-950 bg-slate-50 dark:text-neutral-100 text-slate-900 flex flex-col font-sans selection:bg-amber-500 selection:text-white pt-16 sm:pt-20">
      <Navbar />

      <main className="flex-1 py-12 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to DesignIT Home</span>
          </Link>

          <div className="space-y-4 border-b dark:border-white/10 border-slate-200 pb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-mono font-semibold">
              <span>Devlog & Release Notes</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold dark:text-white text-slate-900 tracking-tight">
              Product Updates
            </h1>
            <p className="text-sm sm:text-base dark:text-neutral-300 text-slate-600 font-light max-w-2xl">
              Track our spatial rendering engine progress, new material releases, and feature rollouts leading up to public early access.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {allUpdates.map((item) => (
              <Link
                key={item.slug}
                href={`/updates/${item.slug}`}
                className="group rounded-2xl border dark:border-white/10 border-slate-200 dark:bg-neutral-900/50 bg-white p-6 sm:p-8 backdrop-blur-xl hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between block shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between text-xs dark:text-neutral-400 text-slate-500 mb-4">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-amber-500" />
                      <span>{item.date}</span>
                    </span>
                    <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-mono px-2.5 py-0.5 rounded border border-amber-500/20 font-semibold">
                      {item.tag}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold dark:text-white text-slate-900 mb-3 group-hover:text-amber-500 transition-colors">
                    {item.title}
                  </h2>

                  <p className="text-xs sm:text-sm dark:text-neutral-300 text-slate-600 leading-relaxed mb-6 font-light">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-4 border-t dark:border-white/5 border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
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
