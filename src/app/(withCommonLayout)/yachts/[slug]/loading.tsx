import Skeleton from "@/src/components/Common/Skeleton/Skeleton";
import PageHeroSkeleton from "@/src/components/Common/Skeleton/PageHeroSkeleton";

const Loading = () => (
  <>
    <PageHeroSkeleton />

    {/* Quick facts strip */}
    <section className="border-b border-brand-900/10 bg-white">
      <div className="container">
        <div className="grid grid-cols-2 gap-6 py-6 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <Skeleton className="mt-0.5 h-[18px] w-[18px] shrink-0 rounded-full bg-brand-900/10" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-2.5 w-14 bg-brand-900/10" />
                <Skeleton className="h-3.5 w-16 bg-brand-900/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-white py-16 md:py-24">
      <div className="container">
        <Skeleton className="h-4 w-32 bg-brand-900/10" />

        <div className="mt-8 grid gap-12 lg:grid-cols-3 lg:gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div className="space-y-3">
              <Skeleton className="h-3 w-full bg-brand-900/10" />
              <Skeleton className="h-3 w-full bg-brand-900/10" />
              <Skeleton className="h-3 w-2/3 bg-brand-900/10" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full bg-brand-900/10" />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="aspect-square w-full rounded-xl bg-brand-900/10"
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Skeleton className="h-56 w-full rounded-2xl bg-brand-900/10" />
            <Skeleton className="h-40 w-full rounded-2xl bg-brand-900/10" />
          </div>
        </div>
      </div>
    </section>
  </>
);

export default Loading;
