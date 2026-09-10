'use client';

import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-neutral-950 text-neutral-400 py-12 sm:py-16 text-xs sm:text-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white font-extrabold text-base shadow-md">
                D
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-white text-base">DesignIT</span>
                <span className="text-[10px] text-neutral-400 font-medium">by Aspacity</span>
              </div>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              The zero-barrier 3D spatial visualization platform for creators, designers, architects, and visionaries.
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-white font-bold tracking-wider">
              DesignIT Platform
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">
                  About Product
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-amber-400 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-amber-400 transition-colors">
                  Capabilities
                </a>
              </li>
              <li>
                <a href="#use-cases" className="hover:text-amber-400 transition-colors">
                  Use Cases
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-amber-400 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <Link href="/updates" className="hover:text-amber-400 transition-colors">
                  Product Updates & Release Logs
                </Link>
              </li>
            </ul>
          </div>

          {/* Ecosystem Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-white font-bold tracking-wider">
              Aspacity Ecosystem
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <a
                  href="https://paintit.aspacity.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span>PaintIT (3D Paint Visualizer)</span>
                  <span className="text-[10px] text-emerald-400 font-bold">Live</span>
                </a>
              </li>
              <li>
                <span className="text-amber-400 font-bold">DesignIT (Spatial Studio) — Pre-Launch</span>
              </li>
              <li>
                <a
                  href="https://aspacity.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors"
                >
                  BuildIT (Construction Spatial Planning)
                </a>
              </li>
              <li>
                <a
                  href="https://aspacity.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors"
                >
                  SellIT (3D Real Estate Presales)
                </a>
              </li>
              <li>
                <a
                  href="https://aspacity.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors"
                >
                  FurnishIT (Spatial E-commerce Staging)
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-white font-bold tracking-wider">
              Legal & Trust
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link href="/privacy" className="hover:text-amber-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <a
                  href="https://aspacity.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors"
                >
                  Aspacity Corporate Website
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} DesignIT — A product by Aspacity. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}
