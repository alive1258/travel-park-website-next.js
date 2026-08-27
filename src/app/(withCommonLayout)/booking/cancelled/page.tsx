import { Suspense } from "react";
import BookingCancelled from "@/src/components/Ui/YachtDetail/BookingCancelled";

const Page = () => {
  return (
    <Suspense fallback={null}>
      <BookingCancelled />
    </Suspense>
  );
};

export default Page;
