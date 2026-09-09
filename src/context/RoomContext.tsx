/**
 * @file Aspacity/DesignIt/frontend/src/context/RoomContext.tsx
 * @description 3D Room Spatial, Material Inspector & Camera State Provider for DesignIT.
 * @purpose Controls interactive 3D floorplan dimensions, material properties, transform gizmo tools, and camera modes.
 */

'use client';

import React, { createContext, useContext, useState } from 'react';

export type CameraPreset = '2d' | '3d' | 'first-person';
export type TransformTool = 'translate' | 'rotate' | 'scale' | null;

export interface PlacedObject {
  id: string;
  name: string;
  category: 'seating' | 'tables' | 'lighting' | 'decor' | 'electronics';
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color?: string;
  roughness?: number;
  metalness?: number;
  materialType?: string;
}

interface RoomContextType {
  // Room Floorplan Dimensions & Surfaces
  width: number;
  length: number;
  ceilingHeight: number;
  wallColor: string;
  floorMaterial: string;

  // Scene Objects & Selection
  placedObjects: PlacedObject[];
  selectedObjectId: string | null;

  // Camera & Transform Controls
  cameraPreset: CameraPreset;
  activeTransformTool: TransformTool;
  gridSnap: boolean;

  // Actions
  setDimensions: (w: number, l: number, h: number) => void;
  setWallColor: (color: string) => void;
  setFloorMaterial: (material: string) => void;
  addPlacedObject: (obj: PlacedObject) => void;
  removePlacedObject: (id: string) => void;
  updateObjectTransform: (id: string, pos: [number, number, number], rot: [number, number, number], scale?: [number, number, number]) => void;
  updateObjectMaterial: (id: string, properties: { color?: string; roughness?: number; metalness?: number }) => void;
  setSelectedObjectId: (id: string | null) => void;
  setCameraPreset: (mode: CameraPreset) => void;
  setActiveTransformTool: (tool: TransformTool) => void;
  setGridSnap: (snap: boolean) => void;
}

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export function RoomProvider({ children }: { children: React.ReactNode }) {
  const [width, setWidth] = useState(8.0);
  const [length, setLength] = useState(10.0);
  const [ceilingHeight, setCeilingHeight] = useState(2.8);
  const [wallColor, setWallColor] = useState('#E5E0D8');
  const [floorMaterial, setFloorMaterial] = useState('natural-oak');

  const [placedObjects, setPlacedObjects] = useState<PlacedObject[]>([
    {
      id: 'default-sofa-1',
      name: 'Nordic 3-Seater Sofa',
      category: 'seating',
      position: [0, 0.4, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: '#4B5563',
      roughness: 0.6,
      metalness: 0.1,
    },
    {
      id: 'default-table-1',
      name: 'Scandinavian Coffee Table',
      category: 'tables',
      position: [0, 0.25, 1.8],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: '#D97706',
      roughness: 0.3,
      metalness: 0.2,
    },
  ]);

  const [selectedObjectId, setSelectedObjectId] = useState<string | null>('default-sofa-1');
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('3d');
  const [activeTransformTool, setActiveTransformTool] = useState<TransformTool>('translate');
  const [gridSnap, setGridSnap] = useState(true);

  const setDimensions = (w: number, l: number, h: number) => {
    setWidth(w);
    setLength(l);
    setCeilingHeight(h);
  };

  const addPlacedObject = (obj: PlacedObject) => {
    setPlacedObjects((prev) => [...prev, obj]);
    setSelectedObjectId(obj.id);
  };

  const removePlacedObject = (id: string) => {
    setPlacedObjects((prev) => prev.filter((o) => o.id !== id));
    if (selectedObjectId === id) {
      setSelectedObjectId(null);
    }
  };

  const updateObjectTransform = (
    id: string,
    pos: [number, number, number],
    rot: [number, number, number],
    scale: [number, number, number] = [1, 1, 1]
  ) => {
    setPlacedObjects((prev) =>
      prev.map((o) => (o.id === id ? { ...o, position: pos, rotation: rot, scale } : o))
    );
  };

  const updateObjectMaterial = (
    id: string,
    properties: { color?: string; roughness?: number; metalness?: number }
  ) => {
    setPlacedObjects((prev) =>
      prev.map((o) => (o.id === id ? { ...o, ...properties } : o))
    );
  };

  return (
    <RoomContext.Provider
      value={{
        width,
        length,
        ceilingHeight,
        wallColor,
        floorMaterial,
        placedObjects,
        selectedObjectId,
        cameraPreset,
        activeTransformTool,
        gridSnap,
        setDimensions,
        setWallColor,
        setFloorMaterial,
        addPlacedObject,
        removePlacedObject,
        updateObjectTransform,
        updateObjectMaterial,
        setSelectedObjectId,
        setCameraPreset,
        setActiveTransformTool,
        setGridSnap,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}

export function useRoom() {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error('useRoom must be used within a RoomProvider');
  }
  return context;
}
