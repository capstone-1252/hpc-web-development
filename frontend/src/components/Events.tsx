import { useEffect, useState } from "react"
import { Spinner } from "./ui/spinner";

import { loadEvents, type CalendarEvent } from "@/loaders";
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
				<div className="min-w-screen min-h-screen">
					<div className="min-w-[900px] mx-auto">
						<h2>Loading Events...</h2>
						<Spinner />
					</div>
				</div>
			</>
		)
	}


	return <EventCalendar 
		events={events}
	/>
}
