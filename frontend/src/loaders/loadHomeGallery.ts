import cockpit, { type CockpitItemData } from "@/lib/cockpit";
import type { AssetImage } from "./utils";

export interface HomeGallery extends CockpitItemData {
  photos: AssetImage[];
}

export const loadHomeGallery = async (): Promise<HomeGallery> => {
  const res = await cockpit.getSingleton<HomeGallery>("homeGallery");
  return res;
};
