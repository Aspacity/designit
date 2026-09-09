/**
 * @file Aspacity/DesignIt/frontend/src/app/(viewer)/viewer/page.tsx
 * @description Client Interactive 3D Room Viewer Route Page.
 * @purpose Read-only, highly accessible 3D walkthrough experience for clients to explore interior design proposals.
 */

'use client';

import React from 'react';
import { useRoom } from '@/context/RoomContext';
import { RoomVisualizer } from '@/components/canvas/RoomVisualizer';
import { Palette, Layers, CheckCircle } from 'lucide-react';

export default function ViewerPage() {
  const { wallColor, setWallColor, floorMaterial, setFloorMaterial, placedObjects, updateObjectMaterial } = useRoom();

  const wallOptions = [
    { label: 'Soft Alabaster', hex: '#E5E0D8' },
    { label: 'Warm Beige', hex: '#D7C4B7' },
    { label: 'Sage Green', hex: '#9AA088' },
    { label: 'Charcoal Slate', hex: '#374151' },
  ];

  const floorOptions = [
    { label: 'Natural Oak Wood', id: 'natural-oak' },
    { label: 'Dark Walnut Wood', id: 'dark-walnut' },
    { label: 'White Marble Tile', id: 'white-marble' },
    { label: 'Slate Stone', id: 'slate-tile' },
  ];

  const furnitureSofa = placedObjects.find((o) => o.category === 'seating');

  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          Explore Your Custom <span className="text-primary">3D Room Design</span>
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Touch and drag to rotate the camera. Tap the color circles below to test different paint colors and floor finishes.
        </p>
      </div>

      {/* 3D Viewport Box */}
      <div className="h-[420px] sm:h-[550px] w-full">
        <RoomVisualizer />
      </div>

      {/* Interactive Material Variation Controls for Clients */}
      <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto pt-4">
        {/* Wall Paint Finishes */}
        <div className="p-5 bg-card border border-border rounded-2xl shadow-md space-y-3">
          <h3 className="font-bold text-xs uppercase tracking-wider flex items-center gap-2">
            <Palette className="w-4 h-4 text-primary" />
            <span>Wall Paint Color</span>
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {wallOptions.map((opt) => (
              <button
                key={opt.hex}
                onClick={() => setWallColor(opt.hex)}
                className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all ${
                  wallColor === opt.hex
                    ? 'border-primary bg-primary/10 text-primary font-semibold'
                    : 'border-border bg-background hover:bg-secondary'
                }`}
              >
                <span className="w-4 h-4 rounded-full shrink-0 border" style={{ backgroundColor: opt.hex }} />
                <span className="truncate">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Flooring Finishes */}
        <div className="p-5 bg-card border border-border rounded-2xl shadow-md space-y-3">
          <h3 className="font-bold text-xs uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary" />
            <span>Flooring Type</span>
          </h3>
          <div className="space-y-1.5">
            {floorOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setFloorMaterial(opt.id)}
                className={`w-full py-2 px-3 rounded-xl border text-xs font-medium text-left flex items-center justify-between transition-all ${
                  floorMaterial === opt.id
                    ? 'border-primary bg-primary/10 text-primary font-semibold'
                    : 'border-border bg-background hover:bg-secondary'
                }`}
              >
                <span>{opt.label}</span>
                {floorMaterial === opt.id && <CheckCircle className="w-3.5 h-3.5 text-primary" />}
              </button>
            ))}
          </div>
        </div>

        {/* Furniture Finish Variation */}
        <div className="p-5 bg-card border border-border rounded-2xl shadow-md space-y-3">
          <h3 className="font-bold text-xs uppercase tracking-wider flex items-center gap-2">
            <Palette className="w-4 h-4 text-primary" />
            <span>Sofa Upholstery</span>
          </h3>
          <div className="flex flex-wrap gap-2 pt-1">
            {['#4B5563', '#2563EB', '#D97706', '#059669', '#1E293B'].map((hex) => (
              <button
                key={hex}
                onClick={() => {
                  if (furnitureSofa) {
                    updateObjectMaterial(furnitureSofa.id, { color: hex });
                  }
                }}
                style={{ backgroundColor: hex }}
                className="w-8 h-8 rounded-full border-2 border-border hover:scale-110 transition-transform shadow-sm"
              />
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground pt-1">
            Tap a color circle to preview sofa fabric upholstery variations in real time.
          </p>
        </div>
      </div>
    </div>
  );
}
