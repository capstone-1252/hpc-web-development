import cockpit, { type CockpitItemData } from "@/lib/cockpit";

export interface Resource extends CockpitItemData {
  name: string;
}

export async function loadResources(): Promise<Resource[]> {
  const data = await cockpit.getItems("Resources");
  return data;
}
