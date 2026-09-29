/**
 * @file Aspacity/DesignIt/frontend/src/components/common/IOSInstallModal.tsx
 * @description iOS Safari PWA Installation Guide Modal for DesignIT.
 * @purpose Renders step-by-step instructions for iPhone and iPad users to add DesignIT to Home Screen.
 */

'use client';

import React from 'react';
import { usePWAInstall } from '@/context/PWAContext';
import { Logo } from '@/components/common/Logo';
import { X, Share, PlusSquare, CheckCircle2 } from 'lucide-react';

export function IOSInstallModal() {
  const { showIOSModal, setShowIOSModal } = usePWAInstall();

  if (!showIOSModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in select-none">
      <div className="w-full max-w-sm rounded-3xl p-6 border border-amber-500/30 bg-card text-card-foreground shadow-2xl space-y-5 relative">
        {/* Close Button */}
        <button
          onClick={() => setShowIOSModal(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Logo size="lg" variant="icon" />
          </div>

          <h3 className="text-lg font-extrabold tracking-tight">Install DesignIT on iOS</h3>
          <p className="text-xs text-muted-foreground leading-relaxed font-light">
            Follow these 2 quick steps to add DesignIT to your iPhone or iPad Home Screen:
          </p>
        </div>

        <div className="space-y-3">
          {/* Step 1 */}
          <div className="p-3.5 rounded-2xl border border-border bg-secondary/50 flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-sm">
              1
            </span>
            <div className="text-xs text-foreground font-medium">
              <span>Tap the </span>
              <span className="font-bold text-orange-500 inline-flex items-center gap-1">
                <Share className="w-3.5 h-3.5 inline" /> Share button
              </span>
              <span> in Safari navigation bar.</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-3.5 rounded-2xl border border-border bg-secondary/50 flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-sm">
              2
            </span>
            <div className="text-xs text-foreground font-medium">
              <span>Scroll down and tap </span>
              <span className="font-bold text-orange-500 inline-flex items-center gap-1">
                <PlusSquare className="w-3.5 h-3.5 inline" /> &quot;Add to Home Screen&quot;
              </span>.
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowIOSModal(false)}
          className="w-full py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:scale-[1.02] active:scale-95 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-amber-500/25 transition-all uppercase tracking-wider"
        >
          Got It!
        </button>
      </div>
    </div>
  );
}

export default IOSInstallModal;
