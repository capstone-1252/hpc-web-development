import { useEffect, useState } from "react"
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
				const calendarEvents = res.map((event) => toCalendarEvent(event))
				setEvents(calendarEvents);
				setLoading(false);
				console.log(events)
			}
		}
		fetchData();
	}, [])

	if(loading){ 
		return (
			<>
				<div className="min-h-screen">
					<div className="flex flex-col items-center justify-center">
						<h2>Loading Events...</h2>
						<Spinner className="size-10" />
					</div>
				</div>
			</>
		)
	}


	return <EventCalendar 
		events={events}
	/>
}
