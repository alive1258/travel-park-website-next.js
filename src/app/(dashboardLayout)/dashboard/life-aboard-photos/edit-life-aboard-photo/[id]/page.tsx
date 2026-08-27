import EditLifeAboardPhoto from "@/src/components/Ui/Dashboard/LifeAboardPhotos/EditLifeAboardPhoto";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <div>
      <EditLifeAboardPhoto id={id} />
    </div>
  );
};

export default Page;
