import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import PageHero from "@/src/components/Shared/PageHero/PageHero";
import CtaBanner from "@/src/components/Shared/Sections/CtaBanner";
import { BLOG_POSTS } from "@/src/utils/data/blogPosts";
import { PAGE_HERO_IMAGES } from "@/src/utils/data/localImages";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Travel insights and stories — destination guides, tour planning tips, and inspiration for your next trip.",
};

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Travel Insights & Stories"
        subtitle="Destination guides, tour planning tips, and inspiration for your next trip."
        image={PAGE_HERO_IMAGES.blog}
        alt="Scenic travel destination"
      />

      <section className="bg-white py-16 md:py-24">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((article) => (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className="group overflow-hidden rounded-2xl border border-brand-900/10 bg-white shadow-sm transition hover:shadow-lg"
              >
                <div className="relative aspect-16/10 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-900 backdrop-blur-sm">
                    {article.category}
                  </span>
                </div>
                <div className="p-6">
                  <span className="flex items-center gap-1.5 text-xs text-brand-900/50">
                    <CalendarDays size={13} />
                    {formatDate(article.date)}
                  </span>
                  <h3 className="mt-2 font-bold text-brand-900 leading-snug transition-colors group-hover:text-brand-600">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-sm text-brand-900/60 leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition group-hover:text-brand-900">
                    View Details
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Ready to See It for Yourself?"
        description="Browse our tours and find the trip that fits your next adventure."
        buttonText="Browse Tours"
        buttonHref="/tours"
      />
    </>
  );
}
