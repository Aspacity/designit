/**
 * @file Aspacity/DesignIt/frontend/src/app/(studio)/studio/page.tsx
 * @description Professional Interior Studio Route Page.
 * @purpose Main floorplan design workspace for interior designers to create, customize, and persist 3D room layouts.
 */

'use client';

import React, { useState } from 'react';
import { useRoom } from '@/context/RoomContext';
import { RoomVisualizer } from '@/components/canvas/RoomVisualizer';
import { MaterialInspector } from '@/components/canvas/MaterialInspector';
import { ProjectSaveLoadModal } from '@/components/studio/ProjectSaveLoadModal';
import { Save, FolderOpen, Sliders } from 'lucide-react';

export default function StudioPage() {
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

  const [modalMode, setModalMode] = useState<'save' | 'load' | null>(null);

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
    <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-4">
      {/* Studio Action Header Bar */}
      <div className="flex items-center justify-between p-3 bg-card border border-border rounded-2xl shadow-sm">
        <h2 className="font-bold text-sm">3D Workspace Floorplan Editor</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setModalMode('load')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-border hover:bg-secondary transition-colors"
          >
            <FolderOpen className="w-3.5 h-3.5" />
            <span>Open Project</span>
          </button>
          <button
            onClick={() => setModalMode('save')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-sm"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save to Cloud DB</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Grid */}
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Left Control Column */}
        <div className="space-y-4">
          <div className="p-5 bg-card border border-border rounded-2xl shadow-lg space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <Sliders className="w-4 h-4 text-primary" />
                <span>Floorplan Settings</span>
              </h3>
              <span className="text-xs font-mono text-muted-foreground">
                {width}m × {length}m
              </span>
            </div>

            {/* Room Length */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
                Room Length ({length}m)
              </label>
              <input
                type="range"
                min="6"
                max="14"
                step="0.5"
                value={length}
                onChange={(e) => setDimensions(width, parseFloat(e.target.value), ceilingHeight)}
                className="w-full accent-primary"
              />
            </div>

            {/* Wall Paint Color */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2">Wall Paint Color</label>
              <div className="flex flex-wrap gap-2">
                {wallColors.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => setWallColor(color.hex)}
                    style={{ backgroundColor: color.hex }}
                    className={`w-7 h-7 rounded-full border-2 transition-transform ${
                      wallColor === color.hex ? 'border-primary scale-110 shadow-md' : 'border-border'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Floor Surface */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2">Flooring Surface</label>
              <div className="grid grid-cols-2 gap-2">
                {floorMaterials.map((mat) => (
                  <button
                    key={mat.id}
                    onClick={() => setFloorMaterial(mat.id)}
                    className={`py-2 px-2 rounded-xl text-xs font-medium border text-center transition-all ${
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
              <div className="space-y-1.5">
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

        {/* Center 3D Viewport */}
        <div className="lg:col-span-2 min-h-[450px] sm:min-h-[550px]">
          <RoomVisualizer />
        </div>

        {/* Right Inspector Column */}
        <div className="space-y-4">
          <MaterialInspector />
        </div>
      </div>

      {/* Save/Load Modal */}
      {modalMode && (
        <ProjectSaveLoadModal
          isOpen={!!modalMode}
          onClose={() => setModalMode(null)}
          mode={modalMode}
        />
      )}
    </div>
  );
}
