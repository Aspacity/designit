/**
 * @file Aspacity/DesignIt/frontend/src/app/(viewer)/layout.tsx
 * @description Client Interactive Viewer Route Group Layout for DesignIT.
 * @purpose Provides a clean, accessible layout for clients and homeowners to view 3D proposals.
 */

'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon, Eye } from 'lucide-react';
import Link from 'next/link';

export default function ViewerLayout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-300">
      {/* Client Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-extrabold text-lg tracking-tight">
              DesignIT
            </Link>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              <span>Client Interactive Walkthrough</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/studio"
              className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-border hover:bg-secondary transition-colors"
            >
              Open Studio →
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-border bg-card hover:bg-secondary transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Client Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">{children}</main>

      {/* Client Footer */}
      <footer className="border-t border-border py-6 px-4 text-center text-xs text-muted-foreground">
        <p>© 2026 Aspacity Spatial Technologies</p>
      </footer>
    </div>
  );
}
