import cockpit from "@/lib/cockpit";

export interface CockpitImage {
  path: string;
  title?: string;
  alt?: string;
  width?: number;
  height?: number;
  meta?: Record<string, any>;
}

export type Event = {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: string;
  type: "upcoming" | "past";
  featured?: boolean;
  image?: CockpitImage;
};

export async function loadEvents(type?: "upcoming" | "past"): Promise<Event[]> {
  const filter = type ? { type } : {};
  const data = await cockpit.getItems("events", { 
    filter,
    sort: { date: -1 }
  });
  return data as Event[];
}

export async function loadEvent(id: string): Promise<Event | null> {
  try {
    const data = await cockpit.getItem("events", id);
    return data as Event;
  } catch {
    return null;
  }
}

export function getImageUrl(image: CockpitImage | undefined): string {
  if (!image?.path) return "";
  
  const baseURL = import.meta.env.PUBLIC_COCKPIT_API;
  return `${baseURL}${image.path}`;
}