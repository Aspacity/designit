'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToWaitlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById('waitlist');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-neutral-950/90 backdrop-blur-xl transition-all shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16 sm:h-20">
        
        {/* Brand Section */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              D
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-white text-base sm:text-lg tracking-tight">DesignIT</span>
                <span className="text-[10px] font-mono uppercase bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/20 font-semibold">
                  Pre-Launch
                </span>
              </div>
              <span className="text-[10px] text-neutral-400 tracking-wide font-medium">by Aspacity</span>
            </div>
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs lg:text-sm font-semibold text-neutral-300">
          <a href="#about" className="hover:text-amber-400 transition-colors">
            About
          </a>
          <a href="#how-it-works" className="hover:text-amber-400 transition-colors">
            How It Works
          </a>
          <a href="#capabilities" className="hover:text-amber-400 transition-colors">
            Capabilities
          </a>
          <a href="#use-cases" className="hover:text-amber-400 transition-colors">
            Use Cases
          </a>
          <a href="#faq" className="hover:text-amber-400 transition-colors">
            FAQ
          </a>
          <Link href="/updates" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
            <span>Updates</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          </Link>
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://aspacity.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
          >
            Aspacity Home
          </a>
          <button
            onClick={scrollToWaitlist}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2.5 text-xs lg:text-sm font-bold text-white shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all"
          >
            <span>Join Waitlist</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={scrollToWaitlist}
            className="rounded-lg bg-amber-500/20 px-3 py-1.5 text-xs font-bold text-amber-400 border border-amber-500/30"
          >
            Waitlist
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-neutral-950/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-4">
          <div className="flex flex-col space-y-3 text-sm text-neutral-300 font-semibold border-b border-white/5 pb-4">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400 transition-colors"
            >
              About DesignIT
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#capabilities"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400 transition-colors"
            >
              Capabilities
            </a>
            <a
              href="#use-cases"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400 transition-colors"
            >
              Use Cases
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400 transition-colors"
            >
              FAQ
            </a>
            <Link
              href="/updates"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-amber-400 flex items-center justify-between"
            >
              <span>Product Updates</span>
              <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">New</span>
            </Link>
          </div>

          <div className="space-y-2 pt-1">
            <button
              onClick={scrollToWaitlist}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 py-3 text-sm font-bold text-white shadow-lg shadow-amber-500/20"
            >
              <span>Join Early Access Waitlist</span>
            </button>
            <a
              href="https://aspacity.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full block text-center py-2 text-xs text-neutral-400 hover:text-white"
            >
              Explore Aspacity Spatial Platform &rarr;
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
