import cockpit, { type CockpitItemData, type CockpitOptions } from "@/lib/cockpit"

export interface Announcement extends CockpitItemData {
	title: string
	content: string
	event: any
}

const fetchAssociatedEvent = async (id: string) => {
	const res = await cockpit.getItem("events", id)
	return res
}

const thirtyDaysAgo = Math.floor(Date.now() / 1000) - (30 * 24 * 60 * 60) // 30 days
// testing purposes
// const oneDayAgo = Math.floor(Date.now() / 1000) - 86400;

export const loadLatestAnnouncements = async () => {
	// cockpit uses Mongo Query syntax: ref https://www.mongodb.com/docs/manual/reference/mql/query-predicates/
	// to keep connie from having to constantly manage announcements and keep data sent to client small after time, 
	// only fetch the most recent announcements
	const query = {
		_modified: {
			$gte: thirtyDaysAgo
		}
	}

	const options: CockpitOptions = {
		filter: query
	}

	const res = await cockpit.getItems<Announcement>("announcements", options)
	res.map(async (announcement) => {
		if (announcement.event) {
			announcement.event = await fetchAssociatedEvent(announcement.event._id)
		}
	})
	return res
}
