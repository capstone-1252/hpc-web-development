import cockpit, { type CockpitItemData } from "@/lib/cockpit";

export interface WeeklyHours extends CockpitItemData {
  open: string;
  close: string;
  day: string;
}

export const loadWeeklyHours = async (): Promise<WeeklyHours[]> => {
  const res = await cockpit.getItems<WeeklyHours>("weeklyhours");
  return res;
};
