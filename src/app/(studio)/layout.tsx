/**
 * @file Aspacity/DesignIt/frontend/src/app/(studio)/layout.tsx
 * @description Professional Studio Route Group Layout for DesignIT.
 * @purpose Provides a dedicated studio workspace layout with toolbar controls, project save/load status, and role indicator.
 */

'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { Sun, Moon, Layout as LayoutIcon, Menu, X, Eye, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  const { user, openAuthModal, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-300">
      {/* Studio Header Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-extrabold text-lg tracking-tight">
              DesignIT
            </Link>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center gap-1">
              <LayoutIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Professional Studio</span>
              <span className="sm:hidden">Studio</span>
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/viewer"
              className="hidden sm:inline-flex text-xs font-semibold px-3 py-1.5 rounded-xl border border-border hover:bg-secondary transition-colors"
            >
              Client Viewer →
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
                className="hidden sm:inline-flex px-3 py-1.5 text-xs font-semibold rounded-xl border border-border hover:bg-secondary transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={openAuthModal}
                className="hidden sm:inline-flex px-3 py-1.5 text-xs font-semibold rounded-xl bg-primary text-primary-foreground"
              >
                SSO Sign In
              </button>
            )}

            {/* Mobile Navigation Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 rounded-xl border border-border bg-card hover:bg-secondary transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-b border-border bg-card/95 backdrop-blur-md px-4 py-3 space-y-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-semibold p-2 rounded-xl hover:bg-secondary"
            >
              Home Page
            </Link>
            <Link
              href="/viewer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-xs font-semibold p-2 rounded-xl hover:bg-secondary"
            >
              <Eye className="w-4 h-4 text-amber-500" />
              <span>Client Viewer</span>
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-xs font-semibold p-2 rounded-xl hover:bg-secondary"
            >
              <ShieldCheck className="w-4 h-4 text-orange-600" />
              <span>Admin Portal</span>
            </Link>
            {user ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="w-full text-left text-xs font-semibold p-2 rounded-xl hover:bg-secondary text-red-500"
              >
                Sign Out ({user.name})
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal();
                }}
                className="w-full mt-1 py-2 text-xs font-semibold rounded-xl bg-primary text-primary-foreground text-center"
              >
                SSO Sign In
              </button>
            )}
          </div>
        )}
      </header>

      {/* Main Studio Body */}
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
