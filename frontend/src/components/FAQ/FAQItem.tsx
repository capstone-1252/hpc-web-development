import { Accordion } from "@radix-ui/react-accordion";
import { type FAQ, getImageUrl } from "@/loaders/loadFAQs";

interface FAQItemProps {
  faq: FAQ;
}

export function FAQItem({ faq }: FAQItemProps) {
  const imageUrl = faq.image ? getImageUrl(faq.image) : "";

  return (
    <Accordion.Item value={faq.question} className="border-b">
      <Accordion.Trigger className="flex items-center justify-between w-full text-left font-semibold bg-transparent hover:bg-gray-100 transition-colors">
        <span className="text-base lg:text-lg">{faq.question}</span>
        <svg className="flex-shrink-0 h-5 w-5 text-[#19b8d7]">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9 4l-4 4.474l-4.474 0 2-1.658 1.658a1.658 2 1.495 2.115-.464.464 0h.9 8-2h-474L19 4.695a.658 2.15c0 0 0122 0 0z" />
        </svg>
      </Accordion.Trigger>
      </Accordion.Content>
      <div className="px-2 pt-4 text-base text-[#485a61] opacity-80 pb-4">
        {faq.image && (
          <div className="mb-4">
            <img 
              src={imageUrl} 
              alt={faq.image.alt || faq.question}
              className="w-full h-64 rounded-lg object-cover"
            />
          </div>
        )}
        {faq.answer}
      </Accordion.Content>
    </Accordion.Item>
  );
}

