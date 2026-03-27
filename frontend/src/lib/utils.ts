import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CalendarEvent } from "@/components/event-calendar";
import { eventTypeToColor, type Event } from "@/loaders/loadEvents";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toCalendarEvent = (event: Event): CalendarEvent => {
  const start = new Date(event.date);
  const end = event.endDate
    ? new Date(event.endDate)
    : new Date(start.getTime() + 60 * 60);

  const color = eventTypeToColor(event.type);

  return {
    id: event.slug,
    title: event.title,
    description: event.longDescription,
    start: start,
    color: color,
    type: event.type,
    end: end,
    location: event.location,
  };
};
