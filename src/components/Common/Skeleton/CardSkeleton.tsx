import Skeleton from "./Skeleton";

interface CardSkeletonProps {
  aspect?: string;
  bordered?: boolean;
  lines?: number;
}

/** Generic image + title + description-lines card, for grids of
 * destinations, experiences, and similar simple content cards. */
const CardSkeleton = ({
  aspect = "aspect-4/3",
  bordered = false,
  lines = 1,
}: CardSkeletonProps) => (
  <div
    className={`overflow-hidden rounded-2xl bg-white shadow-sm ${
      bordered ? "border border-brand-900/10" : ""
    }`}
  >
    <Skeleton className={`${aspect} w-full rounded-none bg-brand-900/10`} />
    <div className="p-5 sm:p-6">
      <Skeleton className="h-4 w-2/3 bg-brand-900/10" />
      <div className="mt-2 space-y-1.5">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton key={i} className="h-3 w-full bg-brand-900/10" />
        ))}
      </div>
    </div>
  </div>
);

export default CardSkeleton;
