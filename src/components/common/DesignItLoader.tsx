/**
 * @file Aspacity/DesignIt/frontend/src/components/common/DesignItLoader.tsx
 * @description Captivating Animated 3D Loader Component for DesignIT featuring fluid morphing orange blob & floating block letter D.
 * @purpose Renders global page loading screens, canvas loading states, and auth transition overlays.
 */

'use client';

import React from 'react';

interface DesignItLoaderProps {
  message?: string;
  submessage?: string;
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function DesignItLoader({
  message = 'Loading DesignIT Spatial Engine...',
  submessage = 'Initializing WebGPU canvas shaders & spatial assets',
  fullScreen = false,
  size = 'md',
  className = '',
}: DesignItLoaderProps) {
  const sizeMap = {
    sm: { blob: 'w-14 h-14', ring: 'w-20 h-20', text: 'text-xs' },
    md: { blob: 'w-20 h-20', ring: 'w-28 h-28', text: 'text-sm' },
    lg: { blob: 'w-28 h-28', ring: 'w-36 h-36', text: 'text-base' },
  }[size];

  const content = (
    <div className={`flex flex-col items-center justify-center p-6 text-center select-none ${className}`}>
      {/* Animated Logo Container */}
      <div className="relative flex items-center justify-center mb-6">
        
        {/* Pulsing Glowing Ambient Aura */}
        <div className={`${sizeMap.blob} absolute rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 blur-xl opacity-60 animate-pulse`} />

        {/* Orbiting Spatial Energy Ring */}
        <div
          className={`${sizeMap.ring} absolute rounded-full border-2 border-dashed border-orange-500/40 dark:border-orange-400/50 animate-[spin_8s_linear_infinite]`}
        />

        {/* Morphing Orange Blob + Block Letter D (Square-0) */}
        <div className={`relative ${sizeMap.blob} flex items-center justify-center z-10 filter drop-shadow-xl animate-bounce-slow`}>
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full transform transition-transform"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="loaderBlobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="50%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#EA580C" />
              </linearGradient>

              <filter id="loaderGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Fluid Morphing Orange Blob */}
            <path
              d="M48,10 C68,8 88,22 92,42 C96,62 82,86 62,92 C42,98 18,88 10,68 C2,48 12,24 28,14 C36,9 42,10 48,10 Z"
              fill="url(#loaderBlobGrad)"
              filter="url(#loaderGlow)"
              className="animate-[pulse_3s_ease-in-out_infinite]"
            />

            {/* Bold Architectural Block 'D' / Square-0 Cutout with Float Shimmer */}
            <path
              d="M26,24 L52,24 C68,24 78,34 78,50 C78,66 68,76 52,76 L26,76 Z M40,38 L40,62 L50,62 C58,62 64,56 64,50 C64,44 58,38 50,38 Z"
              fill="#FFFFFF"
              fillRule="evenodd"
              className="animate-[pulse_2s_ease-in-out_infinite]"
            />
          </svg>
        </div>
      </div>

      {/* Loading Status Typography */}
      <div className="space-y-1.5 max-w-xs">
        <h4 className={`font-bold tracking-tight dark:text-white text-slate-900 ${sizeMap.text}`}>
          {message}
        </h4>
        {submessage && (
          <p className="text-[11px] font-mono text-muted-foreground animate-pulse">
            {submessage}
          </p>
        )}
      </div>

      {/* Animated Loading Bar */}
      <div className="w-36 h-1 bg-slate-200 dark:bg-neutral-800 rounded-full overflow-hidden mt-4">
        <div className="w-full h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-full animate-[shimmer_1.5s_infinite]" />
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center dark:bg-neutral-950/85 bg-white/90 backdrop-blur-xl animate-fade-in">
        {content}
      </div>
    );
  }

  return content;
}
