/**
 * @file Aspacity/DesignIt/frontend/src/lib/asset-resolver.ts
 * @description Frontend 3D Asset Resolution Helper.
 * @purpose Determines whether to load 3D GLB models from AWS S3 Cloud Storage or local `/models/` path.
 * @usage Call `getAssetUrl(category, path)` in React 3D components.
 */

const AWS_S3_BUCKET_URL = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_URL || 'https://aspacity-designit-assets.s3.amazonaws.com/models';
const USE_LOCAL_OFFLINE = process.env.NEXT_PUBLIC_USE_LOCAL_MODELS === 'true';

export function getAssetUrl(category: string, assetPath: string): string {
  const cleanPath = assetPath.replace(/^(room-templates|seating|tables|lighting|decor|electronics|textures)\//, '');

  if (USE_LOCAL_OFFLINE || typeof window === 'undefined' || !navigator.onLine) {
    return `/models/${category}/${cleanPath}`;
  }

  return `${AWS_S3_BUCKET_URL}/${category}/${cleanPath}`;
}
