import cockpit from "@/lib/cockpit";

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