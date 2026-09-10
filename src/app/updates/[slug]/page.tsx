'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Sparkles, Tag, CheckCircle2 } from 'lucide-react';
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
  'webgpu-engine-upgrade': {
    title: 'DesignIT WebGPU Spatial Engine v1.4 Released',
    date: 'September 08, 2026',
    tag: 'Engine Architecture',
    summary: 'Achieved 60 FPS real-time rendering on browser canvas with dynamic sunlight simulation, PBR roughness controls, and low memory overhead.',
    sections: [
      {
        heading: '60 FPS Real-time Spatial Performance',
        content: 'We completely overhauled our WebGL/WebGPU rendering pipeline in Three.js and React Three Fiber. Shadows and material lighting are now calculated on GPU shaders in real-time, eliminating choppy viewport movement when moving furniture assets.',
        points: [
          'Reduced memory consumption by 35% across GLTF model instances',
          'Smooth 60 FPS camera orbit and first-person walkthrough',
          'Adaptive light map resolution for mobile browsers',
        ],
      },
      {
        heading: 'Dynamic Sunlight Progression',
        content: 'Users can now adjust the simulated time of day slider. Watch realistic window sunbeams shift across floors and walls with accurate directional shadow casting.',
      },
    ],
  },
  'pbr-material-library-expansion': {
    title: 'Expanded PBR Material Library & S3 Asset Resolver',
    date: 'August 28, 2026',
    tag: 'Asset Pipeline',
    summary: 'Added 40+ architectural materials including Italian marble, brushed brass, natural oak, and acoustic wall panels integrated with cloud storage.',
    sections: [
      {
        heading: 'High-Fidelity Architectural Textures',
        content: 'Our spatial asset pipeline now resolves textures dynamically through our S3 asset resolver with instant fallback capabilities.',
        points: [
          '4K texture maps compressed for WebGPU loading under 200ms',
          'Custom roughness, metalness, and bump map fine-tuning',
          'One-click material swap across room walls, flooring, and furniture',
        ],
      },
    ],
  },
  'admin-playground-configurator': {
    title: 'Introducing Admin Blueprint Configurator',
    date: 'August 14, 2026',
    tag: 'Admin Tools',
    summary: 'Administrators can now create, configure, and save master 3D room blueprints that act as starting templates for interior designers.',
    sections: [
      {
        heading: 'Master Blueprints for Rapid Staging',
        content: 'The new Admin Playground allows superusers to define room boundaries, lighting presets, and default furniture orbits. Saved blueprints appear instantly in the user creation catalog.',
      },
    ],
  },
  'aspacity-ecosystem-integration': {
    title: 'Unifying DesignIT into the Aspacity Spatial Ecosystem',
    date: 'July 30, 2026',
    tag: 'Platform Vision',
    summary: 'Connected DesignIT auth, asset resolver, and project schema with PaintIT and upcoming spatial applications across Aspacity.',
    sections: [
      {
        heading: 'Interconnected Spatial Ecosystem',
        content: 'DesignIT seamlessly integrates with PaintIT color palettes and shared Aspacity single sign-on middleware.',
      },
    ],
  },
};

export default function UpdateDetailPage({ params }: { params: { slug: string } }) {
  const post = updatePosts[params.slug] || updatePosts['webgpu-engine-upgrade'];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-500 selection:text-white">
      <Navbar />

      <main className="flex-1 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
          
          <Link
            href="/updates"
            className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Updates</span>
          </Link>

          <div className="space-y-4 border-b border-white/10 pb-8">
            <div className="flex items-center gap-3 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>{post.date}</span>
              </span>
              <span className="bg-amber-500/10 text-amber-400 text-[10px] font-mono px-2 py-0.5 rounded border border-amber-500/20">
                {post.tag}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
              {post.summary}
            </p>
          </div>

          <div className="space-y-8 text-sm text-neutral-300 leading-relaxed font-light">
            {post.sections.map((sec, idx) => (
              <section key={idx} className="space-y-3 bg-neutral-900/40 p-6 rounded-2xl border border-white/5">
                <h2 className="text-xl font-bold text-white">{sec.heading}</h2>
                <p>{sec.content}</p>
                {sec.points && (
                  <ul className="space-y-2 pt-2">
                    {sec.points.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-400">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div className="pt-8 border-t border-white/10 flex items-center justify-between">
            <Link
              href="/#waitlist"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-white font-semibold text-xs sm:text-sm hover:scale-105 transition-transform"
            >
              <Sparkles className="w-4 h-4" />
              <span>Join Early Access Waitlist</span>
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
