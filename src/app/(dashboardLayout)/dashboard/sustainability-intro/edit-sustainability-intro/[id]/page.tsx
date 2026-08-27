import EditSustainabilityIntro from "@/src/components/Ui/Dashboard/SustainabilityIntro/EditSustainabilityIntro";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <div>
      <EditSustainabilityIntro id={id} />
    </div>
  );
};

export default Page;
