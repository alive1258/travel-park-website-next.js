import EditSustainability from "@/src/components/Ui/Dashboard/Sustainability/EditSustainability";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <div>
      <EditSustainability id={id} />
    </div>
  );
};

export default Page;
