/**
 * @file Aspacity/DesignIt/frontend/src/components/landing/SpaceBackground.tsx
 * @description Ultra-realistic interactive 3D motion space background for DesignIT Hero.
 * @purpose Renders a smooth 60fps cosmic starfield, drifting spatial dust, shooting stars, and ambient parallax nebulae.
 */

'use client';

import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  color: string;
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  width: number;
}

export function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Mouse Parallax Targets
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 450 : 1200;

    // Palette: Gold, Amber, Diamond White, Deep Cyan, Soft Violet
    const starColors = [
      '#FFFFFF',
      '#FFF3D6',
      '#F59E0B',
      '#FBBF24',
      '#60A5FA',
      '#A78BFA',
    ];

    // Generate 3D Particle Stars
    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: (Math.random() - 0.5) * width * 2,
      y: (Math.random() - 0.5) * height * 2,
      z: Math.random() * width,
      size: Math.random() * 1.6 + 0.4,
      baseAlpha: Math.random() * 0.7 + 0.3,
      alpha: Math.random() * 0.7 + 0.3,
      twinkleSpeed: Math.random() * 0.03 + 0.005,
      color: starColors[Math.floor(Math.random() * starColors.length)],
    }));

    // Shooting Stars Array
    const meteors: Meteor[] = [];

    const createMeteor = () => {
      meteors.push({
        x: Math.random() * width * 0.8,
        y: (Math.random() - 0.2) * height * 0.5,
        length: Math.random() * 80 + 40,
        speed: Math.random() * 8 + 6,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
        alpha: 1,
        width: Math.random() * 1.5 + 0.8,
      });
    };

    // Periodically spawn meteors
    const meteorInterval = setInterval(() => {
      if (Math.random() > 0.4) {
        createMeteor();
      }
    }, 3500);

    // Resize Handler
    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    // Mouse & Touch Movement Parallax
    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 35;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 35;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        targetMouseX = (touch.clientX / window.innerWidth - 0.5) * 20;
        targetMouseY = (touch.clientY / window.innerHeight - 0.5) * 20;
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Main Render Loop
    let time = 0;
    const render = () => {
      time += 0.015;

      // Smooth lerp mouse parallax
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const focalLength = width * 0.8;
      const centerX = width / 2 + mouseX;
      const centerY = height / 2 + mouseY;

      // Render Stars with Forward Motion & 3D Projection
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Move star forward (warp speed feel)
        star.z -= 0.6;
        if (star.z <= 0) {
          star.z = width;
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
        }

        // Twinkle Effect
        star.alpha = star.baseAlpha + Math.sin(time * star.twinkleSpeed * 10) * 0.25;
        star.alpha = Math.max(0.1, Math.min(1, star.alpha));

        // 3D Perspective Projection
        const k = focalLength / star.z;
        const px = star.x * k + centerX;
        const py = star.y * k + centerY;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const projectedSize = Math.max(0.5, star.size * k * 0.8);

          ctx.save();
          ctx.globalAlpha = star.alpha;
          ctx.fillStyle = star.color;

          // Glow for larger stars
          if (projectedSize > 1.8) {
            ctx.shadowBlur = projectedSize * 3;
            ctx.shadowColor = star.color;
          }

          ctx.beginPath();
          ctx.arc(px, py, projectedSize, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // Render Meteors / Shooting Stars
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.alpha -= 0.015;

        if (m.alpha <= 0 || m.x > width || m.y > height) {
          meteors.splice(i, 1);
          continue;
        }

        const tailX = m.x - Math.cos(m.angle) * m.length;
        const tailY = m.y - Math.sin(m.angle) * m.length;

        const gradient = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(251, 191, 36, ${m.alpha})`);
        gradient.addColorStop(0.3, `rgba(245, 158, 11, ${m.alpha * 0.6})`);
        gradient.addColorStop(1, `rgba(245, 158, 11, 0)`);

        ctx.save();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = m.width;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(meteorInterval);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* 3D Dynamic Particle Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block opacity-75 dark:opacity-90" />

      {/* Cosmic Nebulae Glow Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-amber-500/15 via-orange-500/15 to-purple-600/10 blur-[150px] rounded-full pointer-events-none animate-pulse duration-1000" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-amber-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[280px] bg-indigo-500/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Radial Contrast Mask for Perfect Text Legibility */}
      <div className="absolute inset-0 bg-radial-vignette dark:from-transparent dark:via-neutral-950/40 dark:to-neutral-950/80 from-transparent via-slate-50/30 to-slate-50/70 pointer-events-none" />
    </div>
  );
}
