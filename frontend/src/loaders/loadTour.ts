import cockpit, { type CockpitItemData } from "@/lib/cockpit";
import type { AssetImage } from "./utils";

export interface TourPhotos extends CockpitItemData {
  image: AssetImage;
  description: string;
  order: number;
}

export const loadTour = async (): Promise<TourPhotos[]> => {
  const res = await cockpit.getItems<TourPhotos>("clinicTour");
  return res?.sort((a, b) => a.order - b.order) ?? [];
};
