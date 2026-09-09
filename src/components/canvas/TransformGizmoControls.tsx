/**
 * @file Aspacity/DesignIt/frontend/src/components/canvas/TransformGizmoControls.tsx
 * @description 3D Object Gizmo Transformation Tools Bar.
 * @purpose Allows users to switch between Move, Rotate, Scale gizmo tools and toggle grid snapping.
 */

'use client';

import React from 'react';
import { useRoom, TransformTool } from '@/context/RoomContext';
import { Move, RotateCw, Maximize2, Grid, Trash2 } from 'lucide-react';

export function TransformGizmoControls() {
  const {
    activeTransformTool,
    setActiveTransformTool,
    gridSnap,
    setGridSnap,
    selectedObjectId,
    removePlacedObject,
    placedObjects,
  } = useRoom();

  const selectedObject = placedObjects.find((o) => o.id === selectedObjectId);

  const tools: { id: TransformTool; label: string; icon: React.ReactNode }[] = [
    {
      id: 'translate',
      label: 'Move',
      icon: <Move className="w-4 h-4" />,
    },
    {
      id: 'rotate',
      label: 'Rotate',
      icon: <RotateCw className="w-4 h-4" />,
    },
    {
      id: 'scale',
      label: 'Scale',
      icon: <Maximize2 className="w-4 h-4" />,
    },
  ];

  return (
    <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-card/90 backdrop-blur-md border border-border shadow-lg">
      {tools.map((t) => (
        <button
          key={t.id}
          onClick={() => setActiveTransformTool(t.id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeTransformTool === t.id
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
          }`}
        >
          {t.icon}
          <span className="hidden sm:inline">{t.label}</span>
        </button>
      ))}

      <div className="w-px h-5 bg-border mx-1" />

      {/* Grid Snap Toggle */}
      <button
        onClick={() => setGridSnap(!gridSnap)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
          gridSnap ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/30' : 'text-muted-foreground hover:bg-secondary'
        }`}
        title="Toggle Grid Snap"
      >
        <Grid className="w-4 h-4" />
        <span className="hidden sm:inline">Snap</span>
      </button>

      {/* Delete Object Action */}
      {selectedObject && (
        <button
          onClick={() => removePlacedObject(selectedObject.id)}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-red-500/10 text-red-600 hover:bg-red-500/20 transition-colors ml-1"
          title="Delete Selected Item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
