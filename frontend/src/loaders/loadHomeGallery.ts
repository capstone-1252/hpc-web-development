import cockpit, { type CockpitItemData } from "@/lib/cockpit";
import type { AssetImage } from "./utils";

export interface HomeGallery extends CockpitItemData {
	image: AssetImage;
	alt: string
}

export const loadHomeGallery = async (): Promise<HomeGallery[]> => {
  const res = await cockpit.getItems<HomeGallery>("homeGallery");
  return res;
};
