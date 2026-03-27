import { useEffect, useState } from "react";
import { Spinner } from "./ui/spinner";

import { loadEvents, type CalendarEvent } from "@/loaders/loadEvents";
import { EventCalendar } from "./event-calendar";
import { toCalendarEvent } from "@/lib/utils";

export const Events = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await loadEvents();
      if (res) {
        const calendarEvents = res.map((event) => toCalendarEvent(event));
        setEvents(calendarEvents);
        setLoading(false);
        console.log(events);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[400px] md:min-h-[600px] flex flex-col items-center justify-center rounded-md border bg-card">
        <Spinner className="size-10 mb-4" />
        <p className="text-muted-foreground">Loading events...</p>
      </div>
    );
  }

  return <EventCalendar events={events} />;
};
