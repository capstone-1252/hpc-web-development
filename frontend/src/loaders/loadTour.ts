import cockpit, { type CockpitItemData } from "@/lib/cockpit";
import type { AssetImage } from "./utils";

export interface TourPhotos extends CockpitItemData {
  image: AssetImage;
	description: string
}

export const loadTour = async (): Promise<TourPhotos[]> => {
  const res = await cockpit.getItems<TourPhotos>("clinicTour");
  return res;
};
