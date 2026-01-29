import cockpit from "@/lib/cockpit";

export type FAQ = { question: string; answer: string };

export async function loadFAQs(): Promise<FAQ[]> {
	const data = await cockpit.getItems("faq")
	return data as FAQ[]
}
