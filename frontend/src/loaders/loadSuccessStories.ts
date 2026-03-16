import cockpit, { type CockpitItemData } from "@/lib/cockpit";
import type { AssetImage } from "./utils";

export interface SuccessStory extends CockpitItemData {
    image?: AssetImage;
    description: string;
};

export async function loadSuccessStories(): Promise<SuccessStory[]> {
  const data = await cockpit.getItems("successStories");
  return data as SuccessStory[];
}
