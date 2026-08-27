import EditClientVideoReview from "@/src/components/Ui/Dashboard/ClientVideoReviews/EditClientVideoReview";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <div>
      <EditClientVideoReview id={id} />
    </div>
  );
};

export default Page;
