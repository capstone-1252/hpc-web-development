import cockpit from "@/lib/cockpit";

export interface CockpitImage {
  path: string;
  title?: string;
  alt?: string;
  width?: number;
  height?: number;
  meta?: Record<string, any>;
}

export type SuccessStory = {
    _id: string;
    image?: CockpitImage;
    description: string;
};

export async function loadSuccessStories(): Promise<SuccessStory[]> {
  const data = await cockpit.getItems("successStories");
  return data as SuccessStory[];
}

export function getSuccessImageUrl(image: CockpitImage | undefined): string {
  if (!image?.path) return "";
  
  const baseURL = import.meta.env.PUBLIC_COCKPIT_API;
  return `${baseURL}${image.path}`;
}
