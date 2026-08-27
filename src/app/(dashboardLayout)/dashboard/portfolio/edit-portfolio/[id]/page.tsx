import EditPortfolio from "@/src/components/Ui/Dashboard/Portfolio/EditPortfolio";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <div>
      <EditPortfolio id={id} />
    </div>
  );
};

export default Page;
