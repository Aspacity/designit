'use client';

import React, { useEffect } from 'react';
import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { ProductIntro } from '@/components/landing/ProductIntro';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Capabilities } from '@/components/landing/Capabilities';
import { UseCases } from '@/components/landing/UseCases';
import { TheDifference } from '@/components/landing/TheDifference';
import { Ecosystem } from '@/components/landing/Ecosystem';
import { UpdatesSection } from '@/components/landing/UpdatesSection';
import { FAQ } from '@/components/landing/FAQ';
import { Waitlist } from '@/components/landing/Waitlist';
import { Footer } from '@/components/landing/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function LandingPage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      // Trigger a layout refresh after client hydration and font loading
      const refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);
      return () => clearTimeout(refreshTimer);
    }
  }, []);

  return (
    <div className="min-h-screen dark:bg-neutral-950 bg-slate-50 dark:text-neutral-100 text-slate-900 font-sans selection:bg-amber-500 selection:text-white overflow-x-hidden pt-16 sm:pt-20">
      {/* Glassmorphic Fixed Header */}
      <Navbar />

      {/* Hero Section with "Bring your space to life..." & GSAP entrance */}
      <Hero />

      {/* Product Overview & Philosophy */}
      <ProductIntro />

      {/* 4-Step How It Works Workflow */}
      <HowItWorks />

      {/* Platform Capabilities */}
      <Capabilities />

      {/* Targeted Audience Use Cases */}
      <UseCases />

      {/* The Advantage: Speed & Accessibility vs Complex CAD */}
      <TheDifference />

      {/* Aspacity Ecosystem Discovery Pathway */}
      <Ecosystem />

      {/* Active Core Development Progress */}
      <UpdatesSection />

      {/* Frequently Asked Questions */}
      <FAQ />

      {/* Primary Pre-Launch Waitlist Form */}
      <Waitlist />

      {/* Aspacity Product Footer */}
      <Footer />
    </div>
  );
}
