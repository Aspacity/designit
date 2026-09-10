'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-500 selection:text-white">
      <Navbar />

      <main className="flex-1 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
          
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to DesignIT Home</span>
          </Link>

          <div className="space-y-4 border-b border-white/10 pb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
              <FileText className="w-3.5 h-3.5" />
              <span>Legal Document</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Terms & Conditions
            </h1>
            <p className="text-xs text-neutral-400 font-mono">
              Last updated: September 10, 2026 • Aspacity Platform Terms
            </p>
          </div>

          <div className="space-y-8 text-sm text-neutral-300 leading-relaxed font-light">
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white">1. Acceptance of Terms</h2>
              <p>
                By accessing or registering for pre-launch early access to DesignIT (a product operated by Aspacity), you agree to comply with and be bound by these Terms & Conditions.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white">2. Pre-Launch Access & Availability</h2>
              <p>
                DesignIT is currently in active pre-launch development. Features, user interfaces, 3D engine capabilities, and availability may be modified, updated, or temporarily restricted as we refine the platform. Waitlist registration does not guarantee immediate access.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white">3. Intellectual Property</h2>
              <p>
                All brand marks, logos, WebGPU spatial engine code, Admin blueprint assets, and UI components associated with DesignIT and Aspacity remain the exclusive intellectual property of Aspacity.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white">4. User Content & 3D Assets</h2>
              <p>
                Users retain ownership of room layouts and project configurations created within DesignIT. By generating shareable links, you grant Aspacity a non-exclusive license to host and render those 3D previews for your specified audience.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white">5. Limitation of Liability</h2>
              <p>
                DesignIT provides spatial visualization for planning and presentation purposes. Final architectural engineering, structural calculations, and building code compliance remain the responsibility of certified professionals.
              </p>
            </section>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
