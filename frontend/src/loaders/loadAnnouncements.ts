import cockpit, { type CockpitItemData } from "@/lib/cockpit"

export interface Announcement extends CockpitItemData {
	title: string
	content: string
	event: any
}

const fetchAssociatedEvent = async (id: string) => {
	const res = await cockpit.getItem("events", id)
	return res
}

export const loadAnnouncements = async () => {
	const res = await cockpit.getItems<Announcement>("announcements")
	res.map(async (announcement) => {
		if (announcement.event) {
			announcement.event = await fetchAssociatedEvent(announcement.event._id)
		}
	})
	return res
}
