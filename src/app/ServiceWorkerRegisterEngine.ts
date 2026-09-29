/**
 * @file Aspacity/DesignIt/frontend/src/app/ServiceWorkerRegisterEngine.ts
 * @description Service Worker Registration Hook for DesignIT PWA.
 * @purpose Registers /sw.js in client browsers on app initialization.
 */

'use client';

import { useEffect } from 'react';

export function ServiceWorkerRegisterEngine() {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      process.env.NODE_ENV === 'production'
    ) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('✅ DesignIT Service Worker registered cleanly:', reg.scope);
        })
        .catch((err) => {
          console.warn('⚠️ DesignIT Service Worker registration note:', err);
        });
    }
  }, []);

  return null;
}
