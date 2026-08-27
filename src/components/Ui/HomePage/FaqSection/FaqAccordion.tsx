"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { QuestionAnswer } from "@/src/redux/api/questionAnswerApi";

const FaqAccordion = ({ faqs }: { faqs: QuestionAnswer[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-brand-900/10 rounded-2xl border border-brand-900/10">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={faq.id}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-semibold text-brand-900">
                {faq.question}
              </span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-brand-600 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && faq.answer && (
              <p className="px-6 pb-5 text-sm text-brand-900/70 leading-relaxed">
                {faq.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FaqAccordion;
