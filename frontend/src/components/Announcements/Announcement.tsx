import type { Announcement as AnnouncementFields } from "@/loaders/loadAnnouncements"

interface AnnouncementProps {
	announcement: AnnouncementFields
}
export const Announcement = ({ announcement }: AnnouncementProps) => {
	return (
		<div>
			{ announcement.content }
		</div>
	)
}
