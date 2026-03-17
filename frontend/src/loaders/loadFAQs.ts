import cockpit, { type CockpitItemData } from "@/lib/cockpit";

export interface FAQ extends CockpitItemData {
  question: string;
  answer: string;
}

export async function loadFAQs(): Promise<FAQ[]> {
  const data = await cockpit.getItems("faq");
  return data as FAQ[];
}
