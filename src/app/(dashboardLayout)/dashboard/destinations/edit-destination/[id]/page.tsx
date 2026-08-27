import EditDestination from "@/src/components/Ui/Dashboard/Destinations/EditDestination";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <div>
      <EditDestination id={id} />
    </div>
  );
};

export default Page;
