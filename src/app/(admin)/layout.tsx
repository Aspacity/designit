/**
 * @file Aspacity/DesignIt/frontend/src/app/(admin)/layout.tsx
 * @description Admin Route Group Layout for DesignIT.
 * @purpose Provides a dedicated administrator dashboard layout with security branding and role status.
 */

'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { ShieldCheck, Sun, Moon } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  const { user, openAuthModal, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-300">
      {/* Admin Security Header Navigation */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-extrabold text-lg tracking-tight">
              DesignIT
            </Link>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-500/10 text-red-600 border border-red-500/20 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/studio"
              className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-border hover:bg-secondary transition-colors"
            >
              Professional Studio →
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-border bg-card hover:bg-secondary transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
            {user ? (
              <button
                onClick={logout}
                className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-border hover:bg-secondary transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={openAuthModal}
                className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-primary text-primary-foreground"
              >
                Admin Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">{children}</main>

      {/* Admin Footer */}
      <footer className="border-t border-border py-6 px-4 text-center text-xs text-muted-foreground">
        <p>Aspacity Administration Engine • Restricted Access</p>
      </footer>
    </div>
  );
}
