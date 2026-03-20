import cockpit from "@/lib/cockpit";
import type { Partner } from "@/loaders/loadPartners";
import { getImageUrl } from "@/loaders/utils";
import { useEffect, useState } from "react";

interface PartnerLogoProps {
  partner: Partner;
}

export const PartnerLogo = ({ partner }: PartnerLogoProps) => {
  const [logoUrl, setLogoUrl] = useState<string>();
  const partnerLink = partner.link || "#partners";

  useEffect(() => {
    const fetchData = async () => {
      const logo = await cockpit.getAssetUrl(partner.logo._id, {
        quality: 80,
        height: 80,
        mode: "fitToHeight",
      });
      setLogoUrl(logo);
    };
    fetchData();
  }, [partner.logo]);

  return (
    <div className="flex items-center justify-center px-2">
      {logoUrl && (
        <a
          href={partnerLink}
          target={partnerLink != "#partners" ? "_blank" : ""}
        >
          <img
            src={logoUrl}
            alt={partner.name}
            className="max-h-12 md:max-h-16 w-auto object-contain grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition"
          />
        </a>
      )}
    </div>
  );
};
