import EditAboutStat from "@/src/components/Ui/Dashboard/AboutStats/EditAboutStat";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <div>
      <EditAboutStat id={id} />
    </div>
  );
};

export default Page;
