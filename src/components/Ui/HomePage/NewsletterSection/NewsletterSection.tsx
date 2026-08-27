"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, Send } from "lucide-react";
import { NEWSLETTER_BACKGROUND } from "@/src/utils/data/localImages";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // TODO: no email backend yet — wire this up to a real mailing list
  // provider once one is chosen.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="relative overflow-hidden bg-brand-900  py-16 md:py-20">
      <div className="absolute inset-0 opacity-25">
        <Image
          src={NEWSLETTER_BACKGROUND}
          alt=""
          fill
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-r from-[#6AB3FA]/20 via-[#6AB3FA]/10 to-[#6AB3FA]/10" />
      <div className="absolute inset-0 bg-linear-to-t from-[#6AB3FA]/30 via-transparent to-transparent" />

      <div className="container relative">
        <div className="max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
            Join Our Travel Community
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">
            Get The Best Travel Deals &amp; Inspiration
          </h2>
          <p className="mt-4 text-brand-100/70">
            Join our list for new destinations, seasonal offers, and travel
            tips — no spam, unsubscribe anytime.
          </p>

          {submitted ? (
            <div className="mt-8 flex items-center gap-2 text-brand-100">
              <CheckCircle2 size={18} className="text-brand-300" />
              <span className="text-sm font-medium">
                You&apos;re subscribed — welcome aboard.
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-brand-100/50 focus:border-brand-300 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-600"
              >
                Subscribe
                <Send size={15} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
