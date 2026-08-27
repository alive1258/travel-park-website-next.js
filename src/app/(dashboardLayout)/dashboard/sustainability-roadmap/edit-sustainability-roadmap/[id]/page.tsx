import EditSustainabilityRoadmap from "@/src/components/Ui/Dashboard/SustainabilityRoadmap/EditSustainabilityRoadmap";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <div>
      <EditSustainabilityRoadmap id={id} />
    </div>
  );
};

export default Page;
