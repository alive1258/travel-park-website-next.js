import Skeleton from "./Skeleton";

/** Matches the yacht card markup shared by FeaturedYachtsSection and
 * FleetGrid: image, title, two spec chips, and a price row. */
const YachtCardSkeleton = () => (
  <div className="overflow-hidden rounded-2xl border border-brand-900/10 bg-white shadow-sm">
    <Skeleton className="aspect-4/3 w-full rounded-none bg-brand-900/10" />
    <div className="p-6">
      <Skeleton className="h-5 w-3/4 bg-brand-900/10" />
      <div className="mt-3 flex items-center gap-4">
        <Skeleton className="h-3 w-14 bg-brand-900/10" />
        <Skeleton className="h-3 w-14 bg-brand-900/10" />
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-brand-900/10 pt-4">
        <Skeleton className="h-4 w-20 bg-brand-900/10" />
        <Skeleton className="h-4 w-24 bg-brand-900/10" />
      </div>
    </div>
  </div>
);

export default YachtCardSkeleton;
