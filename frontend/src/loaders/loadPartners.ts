import cockpit from "@/lib/cockpit"

export interface Partner {
	name: string
	logo: any
}

export const loadPartners = async () => {
	const res = await cockpit.getItems("partners");

	return res as Partner[];
}

