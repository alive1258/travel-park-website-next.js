export interface BlogSection {
  heading?: string;
  body?: string;
  bullets?: { title?: string; text: string }[];
}

export interface LocalBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  readTime: string;
  date: string;
  image: string;
  sections: BlogSection[];
}

export const BLOG_POSTS: LocalBlogPost[] = [
  {
    id: "b1",
    slug: "10-essential-things-to-pack-for-every-trip",
    title: "10 Essential Things to Pack for Every Trip",
    excerpt:
      "The packing list we hand every traveler, refined over hundreds of tours across every climate we cover.",
    category: "Travel Tips",
    author: "Travelpark Team",
    readTime: "5 min read",
    date: "2026-05-15",
    image: "/images/traveler-woman-suitcase-beach.jpg",
    sections: [
      {
        heading: "Start with the basics",
        body: "A great trip starts long before you leave the house. The travelers who arrive calm and ready are almost always the ones who packed with a system, not a last-minute scramble. A few universal essentials belong in every bag, no matter the destination.",
        bullets: [
          { title: "Documents", text: "Passport, printed confirmations, and a photo backup saved to your phone." },
          { title: "Adapters & power", text: "A universal adapter and a portable charger for long travel days." },
          { title: "Layers", text: "Even beach destinations get cool evenings — pack one warm layer." },
        ],
      },
      {
        heading: "What experienced travelers never skip",
        body: "Beyond the obvious, a few smaller items make the biggest difference once you're actually on the ground — a reusable water bottle, a compact daypack for excursions, and copies of every reservation saved offline in case signal drops.",
      },
    ],
  },
  {
    id: "b2",
    slug: "exploring-railay-beach-thailand",
    title: "Exploring Railay Beach: A Thailand Island Guide",
    excerpt:
      "No roads lead to Railay — only longtail boats. Here's how to make the most of Thailand's most dramatic beach.",
    category: "Destination Guide",
    author: "Travelpark Team",
    readTime: "6 min read",
    date: "2026-05-28",
    image: "/images/thailand-railay-beach-aerial-sunset.jpg",
    sections: [
      {
        heading: "Getting there",
        body: "Railay sits on a peninsula cut off from the mainland by limestone cliffs, so every visitor arrives the same way — by longtail boat from Ao Nang or Krabi Town. The ride takes about 15 minutes and is part of the experience.",
      },
      {
        heading: "What not to miss",
        bullets: [
          { title: "Phra Nang Cave Beach", text: "The most photographed stretch of sand on the peninsula, best at sunrise." },
          { title: "The viewpoint climb", text: "A short, sweaty scramble up to a lookout over both of Railay's bays." },
          { title: "Deep water soloing", text: "Rock climbers scale the cliffs and drop straight into the sea." },
        ],
      },
    ],
  },
  {
    id: "b3",
    slug: "why-traveling-solo-can-change-your-life",
    title: "Why Traveling Solo Can Change Your Life",
    excerpt:
      "Some of the best trips we plan are for one. Here's what solo travelers tell us they discover along the way.",
    category: "Lifestyle",
    author: "Travelpark Team",
    readTime: "4 min read",
    date: "2026-06-10",
    image: "/images/hiker-overlook-turquoise-bay.jpg",
    sections: [
      {
        heading: "You make every decision",
        body: "There's no group vote on solo trips. You decide when to linger over breakfast, when to change plans on a whim, and when to talk to the stranger at the next table. That freedom is exactly why so many travelers come back to it.",
      },
      {
        heading: "Getting started",
        body: "If it's your first solo trip, pick a destination with an easy rhythm — a well-connected city or a small island where it's easy to meet other travelers. Build in a few structured tours to break up the unstructured days.",
      },
    ],
  },
  {
    id: "b4",
    slug: "weekend-guide-lake-como-italy",
    title: "A Weekend Guide to Lake Como, Italy",
    excerpt:
      "Two days, three towns, and a lot of ferry rides — how to see the best of Lake Como without rushing.",
    category: "Destination Guide",
    author: "Travelpark Team",
    readTime: "5 min read",
    date: "2026-06-22",
    image: "/images/lake-como-varenna-flowers.jpg",
    sections: [
      {
        heading: "Base yourself in Varenna",
        body: "Varenna is smaller and quieter than Como's bigger towns, with direct ferries to Bellagio and Menaggio in under 20 minutes. It's the easiest base for a weekend without a car.",
      },
      {
        heading: "How to spend two days",
        bullets: [
          { title: "Day one", text: "Wander Varenna's lakefront promenade, then ferry to Bellagio for lunch." },
          { title: "Day two", text: "Take the funicular up to Castello di Vezio for the best lake views, then ferry back for a slow afternoon." },
        ],
      },
    ],
  },
  {
    id: "b5",
    slug: "trekking-everest-base-camp",
    title: "Trekking to Everest Base Camp: What to Know",
    excerpt:
      "Twelve days, one mountain, and everything we tell first-time trekkers before they fly into Lukla.",
    category: "Adventure",
    author: "Travelpark Team",
    readTime: "7 min read",
    date: "2026-07-05",
    image: "/images/nepal-everest-base-camp-trekker.jpg",
    sections: [
      {
        heading: "How hard is it, really?",
        body: "You don't need mountaineering experience — this is a trek, not a climb. What you do need is time to acclimatize. Most itineraries build in rest days around 3,500m and 4,200m, and skipping them is the most common reason trekkers turn back.",
      },
      {
        heading: "Packing for altitude",
        bullets: [
          { title: "Layers over bulk", text: "Temperatures swing 20+ degrees between valley and summit days." },
          { title: "Broken-in boots", text: "Never trek in boots you haven't already walked 30+ miles in." },
          { title: "A water filter", text: "Bottled water isn't reliably available above the lower villages." },
        ],
      },
    ],
  },
  {
    id: "b6",
    slug: "driving-great-ocean-road-australia",
    title: "Driving the Great Ocean Road: Australia's Best Road Trip",
    excerpt:
      "Three days, 240 kilometers, and some of the most dramatic coastline in the world.",
    category: "Road Trip",
    author: "Travelpark Team",
    readTime: "6 min read",
    date: "2026-07-19",
    image: "/images/great-ocean-road-australia.jpg",
    sections: [
      {
        heading: "How long do you actually need?",
        body: "You can drive the whole road in a single long day, but three days lets you actually stop — at the surf towns, the rainforest walks, and the limestone stacks the road is famous for.",
      },
      {
        heading: "The stops worth the detour",
        bullets: [
          { title: "Twelve Apostles", text: "Go at sunrise to see the limestone stacks without the tour bus crowds." },
          { title: "Otway rainforest", text: "A short detour inland for treetop walks and glow-worm caves." },
          { title: "Loch Ard Gorge", text: "A quieter, equally dramatic alternative just past the Apostles." },
        ],
      },
    ],
  },
];
