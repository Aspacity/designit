/**
 * @file Aspacity/DesignIt/frontend/src/components/auth/AspacityAuthModal.tsx
 * @description Central Aspacity SSO Authentication Modal Component.
 * @purpose Modern, streamlined authentication modal with Google OAuth, clean credential forms, and existing account detection.
 */

'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { X, Lock, Mail, User as UserIcon, ShieldCheck, AlertCircle, ArrowRight, Check } from 'lucide-react';

// Mock list of existing Aspacity ecosystem emails for demonstration
const EXISTING_ASPACITY_EMAILS = [
  'admin@aspacity.com',
  'designer@aspacity.com',
  'user@aspacity.com',
  'client@aspacity.com',
];

export function AspacityAuthModal() {
  const { isAuthModalOpen, closeAuthModal, login } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Existing account alert state
  const [accountExistsNotice, setAccountExistsNotice] = useState<string | null>(null);
  const [accessGrantedNotice, setAccessGrantedNotice] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleGoogleOAuth = () => {
    setIsLoading(true);
    setAccountExistsNotice(null);

    setTimeout(() => {
      const mockToken = 'aspacity_google_oauth_jwt_token_2026';
      const mockUser = {
        id: 'aspacity-google-user-99',
        email: email || 'google.designer@aspacity.com',
        name: name || 'Google Aspacity User',
        role: 'professional' as const,
        accessible_products: ['PaintIT', 'DesignIT', 'BuildIT', 'SketchIT', 'SellIT'],
      };

      login(mockToken, mockUser);
      setIsLoading(false);
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAccountExistsNotice(null);
    setAccessGrantedNotice(null);

    const cleanEmail = email.trim().toLowerCase();
    const isExistingAccount = EXISTING_ASPACITY_EMAILS.includes(cleanEmail);

    // If user is registering and email already exists in Aspacity central identity DB
    if (isRegister && isExistingAccount) {
      setIsLoading(false);
      setAccountExistsNotice(
        `Account Found! An Aspacity account already exists for ${cleanEmail}. Simply sign in with your password to automatically access DesignIT.`
      );
      setIsRegister(false); // Seamlessly switch to Sign In mode
      return;
    }

    setTimeout(() => {
      const mockToken = 'mock_aspacity_jwt_token_2026';

      // Auto-detect role from system context (default to professional/client)
      const mockUser = {
        id: 'aspacity-user-77',
        email: cleanEmail,
        name: name || cleanEmail.split('@')[0],
        role: (cleanEmail.includes('admin') ? 'admin' : 'professional') as 'admin' | 'professional' | 'client',
        accessible_products: ['PaintIT', 'DesignIT', 'BuildIT', 'SketchIT', 'SellIT'],
      };

      if (isExistingAccount) {
        setAccessGrantedNotice('DesignIT access added to your existing Aspacity profile!');
      }

      login(mockToken, mockUser);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-card text-card-foreground rounded-3xl shadow-2xl border border-border p-6 sm:p-8 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">Aspacity Central SSO</h3>
              <p className="text-xs text-muted-foreground">One Identity Across All Aspacity Tools</p>
            </div>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-1.5 rounded-full hover:bg-secondary text-muted-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Existing Account Notice Banner */}
        {accountExistsNotice && (
          <div className="mt-4 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs leading-relaxed flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block mb-0.5">Aspacity Account Detected</span>
              <span>{accountExistsNotice}</span>
            </div>
          </div>
        )}

        {/* Access Granted Banner */}
        {accessGrantedNotice && (
          <div className="mt-4 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs leading-relaxed flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0" />
            <span>{accessGrantedNotice}</span>
          </div>
        )}

        {/* Google OAuth Section */}
        <div className="mt-6 space-y-4">
          <button
            type="button"
            onClick={handleGoogleOAuth}
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-2xl border border-border bg-background hover:bg-secondary text-xs font-semibold text-foreground flex items-center justify-center gap-3 transition-colors shadow-sm disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-border" />
            <span className="absolute bg-card px-3 text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
              Or continue with email
            </span>
          </div>
        </div>

        {/* Clean Credential Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 absolute left-3.5 top-3.5 text-muted-foreground" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full pl-10 pr-3 py-3 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs font-medium"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-muted-foreground" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="designer@aspacity.com"
                className="w-full pl-10 pr-3 py-3 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-muted-foreground" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3 py-3 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs transition-opacity shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <span>{isLoading ? 'Authenticating...' : isRegister ? 'Create Aspacity Account' : 'Sign In to DesignIT'}</span>
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        {/* Footer Toggle */}
        <div className="mt-6 pt-4 border-t border-border text-center text-xs text-muted-foreground">
          {isRegister ? 'Already have an Aspacity account?' : "Don't have an Aspacity account?"}{' '}
          <button
            onClick={() => {
              setIsRegister(!isRegister);
              setAccountExistsNotice(null);
            }}
            className="font-semibold text-orange-600 dark:text-orange-400 hover:underline ml-1"
          >
            {isRegister ? 'Sign In' : 'Register Now'}
          </button>
        </div>
      </div>
    </div>
  );
}
