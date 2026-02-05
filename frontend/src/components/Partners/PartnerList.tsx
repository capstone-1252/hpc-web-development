import { loadPartners, type Partner } from "@/loaders";
import { useEffect, useState } from "react";

import { PartnerLogo } from "./PartnerLogo";
import { CardSkeleton } from "../Skeleton/Card";

export const PartnerList = () => {
	const [partners, setPartners] = useState<Partner[]>([])
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchData = async () =>  {
			const res = await loadPartners();
			setPartners(res);
			setLoading(false);
		}
		fetchData();
	}, [])

	if(loading) {
		return (
			<div className="grid grid-cols-4 max-w-lg mx-auto gap-2 max-h-[100px]">
				<CardSkeleton lines={0} showImage />
				<CardSkeleton lines={0} showImage />
				<CardSkeleton lines={0} showImage />
				<CardSkeleton lines={0} showImage />
			</div>
		)
	}

	return (
		<>
			<style>{`
.marquee-inner {
animation: marqueeScroll linear infinite;
}

@keyframes marqueeScroll {
0% {
transform: translateX(0%);
}

100% {
transform: translateX(-50%);
}
}
`}</style>
			<div className="overflow-hidden w-full relative max-w-5xl mx-auto select-none">
				<div className="absolute left-0 top-0 h-full z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
				<div className="marquee-inner flex will-change-transform min-w-[200%]" style={{ animationDuration: "15s" }}>
					<div className="flex">
						{[...partners, ...partners].map((partner, idx) => (
							<PartnerLogo partner={partner} key={idx} />
						))}
					</div>
				</div>
				<div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
			</div>
		</>
	)

}
