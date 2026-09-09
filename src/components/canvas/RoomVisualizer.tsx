/**
 * @file Aspacity/DesignIt/frontend/src/components/canvas/RoomVisualizer.tsx
 * @description Single 3D Canvas Engine Component with Gizmo Transformations & Camera Presets for DesignIT.
 * @purpose Renders real-time 3D room floorplan, PBR materials, gizmo handles, camera modes, and furniture placement.
 * @usage Used across Admin, Professional, and Client landing page visualizer views.
 */

'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Grid, SoftShadows, TransformControls } from '@react-three/drei';
import { useRoom, PlacedObject, CameraPreset } from '@/context/RoomContext';
import { CameraPresetControls } from './CameraPresetControls';
import { TransformGizmoControls } from './TransformGizmoControls';

function CameraController({ mode }: { mode: CameraPreset }) {
  const { camera } = useThree();

  useEffect(() => {
    if (mode === '2d') {
      camera.position.set(0, 12, 0.01);
      camera.lookAt(0, 0, 0);
    } else if (mode === 'first-person') {
      camera.position.set(0, 1.6, 3.5);
      camera.lookAt(0, 1.6, -2);
    } else {
      camera.position.set(6, 6, 8);
      camera.lookAt(0, 0, 0);
    }
  }, [mode, camera]);

  return null;
}

function FurnitureItem({ item }: { item: PlacedObject }) {
  const {
    selectedObjectId,
    setSelectedObjectId,
    activeTransformTool,
    updateObjectTransform,
    gridSnap,
  } = useRoom();

  const isSelected = selectedObjectId === item.id;
  const meshRef = useRef<any>(null);

  const roughness = item.roughness ?? 0.5;
  const metalness = item.metalness ?? 0.1;
  const color = item.color || '#3B82F6';

  return (
    <>
      <group
        ref={meshRef}
        position={item.position}
        rotation={item.rotation}
        scale={item.scale}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedObjectId(item.id);
        }}
      >
        {item.category === 'seating' ? (
          // Render 3D Sofa Mesh
          <group>
            <mesh castShadow receiveShadow position={[0, 0.25, 0]}>
              <boxGeometry args={[1.8, 0.4, 0.8]} />
              <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
            </mesh>
            <mesh castShadow receiveShadow position={[0, 0.55, -0.3]}>
              <boxGeometry args={[1.8, 0.5, 0.2]} />
              <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
            </mesh>
          </group>
        ) : item.category === 'tables' ? (
          // Render 3D Table Mesh
          <group>
            <mesh castShadow receiveShadow position={[0, 0.4, 0]}>
              <boxGeometry args={[1.2, 0.08, 0.7]} />
              <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
            </mesh>
            {[-0.5, 0.5].map((x) =>
              [-0.25, 0.25].map((z) => (
                <mesh key={`${x}-${z}`} position={[x, 0.2, z]} castShadow>
                  <cylinderGeometry args={[0.03, 0.03, 0.4, 16]} />
                  <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.2} />
                </mesh>
              ))
            )}
          </group>
        ) : (
          // Default Furniture Box Mesh
          <mesh castShadow receiveShadow position={[0, 0.4, 0]}>
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
          </mesh>
        )}

        {/* Selected Bounding Box Outline */}
        {isSelected && !activeTransformTool && (
          <mesh position={[0, 0.4, 0]}>
            <boxGeometry args={[2.0, 0.9, 1.0]} />
            <meshBasicMaterial color="#3B82F6" wireframe />
          </mesh>
        )}
      </group>

      {/* Interactive Transform Gizmo Handle */}
      {isSelected && activeTransformTool && meshRef.current && (
        <TransformControls
          object={meshRef.current}
          mode={activeTransformTool}
          translationSnap={gridSnap ? 0.25 : undefined}
          rotationSnap={gridSnap ? Math.PI / 12 : undefined}
          scaleSnap={gridSnap ? 0.1 : undefined}
          onObjectChange={() => {
            if (meshRef.current) {
              const p = meshRef.current.position;
              const r = meshRef.current.rotation;
              const s = meshRef.current.scale;
              updateObjectTransform(
                item.id,
                [p.x, p.y, p.z],
                [r.x, r.y, r.z],
                [s.x, s.y, s.z]
              );
            }
          }}
        />
      )}
    </>
  );
}

function RoomScene() {
  const { width, length, ceilingHeight, wallColor, floorMaterial, placedObjects, setSelectedObjectId, cameraPreset } =
    useRoom();

  const floorColorMap: Record<string, string> = {
    'natural-oak': '#C2A382',
    'dark-walnut': '#4A3728',
    'white-marble': '#F0EFEA',
    'slate-tile': '#3F4448',
  };

  return (
    <>
      <CameraController mode={cameraPreset} />

      {/* Lighting Setup */}
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[8, 12, 6]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={30}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-4, 4, -4]} intensity={0.4} color="#FFF5E6" />

      {/* Interactive Background Click Handler */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.01, 0]}
        onClick={() => setSelectedObjectId(null)}
      >
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#E2E8F0" transparent opacity={0.05} />
      </mesh>

      {/* Room Floor Plane */}
      <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial color={floorColorMap[floorMaterial] || '#C2A382'} roughness={0.4} />
      </mesh>

      {/* Back Wall (Hidden in 2D Top-Down Mode) */}
      {cameraPreset !== '2d' && (
        <mesh receiveShadow position={[0, ceilingHeight / 2, -length / 2]}>
          <planeGeometry args={[width, ceilingHeight]} />
          <meshStandardMaterial color={wallColor} roughness={0.7} />
        </mesh>
      )}

      {/* Left Wall (Hidden in 2D Top-Down Mode) */}
      {cameraPreset !== '2d' && (
        <mesh receiveShadow position={[-width / 2, ceilingHeight / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[length, ceilingHeight]} />
          <meshStandardMaterial color={wallColor} roughness={0.7} />
        </mesh>
      )}

      {/* Grid Overlay */}
      <Grid
        position={[0, 0.01, 0]}
        args={[width, length]}
        cellSize={0.5}
        cellThickness={1}
        cellColor="#94A3B8"
        sectionSize={2}
        sectionThickness={1.5}
        sectionColor="#64748B"
        fadeDistance={25}
      />

      {/* Placed Furniture Items */}
      {placedObjects.map((item) => (
        <FurnitureItem key={item.id} item={item} />
      ))}
    </>
  );
}

export function RoomVisualizer() {
  return (
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[500px] rounded-2xl overflow-hidden shadow-xl border border-border bg-slate-900/10">
      {/* Overlay Controls */}
      <div className="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-2">
        <CameraPresetControls />
      </div>

      <div className="absolute bottom-3 left-3 z-10 flex flex-wrap items-center gap-2">
        <TransformGizmoControls />
      </div>

      <Canvas
        shadows
        camera={{ position: [6, 6, 8], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        className="w-full h-full touch-none"
      >
        <color attach="background" args={['#0F172A']} />
        <SoftShadows size={15} samples={16} />
        <RoomScene />
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 2 - 0.02}
          minDistance={2}
          maxDistance={25}
        />
      </Canvas>
    </div>
  );
}
