import PageHeroSkeleton from "@/src/components/Common/Skeleton/PageHeroSkeleton";
import CardGridSkeleton from "@/src/components/Common/Skeleton/CardGridSkeleton";

const Loading = () => (
  <>
    <PageHeroSkeleton />
    <section className="bg-white py-16 md:py-24">
      <div className="container">
        <CardGridSkeleton count={9} aspect="aspect-4/3" bordered lines={1} />
      </div>
    </section>
  </>
);

export default Loading;
