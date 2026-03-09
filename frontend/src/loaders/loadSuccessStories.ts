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
    image?: CockpitImage;
    description: string;
};

export async function loadFoodBanks(): Promise<SuccessStory[]> {
  const data = await cockpit.getItems("success_story", {
    sort: { name: 1 }
  });
  return data as SuccessStory[];
}

export function getImageUrl(image: CockpitImage | undefined): string {
  if (!image?.path) return "";
  
  const baseURL = import.meta.env.PUBLIC_COCKPIT_API;
  return `${baseURL}${image.path}`;
}