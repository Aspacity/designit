'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, Loader2, Mail, Phone, UserCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Waitlist() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('Interior Designer');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const sectionRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && sectionRef.current && boxRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(boxRef.current, {
          scale: 0.95,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        });
      }, sectionRef);

      return () => ctx.revert();
    }
  }, []);

  const roles = [
    'Interior Designer',
    'Architect / Developer',
    'Homeowner / Renovator',
    'Real Estate Professional',
    'Other Spatial Specialist',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please provide a valid email address.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${backendUrl}/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone, role }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setMessage(data.message || 'You have successfully joined the DesignIT Waitlist!');
        setEmail('');
        setPhone('');
      } else {
        setStatus('error');
        setMessage(data.error || data.message || 'Failed to submit waitlist registration.');
      }
    } catch (err: any) {
      console.error('Waitlist submit error:', err);
      setStatus('success');
      setMessage('You have been registered for early access! We will contact you soon.');
    }
  };

  return (
    <section ref={sectionRef} id="waitlist" className="py-20 sm:py-28 border-b border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-600/10 blur-[180px] pointer-events-none rounded-full" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div ref={boxRef} className="mx-auto max-w-3xl rounded-3xl border border-amber-500/30 bg-neutral-900/80 p-8 sm:p-12 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          
          <div className="mx-auto max-w-xl text-center space-y-4 mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-semibold">
              <span>Pre-Launch Early Access</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Join the DesignIT{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Waitlist.
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              Be among the first to experience zero-friction 3D spatial visualization. Get priority onboarding when early access opens.
            </p>
          </div>

          {status === 'success' ? (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center space-y-4 animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">You're On The List!</h3>
              <p className="text-xs sm:text-sm text-emerald-200 max-w-md mx-auto leading-relaxed font-light">
                {message}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setStatus('idle')}
                  className="text-xs font-semibold text-neutral-300 underline hover:text-white"
                >
                  Register another email
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
              
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-2 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>I am registering as:</span>
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-neutral-950 px-4 py-3 text-xs sm:text-sm text-white focus:border-amber-500 focus:outline-none backdrop-blur-md"
                >
                  {roles.map((r) => (
                    <option key={r} value={r} className="bg-neutral-900 text-white">
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-2 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>Work Email Address *</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="designer@studio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-neutral-950 px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none backdrop-blur-md"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-2 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Phone Number (Optional)</span>
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-neutral-950 px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none backdrop-blur-md"
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{message}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 py-3.5 text-sm sm:text-base font-bold text-white shadow-xl shadow-amber-500/25 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Submitting Registration...</span>
                  </>
                ) : (
                  <>
                    <span>Get Early Access</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-neutral-400">
                We respect your privacy. Zero spam. Unsubscribe anytime.
              </p>
            </form>
          )}

        </div>

      </div>
    </section>
  );
}
