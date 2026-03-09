import { useEffect, useState } from "react"

import { loadAnnouncements, type Announcement as AnnouncementType } from "@/loaders/loadAnnouncements"
import { Announcement } from "./Announcement"

export const AnnouncementList = () => {
	const [announcements, setAnnouncements] = useState<AnnouncementType[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	useEffect(() => {
		const fetchData = async () => {
			const res = await loadAnnouncements();
			setAnnouncements(res)
			setLoading(false)
		}
		fetchData()
	}, [])

	if(loading) {
		return <p>Loading announcements</p>
	}

	return (
	<>
			{announcements.map(announcement => <Announcement announcement={announcement} />)}
	</>
	)
}
