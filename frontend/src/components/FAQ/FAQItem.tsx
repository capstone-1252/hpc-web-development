import {
  AccordionContent,
  AccordionTrigger,
  AccordionItem,
} from "../ui/accordion";
import { type FAQ } from "@/loaders/loadFAQs";

interface FAQItemProps {
  faq: FAQ;
  index: number;
}

export function FAQItem({ faq, index }: FAQItemProps) {
  return (
    <AccordionItem
      value={faq.question}
      className="faq-item group border-0 mb-3 rounded-xl overflow-hidden"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <AccordionTrigger className="faq-trigger w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-medium bg-white hover:bg-slate-50 transition-all duration-200 border border-slate-200 rounded-xl data-[state=open]:rounded-b-none data-[state=open]:border-b-0 data-[state=open]:bg-slate-50 [&>svg]:hidden">
        <span className="flex items-center gap-4">
          <span className="faq-index flex-shrink-0 w-7 h-7 rounded-full bg-[#0C5E6E] text-white text-xs font-bold flex items-center justify-center group-hover:bg-sky-100 group-hover:text-sky-600 transition-colors duration-200">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-[#0C5E6E] text-[15px] leading-snug">
            {faq.question}
          </span>
        </span>
        <span className="faq-chevron flex-shrink-0 w-8 h-8 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 transition-all duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:border-sky-200 group-data-[state=open]:text-sky-500 group-data-[state=open]:bg-sky-50">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 5l5 5 5-5" />
          </svg>
        </span>
      </AccordionTrigger>
      <AccordionContent className="faq-content overflow-hidden bg-white border border-slate-200 border-t-0 rounded-b-xl px-6 pb-5 text-slate-600 text-[14.5px] leading-relaxed pt-0">
        <div className="pt-4 border-t border-slate-100">{faq.answer}</div>
      </AccordionContent>
    </AccordionItem>
  );
}
