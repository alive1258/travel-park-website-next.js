import EditAbout from "@/src/components/Ui/Dashboard/About/EditAbout";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <div>
      <EditAbout id={id} />
    </div>
  );
};

export default Page;
