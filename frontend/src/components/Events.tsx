import { loadEvents, type CalendarEvent } from "@/loaders";
import { useEffect, useState } from "react"
import { EventCalendar } from "./event-calendar";
import { toCalendarEvent } from "@/lib/utils";

export const Events = () => {
	const [events, setEvents] = useState<CalendarEvent[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			const res = await loadEvents();
			if (res) {
				const calendarEvents = res.map((event) => toCalendarEvent(event))
				setEvents(calendarEvents);
				setLoading(false);
				console.log(events)
			}
		}
		fetchData();
	}, [])

	if(loading){ return }

	return <EventCalendar 
		events={events}
	/>
}
