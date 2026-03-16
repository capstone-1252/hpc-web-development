import { loadServiceInfo, type Service} from "@/loaders/loadServices";
import { useEffect, useState } from "react";
import { CardSkeleton } from "../Skeleton/CardSkeleton";

interface ServiceCardProps {
	service: Service;
}

function ServiceCard({ service }: ServiceCardProps) {
	return (
		<div className="bg-(--muted-blue) p-2 rounded-lg">
			<h3 className="text-md font-bold text-(--dark-blue) text-center">{service.name}</h3>
		</div>
	);
}

export function ServicesList() {
	const [services, setServices] = useState<Service[]>([]);
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
				<CardSkeleton lines={1} className="bg-(--muted-blue)" />
				<CardSkeleton lines={1} className="bg-(--muted-blue)" />
				<CardSkeleton lines={1} className="bg-(--muted-blue)" />
				<CardSkeleton lines={1} className="bg-(--muted-blue)" />
				<CardSkeleton lines={1} className="bg-(--muted-blue)" />
				<CardSkeleton lines={1} className="bg-(--muted-blue)" />
				<CardSkeleton lines={1} className="bg-(--muted-blue)" />
				<CardSkeleton lines={1} className="bg-(--muted-blue)" />
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
