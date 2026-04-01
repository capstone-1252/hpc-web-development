import cockpit, { type CockpitItemData } from "@/lib/cockpit"
import type { AssetImage } from "./utils";

export interface SocialLink extends CockpitItemData {
	name: string;
	url: string;
	logo: AssetImage;
}

export const loadSocialLinks = async (): Promise<SocialLink[]> => {
	const data = await cockpit.getItems<SocialLink>("socialLinks")
	return data
}
