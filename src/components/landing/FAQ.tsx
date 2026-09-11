'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && sectionRef.current && accordionRef.current) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const children = accordionRef.current.children;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
            clearProps: 'opacity,transform',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 90%',
              once: true,
            },
          }
        );
      }, sectionRef);

      const fallbackTimer = setTimeout(() => {
        if (children) {
          Array.from(children).forEach((child) => {
            (child as HTMLElement).style.opacity = '1';
            (child as HTMLElement).style.transform = 'none';
          });
        }
      }, 1500);

      return () => {
        ctx.revert();
        clearTimeout(fallbackTimer);
      };
    }
  }, []);

  const faqs = [
    {
      question: 'What is DesignIT?',
      answer: 'DesignIT is a web-native 3D spatial visualization platform by Aspacity. It allows interior designers, architects, and visionaries to stage room layouts, swap realistic materials, adjust daylighting, and walk through spaces in real time directly in their web browser.',
    },
    {
      question: 'Is DesignIT intended to replace Blender, Revit, or SketchUp?',
      answer: 'No. DesignIT is not a full CAD drafting or poly-modeling engine. Tools like Blender, Revit, and SketchUp excel at deep architectural drafting and poly modeling. DesignIT acts as the fast, accessible spatial presentation layer—allowing you to stage spaces, test proportions, and present 360° interactive models to clients without multi-hour render wait times.',
    },
    {
      question: 'Who is DesignIT built for?',
      answer: 'DesignIT is built for interior designers, architects, real estate developers, space planners, and homeowners looking to visualize room arrangements before purchasing furniture or starting construction.',
    },
    {
      question: 'What stage is the product currently in?',
      answer: 'DesignIT is currently under active core engine development. We are onboarding early access testers from our waitlist in batches as features roll out.',
    },
    {
      question: 'How do I join the waitlist and get early access?',
      answer: 'Simply enter your email, optional phone number, and select your primary role in the Waitlist form at the bottom of this page. You will receive an invitation as soon as early access slots open.',
    },
    {
      question: 'Do I or my clients need to install software or plugins?',
      answer: 'No! DesignIT is 100% browser-native powered by WebGL/WebGPU and Three.js. Anyone with a web browser on desktop, tablet, or smartphone can open and interact with shared spatial links instantly.',
    },
    {
      question: 'How does real-time lighting and material rendering work?',
      answer: 'DesignIT uses physically-based rendering (PBR) shaders and optimized WebGPU lighting pipelines. This enables real-time sunlight casting, texture roughness adjustments, and dynamic reflections at 60 FPS without offline rendering queues.',
    },
    {
      question: 'Is DesignIT part of Aspacity?',
      answer: 'Yes. DesignIT is an integral part of the Aspacity Spatial Ecosystem alongside PaintIT, BuildIT, SellIT, and FurnishIT.',
    },
    {
      question: 'How will sharing 3D spatial links work for clients?',
      answer: 'DesignIT generates secure, interactive URLs. Clients click the link and can immediately orbit, pan, and walk through the proposed room design on their own device.',
    },
    {
      question: 'What hardware requirements are needed to run DesignIT?',
      answer: 'Any modern computer, tablet, or smartphone with a WebGL/WebGPU capable browser (Chrome, Safari, Edge, Firefox) will run DesignIT smoothly.',
    },
    {
      question: 'Will DesignIT support custom GLTF / GLB model imports?',
      answer: 'Yes, DesignIT supports standard GLTF/GLB 3D assets via our cloud S3 asset resolver, allowing custom furniture and architectural elements to be loaded smoothly.',
    },
  ];

  return (
    <section ref={sectionRef} id="faq" className="py-16 sm:py-24 border-b dark:border-white/5 border-neutral-200 dark:bg-neutral-950/40 bg-neutral-50/50 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-mono font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold dark:text-white text-neutral-900 tracking-tight">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-amber-500 to-orange-600 dark:from-amber-400 dark:to-orange-500 bg-clip-text text-transparent">
              Know.
            </span>
          </h2>

          <p className="text-base sm:text-lg dark:text-neutral-300 text-neutral-600 font-light">
            Answers to common questions about DesignIT, product roadmap, and early access.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div ref={accordionRef} className="mx-auto max-w-4xl space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border dark:border-white/10 border-neutral-200 dark:bg-neutral-900/50 bg-white backdrop-blur-xl transition-all overflow-hidden shadow-sm hover:shadow-md"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none"
                >
                  <span className="text-base sm:text-lg font-bold dark:text-white text-neutral-900 pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full dark:bg-neutral-800 bg-neutral-100 flex items-center justify-center dark:text-neutral-300 text-neutral-700 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-amber-500/20 text-amber-500' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-0 text-xs sm:text-sm dark:text-neutral-300 text-neutral-600 leading-relaxed border-t dark:border-white/5 border-neutral-100 mt-2 animate-fadeIn font-light">
                    <p className="pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
