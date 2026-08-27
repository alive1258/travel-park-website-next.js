import EditSustainabilityPillar from "@/src/components/Ui/Dashboard/SustainabilityPillars/EditSustainabilityPillar";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <div>
      <EditSustainabilityPillar id={id} />
    </div>
  );
};

export default Page;
