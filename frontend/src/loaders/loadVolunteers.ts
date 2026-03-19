import cockpit, { type CockpitItemData } from "@/lib/cockpit";
import type { AssetImage } from "./utils";

export interface Volunteer extends CockpitItemData {
	name: string;
	role: string;
	photo: AssetImage;
	link: string[];
};

export async function loadVolunteers(): Promise<Volunteer[]> {
	const data = await cockpit.getItems("volunteers");
	return data as Volunteer[];
}
