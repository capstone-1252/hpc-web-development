import cockpit, { type CockpitItemData } from "@/lib/cockpit";
import type { AssetImage } from "./utils";

export interface Service extends CockpitItemData {
  _id: string;
  name: string;
  description: string;
  icon?: string;
  image?: AssetImage;
  details?: string[];
};

export async function loadServiceInfo(): Promise<Service[]> {
  const data = await cockpit.getItems<Service>("services", {
    sort: { title: 1 }
  });
  return data;
}

export type EligibilityInfo = {
  _id: string;
  title: string;
  content: string;
  income_cutoffs: {
    one_person: number;
    two_people: number;
    three_people: number;
    four_people: number;
  };
};

export async function loadEligibilityInfo(): Promise<EligibilityInfo | null> {
  try {
    const data = await cockpit.getSingleton("eligibility_info");
    return data as EligibilityInfo;
  } catch {
    return null;
  }
}
