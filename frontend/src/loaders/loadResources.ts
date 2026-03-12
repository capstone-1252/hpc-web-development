import cockpit from "@/lib/cockpit";

export interface CockpitImage {
  path: string;
  title?: string;
  alt?: string;
  width?: number;
  height?: number;
  meta?: Record<string, any>;
}



export async function loadResources(): Promise<any[]> {
  const data = await cockpit.getItems("Resources")
  return data;
}

export async function loadResource(id: string): Promise<any | null> {
  try {
    const data = await cockpit.getItem("Resources", id);
    return data
  } catch {
    return null;
  }


export function getImageUrl(image: CockpitImage | undefined): string {
  if (!image?.path) return "";
  
  const baseURL = import.meta.env.PUBLIC_COCKPIT_API;
  return `${baseURL}${image.path}`;
}
