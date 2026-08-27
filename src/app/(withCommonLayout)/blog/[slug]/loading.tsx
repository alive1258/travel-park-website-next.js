import Skeleton from "@/src/components/Common/Skeleton/Skeleton";

const Loading = () => (
  <>
    <section className="relative flex min-h-[380px] items-center overflow-hidden py-20 md:min-h-[460px] bg-brand-900">
      <div className="container relative">
        <Skeleton className="h-6 w-32 rounded-full bg-white/10" />
        <Skeleton className="mt-5 h-10 w-full max-w-2xl bg-white/10" />
        <Skeleton className="mt-3 h-10 w-2/3 max-w-md bg-white/10" />
        <div className="mt-5 flex gap-5">
          <Skeleton className="h-4 w-28 bg-white/10" />
          <Skeleton className="h-4 w-28 bg-white/10" />
          <Skeleton className="h-4 w-24 bg-white/10" />
        </div>
      </div>
    </section>

    <section className="bg-white py-16 md:py-24">
      <div className="container">
        <Skeleton className="h-4 w-28 bg-brand-900/10" />

        <div className="mx-auto mt-8 max-w-3xl space-y-10">
          <div className="space-y-3">
            <Skeleton className="h-4 w-full bg-brand-900/10" />
            <Skeleton className="h-4 w-5/6 bg-brand-900/10" />
          </div>

          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-5 w-1/2 bg-brand-900/10" />
              <Skeleton className="h-3 w-full bg-brand-900/10" />
              <Skeleton className="h-3 w-full bg-brand-900/10" />
              <Skeleton className="h-3 w-2/3 bg-brand-900/10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default Loading;
