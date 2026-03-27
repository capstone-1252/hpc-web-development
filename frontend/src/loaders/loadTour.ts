import cockpit, { type CockpitItemData } from "@/lib/cockpit";
import type { AssetImage } from "./utils";

export interface TourPhotos extends CockpitItemData {
  photos: AssetImage[];
}

export const loadTour = async (): Promise<TourPhotos> => {
  const res = await cockpit.getSingleton<TourPhotos>("tour");
  return res;
};
