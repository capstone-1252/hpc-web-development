import { loadServiceInfo, type ServiceInfo, getImageUrl } from "@/loaders/loadServices";
import { useEffect, useState } from "react";
import { CardSkeleton } from "../Skeleton";

interface ServiceCardProps {
	service: ServiceInfo;
}

function ServiceCard({ service }: ServiceCardProps) {
	const imageUrl = service.image ? getImageUrl(service.image) : "";
	console.log(imageUrl);

	return (
		<div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
			{service.image && (
				<div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
					<img 
						src={imageUrl} 
						alt={service.image.alt || service.name}
						className="w-full h-full object-cover"
					/>
				</div>
			)}
			<div className="flex items-start gap-4">
				<div className="flex-shrink-0">
					{service.icon ? (
						<img src={service.icon} alt="" className="w-6 h-6" />
					) : (
							<svg className="w-6 h-6 text-[#e25002]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						)}
				</div>
				<div className="flex-1">
					<h3 className="text-lg font-bold text-[#485a61] mb-3">{service.name}</h3>
					<p className="text-[#485a61] opacity-80 text-sm mb-4">{service.description}</p>
					<a href="/services/apply" className="text-[#e25002] font-semibold hover:text-[#c44301] transition-colors text-sm inline-flex items-center">
						Learn more
						<svg className="ml-2 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
						</svg>
					</a>
				</div>
			</div>
		</div>
	);
}

export function ServicesList() {
	const [services, setServices] = useState<ServiceInfo[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await loadServiceInfo();
				setServices(data);
			} catch (error) {
				console.error("Failed to load services:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	if (loading) {
		return(
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
				<CardSkeleton lines={2} />
				<CardSkeleton lines={3} />
				<CardSkeleton lines={2} showImage={true} />
				<CardSkeleton lines={2} />
			</div>
		) 
	}

	if (services.length === 0) {
		return <p>No services available.</p>;
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
			{services.map((service) => (
				<ServiceCard key={service._id} service={service} />
			))}
		</div>
	);
}
