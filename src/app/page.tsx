'use client';

import React from 'react';
import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { ProductIntro } from '@/components/landing/ProductIntro';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Capabilities } from '@/components/landing/Capabilities';
import { UseCases } from '@/components/landing/UseCases';
import { TheDifference } from '@/components/landing/TheDifference';
// import { InteractiveVsStatic } from '@/components/landing/InteractiveVsStatic';
import { Ecosystem } from '@/components/landing/Ecosystem';
import { UpdatesSection } from '@/components/landing/UpdatesSection';
import { FAQ } from '@/components/landing/FAQ';
import { Waitlist } from '@/components/landing/Waitlist';
import { Footer } from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-500 selection:text-white overflow-x-hidden">
      {/* Glassmorphic Sticky Header */}
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

      {/* Real-time Interactive vs Static Render Loop Comparison (Commented out per request) */}
      {/* <InteractiveVsStatic /> */}

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
