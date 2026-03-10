import { useEffect, useState } from "react"

import { loadLatestAnnouncements, type Announcement as AnnouncementType } from "@/loaders/loadAnnouncements"
import { Announcement } from "./Announcement"

import "./AnnouncementStyles.css"

export const AnnouncementList = () => {
	const [announcements, setAnnouncements] = useState<AnnouncementType[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			const res = await loadLatestAnnouncements();
			setAnnouncements(res)
			setLoading(false)
		}
		fetchData()
	}, [])

	if (loading || announcements.length === 0) {
		return null
	}

	return (
		<section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#fbfbfb]">
			<div className="max-w-6xl mx-auto">
				<div className="mb-8 lg:mb-12">
					<h2 className="text-3xl lg:text-4xl font-bold text-(--dark-blue)">
						Latest Updates
					</h2>
				</div>
				<div className="announcements-section">
					{announcements.map((announcement, index) => (
						<Announcement 
							key={announcement._id || index} 
							announcement={announcement} 
						/>
					))}
				</div>
			</div>
		</section>
	)
}
