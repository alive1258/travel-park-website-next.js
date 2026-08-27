import CardSkeleton from "./CardSkeleton";

interface CardGridSkeletonProps {
  count?: number;
  columns?: string;
  aspect?: string;
  bordered?: boolean;
  lines?: number;
}

const CardGridSkeleton = ({
  count = 6,
  columns = "sm:grid-cols-2 lg:grid-cols-3",
  aspect,
  bordered,
  lines,
}: CardGridSkeletonProps) => (
  <div className={`grid ${columns} gap-6`}>
    {Array.from({ length: count }).map((_, i) => (
      <CardSkeleton key={i} aspect={aspect} bordered={bordered} lines={lines} />
    ))}
  </div>
);

export default CardGridSkeleton;
