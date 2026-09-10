/**
 * @file Aspacity/DesignIt/frontend/src/context/AuthContext.tsx
 * @description Aspacity SSO Central Authentication Context Provider.
 * @purpose Manages Aspacity SSO user session, JWT storage, role state, and product accessibility across ecosystem.
 */

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'professional' | 'client';
  accessible_products?: string[];
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem('aspacity_sso_jwt');
    const savedUser = localStorage.getItem('aspacity_sso_user');

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse saved user credentials');
      }
    }

    // Auto-detect OAuth redirect params in URL (?token=...&email=...)
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlToken = urlParams.get('token');
      const urlEmail = urlParams.get('email');
      const urlName = urlParams.get('name');
      const urlRole = urlParams.get('role');

      if (urlToken && urlEmail) {
        const newUser: User = {
          id: urlParams.get('id') || 'oauth-user',
          email: urlEmail,
          name: urlName || urlEmail.split('@')[0],
          role: urlRole?.toUpperCase() === 'PAINTER' ? 'professional' : urlRole?.toLowerCase() === 'admin' ? 'admin' : 'client',
          accessible_products: ['PaintIT', 'DesignIT', 'BuildIT', 'SketchIT', 'SellIT'],
        };
        login(urlToken, newUser);

        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
      }
    }
  }, []);

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('aspacity_sso_jwt', newToken);
    localStorage.setItem('aspacity_sso_user', JSON.stringify(newUser));
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('aspacity_sso_jwt');
    localStorage.removeItem('aspacity_sso_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthModalOpen,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
