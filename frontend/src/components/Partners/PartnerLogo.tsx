import cockpit from "@/lib/cockpit";
import type { Partner } from "@/loaders";
import { useEffect, useState } from "react";

interface PartnerLogoProps {
	partner: Partner;
}
export const PartnerLogo = ({partner}: PartnerLogoProps) => {
	const [logoUrl, setLogoUrl] = useState<string>();

	useEffect(() => {
		const fetchLogo = async () => {
					const logo = await cockpit.getAssetUrl(partner.logo._id, { mode: "fitToHeight", width: 500, quality: 500 })
			setLogoUrl(logo);
		}
		fetchLogo();
	}, [])

	return (
		<div className="px-2">
			<img src={logoUrl} alt="" />
		</div>
	)
}
