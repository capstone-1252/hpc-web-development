import cockpit, { type CockpitItemData } from "@/lib/cockpit"

export interface Partner extends CockpitItemData {
	name: string
	logo: any
}

export const loadPartners = async () => {
	const res = await cockpit.getItems("partners");

	return res as Partner[];
}

