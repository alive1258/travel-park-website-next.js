import { Suspense } from "react";
import BookingConfirmation from "@/src/components/Ui/YachtDetail/BookingConfirmation";

const Page = () => {
  return (
    <Suspense fallback={null}>
      <BookingConfirmation />
    </Suspense>
  );
};

export default Page;
