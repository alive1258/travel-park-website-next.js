import YachtCardSkeleton from "@/src/components/Common/Skeleton/YachtCardSkeleton";

const FleetGridSkeleton = () => (
  <section className="bg-white py-16 md:py-24">
    <div className="container">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <YachtCardSkeleton key={i} />
        ))}
      </div>
    </div>
  </section>
);

export default FleetGridSkeleton;
