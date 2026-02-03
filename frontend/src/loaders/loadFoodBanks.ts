import cockpit from "@/lib/cockpit";

export type FoodBank = {
  _id: string;
  name: string;
  address: string;
  hours: string;
  contact?: string;
  description: string;
};

export async function loadFoodBanks(): Promise<FoodBank[]> {
  const data = await cockpit.getItems("food_banks", {
    sort: { name: 1 }
  });
  return data as FoodBank[];
}