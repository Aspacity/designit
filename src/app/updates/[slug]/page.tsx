'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';

interface PostData {
  title: string;
  date: string;
  tag: string;
  summary: string;
  sections: {
    heading: string;
    content: string;
    points?: string[];
  }[];
}

const updatePosts: Record<string, PostData> = {
  'core-spatial-engine-development': {
    title: 'DesignIT Core Spatial Engine Currently Under Active Development',
    date: 'September 10, 2026',
    tag: 'Core Development',
    summary: 'Our engineering team is actively building the high-performance WebGPU/WebGL 3D canvas, real-time lighting pipeline, and S3 spatial asset resolver.',
    sections: [
      {
        heading: '60 FPS Real-time Spatial Viewport',
        content: 'We are engineering a zero-barrier 3D viewport using Three.js and WebGPU. Lighting and materials render smoothly directly inside standard browsers.',
        points: [
          'Optimized GLTF/GLB model loading with low memory footprint',
          'Smooth 360° camera orbit and first-person walkthrough',
          'Full offline local model directory serving & cloud fallback',
        ],
      },
    ],
  },
};

export default function UpdateDetailPage({ params }: { params: { slug: string } }) {
  const post = updatePosts[params.slug] || updatePosts['core-spatial-engine-development'];

  return (
    <div className="min-h-screen dark:bg-neutral-950 bg-slate-50 dark:text-neutral-100 text-slate-900 flex flex-col font-sans selection:bg-amber-500 selection:text-white pt-16 sm:pt-20">
      <Navbar />

      <main className="flex-1 py-12 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
          
          <Link
            href="/updates"
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Updates</span>
          </Link>

          <div className="space-y-4 border-b dark:border-white/10 border-slate-200 pb-8">
            <div className="flex items-center gap-3 text-xs dark:text-neutral-400 text-slate-500">
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                <span>{post.date}</span>
              </span>
              <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-mono px-2.5 py-0.5 rounded border border-amber-500/20 font-semibold">
                {post.tag}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold dark:text-white text-slate-900 tracking-tight leading-tight">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg dark:text-neutral-300 text-slate-600 font-light leading-relaxed">
              {post.summary}
            </p>
          </div>

          <div className="space-y-8 text-sm dark:text-neutral-300 text-slate-700 leading-relaxed font-light">
            {post.sections.map((sec, idx) => (
              <section key={idx} className="space-y-3 dark:bg-neutral-900/40 bg-white p-6 rounded-2xl border dark:border-white/5 border-slate-200 shadow-sm">
                <h2 className="text-xl font-bold dark:text-white text-slate-900">{sec.heading}</h2>
                <p>{sec.content}</p>
                {sec.points && (
                  <ul className="space-y-2 pt-2">
                    {sec.points.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm dark:text-neutral-400 text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div className="pt-8 border-t dark:border-white/10 border-slate-200 flex items-center justify-between">
            <Link
              href="/#waitlist"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-xs sm:text-sm hover:scale-105 transition-transform shadow-md"
            >
              <span>Join Early Access Waitlist</span>
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
