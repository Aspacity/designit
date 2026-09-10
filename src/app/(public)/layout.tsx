/**
 * @file Aspacity/DesignIt/frontend/src/app/(public)/layout.tsx
 * @description Public Route Group Layout for DesignIT (White & Orange / Black & Orange Theme).
 * @purpose Provides an open, unrestricted header and layout for public visitors with Orange brand styling.
 */

'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { Sun, Moon, ShieldCheck, Eye, Layout as LayoutIcon } from 'lucide-react';
import Link from 'next/link';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  const { user, openAuthModal, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-300">
      {/* Public Header Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md font-extrabold text-lg">
                D
              </div>
              <div>
                <span className="font-bold text-lg tracking-tight">DesignIT</span>
                <span className="ml-2 text-xs font-semibold text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20">
                  Aspacity
                </span>
              </div>
            </Link>
          </div>

          {/* Workflow Route Links */}
          <nav className="hidden md:flex items-center gap-4 text-xs font-semibold text-muted-foreground">
            <Link href="/studio" className="hover:text-foreground transition-colors flex items-center gap-1">
              <LayoutIcon className="w-3.5 h-3.5 text-orange-500" />
              <span>Studio</span>
            </Link>
            <Link href="/viewer" className="hover:text-foreground transition-colors flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-amber-500" />
              <span>Client Viewer</span>
            </Link>
            <Link href="/admin" className="hover:text-foreground transition-colors flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-orange-600" />
              <span>Admin Portal</span>
            </Link>
          </nav>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Light and Dark Theme"
              className="p-2.5 rounded-xl border border-border bg-card hover:bg-secondary transition-colors text-foreground"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline text-xs font-medium text-muted-foreground">
                  {user.name} ({user.role})
                </span>
                <button
                  onClick={logout}
                  className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-border hover:bg-secondary transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={openAuthModal}
                className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-md"
              >
                Aspacity SSO Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center sm:flex sm:items-center sm:justify-between text-xs text-muted-foreground">
        <p>© 2026 Aspacity Technologies. All rights reserved.</p>
        <div className="mt-4 sm:mt-0 flex items-center justify-center gap-4">
          <span>DesignIT v1.0.0</span>
          <span>•</span>
          <span>Theme: {theme}</span>
        </div>
      </footer>
    </div>
  );
}
