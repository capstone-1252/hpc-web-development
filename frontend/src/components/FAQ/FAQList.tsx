import { useEffect, useState } from "react";
import { FAQItem } from "./FAQItem";
import { loadFAQs, type FAQ } from "@/loaders/loadFAQs";
import { ListSkeleton } from "../Skeleton";

import { Accordion } from "@radix-ui/react-accordion";

export function FAQList() {
	const [faqs, setFaqs] = useState<FAQ[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			console.log("Fetching Data")
			const data = await loadFAQs();
			setFaqs(data);
			setLoading(false);
		};
		fetchData();
		console.log("Data, fetched")
	}, []);

	if (loading) return (
		<ListSkeleton className="p-2"  />
	)
	if (faqs.length === 0) return <p>No FAQs available.</p>;

	return (
		<>
			<Accordion type="multiple" className="max-w-[900px] mx-auto">
				{faqs.map((faq, i) => (
					<FAQItem key={i} faq={faq}/>
				))}
			</Accordion>
		</>
	);
}

