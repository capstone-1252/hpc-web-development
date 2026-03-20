import cockpit, { type CockpitItemData } from "@/lib/cockpit";
import type { AssetImage } from "./utils";

export interface Partner extends CockpitItemData {
  name: string;
  link: string;
  logo: AssetImage;
}

export const loadPartners = async () => {
  const res = await cockpit.getItems("partners");

  return res as Partner[];
};
