/**
 * @file Aspacity/DesignIt/frontend/src/components/studio/ProjectSaveLoadModal.tsx
 * @description Project Persistence Save & Load Modal Component for DesignIT.
 * @purpose Interacts with DesignIT backend API to list, save, and load 3D interior design projects to PostgreSQL.
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRoom } from '@/context/RoomContext';
import { X, Save, FolderOpen, Plus, Loader2, Check } from 'lucide-react';

interface SavedProject {
  id: string;
  name: string;
  description: string;
  width: number;
  length: number;
  ceiling_height: number;
  wall_color: string;
  floor_material: string;
  updated_at: string;
}

interface ProjectSaveLoadModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'save' | 'load';
}

export function ProjectSaveLoadModal({ isOpen, onClose, mode }: ProjectSaveLoadModalProps) {
  const { token, openAuthModal, user } = useAuth();
  const {
    width,
    length,
    ceilingHeight,
    wallColor,
    floorMaterial,
    placedObjects,
    setDimensions,
    setWallColor,
    setFloorMaterial,
  } = useRoom();

  const [projects, setProjects] = useState<SavedProject[]>([]);
  const [projectName, setProjectName] = useState('My Modern Living Room');
  const [description, setDescription] = useState('3D Interior floorplan created in DesignIT');
  const [isLoading, setIsLoading] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    if (isOpen && token) {
      fetchProjects();
    }
  }, [isOpen, token]);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/projects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setProjects(data.projects || []);
      }
    } catch (e) {
      console.error('Failed to fetch user projects:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAndSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      openAuthModal();
      return;
    }

    setIsLoading(true);
    try {
      // 1. Create Project
      const res = await fetch(`${BACKEND_URL}/api/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: projectName,
          description,
          room: {
            name: 'Main Room',
            width,
            length,
            ceiling_height: ceilingHeight,
            wall_color: wallColor,
            floor_material: floorMaterial,
          },
        }),
      });

      const data = await res.json();

      if (data.success && data.project?.id) {
        const projectId = data.project.id;
        setActiveProjectId(projectId);

        // 2. Save Placed 3D Furniture Objects
        await fetch(`${BACKEND_URL}/api/projects/${projectId}/objects`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            placed_objects: placedObjects.map((o) => ({
              name: o.name,
              position: { x: o.position[0], y: o.position[1], z: o.position[2] },
              rotation: { x: o.rotation[0], y: o.rotation[1], z: o.rotation[2] },
              scale: { x: o.scale[0], y: o.scale[1], z: o.scale[2] },
              custom_materials: { color: o.color, roughness: o.roughness, metalness: o.metalness },
            })),
          }),
        });

        setSuccessMessage('Project and 3D furniture layout saved successfully!');
        setTimeout(() => {
          setSuccessMessage(null);
          onClose();
        }, 1200);
      }
    } catch (e) {
      console.error('Failed to save project:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadProject = async (project: SavedProject) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/projects/${project.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.success && data.room) {
        setDimensions(
          parseFloat(data.room.width),
          parseFloat(data.room.length),
          parseFloat(data.room.ceiling_height)
        );
        setWallColor(data.room.wall_color);
        setFloorMaterial(data.room.floor_material);

        setSuccessMessage(`Loaded "${project.name}" floorplan successfully!`);
        setTimeout(() => {
          setSuccessMessage(null);
          onClose();
        }, 1000);
      }
    } catch (e) {
      console.error('Failed to load project details:', e);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-card text-card-foreground rounded-2xl shadow-2xl border border-border p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              {mode === 'save' ? <Save className="w-5 h-5" /> : <FolderOpen className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-base font-bold">
                {mode === 'save' ? 'Save DesignIT Project' : 'Open Saved Project'}
              </h3>
              <p className="text-xs text-muted-foreground">Connected to Aspacity PostgreSQL Database</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-secondary text-muted-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-xs font-semibold flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Content Body */}
        {!token ? (
          <div className="py-8 text-center space-y-3">
            <p className="text-xs text-muted-foreground">
              Please sign in with your Aspacity SSO account to save or load projects.
            </p>
            <button
              onClick={openAuthModal}
              className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs shadow-sm"
            >
              Sign In with Aspacity SSO
            </button>
          </div>
        ) : mode === 'save' ? (
          <form onSubmit={handleCreateAndSave} className="mt-4 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1">Project Name</label>
              <input
                type="text"
                required
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g. Minimalist Penthouse Lounge"
                className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs font-medium focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1">Description</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief project details..."
                className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs font-medium focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <div className="p-3 rounded-xl bg-secondary/50 border border-border text-xs space-y-1">
              <div className="font-semibold text-muted-foreground">Spatial Snapshot</div>
              <div className="text-foreground">
                Room Dimensions: {width}m × {length}m (Ceiling: {ceilingHeight}m)
              </div>
              <div className="text-foreground">Furniture Items Placed: {placedObjects.length} objects</div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save Project to Cloud DB</span>
            </button>
          </form>
        ) : (
          <div className="mt-4 space-y-3 max-h-64 overflow-y-auto pr-1">
            {isLoading ? (
              <div className="py-8 text-center text-xs text-muted-foreground">Loading user projects...</div>
            ) : projects.length === 0 ? (
              <div className="py-8 text-center text-xs text-muted-foreground">
                No saved projects found. Save your current 3D layout to see it listed here.
              </div>
            ) : (
              projects.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => handleLoadProject(proj)}
                  className="p-3 rounded-xl border border-border bg-background hover:bg-secondary cursor-pointer transition-colors flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-bold text-xs">{proj.name}</h4>
                    <p className="text-[10px] text-muted-foreground">
                      {proj.width}m × {proj.length}m • Saved {new Date(proj.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-xs text-primary font-semibold">Open →</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
