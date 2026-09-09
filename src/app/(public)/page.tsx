/**
 * @file Aspacity/DesignIt/frontend/src/app/(public)/page.tsx
 * @description DesignIT Public Landing Page Entrypoint.
 * @purpose Open, accessible landing page with interactive 3D visualizer preview and ecosystem introduction.
 */

'use client';

import React from 'react';
import { useRoom } from '@/context/RoomContext';
import { useAuth } from '@/context/AuthContext';
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
} from 'lucide-react';
import Link from 'next/link';

export default function PublicLandingPage() {
  const { openAuthModal } = useAuth();
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
    { name: 'Modern Accent Chair', category: 'seating' as const, color: '#2563EB' },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="pt-8 pb-12 sm:pt-16 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive 3D Interior Design & Material Inspector Engine</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Visualize Beautiful Spaces in <span className="text-primary">Real-Time 3D</span>
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            DesignIT is Aspacity&apos;s interactive interior planning platform. Customize walls, flooring, materials, and 3D furniture with complete precision.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              href="/studio"
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-md flex items-center gap-2"
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
      <section id="visualizer-demo" className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          {/* 3D Canvas Box */}
          <div className="flex-1 min-h-[380px] sm:min-h-[500px]">
            <RoomVisualizer />
          </div>

          {/* Interactive Room & Material Control Panel */}
          <div className="w-full lg:w-80 space-y-4">
            <MaterialInspector />

            <div className="bg-card border border-border rounded-2xl p-5 shadow-lg space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <h3 className="font-bold text-sm flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-primary" />
                  <span>Room Floorplan</span>
                </h3>
                <span className="text-xs text-muted-foreground font-mono">
                  {width}m × {length}m
                </span>
              </div>

              {/* Wall Color Chooser */}
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
                        wallColor === color.hex ? 'border-primary scale-110 shadow-md' : 'border-border'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Floor Material Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2">Flooring Surface</label>
                <div className="grid grid-cols-2 gap-2">
                  {floorMaterials.map((mat) => (
                    <button
                      key={mat.id}
                      onClick={() => setFloorMaterial(mat.id)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                        floorMaterial === mat.id
                          ? 'border-primary bg-primary/10 text-primary font-semibold'
                          : 'border-border bg-background hover:bg-secondary'
                      }`}
                    >
                      {mat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Add Furniture */}
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
                      <span className="text-primary font-bold">+</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-border">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">Engineered for Interior Excellence</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Seamlessly integrated with Aspacity backend infrastructure and cloud services.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
              <Box className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base">Single 3D Canvas</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Unified WebGL viewport engine for Admin configuration, Professional space design, and Client walkthroughs.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base">PBR Material Inspector</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Real-time inspection of surface color, roughness, metalness, and texture mapping for all 3D furniture.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base">Aspacity SSO Auth</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Central identity verification without user password duplication across Aspacity product endpoints.
            </p>
          </div>
        </div>
      </section>

      {/* Aspacity Ecosystem Banner */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">The Aspacity Product Ecosystem</h3>
            <p className="text-sm text-blue-100 max-w-xl">
              DesignIT works alongside PaintIT, BuildIT, SketchIT, and SellIT to provide an end-to-end visualization platform.
            </p>
          </div>
          <button
            onClick={openAuthModal}
            className="px-6 py-3 rounded-xl bg-white text-blue-700 font-bold text-sm hover:bg-blue-50 transition-colors shadow-lg shrink-0"
          >
            Launch Aspacity Studio
          </button>
        </div>
      </section>
    </div>
  );
}
