/**
 * @file Aspacity/DesignIt/frontend/src/app/layout.tsx
 * @description Next.js App Router Root Layout for DesignIT.
 * @purpose Wraps all routes in ThemeProvider, AuthProvider, RoomProvider, PWAProvider, and ToastProvider for global availability.
 */

import './globals.css';
import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { RoomProvider } from '@/context/RoomContext';
import { ToastProvider } from '@/context/ToastContext';
import { PWAProvider } from '@/context/PWAContext';
import { ServiceWorkerRegisterEngine } from './ServiceWorkerRegisterEngine';
import { PWAInstallBanner } from '@/components/common/PWAInstallBanner';
import { IOSInstallModal } from '@/components/common/IOSInstallModal';
import { AspacityAuthModal } from '@/components/auth/AspacityAuthModal';

export const metadata: Metadata = {
  title: 'DesignIT — Interactive 3D Space Visualization | Aspacity Ecosystem',
  description: 'DesignIT is an interactive 3D interior design and spatial visualization platform under the Aspacity ecosystem.',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#090D16',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased selection:bg-orange-500 selection:text-white">
        <ServiceWorkerRegisterEngine />

        <ThemeProvider>
          <AuthProvider>
            <PWAProvider>
              <RoomProvider>
                <ToastProvider>
                  {children}
                  <PWAInstallBanner />
                  <IOSInstallModal />
                  <AspacityAuthModal />
                </ToastProvider>
              </RoomProvider>
            </PWAProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
