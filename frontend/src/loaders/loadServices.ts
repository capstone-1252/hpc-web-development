import cockpit, { type CockpitItemData } from "@/lib/cockpit";

export interface Service extends CockpitItemData {
  name: string;
  description: string;
}

export async function loadServiceInfo(): Promise<Service[]> {
  const data = await cockpit.getItems<Service>("services", {
    sort: { title: 1 },
  });
  return data;
}
