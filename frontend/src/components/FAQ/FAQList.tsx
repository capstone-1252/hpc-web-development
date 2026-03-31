import { useEffect, useState } from "react";
import { FAQItem } from "./FAQItem";
import { loadFAQs, type FAQ } from "@/loaders/loadFAQs";
import { ListSkeleton } from "../Skeleton/ListSkeleton";
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

  if (loading)
    return (
      <div className="max-w-[720px] mx-auto px-4 py-12">
        <div className="mb-8 space-y-2">
          <div className="h-8 w-40 rounded-lg bg-slate-100 animate-pulse" />
          <div className="h-4 w-64 rounded-md bg-slate-100 animate-pulse" />
        </div>
        <ListSkeleton className="space-y-3" />
      </div>
    );

  if (faqs.length === 0)
    return (
      <div className="max-w-[720px] mx-auto px-4 py-24 text-center">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-400">
            <circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" />
          </svg>
        </div>
        <p className="text-slate-500 text-sm font-medium">No FAQs available</p>
      </div>
    );

  return (
    <section className="max-w-[720px] mx-auto px-4 py-12">
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-(--dark-blue)">
          Frequently asked questions
        </h2>
        <p className="mt-2 text-slate-500 text-[15px]">
          Can't find what you're looking for?{" "}
          <a href="/contact" className="text-sky-500 hover:text-sky-600 underline underline-offset-2 transition-colors">
            Contact us
          </a>
          .
        </p>
      </div>

      <Accordion type="multiple" className="space-y-0">
        {faqs.map((faq, i) => (
          <FAQItem key={i} faq={faq} index={i} />
        ))}
      </Accordion>
    </section>
  );
}
