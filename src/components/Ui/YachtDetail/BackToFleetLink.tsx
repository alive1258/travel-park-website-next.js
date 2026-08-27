import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const BackToFleetLink = () => (
  <Link
    href="/yachts"
    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900 transition"
  >
    <ArrowLeft size={14} />
    Back to Fleet
  </Link>
);

export default BackToFleetLink;
