import cockpit, { type CockpitItemData } from "@/lib/cockpit";

export interface FoodBank extends CockpitItemData {
  name: string;
  phone?: string;
  email?: string;
  link?: string;
  address?: string;
  hours?: string;
  appointmentOnly: boolean;
}

export async function loadFoodBanks(): Promise<FoodBank[]> {
  const data = await cockpit.getItems("foodbanks", {
    sort: { name: 1 }, // sorts alphanumerically
  });

  return data as FoodBank[];
}
