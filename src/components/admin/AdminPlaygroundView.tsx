/**
 * @file Aspacity/DesignIt/frontend/src/components/admin/AdminPlaygroundView.tsx
 * @description Admin 3D Playground & Master Template Manager Component.
 * @purpose Core admin view for inspecting, creating, editing, configuring, and deleting 3D models and master templates.
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import {
  ShieldCheck,
  Plus,
  Box,
  Layers,
  RefreshCw,
  Check,
  Lock,
  Search,
  Sliders,
  Trash2,
  Edit3,
  Copy,
  Eye,
  Sun,
  Camera,
  X,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

export interface CatalogModel {
  id: string;
  name: string;
  category: string;
  asset_path: string;
  thumbnail_url?: string;
  dimensions: { width: number; height: number; depth: number };
  default_materials?: any[];
  is_public: boolean;
  created_at?: string;
}

export function AdminPlaygroundView() {
  const { user, token, openAuthModal } = useAuth();
  const { showToast } = useToast();

  const [models, setModels] = useState<CatalogModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modal State for Create / Edit
  const [editingModel, setEditingModel] = useState<CatalogModel | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState('room-templates');
  const [assetPath, setAssetPath] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [width, setWidth] = useState(8.0);
  const [height, setHeight] = useState(2.8);
  const [depth, setDepth] = useState(10.0);
  const [isPublic, setIsPublic] = useState(true);

  // Delete Confirmation State
  const [deletingId, setDeletingId] = useState<string | null>(null);

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
      console.error('Failed to fetch 3D model catalog:', e);
      showToast('Could not load 3D model catalog from backend.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenCreateModal = () => {
    setEditingModel(null);
    setName('');
    setCategory('room-templates');
    setAssetPath('templates/modern-apartment.glb');
    setThumbnailUrl('');
    setWidth(8.0);
    setHeight(2.8);
    setDepth(10.0);
    setIsPublic(true);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (model: CatalogModel) => {
    setEditingModel(model);
    setName(model.name);
    setCategory(model.category);
    setAssetPath(model.asset_path);
    setThumbnailUrl(model.thumbnail_url || '');
    setWidth(model.dimensions?.width || 1.0);
    setHeight(model.dimensions?.height || 1.0);
    setDepth(model.dimensions?.depth || 1.0);
    setIsPublic(model.is_public);
    setIsModalOpen(true);
  };

  const handleSaveModel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      openAuthModal();
      return;
    }

    setIsSubmitting(true);

    try {
      const isEdit = !!editingModel;
      const endpoint = isEdit ? `${BACKEND_URL}/api/models/${editingModel.id}` : `${BACKEND_URL}/api/models`;
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name.trim(),
          category,
          asset_path: assetPath.trim(),
          thumbnail_url: thumbnailUrl.trim() || undefined,
          dimensions: { width, height, depth },
          default_materials: editingModel?.default_materials || [],
          is_public: isPublic,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        showToast(data.error || 'Failed to save model entry', 'error');
        return;
      }

      showToast(isEdit ? 'Master model updated!' : 'New 3D model template created!', 'success');
      setIsModalOpen(false);
      fetchCatalog();
    } catch (e) {
      showToast('Network error saving 3D model entry', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteModel = async (id: string) => {
    if (!token) {
      openAuthModal();
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/models/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        showToast(data.error || 'Failed to delete model entry', 'error');
        return;
      }

      showToast('3D model template removed from catalog.', 'success');
      setModels((prev) => prev.filter((m) => m.id !== id));
      setDeletingId(null);
    } catch (e) {
      showToast('Error deleting 3D model entry', 'error');
    }
  };

  const handleDuplicateModel = async (model: CatalogModel) => {
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
          name: `${model.name} (Copy)`,
          category: model.category,
          asset_path: model.asset_path,
          thumbnail_url: model.thumbnail_url,
          dimensions: model.dimensions,
          default_materials: model.default_materials || [],
          is_public: model.is_public,
        }),
      });

      const data = await res.json();
      if (data.success) {
        showToast(`Cloned "${model.name}" to catalog.`, 'success');
        fetchCatalog();
      }
    } catch (e) {
      showToast('Failed to duplicate model', 'error');
    }
  };

  const filteredModels = models.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.asset_path.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'room-templates', label: 'Room Templates' },
    { id: 'seating', label: 'Seating' },
    { id: 'tables', label: 'Tables' },
    { id: 'lighting', label: 'Lighting' },
    { id: 'decor', label: 'Decor' },
    { id: 'electronics', label: 'Electronics' },
    { id: 'textures', label: 'Textures' },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Non-Admin Privileges Banner */}
      {(!user || user.role !== 'admin') && (
        <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 flex items-start gap-4 shadow-sm">
          <Lock className="w-6 h-6 shrink-0 mt-0.5" />
          <div className="flex-1 space-y-1">
            <h3 className="font-bold text-sm">Aspacity Administrator Privileges Required</h3>
            <p className="text-xs leading-relaxed opacity-90">
              You are currently exploring the 3D Playground in read-only mode. Sign in with an Aspacity Admin account to create, edit, configure lights/orbits, or delete master 3D models.
            </p>
          </div>
          <button
            onClick={openAuthModal}
            className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs shadow-md shrink-0"
          >
            Sign In as Admin
          </button>
        </div>
      )}

      {/* Title & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">3D Playground & Master Templates</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 text-xs font-semibold">
              Admin Engine
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Configure master 3D room templates, light placement, and camera orbits for Professionals and Clients.
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="px-5 py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Master Model</span>
        </button>
      </div>

      {/* Category Pills & Search Controls */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by model name or GLB path..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-border bg-card text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchCatalog}
              className="px-3.5 py-2.5 rounded-2xl border border-border bg-card hover:bg-secondary text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Refresh Catalog"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </button>
            <span className="text-xs font-semibold text-muted-foreground bg-card px-3 py-2.5 rounded-2xl border border-border font-mono">
              Total: {models.length}
            </span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedCategory === cat.id
                  ? 'bg-orange-600 text-white border-orange-600 shadow-md'
                  : 'bg-card border-border hover:bg-secondary text-muted-foreground'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Configured Models & Master Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading ? (
          <div className="col-span-full py-16 text-center text-xs text-muted-foreground space-y-2">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-orange-500" />
            <p>Loading 3D asset catalog and master templates...</p>
          </div>
        ) : filteredModels.length === 0 ? (
          <div className="col-span-full py-16 text-center text-xs text-muted-foreground space-y-3 bg-card border border-border rounded-3xl p-8">
            <Box className="w-8 h-8 mx-auto text-muted-foreground opacity-50" />
            <p className="font-semibold text-sm">No 3D Models Found</p>
            <p className="max-w-md mx-auto">
              No configured models match your current filter. Click below to add a new 3D model template entry.
            </p>
            <button
              onClick={handleOpenCreateModal}
              className="mt-2 px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-semibold"
            >
              Add First 3D Model
            </button>
          </div>
        ) : (
          filteredModels.map((model) => (
            <div
              key={model.id}
              className="group bg-card border border-border hover:border-orange-500/50 rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Visual Thumbnail Box */}
                <div className="relative aspect-video rounded-2xl bg-secondary/60 border border-border/60 overflow-hidden flex items-center justify-center">
                  <Box className="w-10 h-10 text-orange-500 opacity-80 group-hover:scale-110 transition-transform" />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-background/90 backdrop-blur-md text-[10px] font-bold text-orange-600 dark:text-orange-400 border border-border">
                    {model.category}
                  </span>
                  <span
                    className={`absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      model.is_public
                        ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                    }`}
                  >
                    {model.is_public ? 'Public Template' : 'Draft'}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-sm tracking-tight text-foreground line-clamp-1">{model.name}</h3>
                  <p className="text-[11px] font-mono text-muted-foreground truncate mt-0.5">{model.asset_path}</p>
                </div>

                {/* Specs Box */}
                <div className="grid grid-cols-2 gap-2 text-[10px] text-muted-foreground pt-1">
                  <div className="bg-secondary/40 p-2 rounded-xl border border-border/50">
                    <span className="block font-semibold uppercase text-[9px]">Dimensions</span>
                    <span className="font-mono text-foreground">
                      {model.dimensions?.width || 1}m × {model.dimensions?.height || 1}m
                    </span>
                  </div>
                  <div className="bg-secondary/40 p-2 rounded-xl border border-border/50">
                    <span className="block font-semibold uppercase text-[9px]">Depth</span>
                    <span className="font-mono text-foreground">{model.dimensions?.depth || 1}m</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="pt-4 mt-4 border-t border-border space-y-2">
                <Link
                  href={`/admin/playground/${model.id}`}
                  className="w-full py-2.5 px-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Configure 3D Canvas</span>
                </Link>

                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  <button
                    onClick={() => handleOpenEditModal(model)}
                    className="py-1.5 px-2 rounded-xl border border-border bg-background hover:bg-secondary text-[11px] font-medium text-foreground flex items-center justify-center gap-1 transition-colors"
                    title="Edit Metadata"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDuplicateModel(model)}
                    className="py-1.5 px-2 rounded-xl border border-border bg-background hover:bg-secondary text-[11px] font-medium text-foreground flex items-center justify-center gap-1 transition-colors"
                    title="Duplicate Template"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Clone</span>
                  </button>
                  <button
                    onClick={() => setDeletingId(model.id)}
                    className="py-1.5 px-2 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-600 text-[11px] font-medium flex items-center justify-center gap-1 transition-colors"
                    title="Delete Entry"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Master Model Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-card text-card-foreground rounded-3xl shadow-2xl border border-border p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">
                  <Box className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base">
                    {editingModel ? 'Edit Master 3D Model' : 'Create Master 3D Model'}
                  </h3>
                  <p className="text-xs text-muted-foreground">Define catalog parameters and asset paths</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-secondary text-muted-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModel} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5">Model Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Modern Executive Desk"
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs font-medium"
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
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5">GLB Filename Path</label>
                  <input
                    type="text"
                    required
                    value={assetPath}
                    onChange={(e) => setAssetPath(e.target.value)}
                    placeholder="tables/executive-desk.glb"
                    className="w-full px-3.5 py-2.5 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-semibold uppercase mb-1">Width (m)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={width}
                    onChange={(e) => setWidth(parseFloat(e.target.value) || 1)}
                    className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase mb-1">Height (m)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={height}
                    onChange={(e) => setHeight(parseFloat(e.target.value) || 1)}
                    className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase mb-1">Depth (m)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={depth}
                    onChange={(e) => setDepth(parseFloat(e.target.value) || 1)}
                    className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs font-mono"
                  />
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-secondary/50 border border-border flex items-center gap-3">
                <input
                  type="checkbox"
                  id="pub-check"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="w-4 h-4 accent-orange-600 rounded cursor-pointer"
                />
                <label htmlFor="pub-check" className="text-xs font-medium cursor-pointer">
                  <span>Publish as Active Public Template for Professionals & Clients</span>
                </label>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 rounded-2xl border border-border hover:bg-secondary font-semibold text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs transition-opacity shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : editingModel ? 'Update Model' : 'Create Master Entry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-sm bg-card text-card-foreground rounded-3xl shadow-2xl border border-border p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base">Delete 3D Model Entry?</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                This will permanently delete this master model from the global catalog database. This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setDeletingId(null)}
                className="flex-1 py-2.5 rounded-xl border border-border hover:bg-secondary font-semibold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteModel(deletingId)}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs shadow-md"
              >
                Delete Model
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
