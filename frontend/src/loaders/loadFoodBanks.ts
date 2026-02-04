import cockpit from "@/lib/cockpit";

export interface CockpitImage {
  path: string;
  title?: string;
  alt?: string;
  width?: number;
  height?: number;
  meta?: Record<string, any>;
}

export type FoodBank = {
  _id: string;
  name: string;
  address: string;
  hours: string;
  contact?: string;
  description: string;
  image?: CockpitImage;
};

export async function loadFoodBanks(): Promise<FoodBank[]> {
  const data = await cockpit.getItems("food_banks", {
    sort: { name: 1 }
  });
  return data as FoodBank[];
}

export function getImageUrl(image: CockpitImage | undefined): string {
  if (!image?.path) return "";
  
  const baseURL = import.meta.env.PUBLIC_COCKPIT_API;
  return `${baseURL}${image.path}`;
}