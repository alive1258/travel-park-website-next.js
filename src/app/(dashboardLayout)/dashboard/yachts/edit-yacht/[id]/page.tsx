import EditYacht from "@/src/components/Ui/Dashboard/Yachts/EditYacht";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <div>
      <EditYacht id={id} />
    </div>
  );
};

export default Page;
