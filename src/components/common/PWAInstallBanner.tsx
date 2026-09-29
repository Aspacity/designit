/**
 * @file Aspacity/DesignIt/frontend/src/components/common/PWAInstallBanner.tsx
 * @description Custom Alternative PWA Install Banner for DesignIT.
 * @purpose Renders a custom bottom banner prompt with DesignIT Logo branding & direct Install CTA button when app is not installed.
 */

'use client';

import React, { useState, useEffect } from 'react';
import { usePWAInstall } from '@/context/PWAContext';
import { Logo } from '@/components/common/Logo';
import { Download, X, Sparkles } from 'lucide-react';

export function PWAInstallBanner() {
  const { isInstallable, isInstalled, isIOS, promptInstall } = usePWAInstall();
  const [dismissed, setDismissed] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const isDismissedStored = sessionStorage.getItem('designit_pwa_banner_dismissed') === 'true';
    if (isDismissedStored) {
      setDismissed(true);
    }
  }, []);

  if (!mounted || isInstalled || dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('designit_pwa_banner_dismissed', 'true');
  };

  const handleInstall = async () => {
    await promptInstall();
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-slide-up select-none">
      <div className="p-4 sm:p-5 rounded-3xl border border-amber-500/30 dark:bg-neutral-950/95 bg-white/95 text-foreground shadow-2xl backdrop-blur-xl flex items-center justify-between gap-3 relative overflow-hidden">
        {/* Top Accent Gradient Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600" />

        <div className="flex items-center gap-3 min-w-0">
          <Logo size="sm" variant="icon" />

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs font-bold tracking-tight truncate">Install DesignIT App</h4>
              <span className="px-1.5 py-0.2 rounded bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 text-[9px] font-mono font-bold">
                PWA
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground truncate mt-0.5 font-light">
              {isIOS ? 'Add to Home Screen for fast 3D room staging' : 'Fast 3D WebGPU engine, offline access & full screen'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleDismiss}
            className="px-2.5 py-1.5 rounded-xl text-[10px] font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            Later
          </button>

          <button
            onClick={handleInstall}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:scale-105 active:scale-95 text-white text-xs font-bold shadow-md shadow-amber-500/20 transition-all flex items-center gap-1.5 shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Install</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PWAInstallBanner;
