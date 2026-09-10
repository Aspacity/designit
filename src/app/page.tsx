/**
 * @file Aspacity/DesignIt/frontend/src/app/page.tsx
 * @description DesignIT Public Root Landing Page Entrypoint.
 * @purpose Main public landing page served at root path '/' with real-time 3D interactive room canvas preview.
 */

'use client';

import React from 'react';
import { useRoom } from '@/context/RoomContext';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { RoomVisualizer } from '@/components/canvas/RoomVisualizer';
import { MaterialInspector } from '@/components/canvas/MaterialInspector';
import {
  Box,
  Layers,
  Sparkles,
  Shield,
  Palette,
  ArrowRight,
  Sliders,
  Sun,
  Moon,
  Eye,
  ShieldCheck,
  Layout as LayoutIcon,
  Menu,
  X,
} from 'lucide-react';
import Link from 'next/link';

export default function RootLandingPage() {
  const { theme, toggleTheme } = useTheme();
  const { user, openAuthModal, logout } = useAuth();
  const {
    width,
    length,
    ceilingHeight,
    wallColor,
    floorMaterial,
    setDimensions,
    setWallColor,
    setFloorMaterial,
    addPlacedObject,
  } = useRoom();

  const wallColors = [
    { label: 'Soft Alabaster', hex: '#E5E0D8' },
    { label: 'Warm Beige', hex: '#D7C4B7' },
    { label: 'Sage Green', hex: '#9AA088' },
    { label: 'Charcoal Slate', hex: '#374151' },
    { label: 'Midnight Blue', hex: '#1E293B' },
  ];

  const floorMaterials = [
    { label: 'Natural Oak', id: 'natural-oak' },
    { label: 'Dark Walnut', id: 'dark-walnut' },
    { label: 'White Marble', id: 'white-marble' },
    { label: 'Slate Tile', id: 'slate-tile' },
  ];

  const sampleFurniture = [
    { name: 'Nordic 3-Seater Sofa', category: 'seating' as const, color: '#4B5563' },
    { name: 'Scandinavian Coffee Table', category: 'tables' as const, color: '#D97706' },
    { name: 'Modern Accent Chair', category: 'seating' as const, color: '#EA580C' },
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-300">
      {/* Root Header Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
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

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={toggleTheme}
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
                className="hidden sm:inline-flex px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-orange-600 hover:bg-orange-700 text-white transition-opacity shadow-md"
              >
                Aspacity SSO Sign In
              </button>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl border border-border bg-card hover:bg-secondary transition-colors text-foreground"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-border bg-card/95 backdrop-blur-md px-4 py-4 space-y-3 animate-fade-in">
            <Link
              href="/studio"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-xs font-semibold p-2.5 rounded-xl hover:bg-secondary"
            >
              <LayoutIcon className="w-4 h-4 text-orange-500" />
              <span>Launch Studio</span>
            </Link>
            <Link
              href="/viewer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-xs font-semibold p-2.5 rounded-xl hover:bg-secondary"
            >
              <Eye className="w-4 h-4 text-amber-500" />
              <span>Client Viewer</span>
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-xs font-semibold p-2.5 rounded-xl hover:bg-secondary"
            >
              <ShieldCheck className="w-4 h-4 text-orange-600" />
              <span>Admin Portal</span>
            </Link>
            {!user && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal();
                }}
                className="w-full mt-2 py-2.5 px-4 text-xs font-semibold rounded-xl bg-orange-600 hover:bg-orange-700 text-white shadow-md text-center"
              >
                Aspacity SSO Sign In
              </button>
            )}
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-8 pb-12 sm:pt-16 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex-1">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive 3D Interior Design & Material Inspector Engine</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Visualize Beautiful Spaces in <span className="text-orange-600 dark:text-orange-500">Real-Time 3D</span>
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            DesignIT is Aspacity&apos;s interactive interior planning platform. Customize walls, flooring, materials, and 3D furniture with complete precision.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              href="/studio"
              className="px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm transition-all shadow-lg flex items-center gap-2"
            >
              <span>Launch Professional Studio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/viewer"
              className="px-6 py-3 rounded-xl border border-border bg-card hover:bg-secondary font-semibold text-sm transition-colors flex items-center gap-2"
            >
              <span>Client Walkthrough</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Live 3D Interactive Room Visualizer Showcase */}
      <section id="visualizer-demo" className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          <div className="flex-1 min-h-[380px] sm:min-h-[500px]">
            <RoomVisualizer />
          </div>

          <div className="w-full lg:w-80 space-y-4">
            <MaterialInspector />

            <div className="bg-card border border-border rounded-2xl p-5 shadow-lg space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <h3 className="font-bold text-sm flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-orange-600 dark:text-orange-500" />
                  <span>Room Floorplan</span>
                </h3>
                <span className="text-xs text-muted-foreground font-mono">
                  {width}m × {length}m
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2">Wall Paint Color</label>
                <div className="flex flex-wrap gap-2">
                  {wallColors.map((color) => (
                    <button
                      key={color.hex}
                      onClick={() => setWallColor(color.hex)}
                      title={color.label}
                      style={{ backgroundColor: color.hex }}
                      className={`w-7 h-7 rounded-full border-2 transition-transform ${
                        wallColor === color.hex ? 'border-orange-600 scale-110 shadow-md' : 'border-border'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2">Flooring Surface</label>
                <div className="grid grid-cols-2 gap-2">
                  {floorMaterials.map((mat) => (
                    <button
                      key={mat.id}
                      onClick={() => setFloorMaterial(mat.id)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                        floorMaterial === mat.id
                          ? 'border-orange-600 bg-orange-500/10 text-orange-600 dark:text-orange-400 font-semibold'
                          : 'border-border bg-background hover:bg-secondary'
                      }`}
                    >
                      {mat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2">Add 3D Furniture</label>
                <div className="space-y-2">
                  {sampleFurniture.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() =>
                        addPlacedObject({
                          id: `item-${Date.now()}-${idx}`,
                          name: item.name,
                          category: item.category,
                          position: [(Math.random() - 0.5) * 4, 0.3, (Math.random() - 0.5) * 4],
                          rotation: [0, Math.random() * Math.PI, 0],
                          scale: [1, 1, 1],
                          color: item.color,
                          roughness: 0.5,
                          metalness: 0.1,
                        })
                      }
                      className="w-full py-2 px-3 rounded-xl border border-border bg-background hover:bg-secondary text-xs font-medium text-left flex items-center justify-between transition-colors"
                    >
                      <span>{item.name}</span>
                      <span className="text-orange-600 font-bold">+</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
