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

const colorMap: Record<EventType, EventColor> = {
  Fundraiser: "emerald",
  Seminar: "sky",
  Meetup: "violet",
  Other: "orange",
};

export const eventTypeToColor = (type?: EventType): EventColor => {
  if (!type) return "sky";

  return colorMap[type];
};

/** This is the type that has to be passed into the event calendar to properly render */
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
