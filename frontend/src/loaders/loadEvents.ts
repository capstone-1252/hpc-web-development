import cockpit, { type CockpitItemData } from "@/lib/cockpit";

type EventType = "Fundraiser" | "Seminar" | "Meetup" | "Other";

export interface Event extends CockpitItemData {
  title: string;
  slug: string;
  longDescription: string;
  date: string;
  endDate?: string;
  location: string;
  type?: EventType;
}
type EventColor = "sky" | "amber" | "violet" | "rose" | "emerald" | "orange";

export type CalendarEvent = {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  color?: EventColor;
  location?: string;
};

export const loadEvents = async (): Promise<Event[]> => {
  const events = await cockpit.getItems("events");
  return events;
};
