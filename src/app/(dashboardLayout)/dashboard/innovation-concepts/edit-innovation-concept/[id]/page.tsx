import EditInnovationConcept from "@/src/components/Ui/Dashboard/InnovationConcepts/EditInnovationConcept";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <div>
      <EditInnovationConcept id={id} />
    </div>
  );
};

export default Page;
