/**
 * @file Aspacity/DesignIt/frontend/src/context/PWAContext.tsx
 * @description PWA Context Provider & Custom Hook for DesignIT.
 * @purpose Manages PWA installation detection, deferred beforeinstallprompt capturing, iOS guide modal, and custom install triggers.
 */

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface PWAInstallMetrics {
  prompts: number;
  accepted: number;
  dismissed: number;
  lastOutcome: string | null;
}

interface PWAContextType {
  isInstallable: boolean;
  isInstalled: boolean;
  isIOS: boolean;
  promptInstall: () => Promise<'accepted' | 'dismissed' | 'ios_guide' | 'unavailable'>;
  showIOSModal: boolean;
  setShowIOSModal: (val: boolean) => void;
  metrics: PWAInstallMetrics;
}

const PWAContext = createContext<PWAContextType | undefined>(undefined);

export const PWAProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState<boolean>(false);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [showIOSModal, setShowIOSModal] = useState<boolean>(false);
  const [metrics, setMetrics] = useState<PWAInstallMetrics>({
    prompts: 0,
    accepted: 0,
    dismissed: 0,
    lastOutcome: null,
  });

  useEffect(() => {
    // 1. Detect if running inside standalone PWA mode
    const checkStandalone = () => {
      const isStandaloneMedia = window.matchMedia('(display-mode: standalone)').matches;
      const isIOSStandalone = (window.navigator as any).standalone === true;
      const isStoredInstalled = localStorage.getItem('designit_pwa_installed') === 'true';

      if (isStandaloneMedia || isIOSStandalone || isStoredInstalled) {
        setIsInstalled(true);
      }
    };

    checkStandalone();

    // 2. Detect iOS Safari platform
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIOSDevice);

    // 3. Listen for browser 'beforeinstallprompt' event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    // 4. Listen for browser 'appinstalled' event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      localStorage.setItem('designit_pwa_installed', 'true');

      setMetrics((prev) => ({
        ...prev,
        accepted: prev.accepted + 1,
        lastOutcome: 'installed_event',
      }));
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const promptInstall = async (): Promise<'accepted' | 'dismissed' | 'ios_guide' | 'unavailable'> => {
    if (isIOS && !isInstalled) {
      setShowIOSModal(true);
      return 'ios_guide';
    }

    if (!deferredPrompt) {
      console.log('No deferred PWA install prompt available.');
      return 'unavailable';
    }

    setMetrics((prev) => ({ ...prev, prompts: prev.prompts + 1 }));

    try {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      const outcome = choiceResult.outcome as 'accepted' | 'dismissed';

      setMetrics((prev) => ({
        ...prev,
        accepted: outcome === 'accepted' ? prev.accepted + 1 : prev.accepted,
        dismissed: outcome === 'dismissed' ? prev.dismissed + 1 : prev.dismissed,
        lastOutcome: outcome,
      }));

      if (outcome === 'accepted') {
        setIsInstalled(true);
        localStorage.setItem('designit_pwa_installed', 'true');
      }

      setDeferredPrompt(null);
      setIsInstallable(false);
      return outcome;
    } catch (err) {
      console.error('Error triggering PWA install prompt:', err);
      return 'unavailable';
    }
  };

  return (
    <PWAContext.Provider
      value={{
        isInstallable,
        isInstalled,
        isIOS,
        promptInstall,
        showIOSModal,
        setShowIOSModal,
        metrics,
      }}
    >
      {children}
    </PWAContext.Provider>
  );
};

export const usePWAInstall = () => {
  const context = useContext(PWAContext);
  if (!context) {
    throw new Error('usePWAInstall must be used within a PWAProvider');
  }
  return context;
};
