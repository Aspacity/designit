/**
 * @file Aspacity/DesignIt/frontend/src/components/canvas/CameraPresetControls.tsx
 * @description Camera Preset View Mode Switcher Component.
 * @purpose Allows users to switch between 2D Top-Down Floorplan View, 3D Architectural View, and First-Person Walkthrough View.
 */

'use client';

import React from 'react';
import { useRoom, CameraPreset } from '@/context/RoomContext';
import { LayoutGrid, Box, Eye } from 'lucide-react';

export function CameraPresetControls() {
  const { cameraPreset, setCameraPreset } = useRoom();

  const presets: { id: CameraPreset; label: string; icon: React.ReactNode }[] = [
    {
      id: '2d',
      label: '2D Floorplan',
      icon: <LayoutGrid className="w-4 h-4" />,
    },
    {
      id: '3d',
      label: '3D Perspective',
      icon: <Box className="w-4 h-4" />,
    },
    {
      id: 'first-person',
      label: 'Eye-Level Walkthrough',
      icon: <Eye className="w-4 h-4" />,
    },
  ];

  return (
    <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-card/90 backdrop-blur-md border border-border shadow-lg">
      {presets.map((preset) => (
        <button
          key={preset.id}
          onClick={() => setCameraPreset(preset.id)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            cameraPreset === preset.id
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
          }`}
        >
          {preset.icon}
          <span className="hidden sm:inline">{preset.label}</span>
        </button>
      ))}
    </div>
  );
}
