import { loadResources } from "@/loaders/loadResources";
import { useEffect, useState } from "react";

interface ResourceCardProps {
	resource: any;
}

export function ResourcesList() {
	const [resources, setResources] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await loadResources();
				setResources(data);
			} catch (error) {
				console.error("Failed to load resources:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	if (loading) {
		return <p className="max-w-sm mx-auto">Loading resources...</p>;
	}

	if (resources.length === 0) {
		return <p>No resources available.</p>;
	}

	return (
		<div className="space-y-12">
			{ resources.map((resource) => {
				return (
					<>
						{ resource["Animal Care"] }
					</>
				)
			}) }
		</div>
	);
}
