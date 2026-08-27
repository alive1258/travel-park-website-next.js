interface SkeletonProps {
  className?: string;
}

/** Base shimmer block. Callers must supply a `bg-*` color class — kept out
 * of the default so it never collides with an override at the call site. */
const Skeleton = ({ className = "" }: SkeletonProps) => (
  <div className={`animate-pulse rounded-md ${className}`} aria-hidden="true" />
);

export default Skeleton;
