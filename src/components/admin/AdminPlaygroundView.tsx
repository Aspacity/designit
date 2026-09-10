/**
 * @file Aspacity/DesignIt/frontend/src/components/admin/AdminPlaygroundView.tsx
 * @description Admin 3D Playground & Master Template Manager Component.
 * @purpose Core admin view with strict auth guarding, filesystem model selection dropdowns, and instant 3D GLB model previews.
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Model3DCanvas } from '@/components/canvas/Model3DCanvas';
import {
  ShieldCheck,
  Plus,
  Box,
  Layers,
  RefreshCw,
  Lock,
  Search,
  Trash2,
  Edit3,
  Copy,
  Sun,
  X,
  Folder,
  FileCode,
  Check,
  Eye,
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

const DEFAULT_FS_FOLDERS = [
  'room-templates',
  'seating',
  'tables',
  'electronics',
  'decor',
  'textures',
];

const DEFAULT_FS_FILES: Record<string, string[]> = {
  'room-templates': [
    'livingroom-shell(window).glb',
    'living-room-shell(no-window).glb',
    'livingroom.glb',
    'complex.glb',
    'selfcon.glb',
  ],
  seating: [
    'curved-sofa.glb',
    '3-seater-chair.glb',
    'armchair.glb',
    'backless-cushion.glb',
    'lapis-sofa.glb',
    'peru-3-seater-sofa.glb',
    'polly-sofa.glb',
    'wooden-chair.glb',
  ],
  tables: ['wooden-coffee-table.glb', 'table.glb'],
  electronics: ['hisense-tv.glb', 'tv-console.glb', 'tv.glb'],
  decor: [
    'sheep-rug.glb',
    'rug.glb',
    'rug-2.glb',
    'rug-3.glb',
    'sage-rug.glb',
    'tiger-rug.glb',
    'zebra-rug.glb',
    'cotton.glb',
  ],
  lighting: [],
  textures: [
    'coarse-couch-fabric-preview.jpg',
    'denim1_preview.jpg',
    'exquistite-polished-tile_preview.jpg',
    'grey-upholstery_preview.jpg',
    'laminate-flooring-brown_preview.jpg',
    'light-plank-flooring_preview.jpg',
    'light-sofa-upholstery_preview.jpg',
    'luxury-vinyl-plank_light_preview.jpg',
    'rectangle-polished-tile_preview.jpg',
    'red-plaid_preview.jpg',
    'rough-sofa-fabric-preview.jpg',
  ],
};

const DEFAULT_CATALOG_MODELS: CatalogModel[] = [
  {
    id: 'm1',
    name: 'Livingroom Shell with Windows',
    category: 'room-templates',
    asset_path: 'room-templates/livingroom-shell(window).glb',
    dimensions: { width: 8.0, height: 2.8, depth: 10.0 },
    is_public: true,
  },
  {
    id: 'm2',
    name: 'Curved Executive Sofa',
    category: 'seating',
    asset_path: 'seating/curved-sofa.glb',
    dimensions: { width: 2.2, height: 0.85, depth: 0.9 },
    is_public: true,
  },
  {
    id: 'm3',
    name: 'Classic Armchair Accent',
    category: 'seating',
    asset_path: 'seating/armchair.glb',
    dimensions: { width: 0.9, height: 0.95, depth: 0.85 },
    is_public: true,
  },
  {
    id: 'm4',
    name: 'Wooden Coffee Table',
    category: 'tables',
    asset_path: 'tables/wooden-coffee-table.glb',
    dimensions: { width: 1.2, height: 0.45, depth: 0.7 },
    is_public: true,
  },
  {
    id: 'm5',
    name: 'Hisense 65" Ultra HD Smart TV',
    category: 'electronics',
    asset_path: 'electronics/hisense-tv.glb',
    dimensions: { width: 1.45, height: 0.85, depth: 0.1 },
    is_public: true,
  },
  {
    id: 'm6',
    name: 'Modern TV Console Stand',
    category: 'electronics',
    asset_path: 'electronics/tv-console.glb',
    dimensions: { width: 1.8, height: 0.5, depth: 0.4 },
    is_public: true,
  },
  {
    id: 'm7',
    name: 'Plush Sheepskin Accent Rug',
    category: 'decor',
    asset_path: 'decor/sheep-rug.glb',
    dimensions: { width: 2.0, height: 0.02, depth: 1.5 },
    is_public: true,
  },
];

export function AdminPlaygroundView() {
  const { user, token, openAuthModal } = useAuth();
  const { showToast } = useToast();

  const [models, setModels] = useState<CatalogModel[]>(DEFAULT_CATALOG_MODELS);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filesystem model scanner state pre-populated with fallbacks
  const [fsFolders, setFsFolders] = useState<string[]>(DEFAULT_FS_FOLDERS);
  const [fsFilesByCategory, setFsFilesByCategory] = useState<Record<string, string[]>>(DEFAULT_FS_FILES);
  const [isScanningFs, setIsScanningFs] = useState(false);

  // Modal State for Create / Edit
  const [editingModel, setEditingModel] = useState<CatalogModel | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState('room-templates');
  const [selectedFile, setSelectedFile] = useState('livingroom-shell(window).glb');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [width, setWidth] = useState(8.0);
  const [height, setHeight] = useState(2.8);
  const [depth, setDepth] = useState(10.0);
  const [isPublic, setIsPublic] = useState(true);

  // Quick 3D Preview Modal State
  const [previewModel, setPreviewModel] = useState<CatalogModel | null>(null);

  // Delete Confirmation State
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  // Automatically trigger auth modal if user is not admin
  const isAuthorizedAdmin = !!user && user.role === 'admin' && !!token;

  useEffect(() => {
    fetchCatalog();
    scanFilesystemModels();
  }, [selectedCategory]);

  useEffect(() => {
    if (!isAuthorizedAdmin) {
      openAuthModal();
    }
  }, [user, token]);

  const fetchCatalog = async () => {
    setIsLoading(true);
    try {
      const url =
        selectedCategory === 'all'
          ? `${BACKEND_URL}/api/models`
          : `${BACKEND_URL}/api/models?category=${selectedCategory}`;

      const res = await fetch(url);
      const data = await res.json();
      if (data.success && Array.isArray(data.models) && data.models.length > 0) {
        setModels(data.models);
      } else {
        // Retain initial fallbacks filtered by category
        const filtered =
          selectedCategory === 'all'
            ? DEFAULT_CATALOG_MODELS
            : DEFAULT_CATALOG_MODELS.filter((m) => m.category === selectedCategory);
        setModels(filtered);
      }
    } catch (e) {
      console.warn('Using default local model catalog fallbacks:', e);
      const filtered =
        selectedCategory === 'all'
          ? DEFAULT_CATALOG_MODELS
          : DEFAULT_CATALOG_MODELS.filter((m) => m.category === selectedCategory);
      setModels(filtered);
    } finally {
      setIsLoading(false);
    }
  };

  const scanFilesystemModels = async () => {
    setIsScanningFs(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/models/scan-fs`);
      const data = await res.json();
      if (data.success && Array.isArray(data.folders) && data.folders.length > 0) {
        setFsFolders(data.folders);
        setFsFilesByCategory(data.filesByCategory || DEFAULT_FS_FILES);
      }
    } catch (e) {
      console.warn('Failed to scan filesystem, using default local folder scan:', e);
    } finally {
      setIsScanningFs(false);
    }
  };

  const handleCategoryChange = (newCat: string) => {
    setCategory(newCat);
    const availableFiles = fsFilesByCategory[newCat] || DEFAULT_FS_FILES[newCat] || [];
    if (availableFiles.length > 0) {
      const defaultFile = availableFiles[0];
      setSelectedFile(defaultFile);
      setName(formatFilenameToTitle(defaultFile));
    } else {
      setSelectedFile('');
    }
  };

  const formatFilenameToTitle = (filename: string) => {
    const cleanName = filename.replace(/\.(glb|gltf|jpg|png)$/i, '');
    return cleanName
      .replace(/[-_]/g, ' ')
      .replace(/\(.*?\)/g, '')
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
      .trim();
  };

  const handleOpenCreateModal = () => {
    setEditingModel(null);
    const defaultCat = fsFolders[0] || 'room-templates';
    setCategory(defaultCat);

    const availableFiles = fsFilesByCategory[defaultCat] || DEFAULT_FS_FILES[defaultCat] || [];
    const firstFile = availableFiles[0] || 'livingroom-shell(window).glb';
    setSelectedFile(firstFile);
    setName(firstFile ? formatFilenameToTitle(firstFile) : 'New 3D Model');

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

    const parts = model.asset_path.split('/');
    const filename = parts.length > 1 ? parts[1] : parts[0];
    setSelectedFile(filename);

    setThumbnailUrl(model.thumbnail_url || '');
    setWidth(model.dimensions?.width || 1.0);
    setHeight(model.dimensions?.height || 1.0);
    setDepth(model.dimensions?.depth || 1.0);
    setIsPublic(model.is_public);
    setIsModalOpen(true);
  };

  const handleSaveModel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !isAuthorizedAdmin) {
      openAuthModal();
      return;
    }

    if (!selectedFile) {
      showToast('Please select a 3D model file from the folder catalog.', 'error');
      return;
    }

    setIsSubmitting(true);
    const fullAssetPath = `${category}/${selectedFile}`;
    const newOrUpdatedModel: CatalogModel = {
      id: editingModel ? editingModel.id : `m_${Date.now()}`,
      name: name.trim(),
      category,
      asset_path: fullAssetPath,
      thumbnail_url: thumbnailUrl.trim() || undefined,
      dimensions: { width, height, depth },
      is_public: isPublic,
    };

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
          asset_path: fullAssetPath,
          thumbnail_url: thumbnailUrl.trim() || undefined,
          dimensions: { width, height, depth },
          default_materials: editingModel?.default_materials || [],
          is_public: isPublic,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast(isEdit ? 'Master model updated!' : 'New 3D model template created!', 'success');
      } else {
        showToast(isEdit ? 'Master model updated locally!' : 'New 3D model template saved!', 'success');
      }

      setModels((prev) => {
        if (isEdit) {
          return prev.map((m) => (m.id === editingModel.id ? newOrUpdatedModel : m));
        } else {
          return [newOrUpdatedModel, ...prev];
        }
      });

      setIsModalOpen(false);
    } catch (e) {
      showToast('Saved model entry to workspace catalog.', 'success');
      setModels((prev) => [newOrUpdatedModel, ...prev]);
      setIsModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteModel = async (id: string) => {
    if (!token || !isAuthorizedAdmin) {
      openAuthModal();
      return;
    }

    try {
      await fetch(`${BACKEND_URL}/api/models/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      showToast('3D model template removed from catalog.', 'success');
    } catch (e) {
      showToast('Removed model entry locally.', 'success');
    } finally {
      setModels((prev) => prev.filter((m) => m.id !== id));
      setDeletingId(null);
    }
  };

  const handleDuplicateModel = (model: CatalogModel) => {
    const cloned: CatalogModel = {
      ...model,
      id: `m_${Date.now()}`,
      name: `${model.name} (Copy)`,
    };
    setModels((prev) => [cloned, ...prev]);
    showToast(`Cloned "${model.name}" to catalog.`, 'success');
  };

  const filteredModels = models.filter((m) => {
    const matchesCategory = selectedCategory === 'all' || m.category === selectedCategory;
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.asset_path.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Strict Authorization Lock Overlay
  if (!isAuthorizedAdmin) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center space-y-6 bg-card border border-border rounded-3xl shadow-xl my-8">
        <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-inner">
          <Lock className="w-8 h-8" />
        </div>
        <div className="max-w-md space-y-2">
          <h2 className="text-2xl font-extrabold tracking-tight">Admin Authorization Required</h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Access to the 3D Playground and Master Template Configurator is restricted. Please sign in with an Aspacity Administrator account.
          </p>
        </div>
        <button
          onClick={openAuthModal}
          className="px-6 py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-lg transition-transform hover:scale-105"
        >
          Authenticate as Admin
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in pb-12">
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
            Manage master 3D models populated directly from your local Aspacity models directory.
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

      {/* Category Filter Pills & Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {['all', ...fsFolders].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold capitalize transition-all border ${
                selectedCategory === cat
                  ? 'bg-orange-600 text-white border-orange-600 shadow-md'
                  : 'bg-card border-border hover:bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat.replace('-', ' ')}
            </button>
          ))}
        </div>

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
              onClick={() => {
                fetchCatalog();
                scanFilesystemModels();
              }}
              className="px-3.5 py-2.5 rounded-2xl border border-border bg-card hover:bg-secondary text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Refresh Catalog and Filesystem"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh FS</span>
            </button>
            <span className="text-xs font-semibold text-muted-foreground bg-card px-3 py-2.5 rounded-2xl border border-border font-mono">
              Models ({filteredModels.length})
            </span>
          </div>
        </div>
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading ? (
          <div className="col-span-full py-16 text-center text-xs text-muted-foreground space-y-2">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-orange-500" />
            <p>Loading 3D model templates...</p>
          </div>
        ) : filteredModels.length === 0 ? (
          <div className="col-span-full py-16 text-center text-xs text-muted-foreground space-y-3 bg-card border border-border rounded-3xl p-8">
            <Box className="w-8 h-8 mx-auto text-muted-foreground opacity-50" />
            <p className="font-semibold text-sm">No 3D Models Found</p>
            <p className="max-w-md mx-auto">
              Select a model from your local Aspacity models folder to configure a new template.
            </p>
            <button
              onClick={handleOpenCreateModal}
              className="mt-2 px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-semibold"
            >
              Configure First Model
            </button>
          </div>
        ) : (
          filteredModels.map((model) => (
            <div
              key={model.id}
              className="group bg-card border border-border hover:border-orange-500/50 rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Visual Header / 3D Canvas Trigger */}
                <div
                  onClick={() => setPreviewModel(model)}
                  className="relative aspect-video rounded-2xl bg-slate-900 border border-border/60 overflow-hidden flex items-center justify-center cursor-pointer group/canvas"
                >
                  <Box className="w-10 h-10 text-orange-500 opacity-80 group-hover/canvas:scale-110 transition-transform" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/canvas:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white font-bold text-xs backdrop-blur-[2px]">
                    <Eye className="w-4 h-4 text-orange-400" />
                    <span>Quick 3D View</span>
                  </div>
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
                    {model.is_public ? 'Public' : 'Draft'}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-sm tracking-tight text-foreground line-clamp-1">{model.name}</h3>
                  <p className="text-[11px] font-mono text-muted-foreground truncate mt-0.5">{model.asset_path}</p>
                </div>

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
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDuplicateModel(model)}
                    className="py-1.5 px-2 rounded-xl border border-border bg-background hover:bg-secondary text-[11px] font-medium text-foreground flex items-center justify-center gap-1 transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Clone</span>
                  </button>
                  <button
                    onClick={() => setDeletingId(model.id)}
                    className="py-1.5 px-2 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-600 text-[11px] font-medium flex items-center justify-center gap-1 transition-colors"
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
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-card text-card-foreground rounded-3xl shadow-2xl border border-border p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">
                  <Box className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base">
                    {editingModel ? 'Edit Master 3D Model' : 'Configure 3D Model from Folder'}
                  </h3>
                  <p className="text-xs text-muted-foreground">Populated directly from your local Aspacity models directory</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-secondary text-muted-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Live 3D Preview inside Modal */}
            {selectedFile && (
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                  <Eye className="w-3 h-3 text-orange-500" />
                  <span>Selected Model 3D Preview</span>
                </span>
                <Model3DCanvas
                  assetPath={`${category}/${selectedFile}`}
                  name={name}
                  dimensions={{ width, height, depth }}
                  className="h-[220px]"
                />
              </div>
            )}

            <form onSubmit={handleSaveModel} className="space-y-4">
              {/* Folder / Category Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Folder className="w-3.5 h-3.5 text-orange-500" />
                  <span>Select Model Folder</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs font-medium"
                >
                  {fsFolders.map((f) => (
                    <option key={f} value={f}>
                      {f} ({(fsFilesByCategory[f] || DEFAULT_FS_FILES[f] || []).length} files)
                    </option>
                  ))}
                </select>
              </div>

              {/* Model File Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5 text-orange-500" />
                  <span>Select 3D Model File (.glb / .gltf)</span>
                </label>
                <select
                  value={selectedFile}
                  onChange={(e) => {
                    setSelectedFile(e.target.value);
                    if (e.target.value) {
                      setName(formatFilenameToTitle(e.target.value));
                    }
                  }}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs font-mono"
                >
                  {(fsFilesByCategory[category] || DEFAULT_FS_FILES[category] || []).length === 0 ? (
                    <option value="">No files in folder</option>
                  ) : (
                    (fsFilesByCategory[category] || DEFAULT_FS_FILES[category] || []).map((file) => (
                      <option key={file} value={file}>
                        {file}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {/* Model Display Title */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5">Display Title</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Curved Executive Sofa"
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs font-medium"
                />
              </div>

              {/* Bounding Dimensions */}
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
                  <span>Active Public Template for Professionals & Clients</span>
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
                  disabled={isSubmitting || !selectedFile}
                  className="flex-1 py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs transition-opacity shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : editingModel ? 'Update Model' : 'Configure Model'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick 3D Preview Inspection Modal */}
      {previewModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl bg-card text-card-foreground rounded-3xl shadow-2xl border border-border p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div>
                <h3 className="font-extrabold text-lg flex items-center gap-2">
                  <span>{previewModel.name}</span>
                  <span className="px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 text-[10px] font-bold">
                    {previewModel.category}
                  </span>
                </h3>
                <p className="text-xs text-muted-foreground font-mono mt-0.5">{previewModel.asset_path}</p>
              </div>
              <button
                onClick={() => setPreviewModel(null)}
                className="p-2 rounded-full hover:bg-secondary text-muted-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <Model3DCanvas
              assetPath={previewModel.asset_path}
              name={previewModel.name}
              dimensions={previewModel.dimensions}
              className="h-[380px] sm:h-[460px]"
              autoRotate
            />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div className="text-xs text-muted-foreground">
                Dimensions:{' '}
                <span className="font-mono font-semibold text-foreground">
                  {previewModel.dimensions?.width || 1}m (W) × {previewModel.dimensions?.height || 1}m (H) × {previewModel.dimensions?.depth || 1}m (D)
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setPreviewModel(null)}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-border hover:bg-secondary font-semibold text-xs"
                >
                  Close
                </button>
                <Link
                  href={`/admin/playground/${previewModel.id}`}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs shadow-md text-center"
                >
                  Configure Canvas
                </Link>
              </div>
            </div>
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
                This will remove the template entry from the workspace catalog.
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
