// src/components/FAQ/FAQItem.tsx

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type FAQItemProps = { question: string; answer: string };

export function FAQItem({ question, answer }: FAQItemProps) {
	return (
		<AccordionItem value={question}>
			<AccordionTrigger>{ question }</AccordionTrigger>
			<AccordionContent>{ answer }</AccordionContent>
		</AccordionItem>
	);
}

