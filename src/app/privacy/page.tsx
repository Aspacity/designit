'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen dark:bg-neutral-950 bg-slate-50 dark:text-neutral-100 text-slate-900 flex flex-col font-sans selection:bg-amber-500 selection:text-white pt-16 sm:pt-20">
      <Navbar />

      <main className="flex-1 py-12 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
          
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to DesignIT Home</span>
          </Link>

          <div className="space-y-4 border-b dark:border-white/10 border-slate-200 pb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-mono font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Legal Document</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold dark:text-white text-slate-900 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs dark:text-neutral-400 text-slate-500 font-mono">
              Last updated: September 10, 2026 • Aspacity Privacy Standard
            </p>
          </div>

          <div className="space-y-8 text-sm dark:text-neutral-300 text-slate-700 leading-relaxed font-light">
            <section className="space-y-3 dark:bg-neutral-900/40 bg-white p-6 sm:p-8 rounded-2xl border dark:border-white/5 border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold dark:text-white text-slate-900">1. Introduction</h2>
              <p>
                Aspacity ("we", "us", "our") respects your privacy and is committed to protecting the personal data of users interacting with DesignIT and the broader Aspacity spatial ecosystem. This Privacy Policy explains how we collect, store, process, and safeguard information provided during pre-launch waitlist registration and platform use.
              </p>
            </section>

            <section className="space-y-3 dark:bg-neutral-900/40 bg-white p-6 sm:p-8 rounded-2xl border dark:border-white/5 border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold dark:text-white text-slate-900">2. Information We Collect</h2>
              <p>When you register on the DesignIT waitlist, we collect:</p>
              <ul className="list-disc pl-5 space-y-2 dark:text-neutral-400 text-slate-600">
                <li><strong className="dark:text-white text-slate-900 font-semibold">Contact Information:</strong> Email address and optional phone number.</li>
                <li><strong className="dark:text-white text-slate-900 font-semibold">Professional Role:</strong> Selected role (e.g. Interior Designer, Architect, Homeowner).</li>
                <li><strong className="dark:text-white text-slate-900 font-semibold">Usage & Telemetry:</strong> Standard web analytics (browser type, anonymized IP, page interactions) to optimize spatial rendering performance across devices.</li>
              </ul>
            </section>

            <section className="space-y-3 dark:bg-neutral-900/40 bg-white p-6 sm:p-8 rounded-2xl border dark:border-white/5 border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold dark:text-white text-slate-900">3. How We Use Your Information</h2>
              <p>We use collected data solely for:</p>
              <ul className="list-disc pl-5 space-y-2 dark:text-neutral-400 text-slate-600">
                <li>Notifying you of early access availability and platform invites.</li>
                <li>Tailoring platform features based on professional role requirements.</li>
                <li>Improving WebGPU engine performance and compatibility.</li>
              </ul>
            </section>

            <section className="space-y-3 dark:bg-neutral-900/40 bg-white p-6 sm:p-8 rounded-2xl border dark:border-white/5 border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold dark:text-white text-slate-900">4. Data Sharing & Security</h2>
              <p>
                We do not sell, rent, or lease your personal contact details to third parties. All waitlist data is securely stored using encrypted PostgreSQL databases with SSL auto-detection.
              </p>
            </section>

            <section className="space-y-3 dark:bg-neutral-900/40 bg-white p-6 sm:p-8 rounded-2xl border dark:border-white/5 border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold dark:text-white text-slate-900">5. Your Rights</h2>
              <p>
                You have the right to request deletion of your waitlist record or update your contact preferences at any time by contacting privacy@aspacity.com.
              </p>
            </section>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
