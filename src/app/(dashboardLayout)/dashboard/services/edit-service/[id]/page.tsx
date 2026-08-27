import EditService from "@/src/components/Ui/Dashboard/Services/EditService";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <div>
      <EditService id={id} />
    </div>
  );
};

export default Page;
