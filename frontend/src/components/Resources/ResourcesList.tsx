import { loadResources, type Resource } from "@/loaders/loadResources";
import { ResourceSection } from "./ResourceSection";
import { ResourcesSkeleton } from "@/components/Skeleton/ResourcesSkeleton";
import { useEffect, useState } from "react";

export function ResourcesList() {
	const [resources, setResources] = useState<Resource[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const data = await loadResources();
			setResources(data);
			setLoading(false);
		};

		fetchData();
	}, []);

	if (loading) {
		return <ResourcesSkeleton />;
	}

	if (resources.length === 0) {
		return <p>No resources available.</p>;
	}

	const categories = [...new Set(resources.map(r => r.category))];

	const groupedResources = categories.reduce((acc, category) => {
		acc[category] = resources.filter(r => r.category === category);
		return acc;
	}, {} as Record<string, Resource[]>); 

	return (
		<div className="space-y-0">
			{categories.map((category) => (
				<ResourceSection 
					key={category}
					title={category}
					resources={groupedResources[category]}
				/>
			))}
		</div>
	);
}
