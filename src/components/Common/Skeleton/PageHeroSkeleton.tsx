import Skeleton from "./Skeleton";

/** Matches components/Shared/PageHero/PageHero.tsx's layout. */
const PageHeroSkeleton = () => (
  <section className="relative flex min-h-[380px] items-center overflow-hidden py-20 md:min-h-[460px] bg-brand-900/5">
    <div className="container relative">
      <Skeleton className="h-6 w-44 rounded-full bg-brand-900/10" />
      <Skeleton className="mt-5 h-10 w-full max-w-2xl bg-brand-900/10" />
      <Skeleton className="mt-3 h-10 w-2/3 max-w-md bg-brand-900/10" />
      <Skeleton className="mt-4 h-4 w-full max-w-xl bg-brand-900/10" />
      <Skeleton className="mt-2 h-4 w-3/4 max-w-md bg-brand-900/10" />
    </div>
  </section>
);

export default PageHeroSkeleton;
