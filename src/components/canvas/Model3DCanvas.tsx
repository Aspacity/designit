/**
 * @file Aspacity/DesignIt/frontend/src/components/canvas/Model3DCanvas.tsx
 * @description Dynamic 3D GLB/GLTF Model Canvas Viewer Component with Error Boundaries.
 * @purpose Renders 3D GLB models loaded from backend or local static folder with interactive orbit controls, lighting, grid, and fallback bounding geometry.
 */

'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Center, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { Sun, RotateCcw, Eye, ShieldAlert, Sparkles, Layers } from 'lucide-react';

interface Model3DCanvasProps {
  assetPath: string; // e.g. "seating/curved-sofa.glb" or "room-templates/livingroom-shell(window).glb"
  name?: string;
  dimensions?: { width: number; height: number; depth: number };
  lightIntensity?: number;
  showGrid?: boolean;
  autoRotate?: boolean;
  className?: string;
}

class GLTFErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: React.ReactNode; children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    console.warn('3D GLTF load notice:', error);
  }

  componentDidUpdate(prevProps: { children: React.ReactNode }) {
    if (prevProps.children !== this.props.children && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function GLTFMesh({ modelUrl }: { modelUrl: string }) {
  const { scene } = useGLTF(modelUrl);
  const clonedScene = React.useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return clone;
  }, [scene]);

  return <primitive object={clonedScene} />;
}

function FallbackBoxMesh({
  dimensions,
}: {
  dimensions?: { width: number; height: number; depth: number };
}) {
  const w = dimensions?.width || 1.6;
  const h = dimensions?.height || 0.9;
  const d = dimensions?.depth || 1.2;

  return (
    <group position={[0, h / 2, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial color="#EA580C" roughness={0.3} metalness={0.2} />
      </mesh>
      <lineSegments>
        <wireframeGeometry args={[new THREE.BoxGeometry(w, h, d)]} />
        <lineBasicMaterial color="#F97316" linewidth={2} />
      </lineSegments>
    </group>
  );
}

function SceneContent({
  modelUrl,
  dimensions,
  lightIntensity = 1.2,
  showGrid = true,
  autoRotate = false,
}: {
  modelUrl: string;
  dimensions?: { width: number; height: number; depth: number };
  lightIntensity?: number;
  showGrid?: boolean;
  autoRotate?: boolean;
}) {
  return (
    <>
      <ambientLight intensity={lightIntensity * 0.6} />
      <directionalLight
        position={[8, 12, 6]}
        intensity={lightIntensity * 1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-8, -5, -6]} intensity={0.4} />

      <Center top>
        <GLTFErrorBoundary fallback={<FallbackBoxMesh dimensions={dimensions} />}>
          <Suspense fallback={<FallbackBoxMesh dimensions={dimensions} />}>
            <GLTFMesh modelUrl={modelUrl} />
          </Suspense>
        </GLTFErrorBoundary>
      </Center>

      {showGrid && (
        <Grid
          position={[0, -0.01, 0]}
          args={[12, 12]}
          cellSize={0.5}
          cellThickness={1}
          cellColor="#94A3B8"
          sectionSize={2}
          sectionThickness={1.5}
          sectionColor="#F97316"
          fadeDistance={20}
        />
      )}

      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        autoRotate={autoRotate}
        autoRotateSpeed={1.5}
        maxPolarAngle={Math.PI / 2 + 0.05}
        minDistance={0.5}
        maxDistance={20}
      />
    </>
  );
}

export function Model3DCanvas({
  assetPath,
  name,
  dimensions,
  lightIntensity: initialLight = 1.2,
  showGrid: initialGrid = true,
  autoRotate: initialRotate = false,
  className = 'h-[360px] sm:h-[450px]',
}: Model3DCanvasProps) {
  const [mounted, setMounted] = useState(false);
  const [lightIntensity, setLightIntensity] = useState(initialLight);
  const [gridVisible, setGridVisible] = useState(initialGrid);
  const [isRotating, setIsRotating] = useState(initialRotate);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
  const modelUrl = assetPath.startsWith('http') ? assetPath : `${BACKEND_URL}/models/${assetPath}`;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`w-full ${className} rounded-2xl bg-slate-900 border border-border flex items-center justify-center text-slate-400 text-xs`}
      >
        <span>Initializing 3D WebGL Viewport...</span>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${className} rounded-2xl overflow-hidden border border-border bg-slate-950 shadow-2xl group`}>
      {/* Dynamic Overlay Controls */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 text-[11px] font-medium text-white shadow-md">
          <Layers className="w-3.5 h-3.5 text-orange-400" />
          <span className="font-mono text-orange-300 truncate max-w-[180px]">
            {name || assetPath.split('/').pop()}
          </span>
        </div>

        <div className="flex items-center gap-1.5 pointer-events-auto bg-slate-900/80 backdrop-blur-md p-1 rounded-xl border border-slate-700/60 shadow-md text-white">
          <button
            onClick={() => setGridVisible(!gridVisible)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-colors ${
              gridVisible ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-colors ${
              isRotating ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            Spin
          </button>
        </div>
      </div>

      {/* Lighting Control Slider */}
      <div className="absolute bottom-3 left-3 z-10 pointer-events-auto bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 flex items-center gap-2 text-white text-[10px]">
        <Sun className="w-3.5 h-3.5 text-amber-400" />
        <span className="text-slate-300 font-mono">Light:</span>
        <input
          type="range"
          min="0.4"
          max="3.0"
          step="0.1"
          value={lightIntensity}
          onChange={(e) => setLightIntensity(parseFloat(e.target.value))}
          className="w-20 accent-orange-500 cursor-pointer h-1 bg-slate-700 rounded-lg"
        />
        <span className="font-mono text-orange-400 font-bold">{lightIntensity.toFixed(1)}x</span>
      </div>

      {/* Canvas Viewport */}
      <Canvas
        shadows
        camera={{ position: [2.5, 2.5, 3.5], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        className="w-full h-full touch-none"
      >
        <color attach="background" args={['#090D16']} />
        <SceneContent
          modelUrl={modelUrl}
          dimensions={dimensions}
          lightIntensity={lightIntensity}
          showGrid={gridVisible}
          autoRotate={isRotating}
        />
      </Canvas>
    </div>
  );
}
