/**
 * @file Aspacity/DesignIt/frontend/src/components/canvas/MaterialInspector.tsx
 * @description PBR Material Inspector Drawer Component for DesignIT.
 * @purpose Provides real-time controls for modifying 3D furniture color, roughness, metalness, and room surface textures.
 */

'use client';

import React from 'react';
import { useRoom } from '@/context/RoomContext';
import { Palette, Sliders, Layers, Sparkles, X } from 'lucide-react';

export function MaterialInspector() {
  const {
    selectedObjectId,
    placedObjects,
    updateObjectMaterial,
    wallColor,
    setWallColor,
    floorMaterial,
    setFloorMaterial,
    setSelectedObjectId,
  } = useRoom();

  const selectedObject = placedObjects.find((o) => o.id === selectedObjectId);

  const presetColors = [
    '#2563EB', '#3B82F6', '#1E293B', '#4B5563', '#9CA3AF',
    '#D97706', '#B45309', '#059669', '#DC2626', '#E5E0D8'
  ];

  if (!selectedObject) {
    return (
      <div className="p-5 bg-card border border-border rounded-2xl shadow-lg space-y-4 text-center">
        <div className="w-10 h-10 mx-auto rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-sm">Material Inspector</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Click any 3D item in the canvas to adjust colors, roughness, and metalness.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 bg-card border border-border rounded-2xl shadow-lg space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div>
          <h3 className="font-bold text-sm flex items-center gap-2">
            <Palette className="w-4 h-4 text-primary" />
            <span>Material Inspector</span>
          </h3>
          <p className="text-xs text-muted-foreground">{selectedObject.name}</p>
        </div>
        <button
          onClick={() => setSelectedObjectId(null)}
          className="p-1 rounded-lg hover:bg-secondary text-muted-foreground"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Surface Color Customization */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider mb-2">Surface Color</label>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="color"
            value={selectedObject.color || '#3B82F6'}
            onChange={(e) => updateObjectMaterial(selectedObject.id, { color: e.target.value })}
            className="w-9 h-9 rounded-xl border border-border cursor-pointer bg-transparent"
          />
          <span className="text-xs font-mono uppercase font-semibold">{selectedObject.color || '#3B82F6'}</span>
        </div>

        {/* Preset Palette */}
        <div className="flex flex-wrap gap-1.5">
          {presetColors.map((hex) => (
            <button
              key={hex}
              onClick={() => updateObjectMaterial(selectedObject.id, { color: hex })}
              style={{ backgroundColor: hex }}
              className={`w-6 h-6 rounded-full border transition-transform ${
                selectedObject.color === hex ? 'scale-110 border-primary ring-2 ring-primary/30' : 'border-border'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Surface Roughness Slider */}
      <div>
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider mb-1">
          <span>Surface Roughness</span>
          <span className="font-mono text-primary">{((selectedObject.roughness ?? 0.5) * 100).toFixed(0)}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={selectedObject.roughness ?? 0.5}
          onChange={(e) => updateObjectMaterial(selectedObject.id, { roughness: parseFloat(e.target.value) })}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
          <span>Glossy / Smooth</span>
          <span>Matte / Rough</span>
        </div>
      </div>

      {/* Metallic Finish Slider */}
      <div>
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider mb-1">
          <span>Metallic Reflectivity</span>
          <span className="font-mono text-primary">{((selectedObject.metalness ?? 0.1) * 100).toFixed(0)}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={selectedObject.metalness ?? 0.1}
          onChange={(e) => updateObjectMaterial(selectedObject.id, { metalness: parseFloat(e.target.value) })}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
          <span>Non-metallic</span>
          <span>Polished Metal</span>
        </div>
      </div>
    </div>
  );
}
