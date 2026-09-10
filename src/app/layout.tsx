/**
 * @file Aspacity/DesignIt/frontend/src/app/layout.tsx
 * @description Next.js App Router Root Layout for DesignIT.
 * @purpose Wraps all routes in ThemeProvider, AuthProvider, RoomProvider, and ToastProvider for global availability.
 */

import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { RoomProvider } from '@/context/RoomContext';
import { ToastProvider } from '@/context/ToastContext';
import { AspacityAuthModal } from '@/components/auth/AspacityAuthModal';

export const metadata: Metadata = {
  title: 'DesignIT — Interactive 3D Space Visualization | Aspacity Ecosystem',
  description: 'DesignIT is an interactive 3D interior design and spatial visualization platform under the Aspacity ecosystem.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased selection:bg-orange-500 selection:text-white">
        <ThemeProvider>
          <AuthProvider>
            <RoomProvider>
              <ToastProvider>
                {children}
                <AspacityAuthModal />
              </ToastProvider>
            </RoomProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
