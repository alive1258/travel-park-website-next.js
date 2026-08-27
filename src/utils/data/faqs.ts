export interface LocalFaq {
  id: string;
  question: string;
  answer: string;
  is_active: true;
  created_at: string;
  updated_at: string;
}

export const SITE_FAQS: LocalFaq[] = [
  {
    id: "f1",
    question: "How do I book a tour, hotel, or transportation?",
    answer:
      "Search from the homepage or browse a category directly, pick what fits your dates and group size, then reach out through the contact page and our team will confirm availability and pricing.",
    is_active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "f2",
    question: "Can I customize an itinerary?",
    answer:
      "Yes — most tours can be adjusted for dates, group size, or add-ons like private transfers and hotel upgrades. Mention what you have in mind when you inquire.",
    is_active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "f3",
    question: "What's included in the tour price?",
    answer:
      "Each listing notes what's covered — typically guiding, permits, and core transport. Flights, meals, and optional add-ons are called out separately so there are no surprises.",
    is_active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "f4",
    question: "Is my payment secure?",
    answer:
      "Yes, every booking is processed through an encrypted, secure payment flow, and you'll receive confirmation immediately after checkout.",
    is_active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "f5",
    question: "Can I cancel or reschedule?",
    answer:
      "Cancellation and rescheduling terms vary by listing and are shown before you confirm. Contact our team as early as possible if your plans change.",
    is_active: true,
    created_at: "",
    updated_at: "",
  },
];
