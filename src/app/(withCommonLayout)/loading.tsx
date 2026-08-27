import PageHeroSkeleton from "@/src/components/Common/Skeleton/PageHeroSkeleton";
import CardGridSkeleton from "@/src/components/Common/Skeleton/CardGridSkeleton";

/** Shared fallback for every route under this layout group (about, blog,
 * contact, destinations, experiences, yachts, the homepage, ...). Kept
 * intentionally generic — a page-specific skeleton here would look wrong
 * on every route except the one it was designed for. Routes that fetch
 * real data define their own more specific loading.tsx, which overrides
 * this one for their subtree; the homepage's own sections stream in via
 * their individual <Suspense> boundaries in RootTemplet. */
const Loading = () => (
  <>
    <PageHeroSkeleton />
    <section className="bg-white py-16 md:py-24">
      <div className="container">
        <CardGridSkeleton count={6} lines={2} />
      </div>
    </section>
  </>
);

export default Loading;
