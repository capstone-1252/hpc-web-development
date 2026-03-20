import { loadPartners, type Partner } from "@/loaders/loadPartners";
import { useEffect, useState } from "react";

import { PartnerLogo } from "./PartnerLogo";
import { CardSkeleton } from "../Skeleton/CardSkeleton";

export const PartnerList = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await loadPartners();
      setPartners(res);
      setLoading(false);
    };
    fetchData();
  }, []);

	if (loading) {
		return (
			<section className="py-16">
				<div className="mb-10 px-4">
					<p className="text-sm uppercase tracking-wide mb-2 ">
						Our Partners
					</p>
					<h2 className="text-2xl md:text-3xl font-semibold text-(--dark-blue)">
						Trusted by organizations in our community
					</h2>
				</div>
				<div className="grid grid-cols-2 md:grid-cols-3 justify-center gap-6 max-w-4xl mx-auto px-4">
					{Array.from({ length: 6 }).map((_, i) => (
						<CardSkeleton key={i} lines={0} showImage />
					))}
				</div>
			</section>
		);
	}

	return (
		<section className="py-16">
			<div className="mb-10 max-w-6xl mx-auto">
				<p className="text-sm uppercase font-bold tracking-wide text-primary mb-2">
					Our Partners
				</p>
				<h2 className="text-2xl md:text-3xl font-semibold text-(--dark-blue)">
					Trusted by organizations in our community
				</h2>
			</div>

      {/* Flex-wrap layout */}
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-10 px-4">
        {partners.map((partner) => (
          <div
            key={partner._id}
            className="flex opacity-60 hover:opacity-100 transition"
          >
            <PartnerLogo partner={partner} />
          </div>
        ))}
      </div>
    </section>
  );
};
