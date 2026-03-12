import cockpit, { type CockpitItemData } from "@/lib/cockpit";

export interface CockpitImage {
  path: string;
  title?: string;
  alt?: string;
  width?: number;
  height?: number;
  meta?: Record<string, any>;
}

export interface FoodBank extends CockpitItemData {
  name: string;
	phone?: string;
	email?: string;
	link?: string;
  address?: string;
  hours?: string;
	appointmentOnly: boolean;
};

export async function loadFoodBanks(): Promise<FoodBank[]> {
  const data = await cockpit.getItems("foodbanks", {
    sort: { name: 1 } // sorts alphanumerically
  });

  return data as FoodBank[];
}

export function getImageUrl(image: CockpitImage | undefined): string {
  if (!image?.path) return "";
  
  const baseURL = import.meta.env.PUBLIC_COCKPIT_API;
  return `${baseURL}${image.path}`;
}
