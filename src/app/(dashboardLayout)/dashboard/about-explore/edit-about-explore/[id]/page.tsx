import EditAboutExplore from "@/src/components/Ui/Dashboard/AboutExplore/EditAboutExplore";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <div>
      <EditAboutExplore id={id} />
    </div>
  );
};

export default Page;
