import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CtaBannerProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

const CtaBanner = ({
  title,
  description,
  buttonText,
  buttonHref,
}: CtaBannerProps) => {
  return (
    <section className="bg-brand-900 py-16 md:py-20">
      <div className="container flex flex-col items-center text-center gap-5">
        <h2 className="max-w-xl text-3xl sm:text-4xl font-bold text-white">
          {title}
        </h2>
        <p className="max-w-lg text-brand-100/80">{description}</p>
        <Link
          href={buttonHref}
          className="inline-flex items-center gap-2 rounded-lg bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-600"
        >
          {buttonText}
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
};

export default CtaBanner;
