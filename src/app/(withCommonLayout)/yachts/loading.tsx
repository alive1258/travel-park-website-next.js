import PageHeroSkeleton from "@/src/components/Common/Skeleton/PageHeroSkeleton";
import FleetGridSkeleton from "@/src/components/Ui/YachtsPage/FleetGrid/FleetGridSkeleton";

const Loading = () => (
  <>
    <PageHeroSkeleton />
    <FleetGridSkeleton />
  </>
);

export default Loading;
