import cockpit from "@/lib/cockpit";

export interface CockpitImage {
  path: string;
  title?: string;
  alt?: string;
  width?: number;
  height?: number;
  meta?: Record<string, any>;
}

export type FAQ = { 
  question: string; 
  answer: string;
  image?: CockpitImage;
};

export async function loadFAQs(): Promise<FAQ[]> {
  const data = await cockpit.getItems("faq")
  return data as FAQ[]
}

export function getImageUrl(image: CockpitImage | undefined): string {
  if (!image?.path) return "";
  
  const baseURL = import.meta.env.PUBLIC_COCKPIT_API;
  return `${baseURL}${image.path}`;
}
