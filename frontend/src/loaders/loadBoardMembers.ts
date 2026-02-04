import cockpit from "@/lib/cockpit";

export interface CockpitImage {
  path: string;
  title?: string;
  alt?: string;
  width?: number;
  height?: number;
  meta?: Record<string, any>;
  _id?: string; // Asset ID might be stored here
}

export type BoardMember = {
  _id: string;
  name: string;
  position: string;
  bio?: string;
  photo?: CockpitImage;
};

export async function loadBoardMembers(): Promise<BoardMember[]> {
  const data = await cockpit.getItems("board", {
    sort: { order: 1 }
  });
  return data as BoardMember[];
}

export async function loadBoardMember(id: string): Promise<BoardMember | null> {
  try {
    const data = await cockpit.getItem("board", id);
    return data as BoardMember;
  } catch {
    return null;
  }
}

export function getImageUrl(image: CockpitImage | undefined): string {
  if (!image?.path) return "";
  
  // Try to get asset ID from _id field first, then extract from path as fallback
  let assetId = image._id;
  
  if (!assetId) {
    // Extract asset ID from path (fallback)
    // Path might be like "/storage/uploads/assetId-filename.ext"
    const pathParts = image.path.split('/');
    const filename = pathParts[pathParts.length - 1];
    assetId = filename.split('-')[0]; // Get first part before dash
    if (!assetId.match(/^[a-f0-9]{24}$/i)) {
      // If not a valid MongoDB ObjectId, try without dash
      assetId = filename.split('.')[0];
    }
  }
  
  return `${import.meta.env.PUBLIC_COCKPIT_API}/assets/image/${assetId}?m=thumbnail&w=64&h=64&q=80&o=1`;
}

export async function getOptimizedImageUrl(image: CockpitImage | undefined, options: {
  width?: number;
  height?: number;
  quality?: number;
  mode?: 'thumbnail' | 'bestFit' | 'resize' | 'fitToWidth' | 'fitToHeight';
} = {}): Promise<string> {
  if (!image?.path) return "";
  
  let assetId = image._id;
  
  if (!assetId) {
    const pathParts = image.path.split('/');
    const filename = pathParts[pathParts.length - 1];
    assetId = filename.split('-')[0];
    if (!assetId.match(/^[a-f0-9]{24}$/i)) {
      assetId = filename.split('.')[0];
    }
  }
  
  return await cockpit.getAssetUrl(assetId, {
    width: options.width || 64,
    height: options.height || 64,
    quality: options.quality || 80,
    mode: options.mode || 'thumbnail'
  });
}
