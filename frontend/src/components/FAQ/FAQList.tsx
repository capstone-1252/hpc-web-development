// src/components/FAQ/FAQList.tsx
import { useEffect, useState } from "react";
import { FAQItem } from "./FAQItem";
import { loadFAQs, type FAQ } from "@/loaders/loadFAQs";

import { Accordion } from "@radix-ui/react-accordion";

export function FAQList() {
	const [faqs, setFaqs] = useState<FAQ[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const data = await loadFAQs();
			setFaqs(data);
			setLoading(false);
		};
		fetchData();
	}, []);

	if (loading) return <p>Loading FAQs…</p>;
	if (faqs.length === 0) return <p>No FAQs available.</p>;

	return (
		<>
			<Accordion type="multiple" className="max-w-[900px] mx-auto">
				{faqs.map((faq, i) => (
					<FAQItem key={i} question={faq.question} answer={faq.answer} />
				))}
			</Accordion>
		</>
	);
}

