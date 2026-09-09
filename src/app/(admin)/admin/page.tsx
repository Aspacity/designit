/**
 * @file Aspacity/DesignIt/frontend/src/app/(admin)/admin/page.tsx
 * @description Admin 3D Catalog & Model Manager Route Page.
 * @purpose Privileged view for Aspacity administrators to insert, inspect, and manage 3D furniture models.
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ShieldCheck, Plus, Box, Layers, RefreshCw, Check, Lock } from 'lucide-react';

interface CatalogModel {
  id: string;
  name: string;
  category: string;
  asset_path: string;
  thumbnail_url?: string;
  dimensions: { width: number; height: number; depth: number };
  is_public: boolean;
}

export default function AdminCatalogPage() {
  const { user, token, openAuthModal } = useAuth();

  const [models, setModels] = useState<CatalogModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Form State for Adding New Model
  const [name, setName] = useState('');
  const [category, setCategory] = useState('seating');
  const [assetPath, setAssetPath] = useState('');
  const [width, setWidth] = useState(0.85);
  const [height, setHeight] = useState(0.78);
  const [depth, setDepth] = useState(0.88);
  const [isSuccess, setIsSuccess] = useState(false);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchCatalog();
  }, [selectedCategory]);

  const fetchCatalog = async () => {
    setIsLoading(true);
    try {
      const url =
        selectedCategory === 'all'
          ? `${BACKEND_URL}/api/models`
          : `${BACKEND_URL}/api/models?category=${selectedCategory}`;

      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setModels(data.models || []);
      }
    } catch (e) {
      console.error('Failed to fetch models catalog:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddModel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      openAuthModal();
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/models`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          category,
          asset_path: `${category}/${assetPath}`,
          dimensions: { width, height, depth },
          default_materials: [{ slot: 'main', color: '#3B82F6' }],
          is_public: true,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsSuccess(true);
        setName('');
        setAssetPath('');
        fetchCatalog();
        setTimeout(() => setIsSuccess(false), 2000);
      }
    } catch (e) {
      console.error('Failed to add model:', e);
    }
  };

  return (
    <div className="space-y-8">
      {/* Admin Role Check Notice */}
      {!user || user.role !== 'admin' ? (
        <div className="p-8 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 max-w-xl mx-auto text-center space-y-4">
          <Lock className="w-8 h-8 mx-auto" />
          <h2 className="text-xl font-bold">Aspacity Admin Privileges Required</h2>
          <p className="text-xs leading-relaxed">
            You are viewing this portal as a guest or standard account. Sign in with an Aspacity Administrator account to add or alter global 3D furniture models.
          </p>
          <button
            onClick={openAuthModal}
            className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs shadow-sm"
          >
            Sign In with Aspacity SSO
          </button>
        </div>
      ) : null}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Add 3D Model Form */}
        <div className="p-6 bg-card border border-border rounded-2xl shadow-lg space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-border">
            <Box className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-sm">Add 3D Furniture Entry</h3>
          </div>

          {isSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>3D Model catalog entry created!</span>
            </div>
          )}

          <form onSubmit={handleAddModel} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1">Model Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Modern Velvet Armchair"
                className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="room-templates">room-templates</option>
                <option value="seating">seating</option>
                <option value="tables">tables</option>
                <option value="lighting">lighting</option>
                <option value="decor">decor</option>
                <option value="electronics">electronics</option>
                <option value="textures">textures</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1">GLB Filename</label>
              <input
                type="text"
                required
                value={assetPath}
                onChange={(e) => setAssetPath(e.target.value)}
                placeholder="velvet-armchair.glb"
                className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] font-semibold uppercase mb-1">Width (m)</label>
                <input
                  type="number"
                  step="0.05"
                  value={width}
                  onChange={(e) => setWidth(parseFloat(e.target.value))}
                  className="w-full px-2 py-1.5 rounded-xl border border-border bg-background text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase mb-1">Height (m)</label>
                <input
                  type="number"
                  step="0.05"
                  value={height}
                  onChange={(e) => setHeight(parseFloat(e.target.value))}
                  className="w-full px-2 py-1.5 rounded-xl border border-border bg-background text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase mb-1">Depth (m)</label>
                <input
                  type="number"
                  step="0.05"
                  value={depth}
                  onChange={(e) => setDepth(parseFloat(e.target.value))}
                  className="w-full px-2 py-1.5 rounded-xl border border-border bg-background text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Save to 3D Catalog</span>
            </button>
          </form>
        </div>

        {/* Catalog List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" />
              <span>Global 3D Asset Catalog ({models.length})</span>
            </h3>
            <button
              onClick={fetchCatalog}
              className="p-1.5 rounded-xl border border-border hover:bg-secondary text-muted-foreground transition-colors"
              title="Refresh Catalog"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {isLoading ? (
              <div className="col-span-2 py-12 text-center text-xs text-muted-foreground">
                Loading 3D asset catalog...
              </div>
            ) : models.length === 0 ? (
              <div className="col-span-2 py-12 text-center text-xs text-muted-foreground">
                No catalog items found.
              </div>
            ) : (
              models.map((m) => (
                <div key={m.id} className="p-4 bg-card border border-border rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs">{m.name}</h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {m.category}
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground font-mono truncate">{m.asset_path}</p>
                  <div className="text-[10px] text-muted-foreground">
                    Dimensions: {m.dimensions?.width}m × {m.dimensions?.height}m × {m.dimensions?.depth}m
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
