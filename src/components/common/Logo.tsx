/**
 * @file Aspacity/DesignIt/frontend/src/components/common/Logo.tsx
 * @description Official DesignIT Brand Logo Component featuring organic orange blob background & architectural block letter 'D' (Square-0 shape).
 * @purpose Renders scalable SVG brand logo across Navbar, Footer, Admin, Studio, and Loading views.
 */

'use client';

import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'full' | 'icon';
  className?: string;
  showSubtitle?: boolean;
}

export function Logo({
  size = 'md',
  variant = 'full',
  className = '',
  showSubtitle = true,
}: LogoProps) {
  // Size dimensions map
  const dimensions = {
    sm: { icon: 'w-7 h-7', text: 'text-base', sub: 'text-[9px]' },
    md: { icon: 'w-9 h-9', text: 'text-lg', sub: 'text-[10px]' },
    lg: { icon: 'w-11 h-11', text: 'text-xl', sub: 'text-[11px]' },
    xl: { icon: 'w-14 h-14', text: 'text-2xl', sub: 'text-xs' },
    '2xl': { icon: 'w-20 h-20', text: 'text-4xl', sub: 'text-sm' },
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Icon Mark: Organic Orange Blob + Block Letter D (Square-0) */}
      <div className={`relative ${dimensions.icon} flex-shrink-0 group`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-md group-hover:scale-105 transition-transform duration-300"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="designitBlobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="45%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
            
            <filter id="blobGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Organic Vibrant Orange Blob Background */}
          <path
            d="M48,10 C68,8 88,22 92,42 C96,62 82,86 62,92 C42,98 18,88 10,68 C2,48 12,24 28,14 C36,9 42,10 48,10 Z"
            fill="url(#designitBlobGrad)"
            filter="url(#blobGlowFilter)"
          />

          {/* Bold Architectural Block 'D' / Square-0 cutout */}
          <path
            d="M26,24 L52,24 C68,24 78,34 78,50 C78,66 68,76 52,76 L26,76 Z M40,38 L40,62 L50,62 C58,62 64,56 64,50 C64,44 58,38 50,38 Z"
            fill="#FFFFFF"
            fillRule="evenodd"
          />

          {/* Subtle 3D Inner Highlight line */}
          <path
            d="M26,24 L52,24 C68,24 78,34 78,50"
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Brand Text Stack */}
      {variant === 'full' && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`font-extrabold tracking-tight dark:text-white text-slate-900 ${dimensions.text}`}>
              Design<span className="text-orange-500">IT</span>
            </span>
          </div>
          {showSubtitle && (
            <span className={`font-medium tracking-wide dark:text-neutral-400 text-slate-500 mt-0.5 ${dimensions.sub}`}>
              by Aspacity
            </span>
          )}
        </div>
      )}
    </div>
  );
}
