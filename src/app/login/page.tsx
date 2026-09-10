/**
 * @file DesignIt/frontend/src/app/login/page.tsx
 * @description Aspacity Central SSO OAuth Callback & Direct Login Page.
 * @purpose Catches OAuth parameters (?token=...&email=...) from aspacity-backend redirect, verifies session, displays Toast, and redirects to Studio.
 */

'use client';

import React, { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Loader2 } from 'lucide-react';

function LoginHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login, openAuthModal } = useAuth();
  const { showToast } = useToast();

  const processedRef = React.useRef(false);

  useEffect(() => {
    if (processedRef.current) return;
    processedRef.current = true;

    const urlToken = searchParams?.get('token');
    const urlEmail = searchParams?.get('email');
    const urlName = searchParams?.get('name');
    const urlRole = searchParams?.get('role');
    const errorMsg = searchParams?.get('error');

    if (errorMsg) {
      showToast(`Authentication Error: ${errorMsg}`, 'error');
      router.push('/');
      return;
    }

    if (urlToken && urlEmail) {
      login(urlToken, {
        id: searchParams?.get('id') || 'oauth-user',
        email: urlEmail,
        name: urlName || urlEmail.split('@')[0],
        role: urlRole?.toUpperCase() === 'PAINTER' ? 'professional' : urlRole?.toLowerCase() === 'admin' ? 'admin' : 'client',
        accessible_products: ['PaintIT', 'DesignIT', 'BuildIT', 'SketchIT', 'SellIT'],
      });
      showToast('Signed in with Aspacity Google OAuth!', 'success');
      router.push('/studio');
    } else {
      openAuthModal();
      router.push('/');
    }
  }, [searchParams, login, openAuthModal, router, showToast]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-6">
      <div className="flex items-center gap-3 p-6 rounded-2xl bg-card border border-border shadow-xl">
        <Loader2 className="w-6 h-6 text-orange-500 animate-spin" />
        <span className="text-sm font-semibold">Authenticating with Aspacity SSO...</span>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-orange-500 animate-spin" />
        </div>
      }
    >
      <LoginHandler />
    </Suspense>
  );
}
