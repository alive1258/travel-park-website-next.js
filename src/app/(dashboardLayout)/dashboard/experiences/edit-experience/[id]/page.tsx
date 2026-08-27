import EditExperience from "@/src/components/Ui/Dashboard/Experiences/EditExperience";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <div>
      <EditExperience id={id} />
    </div>
  );
};

export default Page;
