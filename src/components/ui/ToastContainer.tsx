/**
 * @file Aspacity/DesignIt/frontend/src/components/ui/ToastContainer.tsx
 * @description Floating Toast Alert Notification Banner Renderer Component.
 * @purpose Renders animated toast popups for success, error, warning, and info alerts.
 */

'use client';

import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-orange-500 shrink-0" />,
  };

  const borders = {
    success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
    error: 'border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300',
    warning: 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300',
    info: 'border-orange-500/30 bg-orange-500/10 text-orange-700 dark:text-orange-300',
  };

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-4 rounded-2xl border backdrop-blur-md shadow-xl flex items-start gap-3 transition-all duration-300 animate-slide-in ${
            borders[toast.type]
          }`}
        >
          {icons[toast.type]}
          <div className="flex-1 text-xs font-semibold leading-relaxed">{toast.message}</div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="p-1 rounded-full hover:bg-black/10 transition-colors text-current shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
